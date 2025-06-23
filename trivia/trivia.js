const triviaQuestions = flashcards;

let currentTrivia = [];
let triviaIndex = 0;
let optionIndex = 0;
let questionsAnswered = 0;

function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}

function loadTrivia(course) {
  if (!triviaQuestions[course]) return;
  currentTrivia = Object.values(triviaQuestions[course]).flat();
  shuffle(currentTrivia);
  triviaIndex = 0;
  questionsAnswered = 0;
  const share = document.getElementById('trivia-share');
  if (share) share.classList.add('hidden');
  document.getElementById('trivia-game').classList.remove('hidden');   document.getElementById('trivia-game').hidden = false;
  showTriviaQuestion();
}

function buildChoices(correct) {
  const answers = currentTrivia.map(q => q.answer);
  const others = answers.filter(a => a !== correct);
  shuffle(others);
  const choices = others.slice(0, 3).concat(correct);
  shuffle(choices);
  return choices;
}

function showTriviaQuestion() {
  if (!currentTrivia.length) return;
  const q = currentTrivia[triviaIndex];
  document.getElementById('trivia-question').innerText = q.question;
  const optionsDiv = document.getElementById('trivia-options');
  optionsDiv.innerHTML = '';
  const choices = buildChoices(q.answer);
  optionIndex = 0;
  choices.forEach((ans, idx) => {
    const btn = document.createElement('button');
    btn.className = 'option-btn';
    btn.innerText = ans;
    btn.onclick = () => submitTrivia(ans);
    btn.tabIndex = idx === 0 ? 0 : -1;
    optionsDiv.appendChild(btn);
  });
  document.getElementById('trivia-feedback').classList.add('hidden');   document.getElementById('trivia-feedback').hidden = true;
  document.getElementById('trivia-next').classList.add('hidden');   document.getElementById('trivia-next').hidden = true;
}

function submitTrivia(choice) {
  const q = currentTrivia[triviaIndex];
  const feedback = document.getElementById('trivia-feedback');
  if (choice === q.answer) {
    feedback.innerText = 'Correct!';
    feedback.style.color = '#4caf50';
  } else {
    feedback.innerText = `Nope! The correct answer is ${q.answer}.`;
    feedback.style.color = '#c62828';
  }
  feedback.classList.remove('hidden');   feedback.hidden = false;
  document.getElementById('trivia-next').classList.remove('hidden');   document.getElementById('trivia-next').hidden = false;
  questionsAnswered++;
  if (questionsAnswered >= currentTrivia.length) {
    const share = document.getElementById('trivia-share');
    if (share) {
      share.classList.remove('hidden');
      share.hidden = false;
    }
  }
}

document.getElementById('trivia-next').addEventListener('click', () => {
  triviaIndex = (triviaIndex + 1) % currentTrivia.length;
  showTriviaQuestion();
});

// Keyboard navigation for options
document.addEventListener('keydown', (e) => {
  const game = document.getElementById('trivia-game');
  if (game.classList.contains('hidden')) return;
  const buttons = Array.from(document.querySelectorAll('#trivia-options button'));
  if (!buttons.length) return;
  if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
    optionIndex = (optionIndex + 1) % buttons.length;
    buttons.forEach((b, i) => { b.tabIndex = i === optionIndex ? 0 : -1; });
    buttons[optionIndex].focus();
    e.preventDefault();
  } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
    optionIndex = (optionIndex - 1 + buttons.length) % buttons.length;
    buttons.forEach((b, i) => { b.tabIndex = i === optionIndex ? 0 : -1; });
    buttons[optionIndex].focus();
    e.preventDefault();
  } else if (e.key === 'Enter') {
    buttons[optionIndex].click();
  }
});

document.getElementById('trivia-course').addEventListener('change', e => {
  const course = e.target.value;
  if (course) {
    loadTrivia(course);
  } else {
    document.getElementById('trivia-game').classList.add('hidden');     document.getElementById('trivia-game').hidden = true;
  }
});

function getParam(name) {
  const params = new URLSearchParams(window.location.search);
  return params.get(name);
}

window.addEventListener('DOMContentLoaded', () => {
  const course = getParam('course');
  if (course) {
    const select = document.getElementById('trivia-course');
    select.value = course;
    loadTrivia(course);
  }

  const copy = document.getElementById('trivia-copy');
  if (copy) {
    copy.addEventListener('click', () => {
      navigator.clipboard.writeText(window.location.href);
    });
  }

  const share = document.getElementById('trivia-web-share');
  if (share) {
    share.addEventListener('click', () => {
      if (navigator.share) {
        navigator.share({ url: window.location.href });
      } else if (copy) {
        navigator.clipboard.writeText(window.location.href);
      }
    });
  }
});
