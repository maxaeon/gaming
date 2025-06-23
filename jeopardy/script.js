let currentQuestions = {};
let remainingQuestions = 0;
let totalQuestions = 0;
let players = [];
let currentPlayerIndex = 0;
let maxPossibleScore = 0;

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
  document.getElementById('user-answer').value = '';
  document.getElementById('correct-answer').innerText = `Correct Answer: ${questionObj.answer}`;
  const userField = document.getElementById('user-answer');
  const submitBtn = document.getElementById('submit-answer');
  const cancelBtn = document.getElementById('cancel-btn');
  const submittedAnswerEl = document.getElementById('submitted-answer');
  const awardControls = document.getElementById('award-controls');
  const awardYes = document.getElementById('award-yes');
  const awardNo = document.getElementById('award-no');
  const modalContent = document.getElementById('modal-content');

  userField.classList.remove('hidden');   userField.hidden = false;
  submitBtn.classList.remove('hidden');   submitBtn.hidden = false;
  cancelBtn.classList.remove('hidden');   cancelBtn.hidden = false;
  submittedAnswerEl.classList.add('hidden');   submittedAnswerEl.hidden = true;
  awardControls.classList.add('hidden');   awardControls.hidden = true;
  document.getElementById('correct-answer').classList.add('hidden');   document.getElementById('correct-answer').hidden = true;

  submitBtn.onclick = () => {
    const userAns = userField.value.trim();
    let display = userAns || '[No answer]';
    if (containsVulgarity(userAns)) {
      display += ' \u2014 Just a friendly note: vulgar language rarely earns academic style points!';
    }
    submittedAnswerEl.innerText = `Your answer: ${display}`;
    submittedAnswerEl.classList.remove('hidden');     submittedAnswerEl.hidden = false;
    document.getElementById('correct-answer').classList.remove('hidden');     document.getElementById('correct-answer').hidden = false;
    submitBtn.classList.add('hidden');     submitBtn.hidden = true;
    userField.classList.add('hidden');     userField.hidden = true;
    cancelBtn.classList.add('hidden');     cancelBtn.hidden = true;
    awardControls.classList.remove('hidden');     awardControls.hidden = false;

    awardYes.onclick = () => {
      modalContent.classList.add('answer-correct');
      document.getElementById('question-modal').classList.add('fade-out');
      setTimeout(() => {
        const current = players[currentPlayerIndex];
        current.score += questionObj.points;
        updateScoreboard();
        closeQuestionModal();
      }, 400);
    };

    awardNo.onclick = () => {
      modalContent.classList.add('answer-wrong');
      document.getElementById('question-modal').classList.add('fade-out');
      setTimeout(() => {
        closeQuestionModal();
      }, 400);
    };
  };

  cancelBtn.onclick = () => cancelQuestion(cell);
}

function closeQuestionModal() {
  const modal = document.getElementById('question-modal');
  const modalContent = document.getElementById('modal-content');
  modal.classList.add('hidden');   modal.hidden = true;
  modal.classList.remove('fade-out');
  modalContent.classList.remove('answer-correct', 'answer-wrong');
  document.getElementById('correct-answer').classList.add('hidden');   document.getElementById('correct-answer').hidden = true;
  document.getElementById('cancel-btn').classList.add('hidden');   document.getElementById('cancel-btn').hidden = true;
  document.getElementById('submitted-answer').classList.add('hidden');   document.getElementById('submitted-answer').hidden = true;
  document.getElementById('award-controls').classList.add('hidden');   document.getElementById('award-controls').hidden = true;
  remainingQuestions--;
  const progressEl = document.getElementById('progress');
  if (progressEl && totalQuestions > 0) {
    const answered = totalQuestions - remainingQuestions;
    const percent = (answered / totalQuestions) * 100;
    progressEl.style.width = `${percent}%`;
  }
  nextPlayer();

  if (remainingQuestions === 0) {
    document.getElementById('celebration-modal').classList.remove('hidden');     document.getElementById('celebration-modal').hidden = false;
  }
}

function cancelQuestion(cell) {
  document.getElementById('question-modal').classList.add('hidden');   document.getElementById('question-modal').hidden = true;
  document.getElementById('correct-answer').classList.add('hidden');   document.getElementById('correct-answer').hidden = true;
  document.getElementById('submitted-answer').classList.add('hidden');   document.getElementById('submitted-answer').hidden = true;
  document.getElementById('award-controls').classList.add('hidden');   document.getElementById('award-controls').hidden = true;
  document.getElementById('cancel-btn').classList.add('hidden');   document.getElementById('cancel-btn').hidden = true;
  cell.classList.remove('hidden');   cell.hidden = false;
}

document.getElementById('restart-btn').onclick = () => {
  document.getElementById('celebration-modal').classList.add('hidden');   document.getElementById('celebration-modal').hidden = true;
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
