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

const vulgarWords = ['fuck', 'shit', 'bitch', 'asshole', 'dick', 'crap'];
function containsVulgarity(text) {
  return new RegExp(`\\b(${vulgarWords.join('|')})\\b`, 'i').test(text);
}

function showFeedback(res, elemId) {
  const div = document.getElementById(elemId);
  div.innerHTML = `<ul>` +
    `<li><strong>Clarity:</strong> ${res.clarity}</li>` +
    `<li><strong>Strength:</strong> ${res.strength}</li>` +
    `<li><strong>Conciseness:</strong> ${res.conciseness}</li>` +
    `<li><strong>Relevance:</strong> ${res.relevance}</li>` +
    `</ul>`;
  div.classList.remove('hidden');   div.hidden = false;
}

function handleSubmit() {
  const text = document.getElementById('draft-input').value.trim();
  const res = evaluate(text);
  showFeedback(res, 'feedback');
  if (containsVulgarity(text)) {
    const div = document.getElementById('feedback');
    div.innerHTML += '<p>Heads up! Colorful language isn\'t usually welcome in academic circles.</p>';
  }
  document.getElementById('revision-section').classList.remove('hidden');   document.getElementById('revision-section').hidden = false;
}

function showExamples() {
  const div = document.getElementById('example');
  div.innerHTML = '<strong>Example Theses:</strong><ul>' +
    examples.map(t => `<li>${t}</li>`).join('') + '</ul>';
  div.classList.remove('hidden');   div.hidden = false;
}

function handleRevision() {
  const text = document.getElementById('revision-input').value.trim();
  const res = evaluate(text);
  showFeedback(res, 'revision-feedback');
  if (containsVulgarity(text)) {
    const div = document.getElementById('revision-feedback');
    div.innerHTML += '<p>Remember: scholarly writing works best without vulgar words!</p>';
  }
  document.getElementById('reflection').classList.remove('hidden');   document.getElementById('reflection').hidden = false;
}

document.getElementById('draft-submit').addEventListener('click', handleSubmit);
document.getElementById('show-example').addEventListener('click', showExamples);
document.getElementById('revise-submit').addEventListener('click', handleRevision);

// Project mode
document.getElementById('start-project').addEventListener('click', () => {
  document.getElementById('project-area').classList.remove('hidden');   document.getElementById('project-area').hidden = false;
});

document.getElementById('reset-thesis').addEventListener('click', () => {
  document.getElementById('project-thesis').value = '';
});

document.getElementById('export-thesis').addEventListener('click', () => {
  const { Document, Packer, Paragraph } = window.docx;
  const doc = new Document();
  doc.addSection({ children: [ new Paragraph(document.getElementById('project-thesis').value) ] });
  Packer.toBlob(doc).then(blob => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'thesis.docx';
    a.click();
    URL.revokeObjectURL(url);
  });
});

function addPrompt(text = 'New prompt') {
  const container = document.getElementById('questions');
  const div = document.createElement('div');
  div.className = 'prompt';
  const label = document.createElement('label');
  label.contentEditable = 'true';
  label.innerText = text;
  const ta = document.createElement('textarea');
  ta.rows = 2;
  ta.className = 'answer';
  ta.style.width = '90%';
  div.append(label, document.createElement('br'), ta);
  container.appendChild(div);
}

document.getElementById('add-prompt').addEventListener('click', () => {
  const text = prompt('Enter a new prompt question:');
  if (text) addPrompt(text);
});

document.getElementById('export-all').addEventListener('click', () => {
  const { Document, Packer, Paragraph } = window.docx;
  const doc = new Document();
  const children = [new Paragraph(document.getElementById('project-thesis').value)];
  document.querySelectorAll('#questions .prompt').forEach(p => {
    const q = p.querySelector('label').innerText.trim();
    const a = p.querySelector('textarea').value.trim();
    children.push(new Paragraph(`${q} ${a}`));
  });
  doc.addSection({ children });
  Packer.toBlob(doc).then(blob => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'thesis-with-notes.docx';
    a.click();
    URL.revokeObjectURL(url);
  });
});
