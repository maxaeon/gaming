const examples = [
  'While Kant insists on absolute moral rules, real-world dilemmas show that consequences must sometimes override them.',
  'Kant\'s demand for exceptionless duties fails to account for morally relevant circumstances that can justify lying or self-defense.'
];

function evaluate(text) {
  const res = {
    clarity: text.length > 20 ? 'Generally clear.' : 'Too brief for clarity.',
    strength: /because|therefore|thus/.test(text.toLowerCase()) ? 'Provides some reasoning.' : 'Needs stronger justification.',
    conciseness: text.length > 120 ? 'Consider shortening for conciseness.' : 'Concise enough.',
    relevance: /kant|exceptionless|moral/.test(text.toLowerCase()) ? 'Stays on topic.' : 'Does not clearly address Kant.'
  };
  return res;
}

function showFeedback(res, elemId) {
  const div = document.getElementById(elemId);
  div.innerHTML = `<ul>` +
    `<li><strong>Clarity:</strong> ${res.clarity}</li>` +
    `<li><strong>Strength:</strong> ${res.strength}</li>` +
    `<li><strong>Conciseness:</strong> ${res.conciseness}</li>` +
    `<li><strong>Relevance:</strong> ${res.relevance}</li>` +
    `</ul>`;
  div.classList.remove('hidden');
}

function handleSubmit() {
  const text = document.getElementById('draft-input').value.trim();
  const res = evaluate(text);
  showFeedback(res, 'feedback');
  document.getElementById('revision-section').classList.remove('hidden');
}

function showExamples() {
  const div = document.getElementById('example');
  div.innerHTML = '<strong>Example Theses:</strong><ul>' +
    examples.map(t => `<li>${t}</li>`).join('') + '</ul>';
  div.classList.remove('hidden');
}

function handleRevision() {
  const text = document.getElementById('revision-input').value.trim();
  const res = evaluate(text);
  showFeedback(res, 'revision-feedback');
  document.getElementById('reflection').classList.remove('hidden');
}

document.getElementById('draft-submit').addEventListener('click', handleSubmit);
document.getElementById('show-example').addEventListener('click', showExamples);
document.getElementById('revise-submit').addEventListener('click', handleRevision);
