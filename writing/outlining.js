const pieces = [
  {
    text: 'Introduction: Kant\u2019s moral absolutism is ethically problematic because it rigidly disregards context and consequences.',
    support: 'Thesis statement.',
    explanation: 'Opening establishes the main critique of strict moral rules.',
    order: 0
  },
  {
    text: 'Kant\u2019s ethics insists on universal, exceptionless moral rules.',
    support: 'Categorical imperative; duty and good will; universalizability (Kant, 1797/1996).',
    explanation: 'Summarizes Kant\u2019s foundational moral commitments.',
    order: 1
  },
  {
    text: 'Kant\u2019s absolute prohibition against lying demonstrates his theory\u2019s problematic rigidity.',
    support: 'Murderer-at-the-door scenario (Kant, 1797/1996, p. 552); critiques of strict absolutism (Vaughn, 2019).',
    explanation: 'Illustrates how blindly following rules can lead to immoral outcomes.',
    order: 2
  },
  {
    text: 'Moral reasoning requires considering context and outcomes, which Kant\u2019s theory neglects.',
    support: 'Lying to protect innocent life; virtue ethics (Aristotle, 350 BCE/2009) and care ethics (Noddings, 1984).',
    explanation: 'Highlights the need for flexibility and situational judgment.',
    order: 3
  },
  {
    text: 'Alternative ethical frameworks provide better guidance for complex situations.',
    support: 'Virtue ethics (Aristotle), utilitarianism (Mill, 1863/2001), and care ethics (Noddings, 1984).',
    explanation: 'Shows other approaches that consider character, outcomes, and relationships.',
    order: 4
  },
  {
    text: 'Conclusion: Kant\u2019s theory ultimately fails because rigid absolutism ignores morally relevant contexts.',
    support: 'Effective moral reasoning requires flexibility and practical wisdom.',
    explanation: 'Restates the thesis and final takeaway.',
    order: 5
  }
];

const references = [
  'Aristotle. (350 BCE/2009). Nicomachean Ethics (D. Ross, Trans.). Oxford University Press.',
  'Kant, I. (1797/1996). The Metaphysics of Morals (M. Gregor, Trans.). Cambridge University Press.',
  'Mill, J. S. (1863/2001). Utilitarianism (G. Sher, Ed.). Hackett Publishing.',
  'Noddings, N. (1984). Caring: A Feminine Approach to Ethics and Moral Education. University of California Press.',
  'Vaughn, L. (2019). Doing Ethics: Moral Reasoning and Contemporary Issues (6th ed.). W.W. Norton.'
];

let pieceCounter = pieces.length - 1;
let draggedPiece = null;



function createPiece(text, id) {
  const li = document.createElement('li');
  li.className = 'puzzle-piece';
  li.draggable = true;
  li.id = id;
  li.textContent = text;
  const remove = document.createElement('button');
  remove.textContent = '✕';
  remove.className = 'remove-btn';
  remove.onclick = () => removePiece(id);
  li.appendChild(remove);
  li.addEventListener('dragstart', e => {
    draggedPiece = li;
    e.dataTransfer.setData('text/plain', li.id);
  });
  li.addEventListener('dragend', () => draggedPiece = null);
  return li;
}

function buildPieces() {
  const list = document.getElementById('puzzle-pieces');
  list.addEventListener('dragover', handlePieceDragOver);
  list.addEventListener('drop', handleListDrop);
  pieces.forEach((p, idx) => {
    const li = createPiece(p.text, 'piece-' + idx);
    li.dataset.order = p.order;
    list.appendChild(li);
  });
}

function buildSlots() {
  const slots = document.getElementById('outline-slots');
  for (let i = 0; i < pieces.length; i++) {
    const li = document.createElement('li');
    li.className = 'puzzle-slot';
    li.dataset.index = i;
    li.addEventListener('dragover', e => e.preventDefault());
    li.addEventListener('drop', handleDrop);
    const notes = document.createElement('textarea');
    notes.rows = 4;
    notes.placeholder = 'Add explanation/support...';
    li.appendChild(notes);
    slots.appendChild(li);
  }
}

function handlePieceDragOver(e) {
  e.preventDefault();
  const list = document.getElementById('puzzle-pieces');
  const target = e.target.closest('.puzzle-piece');
  if (!draggedPiece || !target || target === draggedPiece || target.parentNode !== list) return;
  const rect = target.getBoundingClientRect();
  const next = e.clientY > rect.top + rect.height / 2;
  list.insertBefore(draggedPiece, next ? target.nextSibling : target);
}

function removePiece(id) {
  document.querySelectorAll('.puzzle-slot').forEach(slot => {
    const child = slot.querySelector('#' + id);
    if (child) child.remove();
  });
  const el = document.getElementById(id);
  if (el) el.remove();
}


function handleDrop(e) {
  e.preventDefault();
  const id = e.dataTransfer.getData('text/plain');
  const piece = document.getElementById(id);
  if (!piece) return;
  const notes = this.querySelector('textarea');
  this.insertBefore(piece, notes);
  checkComplete();
}

function handleListDrop(e) {
  e.preventDefault();
  const id = e.dataTransfer.getData('text/plain');
  const piece = document.getElementById(id);
  if (!piece) return;
  document.getElementById('puzzle-pieces').appendChild(piece);
  checkComplete();
}

function checkComplete() {
  const slots = document.querySelectorAll('.puzzle-slot');
  const done = Array.from(slots).every(s => s.querySelector('.puzzle-piece'));
  if (done) {
    document.getElementById('congrats').innerText = 'Outline complete!';
    document.getElementById('congrats').classList.remove('hidden');     document.getElementById('congrats').hidden = false;
    document.getElementById('summary').classList.remove('hidden');     document.getElementById('summary').hidden = false;
  }
}

function showExample() {
  const list = document.getElementById('hint-text');
  const outline = pieces
    .slice()
    .sort((a, b) => a.order - b.order)
    .map(p => `<li>${p.text}<br><em class="citation" title="${p.explanation ?? ''}">${p.support}</em></li>`)
    .join('');
  const refs = references.map(r => `<li>${r}</li>`).join('');
  list.innerHTML = `<h3>Example Outline: Kant\u2019s Moral Absolutism</h3><ol>${outline}</ol><h4>References</h4><ul>${refs}</ul>`;
  list.classList.remove('hidden');   list.hidden = false;
}

document.getElementById('example-btn').addEventListener('click', showExample);

window.addEventListener('DOMContentLoaded', () => {
  shuffle(pieces);
  buildPieces();
  buildSlots();
});

document.getElementById('add-piece').addEventListener('click', () => {
  const text = prompt('Enter block text:');
  if (text) {
    const id = 'piece-' + (++pieceCounter);
    const li = createPiece(text, id);
    document.getElementById('puzzle-pieces').appendChild(li);
  }
});

document.getElementById('outline-btn').addEventListener('click', () => {
  document.getElementById('outline-area').classList.remove('hidden');
  document.getElementById('outline-area').hidden = false;
});

document.getElementById('open-draft-dev').addEventListener('click', () => {
  window.location.href = 'draft-development.html';
});

document.getElementById('add-paragraph').addEventListener('click', () => {
  const div = document.createElement('div');
  div.className = 'body-section';
  div.innerHTML = `<label>Topic Sentence:</label><br>
  <textarea class="topic-input" rows="2" style="width:90%;"></textarea><br>
  <label>Supporting Details:</label><br>
  <textarea class="detail-input" rows="3" style="width:90%;"></textarea>`;
  document.getElementById('outline-body').appendChild(div);
});

function gatherOutline() {
  const thesis = document.getElementById('outline-thesis').value.trim();
  const conclusion = document.getElementById('outline-conclusion').value.trim();
  const refs = document.getElementById('outline-references').value.trim().split(/\n+/);
  const bodies = Array.from(document.querySelectorAll('#outline-body .body-section')).map(sec => {
    return {
      topic: sec.querySelector('.topic-input').value.trim(),
      detail: sec.querySelector('.detail-input').value.trim()
    };
  });
  return { thesis, bodies, conclusion, refs };
}

function exportOutlineDocx() {
  const { Document, Packer, Paragraph } = window.docx;
  const data = gatherOutline();
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
    a.download = 'outline.docx';
    a.click();
    URL.revokeObjectURL(url);
  });
}

function exportOutlinePdf() {
  const { jsPDF } = window.jspdf;
  const data = gatherOutline();
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
  doc.save('outline.pdf');
}

document.getElementById('export-outline-docx').addEventListener('click', exportOutlineDocx);
document.getElementById('export-outline-pdf').addEventListener('click', exportOutlinePdf);
