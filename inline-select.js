// Handles topic dropdown toggling and exam selection on index.html

document.querySelectorAll('#topic-selector .topic-btn').forEach(topicBtn => {
  topicBtn.addEventListener('click', () => {
    const dropdown = topicBtn.nextElementSibling;
    // Close other dropdowns
    document.querySelectorAll('#topic-selector .exam-dropdown').forEach(dd => {
      if (dd !== dropdown) dd.classList.add('hidden');
    });
    dropdown.classList.toggle('hidden');
  });
});

// When an exam button is clicked, load questions and reveal the board

let selectedTopic = '';
let selectedExam = '';

const modeModal = document.getElementById('mode-modal');
const multiModal = document.getElementById('multi-modal');
const playerCount = document.getElementById('player-count');
const nameFields = document.getElementById('name-fields');

function showModeModal(topic, exam) {
  selectedTopic = topic;
  selectedExam = exam;
  modeModal.classList.remove('hidden');
}

function startSelectedGame(mode, names = []) {
  modeModal.classList.add('hidden');
  multiModal.classList.add('hidden');
  startGame(mode, names);
  document.getElementById('topic-selector').classList.add('hidden');
  document.getElementById('jeopardy-board').classList.remove('hidden');
  document.getElementById('scoreboard').classList.remove('hidden');
  loadQuestions(selectedTopic, selectedExam);
}

function updateNameFields() {
  const count = Math.min(Math.max(parseInt(playerCount.value) || 2, 2), 4);
  nameFields.innerHTML = '';
  for (let i = 1; i <= count; i++) {
    const input = document.createElement('input');
    input.type = 'text';
    input.placeholder = `Player ${i} name`;
    nameFields.appendChild(input);
  }
}

playerCount.addEventListener('input', updateNameFields);
updateNameFields();

document.getElementById('single-mode').onclick = () => startSelectedGame('single');
document.getElementById('bot-mode').onclick = () => startSelectedGame('bot');
document.getElementById('multi-mode').onclick = () => {
  modeModal.classList.add('hidden');
  multiModal.classList.remove('hidden');
};

document.getElementById('start-multi').onclick = () => {
  const names = Array.from(nameFields.querySelectorAll('input')).map((i, idx) => i.value || `Player ${idx+1}`);
  startSelectedGame('multi', names);
};

document.querySelectorAll('#topic-selector .exam-dropdown button').forEach(examBtn => {
  examBtn.addEventListener('click', () => {
    const examType = examBtn.dataset.exam;
    const topic = examBtn.closest('.course').querySelector('.topic-btn').dataset.topic;
    showModeModal(topic, examType);
  });
});

// Home button returns to topic selection

const quitModal = document.getElementById('quit-modal');

function goHome() {
  document.getElementById('jeopardy-board').classList.add('hidden');
  document.getElementById('topic-selector').classList.remove('hidden');
  document.getElementById('question-modal').classList.add('hidden');
  document.getElementById('celebration-modal').classList.add('hidden');
  document.getElementById('scoreboard').classList.add('hidden');
  document.getElementById('instructions').scrollIntoView();
}

document.getElementById('home-btn').addEventListener('click', () => {
  if (!document.getElementById('jeopardy-board').classList.contains('hidden')) {
    quitModal.classList.remove('hidden');
  } else {
    goHome();
  }
});

document.getElementById('quit-yes').onclick = () => {
  quitModal.classList.add('hidden');
  goHome();
};

document.getElementById('quit-no').onclick = () => {
  quitModal.classList.add('hidden');
};
