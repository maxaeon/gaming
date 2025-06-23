// Aggregate question sets into a single object keyed by course
function mergeSets(target, source) {
  Object.keys(source).forEach(cat => {
    if (!target[cat]) target[cat] = [];
    target[cat] = target[cat].concat(source[cat]);
  });
}

function buildFlashcards() {
  const courses = ['introPhilosophy', 'criticalThinking', 'ethics'];
  const flashcards = {};

  courses.forEach(course => {
    flashcards[course] = {};

    const customSet = window[`${course}Flashcards`];
    if (customSet) {
      mergeSets(flashcards[course], customSet);
      return;
    }

    const variants = [
      `${course}Questions`,
      `${course}MidtermQuestions`,
      `${course}FinalQuestions`
    ];

    variants.forEach(name => {
      const data = window[name];
      if (data) mergeSets(flashcards[course], data);
    });
  });

  return flashcards;
}

const flashcards = buildFlashcards();
if (typeof window !== 'undefined') {
  window.flashcards = flashcards;
}
let currentCards = [];
let cardIndex = 0;

function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}

function populateCategories(course) {
  const catSelect = document.getElementById('category-select');
  catSelect.innerHTML = '';
  if (!course || !flashcards[course]) {
    catSelect.disabled = true;
    return;
  }
  const cats = Object.keys(flashcards[course]);
  catSelect.appendChild(new Option('All', 'all'));
  cats.forEach(cat => catSelect.appendChild(new Option(cat, cat)));
  catSelect.disabled = false;
}

function loadCards(course, category = 'all') {
  if (!flashcards[course]) return;
  const allCards = category === 'all'
    ? Object.values(flashcards[course]).flat()
    : (flashcards[course][category] || []);
  currentCards = allCards.slice();
  shuffle(currentCards);
  cardIndex = 0;
  document.getElementById('flashcard').classList.remove('hidden');   document.getElementById('flashcard').hidden = false;
  loadCard();
}

function loadCard() {
  if (!currentCards.length) {
    document.getElementById('flashcard-question').innerText = 'No cards available.';
    document.getElementById('flashcard-answer').classList.add('hidden');     document.getElementById('flashcard-answer').hidden = true;
    return;
  }
  const card = currentCards[cardIndex];
  document.getElementById('flashcard-question').innerText = card.question;
  document.getElementById('flashcard-answer').innerText = card.answer;
  document.getElementById('flashcard-answer').classList.add('hidden');   document.getElementById('flashcard-answer').hidden = true;
}

function showAnswer() {
  document.getElementById('flashcard-answer').classList.remove('hidden');   document.getElementById('flashcard-answer').hidden = false;
}

function nextCard() {
  if (!currentCards.length) return;
  cardIndex = (cardIndex + 1) % currentCards.length;
  loadCard();
}

function prevCard() {
  if (!currentCards.length) return;
  cardIndex = (cardIndex - 1 + currentCards.length) % currentCards.length;
  loadCard();
}

function exportCards() {
  if (!currentCards.length) return;
  const format = prompt('Export as json or csv?', 'json');
  if (!format) return;
  let data, mime, ext;
  if (format.toLowerCase().startsWith('c')) {
    const rows = currentCards.map(c => {
      const q = '"' + c.question.replace(/"/g, '""') + '"';
      const a = '"' + c.answer.replace(/"/g, '""') + '"';
      return `${q},${a}`;
    });
    data = 'question,answer\n' + rows.join('\n');
    mime = 'text/csv';
    ext = 'csv';
  } else {
    data = JSON.stringify(currentCards, null, 2);
    mime = 'application/json';
    ext = 'json';
  }
  const blob = new Blob([data], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `flashcards.${ext}`;
  a.click();
  URL.revokeObjectURL(url);
}

function startQuiz() {
  const course = document.getElementById('course-select').value;
  const dest = course ? `../trivia/trivia.html?course=${course}` : '../trivia/trivia.html';
  window.location.href = dest;
}

document.getElementById('course-select').addEventListener('change', e => {
  const course = e.target.value;
  populateCategories(course);
  if (course) loadCards(course);
});

document.getElementById('category-select').addEventListener('change', e => {
  const course = document.getElementById('course-select').value;
  if (course) loadCards(course, e.target.value);
});

document.getElementById('show-answer').addEventListener('click', showAnswer);
document.getElementById('next-card').addEventListener('click', nextCard);
document.getElementById('export-cards').addEventListener('click', exportCards);
document.getElementById('quiz-mode').addEventListener('click', startQuiz);

// Keyboard navigation
document.addEventListener('keydown', (e) => {
  const flashcard = document.getElementById('flashcard');
  if (flashcard.classList.contains('hidden')) return;
  if (e.key === 'ArrowRight') {
    nextCard();
  } else if (e.key === 'ArrowLeft') {
    prevCard();
  } else if (e.key === 'ArrowDown') {
    showAnswer();
  }
});

function getParam(name) {
  const params = new URLSearchParams(window.location.search);
  return params.get(name);
}

window.addEventListener('DOMContentLoaded', () => {
  const course = getParam('course');
  if (course) {
    const select = document.getElementById('course-select');
    select.value = course;
    populateCategories(course);
    loadCards(course);
  }
});
