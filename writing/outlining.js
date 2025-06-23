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


function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}

function buildPieces() {
  const list = document.getElementById('puzzle-pieces');
  list.addEventListener('dragover', e => e.preventDefault());
  list.addEventListener('drop', handleListDrop);
  pieces.forEach((p, idx) => {
    const li = document.createElement('li');
    li.innerText = p.text;
    li.className = 'puzzle-piece';
    li.draggable = true;
    li.id = 'piece-' + idx;
    li.dataset.order = p.order;
    li.addEventListener('dragstart', e => {
      e.dataTransfer.setData('text/plain', li.id);
    });
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
    document.getElementById('congrats').classList.remove('hidden');
    document.getElementById('summary').classList.remove('hidden');
  }
}

function showExample() {
  const list = document.getElementById('hint-text');
  list.innerHTML = pieces
    .slice()
    .sort((a, b) => a.order - b.order)
    .map(p => `<li>${p.text}<br><em>${p.support}</em></li>`)
    .join('');
  list.classList.remove('hidden');
}

document.getElementById('example-btn').addEventListener('click', showExample);

window.addEventListener('DOMContentLoaded', () => {
  shuffle(pieces);
  buildPieces();
  buildSlots();
});

document.getElementById('start-project').addEventListener('click', () => {
  document.getElementById('project-area').classList.remove('hidden');
});

function resetOutline() {
  document.querySelectorAll('#my-outline li').forEach(li => li.innerText = '');
}

function exportOutline() {
  const { Document, Packer, Paragraph } = window.docx;
  const doc = new Document();
  const children = Array.from(document.querySelectorAll('#my-outline li')).map(li => new Paragraph(li.innerText));
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

document.getElementById('reset-outline').addEventListener('click', resetOutline);
document.getElementById('export-outline').addEventListener('click', exportOutline);
