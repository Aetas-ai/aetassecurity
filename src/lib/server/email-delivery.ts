export interface EmailSubmissionData {
  formType: string;
  subject: string;
  labels: Record<string, string>;
  values: Record<string, string>;
  reference: string;
  receivedAt: string;
}

export interface ResendConfiguration {
  apiKey: string;
  senderEmail: string;
  recipientEmail: string;
}

export type DeliveryResult =
  | { ok: true }
  | { ok: false; reason: 'config' | 'timeout' | 'network' | 'http' | 'invalid-response'; status?: number };

// Match the wording visitors chose in each form's dropdown.
const choiceLabels: Record<string, Record<string, string>> = {
  service: {
    mxdr: 'MXDR', 'incident-response': 'Incident Response', 'network-testing': 'Network Security Testing',
    'application-testing': 'Application Security Testing', 'msp-partnership': 'MSP partnership',
    general: 'General inquiry',
  },
};

export function escapeHtml(value: string): string {
  return value.replace(/[&<>'"]/g, (character) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;',
  })[character] ?? character);
}

function displayValue(key: string, value: string): string {
  return choiceLabels[key]?.[value] ?? value;
}

function submissionRows(data: EmailSubmissionData): Array<[string, string]> {
  return [
    ['Reference', data.reference], ['Received at (UTC)', data.receivedAt], ['Form', data.formType],
    ...Object.entries(data.labels).map(([key, label]): [string, string] => (
      [label, displayValue(key, data.values[key] ?? '')]
    )),
  ];
}

export function buildEmailText(data: EmailSubmissionData): string {
  return `${data.subject}\n\n${submissionRows(data).map(([label, value]) => `${label}: ${value}`).join('\n')}\n\nSubmitted through aetassecurity.com. Reply to contact the visitor. The visitor's address has not been verified.`;
}

export function buildEmailHtml(data: EmailSubmissionData): string {
  const rows = submissionRows(data).map(([label, value]) => (
    `<tr><th scope="row" style="text-align:left;vertical-align:top;padding:10px;border-bottom:1px solid #ddd">${escapeHtml(label)}</th>`
    + `<td style="padding:10px;white-space:pre-wrap;border-bottom:1px solid #ddd">${escapeHtml(value)}</td></tr>`
  )).join('');
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><title>${escapeHtml(data.subject)}</title></head><body style="font-family:Arial,sans-serif;color:#18181b;background:#f4f4f5;padding:24px"><div style="max-width:640px;margin:auto;background:#fff;padding:24px"><h1 style="font-size:22px">Aetas Security</h1><h2 style="font-size:18px">${escapeHtml(data.subject)}</h2><table style="width:100%;border-collapse:collapse">${rows}</table><p>Submitted through aetassecurity.com. Reply to contact the visitor.</p><p style="font-size:12px;color:#555">The visitor's address has not been verified.</p></div></body></html>`;
}

export async function sendResendEmail(
  configuration: ResendConfiguration,
  data: EmailSubmissionData,
  fetcher: typeof fetch = fetch,
): Promise<DeliveryResult> {
  const { apiKey, senderEmail, recipientEmail } = configuration;
  const validEmail = (value: string) => /^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(value);
  if (!/^re_[^\s]+$/.test(apiKey)
    || !validEmail(senderEmail) || !validEmail(recipientEmail) || !validEmail(data.values.email ?? '')) {
    return { ok: false, reason: 'config' };
  }
  const focus = data.values.service ? displayValue('service', data.values.service) : '';
  // Visitor name/company make the inbox scannable; the reference stays in the body.
  // Whitespace (including line breaks) is collapsed so the subject stays one line.
  const oneLine = (value: string | undefined) => (value ?? '').replace(/\s+/g, ' ').trim();
  const name = oneLine(`${data.values['first-name'] ?? ''} ${data.values['last-name'] ?? ''}`);
  const company = oneLine(data.values.company);
  const who = [name, company].filter(Boolean).join(', ');
  const subject = `${data.subject}${focus ? ` — ${focus}` : ''}${who ? ` — ${who}` : ''}`;
  const content = { ...data, subject };
  try {
    const response = await fetcher('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        accept: 'application/json', Authorization: `Bearer ${apiKey}`, 'content-type': 'application/json',
        'Idempotency-Key': `aetas-security-form/${data.reference}`,
      },
      body: JSON.stringify({
        from: `Aetas Security Website <${senderEmail}>`,
        to: [recipientEmail],
        reply_to: data.values.email,
        subject, html: buildEmailHtml(content), text: buildEmailText(content),
        tags: [{ name: 'source', value: 'aetas-security-website' }, { name: 'form', value: data.formType }],
      }),
      redirect: 'error',
      signal: AbortSignal.timeout(8_000),
    });
    // Acceptance is not inbox delivery. Do not retry/fail over after a timeout.
    // Only the status code is reported; provider bodies may echo submission data.
    if (response.status !== 200) return { ok: false, reason: 'http', status: response.status };
    let result: { id?: unknown };
    try {
      result = await response.json() as { id?: unknown };
    } catch {
      return { ok: false, reason: 'invalid-response', status: 200 };
    }
    return typeof result.id === 'string' && result.id.trim().length > 0
      ? { ok: true }
      : { ok: false, reason: 'invalid-response', status: 200 };
  } catch (error) {
    return { ok: false, reason: error instanceof DOMException && error.name === 'TimeoutError' ? 'timeout' : 'network' };
  }
}
