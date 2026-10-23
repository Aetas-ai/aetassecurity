/**
 * Light scroll entrances: content below the fold fades and rises into place
 * the first time it scrolls into view. Content already on screen, inside a
 * hero, or viewed with reduced motion is never hidden, and without JavaScript
 * nothing is hidden at all (the CSS applies only under html.js-reveal).
 */
const REVEAL_TARGETS = [
  'main .agi-section-heading',
  'main .agi-card',
  'main .agi-step',
  'main .stat-item',
  'main .content-slot',
  'main .governance-grid > li',
  'main .recognition-item',
  'main .agi-faq',
].join(', ');

const STAGGER_MS = 60;
const MAX_STAGGER_STEPS = 5;

let observer: IntersectionObserver | undefined;

export function destroyReveal() {
  observer?.disconnect();
  observer = undefined;
}

export function initReveal() {
  destroyReveal();
  const root = document.documentElement;

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) {
    root.classList.remove('js-reveal');
    return;
  }

  const fold = window.innerHeight;
  const targets = [...document.querySelectorAll<HTMLElement>(REVEAL_TARGETS)].filter(
    (element) => !element.closest('.home-hero, .page-hero') && element.getBoundingClientRect().top > fold,
  );

  observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      entry.target.setAttribute('data-revealed', '');
      observer?.unobserve(entry.target);
    }
  }, { rootMargin: '0px 0px -8% 0px' });

  for (const element of targets) {
    const siblings = element.parentElement ? [...element.parentElement.children] : [];
    const step = Math.min(siblings.indexOf(element), MAX_STAGGER_STEPS);
    if (step > 0) element.style.setProperty('--reveal-delay', `${step * STAGGER_MS}ms`);
    element.setAttribute('data-reveal', '');
    observer.observe(element);
  }

  root.classList.add('js-reveal');
}
