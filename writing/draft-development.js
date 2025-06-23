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

function buildSchedule() {
  const days = parseInt(document.getElementById('num-days').value, 10);
  const tbody = document.querySelector('#schedule-table tbody');
  tbody.innerHTML = '';
  for (let i = 1; i <= days; i++) {
    const tr = document.createElement('tr');
    tr.innerHTML = `<td>Day ${i}</td><td><input type="number" min="0" step="0.5"></td><td><input type="number" min="0" step="0.5"></td>`;
    tbody.appendChild(tr);
  }
  const table = document.getElementById('schedule-table');
  table.classList.remove('hidden');
  table.hidden = false;
  const btn = document.getElementById('export-schedule');
  btn.classList.remove('hidden');
  btn.hidden = false;
}

function exportSchedule() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  doc.text('Drafting Schedule', 10, 10);
  let y = 20;
  const rows = document.querySelectorAll('#schedule-table tbody tr');
  rows.forEach((row, i) => {
    const draft = row.cells[1].querySelector('input').value || '0';
    const rev = row.cells[2].querySelector('input').value || '0';
    doc.text(`Day ${i + 1}: draft ${draft}h, revise ${rev}h`, 10, y);
    y += 10;
  });
  doc.save('schedule.pdf');
}

document.getElementById('build-schedule').addEventListener('click', buildSchedule);
document.getElementById('export-schedule').addEventListener('click', exportSchedule);

window.addEventListener('DOMContentLoaded', () => showSection('intro'));
