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

    const set = window[`${course}Flashcards`];
    if (set) {
      mergeSets(flashcards[course], set);
    }
  });

  return flashcards;
}

const flashcards = buildFlashcards();
if (typeof window !== 'undefined') {
  window.flashcards = flashcards;
}

const courseColors = {
  introPhilosophy: '#9c27b0',
  criticalThinking: '#f44336',
  ethics: '#2196f3',
  writing: '#424242'
};
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
  const color = courseColors[course] || '#9c27b0';
  const wrapper = document.getElementById('flashcard');
  if (wrapper) wrapper.style.setProperty('--flashcard-color', color);
  const allCards = category === 'all'
    ? Object.values(flashcards[course]).flat()
    : (flashcards[course][category] || []);
  currentCards = allCards.slice();
  shuffle(currentCards);
  cardIndex = 0;
  const fc = document.getElementById('flashcard');
  fc.classList.remove('hidden');
  fc.hidden = false;
  loadCard();
}

function loadCard() {
  if (!currentCards.length) {
    document.getElementById('flashcard-question').innerText = 'No cards available.';
    document.getElementById('flashcard-answer').classList.add('hidden');
    document.getElementById('flashcard-answer').hidden = true;
    document.querySelector('#flashcard .flip-card').classList.remove('flipped');
    return;
  }
  const card = currentCards[cardIndex];
  document.getElementById('flashcard-question').innerText = card.question;
  document.getElementById('flashcard-answer').innerText = card.answer;
  document.getElementById('flashcard-answer').classList.add('hidden');
  document.getElementById('flashcard-answer').hidden = true;
  document.querySelector('#flashcard .flip-card').classList.remove('flipped');
}

function showAnswer() {
  document.querySelector('#flashcard .flip-card').classList.add('flipped');
  document.getElementById('flashcard-answer').classList.remove('hidden');
  document.getElementById('flashcard-answer').hidden = false;
}

function toggleFlip() {
  const card = document.querySelector('#flashcard .flip-card');
  if (card.classList.contains('flipped')) {
    card.classList.remove('flipped');
    document.getElementById('flashcard-answer').classList.add('hidden');
    document.getElementById('flashcard-answer').hidden = true;
  } else {
    showAnswer();
  }
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

function saveResult(result) {
  const card = currentCards[cardIndex];
  if (!card) return;
  const key = 'flashcardResults';
  const data = JSON.parse(localStorage.getItem(key) || '{}');
  data[card.question] = result;
  localStorage.setItem(key, JSON.stringify(data));
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

document.getElementById('course-select').addEventListener('change', e => {
  const course = e.target.value;
  populateCategories(course);
  if (course) {
    loadCards(course);
    if (window.updatePageHeader) updatePageHeader(course);
  }
});

document.getElementById('category-select').addEventListener('change', e => {
  const course = document.getElementById('course-select').value;
  if (course) loadCards(course, e.target.value);
});

document.querySelector('#flashcard .flip-card').addEventListener('click', toggleFlip);
document.querySelectorAll('.next-card').forEach(btn => {
  btn.addEventListener('click', e => { e.stopPropagation(); nextCard(); });
});
document.querySelectorAll('.prev-card').forEach(btn => {
  btn.addEventListener('click', e => { e.stopPropagation(); prevCard(); });
});
document.querySelectorAll('.flashcard-close').forEach(btn => {
  btn.addEventListener('click', e => {
    e.stopPropagation();
    const flashcard = document.getElementById('flashcard');
    flashcard.classList.add('hidden');
    flashcard.hidden = true;
  });
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
  const flashcard = document.getElementById('flashcard');
  if (flashcard.classList.contains('hidden')) return;
  if (e.key === 'ArrowRight') {
    nextCard();
  } else if (e.key === 'ArrowLeft') {
    prevCard();
  } else if (e.key === 'Shift' || e.code === 'Space') {
    toggleFlip();
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
    if (window.updatePageHeader) updatePageHeader(course);
  }
});
