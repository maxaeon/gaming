const pieces = [
  {
    text: 'Kant argues explicitly that moral rules must never admit exceptions, demonstrated clearly by his stance against lying even in extreme cases.',
    support: '(Kant, "On a Supposed Right to Lie from Philanthropy", 1797)',
    order: 0
  },
  {
    text: 'Moral decisions in real life often require flexibility and context sensitivity.',
    support: 'W.D. Ross, "The Right and the Good" (1930)',
    order: 1
  },
  {
    text: 'Rigid adherence to Kant\u2019s moral absolutism can lead to morally troubling outcomes, such as in Kant\u2019s famous Nazi-at-the-door scenario.',
    support: 'See Christine Korsgaard, "Creating the Kingdom of Ends" (1996)',
    order: 2
  },
  {
    text: 'Ethical decision-making must sometimes prioritize consequences over absolute rules to truly be morally good.',
    support: 'J.S. Mill, "Utilitarianism" (1863)',
    order: 3
  },
  {
    text: 'Therefore, Kant\u2019s insistence on exceptionless moral rules is overly rigid and problematic.',
    support: 'Balancing deontology with consequentialist concerns is recommended by many modern ethicists.',
    order: 4
  }
];

let pieceCounter = pieces.length - 1;
let draggedPiece = null;
let draggedOutline = null;


function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}

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

function prepareOutlineItem(li) {
  li.draggable = true;
  const btn = document.createElement('button');
  btn.textContent = '✕';
  btn.className = 'remove-btn';
  btn.onclick = () => li.remove();
  li.appendChild(btn);
  li.addEventListener('dragstart', e => {
    draggedOutline = li;
    e.dataTransfer.setData('text/plain', '');
  });
  li.addEventListener('dragend', () => draggedOutline = null);
}

function createOutlineItem(text) {
  const li = document.createElement('li');
  li.textContent = text;
  li.contentEditable = true;
  prepareOutlineItem(li);
  return li;
}

function handleOutlineDragOver(e) {
  e.preventDefault();
  const list = document.getElementById('my-outline');
  const target = e.target.closest('#my-outline li');
  if (!draggedOutline || !target || target === draggedOutline) return;
  const rect = target.getBoundingClientRect();
  const next = e.clientY > rect.top + rect.height / 2;
  list.insertBefore(draggedOutline, next ? target.nextSibling : target);
}

function initOutlineList() {
  const list = document.getElementById('my-outline');
  list.addEventListener('dragover', handleOutlineDragOver);
  list.addEventListener('drop', e => e.preventDefault());
  list.querySelectorAll('li').forEach(prepareOutlineItem);
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
  list.innerHTML = pieces
    .slice()
    .sort((a, b) => a.order - b.order)
    .map(p => `<li>${p.text}<br><em>${p.support}</em></li>`)
    .join('');
  list.classList.remove('hidden');   list.hidden = false;
}

document.getElementById('example-btn').addEventListener('click', showExample);

window.addEventListener('DOMContentLoaded', () => {
  shuffle(pieces);
  buildPieces();
  buildSlots();
  initOutlineList();
});

document.getElementById('add-piece').addEventListener('click', () => {
  const text = prompt('Enter block text:');
  if (text) {
    const id = 'piece-' + (++pieceCounter);
    const li = createPiece(text, id);
    document.getElementById('puzzle-pieces').appendChild(li);
  }
});

document.getElementById('start-project').addEventListener('click', () => {
  document.getElementById('project-area').classList.remove('hidden');   document.getElementById('project-area').hidden = false;
});

document.getElementById('add-outline-item').addEventListener('click', () => {
  document.getElementById('my-outline').appendChild(createOutlineItem('New point...'));
});

function resetOutline() {
  const list = document.getElementById('my-outline');
  list.innerHTML = '';
  for (let i = 0; i < 3; i++) {
    list.appendChild(createOutlineItem(`Point ${i + 1}...`));
  }
}

function exportOutlineDocx() {
  const { Document, Packer, Paragraph } = window.docx;
  const doc = new Document();
  const children = Array.from(document.querySelectorAll('#my-outline li')).map(li => {
    const clone = li.cloneNode(true);
    clone.querySelector('button')?.remove();
    return new Paragraph(clone.textContent.trim());
  });
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
  const doc = new jsPDF();
  const lines = Array.from(document.querySelectorAll('#my-outline li')).map(li => {
    const clone = li.cloneNode(true);
    clone.querySelector('button')?.remove();
    return clone.textContent.trim();
  });
  lines.forEach((line, i) => doc.text(line, 10, 10 + i * 10));
  doc.save('outline.pdf');
}

document.getElementById('reset-outline').addEventListener('click', resetOutline);
document.getElementById('export-outline').addEventListener('click', exportOutlineDocx);
document.getElementById('export-outline-pdf').addEventListener('click', exportOutlinePdf);
