let currentQuestions = {};
let remainingQuestions = 0;

// Load selected topic questions
document.querySelectorAll('#topic-selector button').forEach(btn => {
  btn.onclick = () => {
    loadQuestions(btn.dataset.topic);
  };
});

function loadQuestions(topic) {
  currentQuestions = window[`${topic}Questions`];
  buildBoard();
}

function buildBoard() {
  const board = document.getElementById('jeopardy-board');
  board.innerHTML = '';
  remainingQuestions = 0;

  Object.keys(currentQuestions).forEach(category => {
    currentQuestions[category].forEach(q => {
      const cell = document.createElement('div');
      cell.className = 'jeopardy-cell';
      cell.innerText = `${category}: ${q.points}`;
      cell.onclick = () => showQuestion(q, cell);
      board.appendChild(cell);
      remainingQuestions++;
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

  document.getElementById('submit-answer').onclick = () => {
    const userAns = document.getElementById('user-answer').value.trim().toLowerCase();
    const correctAns = questionObj.answer.trim().toLowerCase();

    if (userAns === correctAns) {
      closeQuestionModal();
    } else {
      document.getElementById('correct-answer').classList.remove('hidden');
      document.getElementById('override-btn').classList.remove('hidden');
      document.getElementById('close-modal').classList.remove('hidden');
    }
  };

  document.getElementById('override-btn').onclick = closeQuestionModal;
  document.getElementById('close-modal').onclick = closeQuestionModal;
}

function closeQuestionModal() {
  document.getElementById('question-modal').classList.add('hidden');
  document.getElementById('correct-answer').classList.add('hidden');
  document.getElementById('override-btn').classList.add('hidden');
  document.getElementById('close-modal').classList.add('hidden');
  remainingQuestions--;

  if (remainingQuestions === 0) {
    document.getElementById('celebration-modal').classList.remove('hidden');
  }
}

document.getElementById('restart-btn').onclick = () => {
  document.getElementById('celebration-modal').classList.add('hidden');
  buildBoard();
};
