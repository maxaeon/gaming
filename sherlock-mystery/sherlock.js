const clues = [
  { title: "Housekeeper's Testimony", text: "The housekeeper observed Alexander Greaves quietly reading in the library, far from the study, when the manuscript disappeared." },
  { title: "Beatrice Lowell's Statement", text: "Beatrice claims she saw Alexander near the professor's study precisely when the housekeeper saw him in the library." },
  { title: "Charles Finch's Alibi", text: "Charles insists he remained at home all morning, yet his neighbor spotted him rushing away from his home around the time of the theft." },
  { title: "Study Door Security", text: "Professor Russell's study can only be accessed using a unique brass key, and Charles Finch is known to have borrowed the key a day earlier, claiming he had lost his own." }
];

const puzzles = [
  {
    question: "Which two statements directly contradict each other?",
    options: [
      "Housekeeper’s statement vs. Beatrice’s statement about Alexander’s location.",
      "Charles’s alibi vs. neighbor’s observation.",
      "Alexander vs. Charles regarding study access."
    ],
    correct: 1
  },
  {
    question: "Which piece of evidence most strongly implicates a suspect?",
    options: [
      "The housekeeper placing Alexander away from the study.",
      "Beatrice accusing Alexander of being near the study.",
      "Charles’s key access and contradictory alibi evidence."
    ],
    correct: 2
  },
  {
    question: "Considering the evidence and contradictions, who is the most likely culprit?",
    options: ["Alexander Greaves", "Beatrice Lowell", "Charles Finch"],
    correct: 2
  }
];

let currentPuzzle = 0;

function showClues() {
  const buttonsDiv = document.getElementById('clue-buttons');
  buttonsDiv.innerHTML = '';
  clues.forEach((clue, idx) => {
    const btn = document.createElement('button');
    btn.className = 'option-btn';
    btn.innerText = clue.title;
    btn.addEventListener('click', () => {
      document.getElementById('clue-text').innerText = clue.text;
      document.getElementById('analyze-evidence').classList.remove('hidden');       document.getElementById('analyze-evidence').hidden = false;
    });
    buttonsDiv.appendChild(btn);
  });
}

function startPuzzles() {
  document.getElementById('clue-section').classList.add('hidden');   document.getElementById('clue-section').hidden = true;
  document.getElementById('puzzle-section').classList.remove('hidden');   document.getElementById('puzzle-section').hidden = false;
  showPuzzle();
}

function showPuzzle() {
  const pz = puzzles[currentPuzzle];
  document.getElementById('puzzle-question').innerText = pz.question;
  const optsDiv = document.getElementById('puzzle-options');
  optsDiv.innerHTML = '';
  pz.options.forEach((opt, i) => {
    const btn = document.createElement('button');
    btn.className = 'option-btn';
    btn.innerText = opt;
    btn.addEventListener('click', () => selectOption(i));
    optsDiv.appendChild(btn);
  });
  document.getElementById('puzzle-feedback').classList.add('hidden');   document.getElementById('puzzle-feedback').hidden = true;
  document.getElementById('next-puzzle').classList.add('hidden');   document.getElementById('next-puzzle').hidden = true;
}

function selectOption(choice) {
  const pz = puzzles[currentPuzzle];
  const feedback = document.getElementById('puzzle-feedback');
  if (choice === pz.correct) {
    feedback.innerHTML = '<strong>Correct!</strong>';
    feedback.style.color = '#4caf50';
  } else {
    feedback.innerHTML = 'Incorrect.';
    feedback.style.color = '#c62828';
  }
  feedback.classList.remove('hidden');   feedback.hidden = false;
  document.getElementById('next-puzzle').classList.remove('hidden');   document.getElementById('next-puzzle').hidden = false;
}

function nextPuzzle() {
  currentPuzzle++;
  if (currentPuzzle < puzzles.length) {
    showPuzzle();
  } else {
    showResolution();
  }
}

function showResolution() {
  document.getElementById('puzzle-section').classList.add('hidden');   document.getElementById('puzzle-section').hidden = true;
  const resDiv = document.getElementById('resolution-section');
  resDiv.classList.remove('hidden');   resDiv.hidden = false;
  resDiv.innerHTML = `<p><strong>Excellent deduction!</strong> You've concluded that Charles Finch took Professor Russell's manuscript.</p>` +
    `<p>Reflect on the investigation:</p>` +
    `<ul><li>What clues or contradictions most effectively guided your reasoning?</li>` +
    `<li>Which skill proved most useful and why?</li>` +
    `<li>How might Holmes's approach help you in real-world problems?</li></ul>`;
}

document.getElementById('start-investigation').addEventListener('click', () => {
  document.getElementById('intro-section').classList.add('hidden');   document.getElementById('intro-section').hidden = true;
  document.getElementById('clue-section').classList.remove('hidden');   document.getElementById('clue-section').hidden = false;
  showClues();
});

document.getElementById('analyze-evidence').addEventListener('click', startPuzzles);

document.getElementById('next-puzzle').addEventListener('click', nextPuzzle);
