/**
 * Rotating hero taglines, typed letter by letter, held, then erased (the
 * reference hero's timing: 40 ms per letter in, 3 s hold, 15 ms per letter
 * out). The animated line is aria-hidden; a visually hidden copy of the first
 * tagline is what assistive technology reads. Without JavaScript, or under
 * reduced motion, the first tagline stays static.
 */
const TYPE_MS = 40;
const ERASE_MS = 15;
const HOLD_MS = 3000;
const START_DELAY_MS = 1600;

let timer: number | undefined;

export function destroyHeroTaglines() {
  window.clearTimeout(timer);
  timer = undefined;
}

export function initHeroTaglines() {
  destroyHeroTaglines();

  const line = document.querySelector<HTMLElement>('[data-taglines]');
  if (!line) return;

  let taglines: string[] = [];
  try {
    taglines = JSON.parse(line.dataset.taglines ?? '[]');
  } catch {
    return;
  }
  if (taglines.length < 2 || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  let index = 0;

  // Whole words never wrap mid-word: each word is an inline-block of letters.
  function render(text: string) {
    line!.replaceChildren();
    const letters: HTMLElement[] = [];
    text.split(' ').forEach((word, wordIndex, words) => {
      const wordSpan = document.createElement('span');
      wordSpan.className = 'tagline-word';
      for (const character of word) {
        const letter = document.createElement('span');
        letter.className = 'tagline-letter';
        letter.textContent = character;
        wordSpan.append(letter);
        letters.push(letter);
      }
      line!.append(wordSpan);
      if (wordIndex < words.length - 1) line!.append(' ');
    });
    return letters;
  }

  // The caret sits after the last visible letter.
  function moveCaret(letters: HTMLElement[], position: number) {
    line!.querySelector('.is-caret')?.classList.remove('is-caret');
    letters[position]?.classList.add('is-caret');
  }

  function type(letters: HTMLElement[], position: number) {
    if (position < letters.length) {
      letters[position].classList.add('is-on');
      moveCaret(letters, position);
      timer = window.setTimeout(() => type(letters, position + 1), TYPE_MS);
    } else {
      timer = window.setTimeout(() => erase(letters, letters.length - 1), HOLD_MS);
    }
  }

  function erase(letters: HTMLElement[], position: number) {
    if (position >= 0) {
      letters[position].classList.remove('is-on');
      moveCaret(letters, position - 1);
      timer = window.setTimeout(() => erase(letters, position - 1), ERASE_MS);
    } else {
      index = (index + 1) % taglines.length;
      type(render(taglines[index]), 0);
    }
  }

  // The first tagline is already on screen as plain text: once the hero has
  // settled and the hold has passed, swap it for letters and erase it.
  timer = window.setTimeout(() => {
    line.classList.add('is-typing');
    const letters = render(taglines[0]);
    letters.forEach((letter) => letter.classList.add('is-on'));
    erase(letters, letters.length - 1);
  }, START_DELAY_MS + HOLD_MS);
}
