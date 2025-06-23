const sections = ['intro','thesis-screen','body1','body2','body3','conclusion','references','revision-demo','schedule'];

const categories = [
  { id: 'draft', label: 'Draft', color: '#2196f3' },
  { id: 'revise', label: 'Revise', color: '#4caf50' },
  { id: 'work', label: 'Work/Class', color: '#9e9e9e' }
];

function refreshLegend() {
  const legend = document.getElementById('legend');
  legend.innerHTML = '';
  categories.forEach(cat => {
    const span = document.createElement('span');
    span.className = `schedule-block ${cat.id}`;
    span.textContent = cat.label;
    span.style.backgroundColor = cat.color;
    legend.appendChild(span);
  });
}

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

function addBlock(container, start = '08:00', end = '09:00', type = categories[0].id) {
  const block = document.createElement('div');
  block.className = `schedule-block ${type}`;
  const opts = categories.map(c => `<option value="${c.id}">${c.label}</option>`).join('');
  block.innerHTML = `<input type="time" class="start" value="${start}"> - <input type="time" class="end" value="${end}">` +
    `<select class="activity">${opts}</select>` +
    ` <button class="remove-block">\u2715</button>`;
  const cat = categories.find(c => c.id === type);
  if (cat) block.style.backgroundColor = cat.color;
  const select = block.querySelector('select');
  select.value = type;
  select.addEventListener('change', () => {
    block.className = `schedule-block ${select.value}`;
    const c = categories.find(ct => ct.id === select.value);
    block.style.backgroundColor = c ? c.color : '';
  });
  block.querySelector('.remove-block').addEventListener('click', () => block.remove());
  container.appendChild(block);
}

function buildSchedule() {
  const days = parseInt(document.getElementById('num-days').value, 10);
  const container = document.getElementById('schedule-container');
  container.innerHTML = '';
  for (let i = 1; i <= days; i++) {
    const dayDiv = document.createElement('div');
    dayDiv.className = 'day-schedule';
    dayDiv.dataset.day = i;
    dayDiv.innerHTML = `<h3>Day ${i}</h3>`;
    const blocks = document.createElement('div');
    blocks.className = 'blocks-container';
    dayDiv.appendChild(blocks);
    const add = document.createElement('button');
    add.textContent = 'Add Block';
    add.className = 'add-block';
    add.addEventListener('click', () => addBlock(blocks));
    dayDiv.appendChild(add);
    container.appendChild(dayDiv);
  }
  refreshLegend();
  document.getElementById('legend').classList.remove('hidden');
  document.getElementById('legend').hidden = false;
  container.classList.remove('hidden');
  container.hidden = false;
  const btn = document.getElementById('export-schedule');
  btn.classList.remove('hidden');
  btn.hidden = false;
}

function addCategory() {
  const nameInput = document.getElementById('new-cat-name');
  const colorInput = document.getElementById('new-cat-color');
  const name = nameInput.value.trim();
  if (!name) return;
  const id = name.toLowerCase().replace(/\s+/g, '-');
  if (categories.some(c => c.id === id)) return;
  const color = colorInput.value || '#888888';
  categories.push({ id, label: name, color });
  document.querySelectorAll('.activity').forEach(sel => {
    const opt = document.createElement('option');
    opt.value = id;
    opt.textContent = name;
    sel.appendChild(opt);
  });
  refreshLegend();
  nameInput.value = '';
}

function exportSchedule() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  doc.text('Drafting Schedule', 10, 10);
  let y = 20;
  const days = document.querySelectorAll('.day-schedule');
  days.forEach(day => {
    const num = day.dataset.day;
    doc.text(`Day ${num}`, 10, y);
    y += 6;
    day.querySelectorAll('.schedule-block').forEach(block => {
      const start = block.querySelector('.start').value;
      const end = block.querySelector('.end').value;
      const typeId = block.querySelector('.activity').value;
      const cat = categories.find(c => c.id === typeId);
      const label = cat ? cat.label : typeId;
      doc.text(`  ${start}-${end} ${label}`, 12, y);
      y += 6;
    });
    y += 4;
  });
  doc.save('schedule.pdf');
}

document.getElementById('build-schedule').addEventListener('click', buildSchedule);
document.getElementById('export-schedule').addEventListener('click', exportSchedule);
document.getElementById('add-category').addEventListener('click', addCategory);

window.addEventListener('DOMContentLoaded', () => {
  showSection('intro');
  refreshLegend();
});
