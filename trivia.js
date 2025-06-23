const triviaQuestions = flashcards;

let currentTrivia = [];
let triviaIndex = 0;

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
  document.getElementById('trivia-game').classList.remove('hidden');
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
  buildChoices(q.answer).forEach(ans => {
    const btn = document.createElement('button');
    btn.className = 'option-btn';
    btn.innerText = ans;
    btn.onclick = () => submitTrivia(ans);
    optionsDiv.appendChild(btn);
  });
  document.getElementById('trivia-feedback').classList.add('hidden');
  document.getElementById('trivia-next').classList.add('hidden');
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
  feedback.classList.remove('hidden');
  document.getElementById('trivia-next').classList.remove('hidden');
}

document.getElementById('trivia-next').addEventListener('click', () => {
  triviaIndex = (triviaIndex + 1) % currentTrivia.length;
  showTriviaQuestion();
});

document.getElementById('trivia-course').addEventListener('change', e => {
  const course = e.target.value;
  if (course) {
    loadTrivia(course);
  } else {
    document.getElementById('trivia-game').classList.add('hidden');
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
});
