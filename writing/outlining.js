const pieces = [
  { text: 'Kant argues explicitly that moral rules must never admit exceptions, demonstrated clearly by his stance against lying even in extreme cases.', order: 0 },
  { text: 'Moral decisions in real life often require flexibility and context sensitivity.', order: 1 },
  { text: 'Rigid adherence to Kant\u2019s moral absolutism can lead to morally troubling outcomes, such as in Kant\u2019s famous Nazi-at-the-door scenario.', order: 2 },
  { text: 'Ethical decision-making must sometimes prioritize consequences over absolute rules to truly be morally good.', order: 3 },
  { text: 'Therefore, Kant\u2019s insistence on exceptionless moral rules is overly rigid and problematic.', order: 4 }
];

const hints = [
  'Which piece introduces Kant\u2019s main idea clearly?',
  'Look for a piece that summarizes your argument explicitly at the end.'
];

function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}

function buildPieces() {
  const list = document.getElementById('puzzle-pieces');
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
    slots.appendChild(li);
  }
}

function handleDrop(e) {
  e.preventDefault();
  const id = e.dataTransfer.getData('text/plain');
  const piece = document.getElementById(id);
  if (!piece || this.childElementCount > 0) return;
  if (parseInt(piece.dataset.order) === parseInt(this.dataset.index)) {
    this.classList.add('correct');
    this.appendChild(piece);
    piece.draggable = false;
    piece.style.cursor = 'default';
    checkComplete();
  } else {
    this.classList.add('incorrect');
    piece.classList.add('shake');
    setTimeout(() => {
      this.classList.remove('incorrect');
      piece.classList.remove('shake');
    }, 500);
  }
}

function checkComplete() {
  const slots = document.querySelectorAll('.puzzle-slot');
  const done = Array.from(slots).every(s => s.classList.contains('correct'));
  if (done) {
    document.getElementById('congrats').innerText = '🎉 Congratulations! 🎉';
    document.getElementById('congrats').classList.remove('hidden');
    document.getElementById('reflection').classList.remove('hidden');
    document.getElementById('ai-partner').classList.remove('hidden');
    document.getElementById('summary').classList.remove('hidden');
  }
}

function showHint() {
  if (hints.length === 0) return;
  const text = hints.shift();
  const div = document.getElementById('hint-text');
  div.innerText = text;
  div.classList.remove('hidden');
}

document.getElementById('hint-btn').addEventListener('click', showHint);

window.addEventListener('DOMContentLoaded', () => {
  shuffle(pieces);
  buildPieces();
  buildSlots();
});
