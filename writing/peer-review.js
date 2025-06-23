const sections = ['intro','example','practice','reflect','template'];

function showSection(id) {
  sections.forEach(sec => {
    const el = document.getElementById(sec);
    if (el) el.classList.add('hidden');     if (el) el.hidden = true;
  });
  const target = document.getElementById(id);
  if (target) target.classList.remove('hidden');   if (target) target.hidden = false;
}

document.querySelectorAll('.next-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const next = btn.dataset.next;
    if (next) showSection(next);
  });
});

const analysisItems = [
  '<strong>Feedback on Thesis Clarity:</strong> The thesis ("Kant\u2019s theory has some problems because it doesn\u2019t consider real-life complexities") is present but vague. Consider revising to clearly state your argument, such as: "Kant\u2019s moral absolutism is inadequate for real-world moral decision-making because it rigidly ignores context and consequences."',
  '<strong>Feedback on Argument Structure:</strong> You briefly explain Kant\u2019s theory in paragraph one, which is good, but you jump quickly to criticisms without enough supporting detail. A stronger structure would clearly separate Kant\u2019s views from your critique and support those criticisms with detailed examples.',
  '<strong>Feedback on Citation Use:</strong> You provide Kant\u2019s murderer-at-the-door scenario without citing the original source. An accurate citation helps build credibility.',
  '<strong>Feedback on Use of Questions:</strong> Avoid rhetorical questions and instead clearly assert your position with reasons.',
  '<strong>Additional Suggestions:</strong> Strengthen your conclusion by explicitly summarizing your key criticisms of Kant.',
  '<em>APA Example:</em> Kant, I. (1797/1996). <em>The Metaphysics of Morals</em>. Cambridge University Press.',
  '<em>MLA Example:</em> Kant, Immanuel. <em>The Metaphysics of Morals</em>. Translated by Mary Gregor, Cambridge UP, 1996.'
];

function toggleAnalysis(btnId, listId) {
  const btn = document.getElementById(btnId);
  const list = document.getElementById(listId);
  if (!btn || !list) return;
  btn.addEventListener('click', () => {
    if (list.classList.contains('hidden')) {
      list.innerHTML = '';
      analysisItems.forEach(t => {
        const li = document.createElement('li');
        li.innerHTML = t;
        list.appendChild(li);
      });
      list.classList.remove('hidden');
      list.hidden = false;
      btn.innerText = 'Hide Analysis';
    } else {
      list.classList.add('hidden');
      list.hidden = true;
      btn.innerText = 'Show Analysis';
    }
  });
}

toggleAnalysis('analysis-toggle', 'analysis-list');
toggleAnalysis('practice-show', 'practice-answer');

function downloadTemplate() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  let y = 10;
  doc.setFontSize(14);
  doc.text('Peer Review Form', 10, y); y += 12;
  doc.setFontSize(12);
  const fields = [
    'Reviewed Text Title:',
    'Clarity of Thesis:',
    'Argument Development:',
    'Use of Examples/Evidence:',
    'Citation Accuracy:',
    'Additional Suggestions:'
  ];
  fields.forEach(f => {
    doc.text(f, 10, y); y += 8;
    doc.line(10, y, 200, y); y += 12;
  });
  doc.save('peer-review-form.pdf');
}

document.getElementById('download-template').addEventListener('click', downloadTemplate);

window.addEventListener('DOMContentLoaded', () => showSection('intro'));
