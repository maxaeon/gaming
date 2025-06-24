function toggleCell(cell) {
  if (cell.textContent === 'T') {
    cell.textContent = 'F';
  } else if (cell.textContent === 'F') {
    cell.textContent = '';
  } else {
    cell.textContent = 'T';
  }
}

function classify(values) {
  const allTrue = values.every(v => v);
  const allFalse = values.every(v => !v);
  if (allTrue) return 'This statement is a tautology.';
  if (allFalse) return 'This statement is a contradiction.';
  return 'This statement is contingent.';
}

function buildTruthTable(containerId, vars, formulaLabel, compute) {
  const container = document.getElementById(containerId);
  const table = document.createElement('table');
  table.className = 'truth-table';
  const header = document.createElement('tr');
  vars.forEach(v => {
    const th = document.createElement('th');
    th.textContent = v;
    header.appendChild(th);
  });
  const resTh = document.createElement('th');
  resTh.textContent = formulaLabel;
  header.appendChild(resTh);
  table.appendChild(header);
  const rows = Math.pow(2, vars.length);
  const cells = [];
  for (let i = 0; i < rows; i++) {
    const tr = document.createElement('tr');
    const assignment = {};
    const index = rows - 1 - i;
    vars.forEach((v, idx) => {
      const bit = (index >> (vars.length - idx - 1)) & 1;
      assignment[v] = !!bit;
      const td = document.createElement('td');
      td.textContent = bit ? 'T' : 'F';
      tr.appendChild(td);
    });
    const td = document.createElement('td');
    td.className = 'editable';
    td.addEventListener('click', () => toggleCell(td));
    tr.appendChild(td);
    table.appendChild(tr);
    cells.push({cell: td, assignment});
  }
  const btn = document.createElement('button');
  btn.textContent = 'Check';
  const fb = document.createElement('div');
  fb.className = 'feedback hidden';
  fb.hidden = true;
  btn.addEventListener('click', () => {
    let correct = true;
    const results = [];
    cells.forEach(({cell, assignment}) => {
      const expected = compute(assignment);
      const val = cell.textContent === 'T';
      results.push(val);
      if (val !== expected) correct = false;
    });
    fb.textContent = correct ? 'Correct! ' + classify(results) : 'Some values are incorrect.';
    fb.style.color = correct ? '#4caf50' : '#c62828';
    fb.classList.remove('hidden');
    fb.hidden = false;
    if (typeof showNextActivity === 'function' && correct && containerId === 'validity') {
      showNextActivity(getCourse ? getCourse() : '');
    }
  });
  container.appendChild(table);
  container.appendChild(btn);
  container.appendChild(fb);
}

function buildValidityTable(containerId, vars, premises, conclusion) {
  const container = document.getElementById(containerId);
  const table = document.createElement('table');
  table.className = 'truth-table';
  const header = document.createElement('tr');
  vars.concat(premises.map(p => p.label)).concat([conclusion.label]).forEach(l => {
    const th = document.createElement('th');
    th.textContent = l;
    header.appendChild(th);
  });
  table.appendChild(header);
  const rows = Math.pow(2, vars.length);
  const cells = [];
  for (let i = 0; i < rows; i++) {
    const tr = document.createElement('tr');
    const assign = {};
    const index = rows - 1 - i;
    vars.forEach((v, idx) => {
      const bit = (index >> (vars.length - idx - 1)) & 1;
      assign[v] = !!bit;
      const td = document.createElement('td');
      td.textContent = bit ? 'T' : 'F';
      tr.appendChild(td);
    });
    premises.forEach(() => {
      const td = document.createElement('td');
      td.className = 'editable';
      td.addEventListener('click', () => toggleCell(td));
      tr.appendChild(td);
      cells.push({type: 'premise', cell: td, assign});
    });
    const conclCell = document.createElement('td');
    conclCell.className = 'editable';
    conclCell.addEventListener('click', () => toggleCell(conclCell));
    tr.appendChild(conclCell);
    cells.push({type: 'conclusion', cell: conclCell, assign});
    table.appendChild(tr);
  }
  const btn = document.createElement('button');
  btn.textContent = 'Check';
  const fb = document.createElement('div');
  fb.className = 'feedback hidden';
  fb.hidden = true;
  btn.addEventListener('click', () => {
    let correct = true;
    let valid = true;
    let idx = 0;
    for (let i = 0; i < rows; i++) {
      const assignment = cells[idx].assign;
      const premiseVals = premises.map(p => p.compute(assignment));
      const allPremTrue = premiseVals.every(v => v);
      for (let j = 0; j < premiseVals.length; j++) {
        const val = cells[idx].cell.textContent === 'T';
        if (val !== premiseVals[j]) correct = false;
        idx++;
      }
      const conclExpected = conclusion.compute(assignment);
      const conclVal = cells[idx].cell.textContent === 'T';
      if (conclVal !== conclExpected) correct = false;
      if (allPremTrue && !conclVal) valid = false;
      idx++;
    }
    const msg = correct ? (valid ? 'Correct! The argument is valid.' : 'Correct! The argument is invalid.') : 'Some values are incorrect.';
    fb.textContent = msg;
    fb.style.color = correct ? '#4caf50' : '#c62828';
    fb.classList.remove('hidden');
    fb.hidden = false;
    if (correct) {
      if (typeof showNextActivity === 'function') {
        showNextActivity(getCourse ? getCourse() : '');
      }
    }
  });
  container.appendChild(table);
  container.appendChild(btn);
  container.appendChild(fb);
}

function setupSymbolization() {
  document.querySelectorAll('.symbolize').forEach(div => {
    const answer = div.dataset.answer;
    const fb = div.querySelector('.mc-feedback');
    div.querySelectorAll('.option-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const correct = btn.textContent.trim() === answer;
        fb.textContent = correct ? 'Correct!' : `Nope! The correct symbolization is ${answer}.`;
        fb.style.color = correct ? '#4caf50' : '#c62828';
        fb.classList.remove('hidden');
        fb.hidden = false;
        div.querySelectorAll('.option-btn').forEach(b => b.disabled = true);
      });
    });
  });
  const next = document.getElementById('start-tables');
  if (next) next.addEventListener('click', () => {
    window.location.href = 'truth-tables.html';
  });
}

function setupTables() {
  if (!document.getElementById('table-1')) return;
  buildTruthTable('table-1', ['P'], 'P ∨ ¬P', a => a.P || !a.P);
  buildTruthTable('table-2', ['P'], 'P ∧ ¬P', a => a.P && !a.P);
  buildTruthTable('table-3', ['P','Q'], '¬(P ∧ Q)', a => !(a.P && a.Q));
  buildValidityTable('validity', ['P','Q'], [
    {label: 'P ⊃ Q', compute: a => !a.P || a.Q},
    {label: 'P', compute: a => a.P}
  ], {label: 'Q', compute: a => a.Q});
  const back = document.getElementById('back-symbolization');
  if (back) back.addEventListener('click', () => {
    window.location.href = 'symbolization.html';
  });
}

window.addEventListener('DOMContentLoaded', () => {
  setupSymbolization();
  setupTables();
});
