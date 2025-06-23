const sections = ['intro','thesis-screen','body1','body2','body3','conclusion','references','revision-demo','template'];

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

document.querySelectorAll('.detail-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const detail = btn.nextElementSibling;
    if (detail) {
      detail.classList.toggle('hidden');
      detail.hidden = detail.classList.contains('hidden');
    }
    btn.innerText = detail.classList.contains('hidden') ? 'Show Details' : 'Hide Details';
  });
});

document.getElementById('revise-btn').addEventListener('click', () => {
  const updated = document.getElementById('revise-updated');
  const note = document.getElementById('revise-note');
  if (updated) {
    updated.classList.remove('hidden');
    updated.hidden = false;
  }
  if (note) {
    note.classList.remove('hidden');
    note.hidden = false;
  }
});

function addBodySection() {
  const container = document.getElementById('body-sections');
  const div = document.createElement('div');
  div.className = 'body-section';
  div.innerHTML = `<label>Topic Sentence:</label><br>
  <textarea class="topic-input" rows="2" style="width:90%;"></textarea><br>
  <label>Supporting Details and Evidence (from textbook/course materials):</label><br>
  <textarea class="detail-input" rows="3" style="width:90%;"></textarea>`;
  container.appendChild(div);
}

document.getElementById('add-body').addEventListener('click', addBodySection);

function gatherDraft() {
  const thesis = document.getElementById('user-thesis').value.trim();
  const conclusion = document.getElementById('user-conclusion').value.trim();
  const refs = document.getElementById('user-references').value.trim().split(/\n+/);
  const bodies = Array.from(document.querySelectorAll('#body-sections .body-section')).map(sec => {
    return {
      topic: sec.querySelector('.topic-input').value.trim(),
      detail: sec.querySelector('.detail-input').value.trim()
    };
  });
  return { thesis, bodies, conclusion, refs };
}

function exportDocx() {
  const { Document, Packer, Paragraph } = window.docx;
  const data = gatherDraft();
  const doc = new Document();
  const children = [new Paragraph(data.thesis)];
  data.bodies.forEach(b => {
    children.push(new Paragraph(b.topic));
    children.push(new Paragraph(b.detail));
  });
  children.push(new Paragraph(data.conclusion));
  if (data.refs.length) {
    children.push(new Paragraph('References:'));
    data.refs.forEach(r => children.push(new Paragraph(r)));
  }
  doc.addSection({ children });
  Packer.toBlob(doc).then(blob => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'draft.docx';
    a.click();
    URL.revokeObjectURL(url);
  });
}

function exportPdf() {
  const { jsPDF } = window.jspdf;
  const data = gatherDraft();
  const doc = new jsPDF();
  let y = 10;
  doc.text(data.thesis, 10, y); y += 10;
  data.bodies.forEach(b => {
    doc.text(b.topic, 10, y); y += 10;
    doc.text(b.detail, 10, y); y += 10;
  });
  doc.text(data.conclusion, 10, y); y += 10;
  if (data.refs.length) {
    doc.text('References:', 10, y); y += 10;
    data.refs.forEach(r => { doc.text(r, 10, y); y += 10; });
  }
  doc.save('draft.pdf');
}

document.getElementById('export-docx').addEventListener('click', exportDocx);
document.getElementById('export-pdf').addEventListener('click', exportPdf);

window.addEventListener('DOMContentLoaded', () => showSection('intro'));
