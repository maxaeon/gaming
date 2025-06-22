let currentQuestions = {};
let remainingQuestions = 0;
let players = [];
let currentPlayerIndex = 0;
let maxPossibleScore = 0;

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
  document.getElementById('scoreboard').classList.remove('hidden');
  updateScoreboard();
}

function updateScoreboard() {
  const sb = document.getElementById('scoreboard');
  sb.innerHTML = players
    .map((p, idx) => {
      const prefix = idx === currentPlayerIndex ? '&#8594; ' : '';
      return `<span class="player-score" data-index="${idx}">${prefix}${p.name}: <button class="decrement" data-index="${idx}">-</button> <span class="score" data-index="${idx}">${p.score}</span> <button class="increment" data-index="${idx}">+</button></span>`;
    })
    .join(' | ');
}

function nextPlayer() {
  currentPlayerIndex = (currentPlayerIndex + 1) % players.length;
  updateScoreboard();
}

function buildBoard() {
  const board = document.getElementById('jeopardy-board');
  board.innerHTML = '';
  const categories = Object.keys(currentQuestions);
  board.style.gridTemplateColumns = `repeat(${categories.length}, 1fr)`;
  remainingQuestions = 0;
  maxPossibleScore = 0;

  // header row
  categories.forEach(cat => {
    const header = document.createElement('div');
    header.className = 'jeopardy-header';
    header.innerText = cat;
    board.appendChild(header);
  });

  const pointLevels = [100, 200, 300, 400, 500];
  pointLevels.forEach(value => {
    categories.forEach(cat => {
      const q = currentQuestions[cat].find(item => item.points === value);
      const cell = document.createElement('div');
      cell.className = 'jeopardy-cell';
      cell.innerText = value;
      if (q) {
        cell.onclick = () => showQuestion(q, cell);
        remainingQuestions++;
        maxPossibleScore += q.points;
      } else {
        cell.classList.add('hidden');
      }
      board.appendChild(cell);
    });
  });
}

function showQuestion(questionObj, cell) {
  cell.classList.add('hidden');
  const modal = document.getElementById('question-modal');
  modal.classList.remove('hidden');
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

  userField.classList.remove('hidden');
  submitBtn.classList.remove('hidden');
  cancelBtn.classList.remove('hidden');
  submittedAnswerEl.classList.add('hidden');
  awardControls.classList.add('hidden');
  document.getElementById('correct-answer').classList.add('hidden');

  submitBtn.onclick = () => {
    const userAns = userField.value.trim();
    submittedAnswerEl.innerText = `Your answer: ${userAns || '[No answer]'}`;
    submittedAnswerEl.classList.remove('hidden');
    document.getElementById('correct-answer').classList.remove('hidden');
    submitBtn.classList.add('hidden');
    userField.classList.add('hidden');
    cancelBtn.classList.add('hidden');
    awardControls.classList.remove('hidden');

    awardYes.onclick = () => {
      const current = players[currentPlayerIndex];
      current.score += questionObj.points;
      updateScoreboard();
      closeQuestionModal();
    };

    awardNo.onclick = () => {
      closeQuestionModal();
    };
  };

  cancelBtn.onclick = () => cancelQuestion(cell);
}

function closeQuestionModal() {
  document.getElementById('question-modal').classList.add('hidden');
  document.getElementById('correct-answer').classList.add('hidden');
  document.getElementById('cancel-btn').classList.add('hidden');
  document.getElementById('submitted-answer').classList.add('hidden');
  document.getElementById('award-controls').classList.add('hidden');
  remainingQuestions--;
  nextPlayer();

  if (remainingQuestions === 0) {
    document.getElementById('celebration-modal').classList.remove('hidden');
  }
}

function cancelQuestion(cell) {
  document.getElementById('question-modal').classList.add('hidden');
  document.getElementById('correct-answer').classList.add('hidden');
  document.getElementById('submitted-answer').classList.add('hidden');
  document.getElementById('award-controls').classList.add('hidden');
  document.getElementById('cancel-btn').classList.add('hidden');
  cell.classList.remove('hidden');
}

document.getElementById('restart-btn').onclick = () => {
  document.getElementById('celebration-modal').classList.add('hidden');
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
