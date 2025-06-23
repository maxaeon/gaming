const sections = ['intro','example','practice','reflect','template'];

function showSection(id) {
  sections.forEach(sec => {
    const el = document.getElementById(sec);
    if (el) el.classList.add('hidden');
  });
  const target = document.getElementById(id);
  if (target) target.classList.remove('hidden');
}

document.querySelectorAll('.next-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const next = btn.dataset.next;
    if (next) showSection(next);
  });
});

document.getElementById('example-show').addEventListener('click', () => {
  const ans = '<strong>Feedback Example:</strong> This paragraph could be stronger with a clearer topic sentence mentioning Kant\'s categorical imperative and a brief example like the Nazi-at-the-door scenario.';
  const p = document.getElementById('example-answer');
  p.innerHTML = ans;
  p.classList.remove('hidden');
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
  list.classList.remove('hidden');
});

function gatherReview() {
  return {
    excerpt: document.getElementById('template-excerpt').value.trim(),
    thesis: document.querySelector('[data-key=thesis]').value.trim(),
    argument: document.querySelector('[data-key=argument]').value.trim(),
    evidence: document.querySelector('[data-key=evidence]').value.trim(),
    citation: document.querySelector('[data-key=citation]').value.trim(),
    extra: document.querySelector('[data-key=extra]').value.trim()
  };
}

function exportDocx() {
  const { Document, Packer, Paragraph } = window.docx;
  const data = gatherReview();
  const doc = new Document();
  const children = [];
  if (data.excerpt) {
    children.push(new Paragraph('Reviewed Text:'), new Paragraph(data.excerpt));
  }
  children.push(
    new Paragraph('Clarity of Thesis: ' + data.thesis),
    new Paragraph('Argument Development: ' + data.argument),
    new Paragraph('Use of Examples/Evidence: ' + data.evidence),
    new Paragraph('Citation Accuracy: ' + data.citation)
  );
  if (data.extra) children.push(new Paragraph('Additional Suggestions: ' + data.extra));
  doc.addSection({ children });
  Packer.toBlob(doc).then(blob => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'peer-review.docx';
    a.click();
    URL.revokeObjectURL(url);
  });
}

function exportPdf() {
  const { jsPDF } = window.jspdf;
  const data = gatherReview();
  const doc = new jsPDF();
  let y = 10;
  if (data.excerpt) {
    doc.text('Reviewed Text:', 10, y); y += 10;
    doc.text(data.excerpt, 10, y); y += 10;
  }
  doc.text('Clarity of Thesis: ' + data.thesis, 10, y); y += 10;
  doc.text('Argument Development: ' + data.argument, 10, y); y += 10;
  doc.text('Use of Examples/Evidence: ' + data.evidence, 10, y); y += 10;
  doc.text('Citation Accuracy: ' + data.citation, 10, y); y += 10;
  if (data.extra) { doc.text('Additional Suggestions: ' + data.extra, 10, y); }
  doc.save('peer-review.pdf');
}

document.getElementById('export-docx').addEventListener('click', exportDocx);
document.getElementById('export-pdf').addEventListener('click', exportPdf);

window.addEventListener('DOMContentLoaded', () => showSection('intro'));
