const sections = ['intro','case-study','bullshit-game','fact-reminder','environment','reflection'];

function showSection(id) {
  sections.forEach(sec => {
    const el = document.getElementById(sec);
    if (el) {
      el.classList.add('hidden');
      el.hidden = true;
    }
  });
  const target = document.getElementById(id);
  if (target) {
    target.classList.remove('hidden');
    target.hidden = false;
  }
}

document.querySelectorAll('.next-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const next = btn.dataset.next;
    if (next) showSection(next);
  });
});

function chooseCase(ans) {
  const fb = document.getElementById('case-feedback');
  if (ans === 'B') {
    fb.innerHTML = 'Correct! Paper A is vague, impressive-sounding, and exemplifies Frankfurt\u2019s notion of bullshit. Paper B clearly explains Kant\u2019s view and a criticism.';
  } else {
    fb.innerHTML = 'Not quite. Paper A is the bullshit example\u2014it sounds grand but lacks clear meaning.';
  }
  fb.classList.remove('hidden');
  fb.hidden = false;
  const nxt = document.getElementById('case-next');
  nxt.classList.remove('hidden');
  nxt.hidden = false;
}

document.getElementById('choose-a').addEventListener('click', () => chooseCase('A'));
document.getElementById('choose-b').addEventListener('click', () => chooseCase('B'));

const bsExamples = [
  { text: 'Ethical imperatives juxtapose against relativistic tendencies, manifesting intricate socio-cultural dichotomies.', correct: 'bullshit', feedback: 'Bullshit! \uD83D\uDEA9 This sentence tries to sound deep but says nothing concrete.' },
  { text: "Kant's moral absolutism does not sufficiently consider context, causing problems in complex situations like lying to protect innocent people.", correct: 'brilliant', feedback: 'Brilliant! \u2705 Clear and provides a meaningful critique of Kant.' },
  { text: 'Morality profoundly and existentially shapes societal fabric through universally resonant paradigms.', correct: 'bullshit', feedback: "Bullshit! \uD83D\uDEA9 This example is vague, uses overly complicated language, and has no clear meaning. Always prefer precise, meaningful language in your writing." },
  { text: 'References (Example Only—Replace with Real References): Smith, J. (year). Title.', correct: 'bullshit', feedback: "Bullshit! \uD83D\uDEA9 Placeholder references indicate no actual verification or research. Always replace these with verified, real citations." },
  { text: "Kant's ethics insists on duty-based morality. According to Smith (2022) about gardening techniques, regular watering schedules are important.", correct: 'bullshit', feedback: "Bullshit! \uD83D\uDEA9 The cited source (about gardening) is completely irrelevant. Always check that your references are directly related and meaningful." },
  { text: 'Kant argues lying is always morally wrong, even to save innocent lives (Kant, 1797/1996, p. 552).', correct: 'brilliant', feedback: 'Brilliant! \u2705 This is a clear, precise statement supported by a verified, correctly cited source.' },
  { text: 'Virtue ethics emphasizes practical wisdom (phronesis), helping individuals respond appropriately in diverse situations (Aristotle, 350 BCE/2009).', correct: 'brilliant', feedback: 'Brilliant! \u2705 Clearly written, specific, and properly referenced—exactly what makes writing credible.' }
];
let bsIndex = 0;

function showBS() {
  const example = bsExamples[bsIndex];
  document.getElementById('bs-text').innerText = example.text;
  document.getElementById('bs-feedback').classList.add('hidden');
  document.getElementById('bs-feedback').hidden = true;
  document.getElementById('bs-next').classList.add('hidden');
  document.getElementById('bs-next').hidden = true;
  document.getElementById('bs-finish').classList.add('hidden');
  document.getElementById('bs-finish').hidden = true;
}

function answerBS(choice) {
  const example = bsExamples[bsIndex];
  const fb = document.getElementById('bs-feedback');
  if (choice === example.correct) {
    fb.innerText = example.feedback;
  } else {
    fb.innerText = '❌ Tricky one! Remember, clarity and meaningful detail matter most.';
  }
  fb.classList.remove('hidden');
  fb.hidden = false;
  if (bsIndex < bsExamples.length - 1) {
    const nxt = document.getElementById('bs-next');
    nxt.classList.remove('hidden');
    nxt.hidden = false;
  } else {
    const fin = document.getElementById('bs-finish');
    fin.classList.remove('hidden');
    fin.hidden = false;
  }
}

document.getElementById('bs-btn').addEventListener('click', () => answerBS('bullshit'));
document.getElementById('br-btn').addEventListener('click', () => answerBS('brilliant'));

document.getElementById('bs-next').addEventListener('click', () => {
  bsIndex++;
  if (bsIndex < bsExamples.length) {
    showBS();
  }
});

function verifyAnswer(ans) {
  const fb = document.getElementById('verify-feedback');
  if (ans === 'false') {
    fb.innerText = 'Correct! \u2705 Kant indeed insists lying is never permissible. Always verify AI-generated statements carefully to avoid misinformation.';
  } else {
    fb.innerText = 'Incorrect! \uD83D\uDEA9 Kant explicitly argues lying is never permissible, even to save lives (Kant, 1797/1996). Always carefully verify philosophical claims against original sources.';
  }
  fb.classList.remove('hidden');
  fb.hidden = false;
  const nxt = document.getElementById('verify-next');
  nxt.classList.remove('hidden');
  nxt.hidden = false;
}

document.getElementById('verify-true').addEventListener('click', () => verifyAnswer('true'));
document.getElementById('verify-false').addEventListener('click', () => verifyAnswer('false'));

const envButtons = document.querySelectorAll('.env-btn');
envButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const fb = document.getElementById('env-feedback');
    fb.innerText = 'Using AI responsibly and sparingly can save resources. Consider carefully whether each AI-assisted request genuinely adds value to your thinking and writing.';
    fb.classList.remove('hidden');
    fb.hidden = false;
    const nxt = document.getElementById('env-next');
    nxt.classList.remove('hidden');
    nxt.hidden = false;
  });
});

window.addEventListener('DOMContentLoaded', () => {
  showSection('intro');
  showBS();
});
