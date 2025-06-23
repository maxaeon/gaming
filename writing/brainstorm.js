const defaultConcepts = [
  'Moral Dilemmas (where rules conflict)',
  'Nazi-at-the-door scenario (Kant)',
  'Doctrine of double effect (Aquinas)',
  'Importance of Consequences',
  'Empathy and Compassion',
  'Individual Circumstances',
  'Practical Wisdom (Aristotle)',
  'Limitations of Universal Rules',
  'Human Flourishing (eudaimonia)',
  'Real-life Examples (self-defense, lying to protect others, etc.)',
  'Context Sensitivity',
  'Rigidity of Exceptionless Rules',
  'Ethical Flexibility',
  'Intention vs. Outcome'
];

function createNode(text, color = '#ce93d8') {
  const li = document.createElement('li');
  li.className = 'node';
  li.id = 'node-' + Math.random().toString(36).slice(2, 9);
  li.draggable = true;
  li.style.backgroundColor = color;
  li.dataset.color = color;
  li.innerHTML = `<span class="label">${text}</span><button class="delete">&times;</button>`;
  li.addEventListener('dragstart', e => {
    e.dataTransfer.setData('text/plain', li.id);
  });
  li.querySelector('.delete').addEventListener('click', e => {
    e.stopPropagation();
    li.remove();
  });
  li.addEventListener('dblclick', () => editNode(li));
  return li;
}

function addNode(text, color) {
  const pool = document.getElementById('concept-pool');
  pool.appendChild(createNode(text, color));
}

function addNodeFromInput() {
  const txt = document.getElementById('new-node-text');
  const color = document.getElementById('node-color').value;
  if (txt.value.trim()) {
    addNode(txt.value.trim(), color);
    txt.value = '';
  }
}

function editNode(li) {
  const label = li.querySelector('.label');
  const newText = prompt('Edit text', label.innerText);
  if (newText !== null) label.innerText = newText;
  const newColor = prompt('Enter color', li.dataset.color);
  if (newColor !== null) {
    li.style.backgroundColor = newColor;
    li.dataset.color = newColor;
  }
}

function makeDroppable(container) {
  container.addEventListener('dragover', e => e.preventDefault());
  container.addEventListener('drop', e => {
    e.preventDefault();
    const id = e.dataTransfer.getData('text/plain');
    const item = document.getElementById(id);
    if (item) container.appendChild(item);
  });
}

function buildPool() {
  defaultConcepts.forEach(text => addNode(text, '#ce93d8'));
}

function enableDrops() {
  makeDroppable(document.getElementById('concept-pool'));
  document.querySelectorAll('.drop-zone ul, #mindmap .cluster ul').forEach(makeDroppable);
}

document.getElementById('show-suggested').addEventListener('click', () => {
  const example =
    '<strong>Cluster 1: Problems with Absolute Rules</strong><ul>' +
    '<li>Moral Dilemmas (where rules conflict)</li>' +
    '<li>Nazi-at-the-door scenario (Kant)</li>' +
    '<li>Rigidity of Exceptionless Rules</li>' +
    '<li>Doctrine of double effect (Aquinas)</li></ul>' +
    '<strong>Cluster 2: Importance of Context and Consequences</strong><ul>' +
    '<li>Individual Circumstances</li>' +
    '<li>Importance of Consequences</li>' +
    '<li>Real-life Examples (self-defense, lying to protect others, etc.)</li>' +
    '<li>Context Sensitivity</li></ul>' +
    '<strong>Cluster 3: Alternative Moral Considerations</strong><ul>' +
    '<li>Empathy and Compassion</li>' +
    '<li>Practical Wisdom (Aristotle)</li>' +
    '<li>Human Flourishing (eudaimonia)</li>' +
    '<li>Intention vs. Outcome</li>' +
    '<li>Ethical Flexibility</li></ul>';
  const div = document.getElementById('suggested');
  div.innerHTML = example;
  div.classList.remove('hidden');
});

window.addEventListener('DOMContentLoaded', () => {
  buildPool();
  enableDrops();
  document.getElementById('add-node').addEventListener('click', addNodeFromInput);
});

// Project mode
document.getElementById('start-project').addEventListener('click', () => {
  document.getElementById('project-area').classList.remove('hidden');
});

function resetMindMap() {
  document.querySelectorAll('#mindmap .cluster ul').forEach(ul => ul.innerHTML = '');
}

function exportMindMap() {
  const area = document.getElementById('mindmap');
  html2canvas(area).then(canvas => {
    canvasToImage(canvas, { name: 'mindmap', type: 'png', quality: 1 });
  });
}

function exportMindMapPDF() {
  const area = document.getElementById('mindmap');
  html2canvas(area).then(canvas => {
    const imgData = canvas.toDataURL('image/png');
    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF({ orientation: 'landscape' });
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save('mindmap.pdf');
  });
}

document.getElementById('reset-mindmap').addEventListener('click', resetMindMap);
document.getElementById('export-mindmap').addEventListener('click', exportMindMap);
document.getElementById('export-pdf').addEventListener('click', exportMindMapPDF);
