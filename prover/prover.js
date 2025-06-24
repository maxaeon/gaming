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

const fillQuestions = [
  {prompt: 'From P and Q, derive P ___ Q (enter the connective).', answer: '∧'},
  {prompt: 'Given P→Q and P, fill in the conclusion:', answer: 'Q'},
  {prompt: 'From P∨Q and ¬P, conclude:', answer: 'Q'},
  {prompt: 'If P→(Q→R) and P∧Q, the final derived letter is:', answer: 'R'}
];

let mcStates = [];
let mcData = [];
let fillStates = [];

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

function buildMC() {
  const container = document.getElementById('mc-questions');
  container.innerHTML = '';
  mcData = [];
  mcStates = [];
  examples.forEach(ex => {
    ex.steps.forEach(step => {
      mcData.push({premises: ex.premises, conclusion: ex.conclusion, prompt: step.prompt, answer: step.answer, feedback: step.feedback});
    });
  });
  mcData.forEach((q, idx) => {
    mcStates.push(false);
    const div = document.createElement('div');
    div.className = 'rule';
    div.innerHTML = `<p><strong>Premises:</strong><br>${q.premises.join('<br>')}<br><strong>Conclusion:</strong> ${q.conclusion}</p><p>${q.prompt}</p>`;
    const opts = document.createElement('div');
    opts.className = 'mc-options';
    rules.forEach(rule => {
      const b = document.createElement('button');
      b.className = 'option-btn';
      b.innerText = rule;
      b.addEventListener('click', () => checkMC(idx, rule, opts, fb));
      opts.appendChild(b);
    });
    const fb = document.createElement('div');
    fb.className = 'hidden';
    fb.hidden = true;
    div.appendChild(opts);
    div.appendChild(fb);
    container.appendChild(div);
  });
  document.getElementById('mc-continue').classList.add('hidden');
  document.getElementById('mc-continue').hidden = true;
}

function checkMC(idx, choice, optsDiv, fb) {
  const q = mcData[idx];
  if (choice === q.answer) {
    fb.textContent = `Correct! ✅ ${q.feedback}`;
    fb.style.color = '#4caf50';
    mcStates[idx] = true;
  } else {
    fb.textContent = 'Incorrect.';
    fb.style.color = '#c62828';
  }
  fb.classList.remove('hidden');
  fb.hidden = false;
  Array.from(optsDiv.children).forEach(b => b.disabled = true);
  if (mcStates.every(Boolean)) {
    const btn = document.getElementById('mc-continue');
    btn.classList.remove('hidden');
    btn.hidden = false;
  }
}

function buildFill() {
  const container = document.getElementById('fill-questions');
  container.innerHTML = '';
  fillStates = [];
  fillQuestions.forEach((q, idx) => {
    fillStates.push(false);
    const div = document.createElement('div');
    div.className = 'rule';
    const p = document.createElement('p');
    p.innerText = q.prompt;
    const input = document.createElement('input');
    input.type = 'text';
    input.id = `fill-${idx}`;
    input.size = Math.max(1, q.answer.length);
    const btn = document.createElement('button');
    btn.innerText = 'Check';
    btn.addEventListener('click', () => checkFill(idx));
    const fb = document.createElement('span');
    fb.id = `fill-fb-${idx}`;
    fb.className = 'hidden';
    fb.hidden = true;
    div.append(p, input, btn, fb);
    container.appendChild(div);
  });
  document.getElementById('fill-continue').classList.add('hidden');
  document.getElementById('fill-continue').hidden = true;
}

function checkFill(idx) {
  const q = fillQuestions[idx];
  const val = document.getElementById(`fill-${idx}`).value.trim();
  const fb = document.getElementById(`fill-fb-${idx}`);
  if (val === q.answer) {
    fb.textContent = 'Correct!';
    fb.style.color = '#4caf50';
    fillStates[idx] = true;
    document.getElementById(`fill-${idx}`).disabled = true;
  } else {
    fb.textContent = 'Incorrect.';
    fb.style.color = '#c62828';
  }
  fb.classList.remove('hidden');
  fb.hidden = false;
  if (fillStates.every(Boolean)) {
    const btn = document.getElementById('fill-continue');
    btn.classList.remove('hidden');
    btn.hidden = false;
  }
}

function startExamples() {
  document.getElementById('part1').classList.add('hidden');
  document.getElementById('part1').hidden = true;
  document.getElementById('part2').classList.remove('hidden');
  document.getElementById('part2').hidden = false;
  buildMC();
}

document.getElementById('start-examples').addEventListener('click', startExamples);

document.getElementById('mc-continue').addEventListener('click', () => {
  document.getElementById('part2').classList.add('hidden');
  document.getElementById('part2').hidden = true;
  document.getElementById('part3').classList.remove('hidden');
  document.getElementById('part3').hidden = false;
  buildFill();
});

document.getElementById('fill-continue').addEventListener('click', () => {
  document.getElementById('part3').classList.add('hidden');
  document.getElementById('part3').hidden = true;
  document.getElementById('part4').classList.remove('hidden');
  document.getElementById('part4').hidden = false;
  if (typeof showNextActivity === 'function') {
    showNextActivity('logic');
  }
});

window.addEventListener('DOMContentLoaded', () => {
  // no-op placeholder to ensure script runs after DOM ready
});
