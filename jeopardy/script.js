let currentQuestions = {};
let remainingQuestions = 0;
let totalQuestions = 0;
let players = [];
let currentPlayerIndex = 0;
let maxPossibleScore = 0;

function buildChoices(correct) {
  const answers = Object.values(currentQuestions)
    .flat()
    .map(q => q.answer);
  const others = answers.filter(a => a !== correct);

  let filtered = others;
  if (typeof looksLikePerson === 'function' && looksLikePerson(correct)) {
    const names = others.filter(a => looksLikePerson(a));
    if (names.length >= 3) {
      filtered = names;
    }
  }

  shuffle(filtered);
  const choices = filtered.slice(0, 3).concat(correct);
  shuffle(choices);
  return choices;
}

const vulgarWords = ['fuck', 'shit', 'bitch', 'asshole', 'dick', 'crap'];
function containsVulgarity(text) {
  return new RegExp(`\\b(${vulgarWords.join('|')})\\b`, 'i').test(text);
}

// Topic buttons no longer load questions directly. Exam selection is handled
// via inline dropdowns on the main page, but this remains here in case new
// elements need to call `loadQuestions` without specifying an exam type.

// Load questions for a topic and optional exam type. If the exam specific
// question set does not exist, fall back to the generic set for that topic.
function loadQuestions(topic, examType = '') {
  const key = `${topic}${examType}Questions`;
  currentQuestions = window[key] || window[`${topic}Questions`] || {};
  buildBoard();
}

function startGame(mode, names = []) {
  players = [];
  if (mode === 'multi') {
    const count = Math.min(Math.max(names.length || 2, 2), 4);
    for (let i = 0; i < count; i++) {
      const name = names[i] || `Player ${i + 1}`;
      players.push({ name, score: 0 });
    }
  } else {
    const name = names[0] || 'Player 1';
    players.push({ name, score: 0 });
  }
  currentPlayerIndex = 0;
  document.getElementById('scoreboard').classList.remove('hidden');   document.getElementById('scoreboard').hidden = false;
  updateScoreboard();
}

function updateScoreboard() {
  const sb = document.getElementById('scoreboard');
  sb.innerHTML = '';

  players.forEach((p, idx) => {
    if (idx > 0) {
      sb.appendChild(document.createTextNode(' | '));
    }

    const playerSpan = document.createElement('span');
    playerSpan.className = 'player-score';
    playerSpan.dataset.index = idx;

    const nameSpan = document.createElement('span');
    const prefix = idx === currentPlayerIndex ? '\u2192 ' : '';
    nameSpan.textContent = `${prefix}${p.name}:`;

    const decBtn = document.createElement('button');
    decBtn.className = 'decrement';
    decBtn.dataset.index = idx;
    decBtn.textContent = '-';

    const scoreSpan = document.createElement('span');
    scoreSpan.className = 'score';
    scoreSpan.dataset.index = idx;
    scoreSpan.textContent = p.score;

    const incBtn = document.createElement('button');
    incBtn.className = 'increment';
    incBtn.dataset.index = idx;
    incBtn.textContent = '+';

    playerSpan.appendChild(nameSpan);
    playerSpan.appendChild(document.createTextNode(' '));
    playerSpan.appendChild(decBtn);
    playerSpan.appendChild(document.createTextNode(' '));
    playerSpan.appendChild(scoreSpan);
    playerSpan.appendChild(document.createTextNode(' '));
    playerSpan.appendChild(incBtn);

    sb.appendChild(playerSpan);
  });
}

function nextPlayer() {
  currentPlayerIndex = (currentPlayerIndex + 1) % players.length;
  updateScoreboard();
}

function buildBoard() {
  const board = document.getElementById('game-board');
  board.innerHTML = '';
  const categories = Object.keys(currentQuestions);
  board.style.gridTemplateColumns = `repeat(${categories.length}, 1fr)`;
  remainingQuestions = 0;
  totalQuestions = 0;
  maxPossibleScore = 0;

  // header row
  categories.forEach(cat => {
    const header = document.createElement('div');
    header.className = 'board-header';
    header.innerText = cat;
    board.appendChild(header);
  });

  const pointLevels = [100, 200, 300, 400, 500];
  pointLevels.forEach(value => {
    categories.forEach(cat => {
      const q = currentQuestions[cat].find(item => item.points === value);
      const cell = document.createElement('div');
      cell.className = 'board-cell';
      cell.innerText = value;
      if (q) {
        cell.onclick = () => showQuestion(q, cell);
        remainingQuestions++;
        totalQuestions++;
        maxPossibleScore += q.points;
      } else {
        cell.classList.add('hidden');         cell.hidden = true;
      }
      board.appendChild(cell);
    });
  });

  const progressEl = document.getElementById('progress');
  if (progressEl) {
    progressEl.style.width = '0%';
    progressEl.classList.remove('hidden');     progressEl.hidden = false;
  }
}

function showQuestion(questionObj, cell) {
  cell.classList.add('hidden');   cell.hidden = true;
  const modal = document.getElementById('question-modal');
  modal.classList.remove('hidden');   modal.hidden = false;
  document.getElementById('question-text').innerText = questionObj.question;

  const cancelBtn = document.getElementById('cancel-btn');
  const optionsDiv = document.getElementById('question-options');
  const feedback = document.getElementById('question-feedback');
  const nextBtn = document.getElementById('question-next');

  optionsDiv.innerHTML = '';
  feedback.classList.add('hidden');   feedback.hidden = true;
  nextBtn.classList.add('hidden');   nextBtn.hidden = true;

  buildChoices(questionObj.answer).forEach(ans => {
    const btn = document.createElement('button');
    btn.className = 'option-btn';
    btn.innerText = ans;
    btn.onclick = () => {
      Array.from(optionsDiv.children).forEach(b => b.disabled = true);
      if (ans === questionObj.answer) {
        feedback.innerText = 'Correct!';
        feedback.style.color = '#4caf50';
        const current = players[currentPlayerIndex];
        current.score += questionObj.points;
        updateScoreboard();
      } else {
        feedback.innerText = `Nope, the correct answer is ${questionObj.answer}.`;
        feedback.style.color = '#c62828';
      }
      feedback.classList.remove('hidden');   feedback.hidden = false;
      nextBtn.classList.remove('hidden');   nextBtn.hidden = false;
    };
    optionsDiv.appendChild(btn);
  });

  cancelBtn.classList.remove('hidden');   cancelBtn.hidden = false;
  cancelBtn.onclick = () => cancelQuestion(cell);
  nextBtn.onclick = () => closeQuestionModal();
}

function closeQuestionModal() {
  const modal = document.getElementById('question-modal');
  const modalContent = document.getElementById('modal-content');
  modal.classList.add('hidden');   modal.hidden = true;
  modal.classList.remove('fade-out');
  modalContent.classList.remove('answer-correct', 'answer-wrong');
  document.getElementById('correct-answer').classList.add('hidden');   document.getElementById('correct-answer').hidden = true;
  document.getElementById('cancel-btn').classList.add('hidden');   document.getElementById('cancel-btn').hidden = true;
  document.getElementById('question-options').innerHTML = '';
  document.getElementById('question-feedback').classList.add('hidden');   document.getElementById('question-feedback').hidden = true;
  document.getElementById('question-next').classList.add('hidden');   document.getElementById('question-next').hidden = true;
  remainingQuestions--;
  const progressEl = document.getElementById('progress');
  if (progressEl && totalQuestions > 0) {
    const answered = totalQuestions - remainingQuestions;
    const percent = (answered / totalQuestions) * 100;
    progressEl.style.width = `${percent}%`;
  }
  nextPlayer();

  if (remainingQuestions === 0) {
    const share = document.getElementById('share-controls');
    if (share) {
      share.classList.remove('hidden');
      share.hidden = false;
    }
    document.getElementById('celebration-modal').classList.remove('hidden');     document.getElementById('celebration-modal').hidden = false;
  }
}

function cancelQuestion(cell) {
  document.getElementById('question-modal').classList.add('hidden');   document.getElementById('question-modal').hidden = true;
  document.getElementById('correct-answer').classList.add('hidden');   document.getElementById('correct-answer').hidden = true;
  document.getElementById('cancel-btn').classList.add('hidden');   document.getElementById('cancel-btn').hidden = true;
  document.getElementById('question-options').innerHTML = '';
  document.getElementById('question-feedback').classList.add('hidden');   document.getElementById('question-feedback').hidden = true;
  document.getElementById('question-next').classList.add('hidden');   document.getElementById('question-next').hidden = true;
  cell.classList.remove('hidden');   cell.hidden = false;
}

document.getElementById('restart-btn').onclick = () => {
  document.getElementById('celebration-modal').classList.add('hidden');   document.getElementById('celebration-modal').hidden = true;
  const share = document.getElementById('share-controls');
  if (share) share.classList.add('hidden');
  players.forEach(p => p.score = 0);
  updateScoreboard();
  buildBoard();
};

// Adjust scores using the scoreboard buttons
document.getElementById('scoreboard').addEventListener('click', (e) => {
  if (!e.target.dataset.index) return;
  const idx = parseInt(e.target.dataset.index, 10);
  const current = players[idx];

  if (e.target.classList.contains('increment')) {
    current.score += 100;
  } else if (e.target.classList.contains('decrement')) {
    current.score = Math.max(0, current.score - 100);
  }

  updateScoreboard();
});

const copyBtn = document.getElementById('copy-link');
if (copyBtn) {
  copyBtn.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
    } catch (err) {
      alert('Failed to copy link.');
    }
  });
}

const shareBtn = document.getElementById('web-share');
if (shareBtn) {
  shareBtn.addEventListener('click', async () => {
    try {
      if (navigator.share) {
        await navigator.share({ url: window.location.href });
      } else if (copyBtn) {
        await navigator.clipboard.writeText(window.location.href);
      }
    } catch (err) {
      alert('Failed to share link.');
    }
  });
}
