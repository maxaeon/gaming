const sections = ['intro','case-study','bullshit-game','environment','reflection'];

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
  { text: 'Ethical imperatives juxtapose against relativistic tendencies, manifesting intricate socio-cultural dichotomies.', correct: 'bullshit' },
  { text: "Kant's moral absolutism does not sufficiently consider context, causing problems in complex situations like lying to protect innocent people.", correct: 'brilliant' }
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
    fb.innerText = choice === 'bullshit' ? '🎉 Bullshit Detected! Nice catch!' : '🎉 Correct!';
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
