const sections = ['intro','thesis-screen','body1','body2','body3','conclusion','references','revision-demo','schedule'];

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

function addBlock(container, start = '08:00', end = '09:00', type = 'draft') {
  const block = document.createElement('div');
  block.className = `schedule-block ${type}`;
  block.innerHTML = `<input type="time" class="start" value="${start}"> - <input type="time" class="end" value="${end}">` +
    `<select class="activity"><option value="draft">Draft</option><option value="revise">Revise</option><option value="work">Work/Class</option></select>` +
    ` <button class="remove-block">\u2715</button>`;
  const select = block.querySelector('select');
  select.value = type;
  select.addEventListener('change', () => {
    block.className = `schedule-block ${select.value}`;
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
  document.getElementById('legend').classList.remove('hidden');
  document.getElementById('legend').hidden = false;
  container.classList.remove('hidden');
  container.hidden = false;
  const btn = document.getElementById('export-schedule');
  btn.classList.remove('hidden');
  btn.hidden = false;
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
      const type = block.querySelector('.activity').value;
      doc.text(`  ${start}-${end} ${type}`, 12, y);
      y += 6;
    });
    y += 4;
  });
  doc.save('schedule.pdf');
}

document.getElementById('build-schedule').addEventListener('click', buildSchedule);
document.getElementById('export-schedule').addEventListener('click', exportSchedule);

window.addEventListener('DOMContentLoaded', () => showSection('intro'));
