const rules = ['Modus Ponens','Modus Tollens','Hypothetical Syllogism','Disjunctive Syllogism','Conjunction Elimination'];

const examples = [
  {
    premises: [
      '1. If it rains, the street is wet. (R→W)',
      '2. It rains. (R)'
    ],
    conclusion: 'The street is wet. (W)',
    steps: [
      {prompt: 'Select the rule that derives W from R→W and R.', answer: 'Modus Ponens', feedback: 'Modus Ponens derives W from R→W and R.'}
    ]
  },
  {
    premises: [
      '1. If the power is on, the lights work. (P→L)',
      '2. If the lights work, the room is bright. (L→B)'
    ],
    conclusion: 'If the power is on, the room is bright. (P→B)',
    steps: [
      {prompt: 'Which rule combines P→L and L→B to derive P→B?', answer: 'Hypothetical Syllogism', feedback: 'Hypothetical Syllogism combines P→L and L→B.'}
    ]
  },
  {
    premises: [
      '1. If the program compiles, there are no errors. (C→¬E)',
      '2. Either the program compiles or it\'s buggy. (C∨B)',
      '3. There are errors. (E)'
    ],
    conclusion: 'The program is buggy. (B)',
    steps: [
      {prompt: 'Which rule derives ¬C from C→¬E and E?', answer: 'Modus Tollens', feedback: 'Modus Tollens gives ¬C.'},
      {prompt: 'Which rule derives B from C∨B and ¬C?', answer: 'Disjunctive Syllogism', feedback: 'Disjunctive Syllogism yields B.'}
    ]
  },
  {
    premises: [
      '1. P→(Q→R)',
      '2. P∧Q'
    ],
    conclusion: 'R',
    steps: [
      {prompt: 'Which rule extracts P and Q from P∧Q?', answer: 'Conjunction Elimination', feedback: 'Conjunction Elimination splits P∧Q.'},
      {prompt: 'Which rule gives Q→R from P→(Q→R) and P?', answer: 'Modus Ponens', feedback: 'Using Modus Ponens yields Q→R.'},
      {prompt: 'Which rule derives R from Q→R and Q?', answer: 'Modus Ponens', feedback: 'Modus Ponens derives R.'}
    ]
  }
];

let exIndex = 0;
let stepIndex = 0;

function reveal(id) {
  const el = document.getElementById(id);
  if (el) {
    el.classList.remove('hidden');
    el.hidden = false;
  }
}

function toggleDisplay(id) {
  const el = document.getElementById(id);
  if (el) {
    const hide = !el.classList.contains('hidden');
    if (hide) {
      el.classList.add('hidden');
      el.hidden = true;
    } else {
      el.classList.remove('hidden');
      el.hidden = false;
    }
  }
}

function startExamples() {
  document.getElementById('part1').classList.add('hidden');
  document.getElementById('part1').hidden = true;
  document.getElementById('part2').classList.remove('hidden');
  document.getElementById('part2').hidden = false;
  exIndex = 0;
  stepIndex = 0;
  showStep();
}

document.getElementById('start-examples').addEventListener('click', startExamples);

document.getElementById('next-step').addEventListener('click', () => {
  stepIndex++;
  if (stepIndex >= examples[exIndex].steps.length) {
    exIndex++;
    stepIndex = 0;
    if (exIndex >= examples.length) {
      startPart3();
      return;
    }
  }
  showStep();
});

function showStep() {
  const ex = examples[exIndex];
  const step = ex.steps[stepIndex];
  const info = document.getElementById('example-info');
  info.innerHTML = `<p><strong>Premises:</strong><br>${ex.premises.join('<br>')}<br><strong>Conclusion:</strong> ${ex.conclusion}</p><p>${step.prompt}</p>`;
  const optsDiv = document.getElementById('options');
  optsDiv.innerHTML = '';
  rules.forEach(rule => {
    const btn = document.createElement('button');
    btn.className = 'option-btn';
    btn.innerText = rule;
    btn.addEventListener('click', () => checkRule(rule));
    optsDiv.appendChild(btn);
  });
  document.getElementById('example-feedback').classList.add('hidden');
  document.getElementById('example-feedback').hidden = true;
  document.getElementById('next-step').classList.add('hidden');
  document.getElementById('next-step').hidden = true;
}

function checkRule(choice) {
  const step = examples[exIndex].steps[stepIndex];
  const fb = document.getElementById('example-feedback');
  if (choice === step.answer) {
    fb.textContent = `Correct! ✅ ${step.feedback}`;
    fb.style.color = '#4caf50';
    document.getElementById('next-step').classList.remove('hidden');
    document.getElementById('next-step').hidden = false;
  } else {
    fb.textContent = 'Incorrect.';
    fb.style.color = '#c62828';
  }
  fb.classList.remove('hidden');
  fb.hidden = false;
}

function startPart3() {
  document.getElementById('part2').classList.add('hidden');
  document.getElementById('part2').hidden = true;
  document.getElementById('part3').classList.remove('hidden');
  document.getElementById('part3').hidden = false;
  if (typeof showNextActivity === 'function') {
    showNextActivity('logic');
  }
}

window.addEventListener('DOMContentLoaded', () => {
  // no-op placeholder to ensure script runs after DOM ready
});
