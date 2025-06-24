const rounds = [
  {
    label: 'Opening Statements',
    prompt: 'Write a brief (2–3 sentences) opening statement clearly stating your position.'
  },
  {
    label: 'Supporting Evidence',
    prompt: 'Provide one specific example or credible piece of evidence supporting your position. Include a reference or source if possible.'
  },
  {
    label: 'Rebuttal Round',
    prompt: 'Directly respond to your opponent\u2019s previous claims. Clearly address their strongest argument.'
  },
  {
    label: 'Closing Statements',
    prompt: 'Summarize your key points succinctly, restating clearly why your position is stronger.'
  }
];

const aiResponses = {
  pro: [
    'Social media gives voice to marginalized communities, dramatically increasing diversity in public conversations.',
    'According to Pew Research (2020), social media enables political engagement for 68% of users.',
    'While misinformation exists, AI tools increasingly help reduce its spread significantly.',
    'Despite challenges, social media ultimately provides essential platforms for diverse voices and public debate.'
  ],
  con: [
    'Social media contributes heavily to misinformation, ultimately harming productive public dialogue.',
    'Research indicates around 40% of misinformation spread on social media remains uncorrected (MIT, 2018).',
    'AI moderation systems currently fail to identify nuanced misinformation consistently.',
    'Social media\u2019s negative effects on discourse\u2014such as misinformation and polarization\u2014outweigh its benefits.'
  ]
};

let stance = 'pro';
let opponent = 'ai';
let roundIndex = 0;
const transcript = [];
const scores = { clarity: [], evidence: [], engagement: [], logic: [] };

function startDebate() {
  const stanceInput = document.querySelector('input[name="stance"]:checked');
  const oppInput = document.querySelector('input[name="opponent"]:checked');
  if (stanceInput) stance = stanceInput.value;
  if (oppInput) opponent = oppInput.value;
  document.getElementById('setup').classList.add('hidden');
  document.getElementById('setup').hidden = true;
  showRound();
  const debate = document.getElementById('debate');
  debate.classList.remove('hidden');
  debate.hidden = false;
}

document.getElementById('begin-btn').addEventListener('click', startDebate);

document.getElementById('submit-btn').addEventListener('click', submitRound);

document.getElementById('next-round').addEventListener('click', nextRound);

document.getElementById('export-pdf').addEventListener('click', exportPdf);

function showRound() {
  const r = rounds[roundIndex];
  document.getElementById('round-label').innerText = r.label;
  document.getElementById('round-prompt').innerText = r.prompt;
  document.getElementById('user-input').value = '';
  hideElement('opponent-response');
  hideElement('feedback');
  hideElement('next-round');
  updateProgress();
}

function submitRound() {
  const input = document.getElementById('user-input');
  const text = input.value.trim();
  if (!text) return;
  let opp = '';
  if (opponent === 'ai') {
    const arr = stance === 'pro' ? aiResponses.con : aiResponses.pro;
    opp = arr[roundIndex] || '';
  } else {
    opp = prompt('Opponent response:') || '';
  }
  const oppEl = document.getElementById('opponent-response');
  oppEl.innerText = opp;
  showElement('opponent-response');

  const fb = generateFeedback(text, opp);
  displayFeedback(fb);
  transcript.push({ label: rounds[roundIndex].label, user: text, opponent: opp, feedback: fb });

  showElement('next-round');
}

function generateFeedback(text, opp) {
  const clarity = text.length > 30 ? 4 : 2;
  const evidence = /(\d|study|research|because|for example|according)/i.test(text) ? 4 : 2;
  const engagement = opp && /(you|your|opponent|they)/i.test(text) ? 4 : 2;
  const logic = /(therefore|thus|hence|because|since)/i.test(text) ? 4 : 2;
  scores.clarity.push(clarity);
  scores.evidence.push(evidence);
  scores.engagement.push(engagement);
  scores.logic.push(logic);
  return { clarity, evidence, engagement, logic };
}

function feedbackLine(label, val) {
  return val >= 4 ? `${label}: Excellent!` : val >= 3 ? `${label}: Good.` : `${label}: Needs improvement.`;
}

function displayFeedback(fb) {
  const lines = [
    feedbackLine('Claim Clarity', fb.clarity),
    feedbackLine('Use of Evidence', fb.evidence),
    feedbackLine('Engagement', fb.engagement),
    feedbackLine('Logic and Coherence', fb.logic)
  ];
  const div = document.getElementById('feedback');
  div.innerHTML = lines.join('<br>');
  showElement('feedback');
}

function nextRound() {
  roundIndex++;
  if (roundIndex < rounds.length) {
    showRound();
  } else {
    showScore();
  }
}

function updateProgress() {
  const percent = (roundIndex / rounds.length) * 100;
  document.getElementById('debate-progress').style.width = `${percent}%`;
}

function showScore() {
  hideElement('debate');
  const table = document.getElementById('score-table');
  table.innerHTML = '';
  const head = document.createElement('tr');
  head.innerHTML = '<th>Category</th><th>Points</th>';
  table.appendChild(head);
  const totals = {};
  ['clarity','evidence','engagement','logic'].forEach(k => {
    const avg = Math.round(scores[k].reduce((a,b)=>a+b,0) / scores[k].length);
    totals[k] = avg;
    const tr = document.createElement('tr');
    tr.innerHTML = `<td>${k.charAt(0).toUpperCase()+k.slice(1)}</td><td>${avg}</td>`;
    table.appendChild(tr);
  });
  const totalPoints = Object.values(totals).reduce((a,b)=>a+b,0);
  const trTotal = document.createElement('tr');
  trTotal.innerHTML = `<td>Total</td><td>${totalPoints}</td>`;
  table.appendChild(trTotal);
  showElement('score');
  showElement('reflection');
  updateProgress();
  showNextActivity('criticalThinking');
}

function exportPdf() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  let y = 10;
  doc.text('Debate Transcript', 10, y); y += 10;
  transcript.forEach(item => {
    doc.text(item.label, 10, y); y += 6;
    doc.text('You: ' + item.user, 10, y); y += 6;
    doc.text('Opponent: ' + item.opponent, 10, y); y += 8;
  });
  doc.text('Scores:', 10, y); y += 6;
  ['clarity','evidence','engagement','logic'].forEach(k => {
    const avg = Math.round(scores[k].reduce((a,b)=>a+b,0) / scores[k].length);
    doc.text(`${k}: ${avg}`, 10, y); y += 6;
  });
  doc.save('debate.pdf');
}

function hideElement(id) {
  const el = document.getElementById(id);
  el.classList.add('hidden');
  el.hidden = true;
}

function showElement(id) {
  const el = document.getElementById(id);
  el.classList.remove('hidden');
  el.hidden = false;
}

window.addEventListener('DOMContentLoaded', () => {
  updateProgress();
});
