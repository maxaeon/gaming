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

document.getElementById('example-show').addEventListener('click', () => {
  const list = document.getElementById('example-answer');
  list.innerHTML = '';
  const items = [
    'Clarity of Thesis: Introduce Kant\'s categorical imperative directly.',
    'Argument Development: Contrast Kant\'s view with situations that require exceptions.',
    'Use of Examples/Evidence: Mention the murderer-at-the-door scenario.',
    'Citation Accuracy: Provide a citation from Kant\'s <em>Groundwork</em>.'
  ];
  items.forEach(t => {
    const li = document.createElement('li');
    li.innerHTML = t;
    list.appendChild(li);
  });
  list.classList.remove('hidden');   list.hidden = false;
});

document.getElementById('practice-show').addEventListener('click', () => {
  const list = document.getElementById('practice-answer');
  list.innerHTML = '';
  const items = [
    'Clarity of Thesis: The thesis is clear but could reference the categorical imperative explicitly.',
    'Argument Development: Explain Kant\'s view first, then show why it fails with the murderer example.',
    'Use of Examples/Evidence: Expand on the Nazi-at-the-door case and cite the textbook.',
    'Citation Accuracy: Include page references to Kant\'s text.'
  ];
  items.forEach(t => {
    const li = document.createElement('li');
    li.innerText = t;
    list.appendChild(li);
  });
  list.classList.remove('hidden');   list.hidden = false;
});

function downloadTemplate() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  let y = 10;
  doc.text('Peer Review Template', 10, y); y += 10;
  doc.text('Reviewed Text Excerpt:', 10, y); y += 20;
  doc.text('Clarity of Thesis:', 10, y); y += 10;
  doc.text('Argument Development:', 10, y); y += 10;
  doc.text('Use of Examples/Evidence:', 10, y); y += 10;
  doc.text('Citation Accuracy:', 10, y); y += 10;
  doc.text('Additional Suggestions:', 10, y);
  doc.save('peer-review-template.pdf');
}

document.getElementById('download-template').addEventListener('click', downloadTemplate);

window.addEventListener('DOMContentLoaded', () => showSection('intro'));
