const verifyExercises = [
  {
    claim: "Immanuel Kant argues that an action’s morality depends on its consequences and outcomes.",
    trueFeedback: "Incorrect! 🚩 Kant explicitly states morality depends solely on following moral rules (categorical imperative), not consequences. Always verify such claims carefully.",
    falseFeedback: "Correct! ✅ Kant emphasizes duty and following rules without exceptions, not consequences.",
    verifySteps: [
      "Check reliable philosophy textbooks (e.g., Vaughn’s Doing Ethics).",
      "Look up Kant’s Metaphysics of Morals online (trusted source).",
      "Confirm explicitly Kant’s arguments about morality being based on duty (categorical imperative), not outcomes."
    ],
    result: "Verified Result: Kant rejects consequentialism explicitly. The original claim is false."
  },
  {
    claim: "Aristotle believes happiness (eudaimonia) is the highest goal in life and is achieved through virtue and reason.",
    trueFeedback: "Correct! ✅ Aristotle indeed argues explicitly for eudaimonia—achieved by developing virtues and reason—as life's highest goal.",
    falseFeedback: "Incorrect! 🚩 Aristotle explicitly states happiness through virtue is the highest human good. Always check claims against reliable sources.",
    verifySteps: [
      "Refer to Aristotle’s Nicomachean Ethics (online or textbook).",
      "Search key terms 'eudaimonia,' 'virtue,' and 'highest good.'",
      "Confirm explicitly Aristotle’s description of happiness as life’s ultimate goal, achieved through virtue and reason."
    ],
    result: "Verified Result: Aristotle explicitly defines happiness (eudaimonia) as life's highest goal, achieved by practicing virtues."
  },
  {
    claim: "John Stuart Mill argues that morality should be judged by the happiness it produces for the greatest number of people.",
    trueFeedback: "Correct! ✅ Mill explicitly argues morality should maximize happiness for the greatest number (Utilitarianism).",
    falseFeedback: "Incorrect! 🚩 Mill clearly states morality is about maximizing overall happiness. Always explicitly verify philosophical claims.",
    verifySteps: [
      "Check Mill’s Utilitarianism online or in your textbook.",
      "Search explicitly for definitions of utilitarianism, especially 'greatest happiness principle.'",
      "Verify explicitly Mill’s position regarding morality and greatest happiness."
    ],
    result: "Verified Result: Mill explicitly states morality should maximize happiness for the greatest number (Utilitarianism)."
  }
];

const citationExercises = [
  {
    type: 'in-text',
    segments: [
      { text: 'Kant claims that moral rules must be universal without exception (' },
      { text: 'Kant', error: true },
      { text: ', Groundwork, p. 31).' }
    ],
    mla: 'Kant claims that moral rules must be universal without exception (<em>Groundwork of the Metaphysics of Morals</em> 31).',
    explanation: 'This MLA in-text citation omits the author from the parentheses when it appears in the sentence, italicizes the title, and lists the page number without "p.".'
  },
  {
    type: 'in-text',
    segments: [
      { text: 'Aquinas argues that moral actions follow natural law (' },
      { text: 'Summa Theologica, Aquinas', error: true },
      { text: ', p. 423).' }
    ],
    mla: 'Aquinas argues moral actions must follow natural law (<em>Summa Theologica</em> 423).',
    explanation: 'In an MLA in-text citation, use only the work\'s title and page number in parentheses when the author\'s name is already mentioned.'
  },
  {
    type: 'works-cited',
    segments: [
      { text: 'Nussbaum claims that ethics must consider human capabilities ("Ethics and Capabilities,"' },
      { text: ' Philosophy Review, Martha Nussbaum', error: true },
      { text: ', 2011, 56).' }
    ],
    mla: 'Nussbaum, Martha C. "Ethics and Capabilities." <em>Philosophy Review</em>, vol. 23, no. 2, 2011, pp. 56–65.',
    explanation: 'An MLA Works Cited entry begins with the author\'s full name, followed by the article title in quotes, the journal title in italics, and the volume, issue, year, and page range.'
  },
  {
    type: 'works-cited',
    segments: [
      { text: 'Rachels claims euthanasia can be morally permissible ("The Morality of Euthanasia,"' },
      { text: ' James Rachels', error: true },
      { text: ', Ethics Collection, 1998, p. 104).' }
    ],
    mla: 'Rachels, James. "The Morality of Euthanasia." <em>Ethics Collection</em>, edited by John Smith, Routledge, 1998, pp. 104–116.',
    explanation: 'An MLA Works Cited entry lists the author first, then the chapter title in quotes, followed by the book title in italics, the editor, publisher, year, and page range.'
  }
];

const citationChoices = [
  {
    type: 'in-text',
    prompt: 'Which in-text citation is formatted correctly?',
    options: [
      'Aristotle holds that virtues are means between extremes (Aristotle, <em>Nicomachean Ethics</em>, p. 1107b).',
      'Aristotle holds that virtues are means between extremes (<em>Nicomachean Ethics</em> 1107b).'
    ],
    correct: 1
  },
  {
    type: 'in-text',
    prompt: 'Select the proper citation.',
    options: [
      'Mill states that happiness is the basis of morality (Mill, <em>Utilitarianism</em>, p. 14).',
      'Mill states that happiness is the basis of morality (Mill 14).'
    ],
    correct: 1
  },
  {
    type: 'works-cited',
    prompt: 'Which Works Cited entry follows MLA style?',
    options: [
      'Plato. <em>The Republic</em>. Translated by G.M.A. Grube, Hackett, 1992.',
      'Plato, <em>The Republic</em>. Translated by G.M.A. Grube Hackett 1992.'
    ],
    correct: 0
  },
  {
    type: 'works-cited',
    prompt: 'Choose the correctly formatted citation.',
    options: [
      'Singer, Peter. "Famine, Affluence, and Morality." <em>Philosophy & Public Affairs</em>, vol. 1, no. 3, 1972, pp. 229-243.',
      'Singer Peter. "Famine, Affluence, and Morality." <em>Philosophy & Public Affairs</em> vol. 1 no. 3 1972 229-243.'
    ],
    correct: 0
  }
];

let citationIndex = 0;
let completedRounds = 0;
let choiceIndex = 0;

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
  document.getElementById('citation-feedback').classList.add('hidden');   document.getElementById('citation-feedback').hidden = true;
  document.getElementById('citation-answer').classList.add('hidden');   document.getElementById('citation-answer').hidden = true;
  document.getElementById('citation-next').classList.add('hidden');   document.getElementById('citation-next').hidden = true;
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
  feedback.classList.remove('hidden');   feedback.hidden = false;
}

function revealCitation() {
  const ex = citationExercises[citationIndex];
  const ansDiv = document.getElementById('citation-answer');
  const label = ex.type === 'works-cited' ? 'MLA Works Cited:' : 'MLA In-text:';
  ansDiv.innerHTML = `<strong>${label}</strong> ${ex.mla}<br><em>${ex.explanation}</em>`;
  ansDiv.classList.remove('hidden');   ansDiv.hidden = false;
  document.getElementById('citation-next').classList.remove('hidden');   document.getElementById('citation-next').hidden = false;
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

function showCompletion() {
  document.getElementById('citation-game').classList.add('hidden');
  document.getElementById('citation-game').hidden = true;
  const complete = document.getElementById('citation-complete');
  complete.classList.remove('hidden');
  complete.hidden = false;
  startChoiceGame();
}

function startChoiceGame() {
  document.getElementById('citation-choice-section').classList.remove('hidden');
  document.getElementById('citation-choice-section').hidden = false;
  choiceIndex = 0;
  buildChoiceQuestion();
}

function buildChoiceQuestion() {
  const q = citationChoices[choiceIndex];
  document.getElementById('choice-prompt').innerText = q.prompt;
  const opts = document.getElementById('choice-options');
  opts.innerHTML = '';
  q.options.forEach((opt, i) => {
    const btn = document.createElement('button');
    btn.className = 'option-btn';
    btn.innerHTML = opt;
    btn.onclick = () => submitChoice(i);
    opts.appendChild(btn);
  });
  document.getElementById('choice-feedback').classList.add('hidden');
  document.getElementById('choice-feedback').hidden = true;
  document.getElementById('choice-next').classList.add('hidden');
  document.getElementById('choice-next').hidden = true;
}

function submitChoice(idx) {
  const q = citationChoices[choiceIndex];
  const fb = document.getElementById('choice-feedback');
  if (idx === q.correct) {
    fb.innerText = 'Correct!';
  } else {
    fb.innerHTML = `Not quite. The correct citation is: ${q.options[q.correct]}`;
  }
  fb.classList.remove('hidden');
  fb.hidden = false;
  document.getElementById('choice-next').classList.remove('hidden');
  document.getElementById('choice-next').hidden = false;
}

function nextChoice() {
  choiceIndex++;
  if (choiceIndex >= citationChoices.length) {
    document.getElementById('citation-choice-section').classList.add('hidden');
    document.getElementById('citation-choice-section').hidden = true;
    document.getElementById('choice-summary').classList.remove('hidden');
    document.getElementById('choice-summary').hidden = false;
  } else {
    buildChoiceQuestion();
  }
}

document.getElementById('citation-giveup').addEventListener('click', revealCitation);
document.getElementById('citation-next').addEventListener('click', () => {
  citationIndex++;
  if (citationIndex >= citationExercises.length) {
    completedRounds++;
    if (completedRounds === 1) {
      document.getElementById('citation-aid-link').classList.remove('hidden');
      document.getElementById('citation-aid-link').hidden = false;
      document.getElementById('research-guide').classList.remove('hidden');
      document.getElementById('research-guide').hidden = false;
    }
    showCompletion();
  } else {
    buildCitation();
  }
});

// Verification Flow
let verifyIndex = 0;

function buildVerify() {
  const ex = verifyExercises[verifyIndex];
  document.getElementById('verify-claim').innerText = ex.claim;
  document.getElementById('verify-feedback').classList.add('hidden');
  document.getElementById('verify-feedback').hidden = true;
  document.getElementById('verify-next').classList.add('hidden');
  document.getElementById('verify-next').hidden = true;
}

function showVerifyFeedback(isTrue) {
  const ex = verifyExercises[verifyIndex];
  const fb = document.getElementById('verify-feedback');
  fb.innerText = isTrue ? ex.trueFeedback : ex.falseFeedback;
  fb.classList.remove('hidden');
  fb.hidden = false;
  document.getElementById('verify-next').classList.remove('hidden');
  document.getElementById('verify-next').hidden = false;
}

function showVerifyModal() {
  const ex = verifyExercises[verifyIndex];
  const modal = document.getElementById('verify-modal');
  const content = document.getElementById('verify-modal-content');
  const list = ex.verifySteps.map(s => `<li>${s}</li>`).join('');
  content.innerHTML = `<h2>How to Verify:</h2><ul>${list}</ul><p><strong>${ex.result}</strong></p><button id="verify-close">Close</button>`;
  modal.classList.remove('hidden');
  modal.hidden = false;
  document.getElementById('verify-close').onclick = () => {
    modal.classList.add('hidden');
    modal.hidden = true;
  };
}

document.getElementById('verify-true').addEventListener('click', () => showVerifyFeedback(true));
document.getElementById('verify-false').addEventListener('click', () => showVerifyFeedback(false));
document.getElementById('verify-check').addEventListener('click', showVerifyModal);

document.getElementById('verify-next').addEventListener('click', () => {
  verifyIndex++;
  if (verifyIndex >= verifyExercises.length) {
    document.getElementById('verify-exercise').classList.add('hidden');
    document.getElementById('verify-exercise').hidden = true;
    document.getElementById('verify-complete').classList.remove('hidden');
    document.getElementById('verify-complete').hidden = false;
  } else {
    buildVerify();
  }
});

document.getElementById('start-verify').addEventListener('click', () => {
  document.getElementById('verify-intro').classList.add('hidden');
  document.getElementById('verify-intro').hidden = true;
  document.getElementById('verify-exercise').classList.remove('hidden');
  document.getElementById('verify-exercise').hidden = false;
  buildVerify();
});

document.getElementById('verify-proceed').addEventListener('click', () => {
  document.getElementById('verify-complete').classList.add('hidden');
  document.getElementById('verify-complete').hidden = true;
  document.getElementById('citation-intro').classList.remove('hidden');
  document.getElementById('citation-intro').hidden = false;
  document.getElementById('citation-game').classList.remove('hidden');
  document.getElementById('citation-game').hidden = false;
  document.getElementById('works-cited-examples').classList.remove('hidden');
  document.getElementById('works-cited-examples').hidden = false;
  document.getElementById('in-text-examples').classList.remove('hidden');
  document.getElementById('in-text-examples').hidden = false;
  buildCitation();
});


document.getElementById('citation-aid-link').addEventListener('click', () => {
  window.open('citation-aid.html', '_blank');
});

document.getElementById('choice-next').addEventListener('click', nextChoice);
document.getElementById('citation-restart').addEventListener('click', () => {
  document.getElementById('citation-complete').classList.add('hidden');
  document.getElementById('citation-complete').hidden = true;
  document.getElementById('citation-game').classList.remove('hidden');
  document.getElementById('citation-game').hidden = false;
  citationIndex = 0;
  buildCitation();
});

document.getElementById('choice-restart').addEventListener('click', () => {
  document.getElementById('choice-summary').classList.add('hidden');
  document.getElementById('choice-summary').hidden = true;
  startChoiceGame();
});
