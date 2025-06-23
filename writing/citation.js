const citationExercises = [
  {
    segments: [
      { text: 'Kant claims that moral rules must be universal without exception (' },
      { text: 'Kant', error: true },
      { text: ', Groundwork, p. 31).' }
    ],
    mla: 'Kant claims that moral rules must be universal without exception (<em>Groundwork of the Metaphysics of Morals</em> 31).',
    explanation: 'In MLA, omit the author from the parentheses when it appears in the sentence, italicize the title, and list the page number without "p.".'
  },
  {
    segments: [
      { text: 'Aquinas argues that moral actions follow natural law (' },
      { text: 'Summa Theologica, Aquinas', error: true },
      { text: ', p. 423).' }
    ],
    mla: 'Aquinas argues moral actions must follow natural law (<em>Summa Theologica</em> 423).',
    explanation: 'MLA uses only the work\'s title and page number in parentheses when the author\'s name is already mentioned.'
  },
  {
    segments: [
      { text: 'Nussbaum claims that ethics must consider human capabilities ("Ethics and Capabilities,"' },
      { text: ' Philosophy Review, Martha Nussbaum', error: true },
      { text: ', 2011, 56).' }
    ],
    mla: 'Nussbaum, Martha C. "Ethics and Capabilities." <em>Philosophy Review</em>, vol. 23, no. 2, 2011, p. 56.',
    explanation: 'An MLA reference begins with the author\'s full name, followed by the article title in quotes, the journal title in italics, and the volume, issue, year, and page number.'
  },
  {
    segments: [
      { text: 'Rachels claims euthanasia can be morally permissible ("The Morality of Euthanasia,"' },
      { text: ' James Rachels', error: true },
      { text: ', Ethics Collection, 1998, p. 104).' }
    ],
    mla: 'Rachels, James. "The Morality of Euthanasia." <em>Ethics Collection</em>, edited by John Smith, Routledge, 1998, pp. 104–116.',
    explanation: 'MLA lists the author first, then the chapter title in quotes, followed by the book title in italics, the editor, publisher, year, and page range.'
  }
];

let citationIndex = 0;

function buildCitation() {
  const ex = citationExercises[citationIndex];
  const container = document.getElementById('citation-prompt');
  container.innerHTML = '';
  ex.segments.forEach((seg, idx) => {
    const span = document.createElement('span');
    span.innerText = seg.text;
    span.classList.add('citation-part');
    span.dataset.index = idx;
    span.addEventListener('click', () => handleClick(idx, span));
    container.appendChild(span);
  });
  document.getElementById('citation-feedback').classList.add('hidden');
  document.getElementById('citation-answer').classList.add('hidden');
  document.getElementById('citation-next').classList.add('hidden');
}

function handleClick(idx, span) {
  const seg = citationExercises[citationIndex].segments[idx];
  const feedback = document.getElementById('citation-feedback');
  if (seg.error) {
    span.classList.add('selected');
    feedback.innerText = 'Correct!';
    revealCitation();
  } else {
    feedback.innerText = 'Not quite. Try again.';
  }
  feedback.classList.remove('hidden');
}

function revealCitation() {
  const ex = citationExercises[citationIndex];
  const ansDiv = document.getElementById('citation-answer');
  ansDiv.innerHTML = `<strong>MLA:</strong> ${ex.mla}<br><em>${ex.explanation}</em>`;
  ansDiv.classList.remove('hidden');
  document.getElementById('citation-next').classList.remove('hidden');
  highlightErrors();
}

function highlightErrors() {
  const ex = citationExercises[citationIndex];
  ex.segments.forEach((seg, idx) => {
    if (seg.error) {
      const span = document.querySelector(`#citation-prompt span[data-index="${idx}"]`);
      if (span) span.classList.add('error-highlight');
    }
  });
}

document.getElementById('citation-giveup').addEventListener('click', revealCitation);
document.getElementById('citation-next').addEventListener('click', () => {
  citationIndex = (citationIndex + 1) % citationExercises.length;
  buildCitation();
});

window.addEventListener('DOMContentLoaded', buildCitation);
