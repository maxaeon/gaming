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

function toggleExample() {
  const btn = document.getElementById('example-btn');
  const list = document.getElementById('hint-text');
  if (list.classList.contains('hidden')) {
    showExample();
    btn.textContent = 'Hide Example Outline';
  } else {
    list.classList.add('hidden');
    list.hidden = true;
    btn.textContent = 'Show Example Outline';
  }
}

document.getElementById('example-btn').addEventListener('click', toggleExample);

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
  window.location.href = 'outline-worksheet.html';
});

document.getElementById('open-draft-dev').addEventListener('click', () => {
  window.location.href = 'draft-development.html';
});

