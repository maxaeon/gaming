// Handles topic dropdown toggling and exam selection on index.html

document.querySelectorAll('#topic-selector .topic-btn').forEach(topicBtn => {
  const dropdown = topicBtn.nextElementSibling;
  topicBtn.setAttribute('aria-expanded', 'false');
  topicBtn.addEventListener('click', () => {
    // Close other dropdowns
    document.querySelectorAll('#topic-selector .exam-dropdown').forEach(dd => {
      if (dd !== dropdown) {
        dd.classList.add('hidden');
        const btn = dd.previousElementSibling;
        if (btn) btn.setAttribute('aria-expanded', 'false');
      }
    });
    dropdown.classList.toggle('hidden');
    topicBtn.setAttribute('aria-expanded', String(!dropdown.classList.contains('hidden')));
  });
});

// When an exam button is clicked, load questions and reveal the board

let selectedTopic = '';
let selectedExam = '';

const modeModal = document.getElementById('mode-modal');
const singleNameInput = document.getElementById('single-name');
const multiModal = document.getElementById('multi-modal');
const playerCount = document.getElementById('player-count');
const nameFields = document.getElementById('name-fields');
const quitModal = document.getElementById('quit-modal');
let pendingAction = null;

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
  document.getElementById('game-board').classList.remove('hidden');
  document.getElementById('scoreboard').classList.remove('hidden');
  document.getElementById('progress').classList.remove('hidden');
  document.getElementById('quote-game').classList.add('hidden');
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

document.getElementById('single-mode').onclick = () => {
  const name = singleNameInput.value.trim() || 'Player 1';
  startSelectedGame('single', [name]);
};
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
    const action = () => { goHome(); showModeModal(topic, examType); };
    if (!document.getElementById('game-board').classList.contains('hidden')) {
      pendingAction = action;
      quitModal.classList.remove('hidden');
    } else {
      action();
    }
  });
});

// Home button returns to topic selection

function goHome() {
  document.getElementById('game-board').classList.add('hidden');
  document.getElementById('topic-selector').classList.remove('hidden');
  document.getElementById('question-modal').classList.add('hidden');
  document.getElementById('celebration-modal').classList.add('hidden');
  document.getElementById('scoreboard').classList.add('hidden');
  document.getElementById('progress').classList.add('hidden');
  document.getElementById('quote-game').classList.remove('hidden');
  if (typeof showRandomQuote === 'function') showRandomQuote();
  document.querySelectorAll('#topic-selector .exam-dropdown').forEach(dd => dd.classList.add('hidden'));
  document.getElementById('instructions').scrollIntoView();
}

document.getElementById('home-link').addEventListener('click', (e) => {
  if (!document.getElementById('game-board').classList.contains('hidden')) {
    e.preventDefault();
    pendingAction = () => { window.location.href = '../index.html'; };
    quitModal.classList.remove('hidden');
  } else {
    // allow normal navigation to the homepage
  }
});

document.getElementById('quit-yes').onclick = () => {
  quitModal.classList.add('hidden');
  if (pendingAction) {
    const action = pendingAction;
    pendingAction = null;
    action();
  } else {
    goHome();
  }
};

document.getElementById('quit-no').onclick = () => {
  quitModal.classList.add('hidden');
};

// Hide the board before caching so it doesn't reappear when returning
window.addEventListener("pagehide", goHome);
// Also reset when the page is shown again from the back/forward cache
window.addEventListener("pageshow", goHome);

// Ensure the game closes when the page is hidden or unloaded
document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    goHome();
  }
});
window.addEventListener('beforeunload', goHome);
