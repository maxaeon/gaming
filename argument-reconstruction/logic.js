const reconstructionQuestions = [
  {
    argument:
      "If it's snowing, the roads become slippery. It is snowing today. Thus, the roads are slippery.",
    question: "How should this argument be evaluated?",
    options: [
      "Deductive: Valid and Sound",
      "Deductive: Valid but Unsound",
      "Deductive: Invalid",
      "Inductive Argument"
    ],
    answer: "Deductive: Valid and Sound"
  },
  {
    argument:
      "All brilliant leaders have great hair. A certain political leader claims to have great hair. Thus, he is a brilliant leader.",
    question: "How should this argument be evaluated?",
    options: [
      "Deductive: Valid and Sound",
      "Deductive: Valid but Unsound",
      "Deductive: Invalid",
      "Inductive Argument"
    ],
    answer: "Deductive: Valid but Unsound"
  },
  {
    argument:
      "If Sam wins the lottery, he'll quit his job. Sam quit his job. Thus, Sam won the lottery.",
    question: "How should this argument be evaluated?",
    options: [
      "Deductive: Valid and Sound",
      "Deductive: Valid but Unsound",
      "Deductive: Invalid",
      "Inductive Argument"
    ],
    answer: "Deductive: Invalid"
  },
  {
    argument:
      "Most philosophy students love puzzles. Jane is a philosophy student. Thus, Jane probably loves puzzles.",
    question: "How should this argument be evaluated?",
    options: [
      "Deductive: Valid and Sound",
      "Deductive: Invalid",
      "Inductive: Strong and Cogent",
      "Inductive: Weak or not Cogent"
    ],
    answer: "Inductive: Strong and Cogent"
  },
  {
    argument:
      "All cats are mammals. No mammals are reptiles. Therefore, no cats are reptiles.",
    question: "How should this argument be evaluated?",
    options: [
      "Deductive: Valid and Sound",
      "Deductive: Valid but Unsound",
      "Deductive: Invalid",
      "Inductive Argument"
    ],
    answer: "Deductive: Valid and Sound"
  },
  {
    argument:
      "All philosophers think. Socrates is a philosopher. Thus, Socrates thinks.",
    question: "How should this argument be evaluated?",
    options: [
      "Deductive: Valid and Sound",
      "Deductive: Valid but Unsound",
      "Deductive: Invalid",
      "Inductive Argument"
    ],
    answer: "Deductive: Valid and Sound"
  }
];

let reconstructionOrder = [];
let reconstructionIndex = 0;
let currentCourse = '';
const MAX_QUESTIONS = 10;

function startReconstruction() {
  reconstructionOrder = reconstructionQuestions.slice();
  shuffle(reconstructionOrder);
  reconstructionOrder = reconstructionOrder.slice(0, MAX_QUESTIONS);
  reconstructionIndex = 0;
  showReconstructionQuestion();
}

function showReconstructionQuestion() {
  const q = reconstructionOrder[reconstructionIndex];
  document.getElementById("reconstruction-argument").innerText = '"' + q.argument + '"';
  document.getElementById("reconstruction-question").innerText = q.question;
  const opts = document.getElementById("reconstruction-options");
  opts.innerHTML = "";
  q.options.forEach(opt => {
    const btn = document.createElement("button");
    btn.className = "option-btn";
    btn.innerText = opt;
    btn.onclick = () => submitReconstruction(opt);
    opts.appendChild(btn);
  });
  const feedbackEl = document.getElementById("reconstruction-feedback");
  const nextBtn = document.getElementById("reconstruction-next");
  const controlsEl = document.getElementById("reconstruction-controls");
  feedbackEl.classList.add("hidden");
  feedbackEl.hidden = true;
  nextBtn.classList.add("hidden");
  nextBtn.hidden = true;
  controlsEl.classList.add("hidden");
  controlsEl.hidden = true;
}

function submitReconstruction(choice) {
  const q = reconstructionOrder[reconstructionIndex];
  const feedback = document.getElementById("reconstruction-feedback");
  const controls = document.getElementById("reconstruction-controls");
  if (choice === q.answer) {
    feedback.innerText = "Correct!";
    feedback.style.color = "#4caf50";
    const nextBtn = document.getElementById("reconstruction-next");
    nextBtn.classList.remove("hidden");
    nextBtn.hidden = false;
    controls.classList.add("hidden");
    controls.hidden = true;
  } else {
    feedback.innerText = "Incorrect.";
    feedback.style.color = "#c62828";
    controls.classList.remove("hidden");
    controls.hidden = false;
  }
  feedback.classList.remove("hidden");
  feedback.hidden = false;
}

function showAnswer() {
  const q = reconstructionOrder[reconstructionIndex];
  const feedback = document.getElementById("reconstruction-feedback");
  feedback.innerText = `The correct answer is: ${q.answer}.`;
  feedback.style.color = "#4caf50";
  const nextBtn = document.getElementById("reconstruction-next");
  nextBtn.classList.remove("hidden");
  nextBtn.hidden = false;
  const controls = document.getElementById("reconstruction-controls");
  controls.classList.add("hidden");
  controls.hidden = true;
}

function tryAgain() {
  const feedback = document.getElementById("reconstruction-feedback");
  const controls = document.getElementById("reconstruction-controls");
  feedback.classList.add("hidden");
  feedback.hidden = true;
  controls.classList.add("hidden");
  controls.hidden = true;
}

function showSummary() {
  const game = document.getElementById('reconstruction-game');
  if (game) {
    game.classList.add('hidden');
    game.hidden = true;
  }
  const summary = document.getElementById('summary');
  if (summary) {
    summary.classList.remove('hidden');
    summary.hidden = false;
  }
  if (typeof showNextActivity === 'function') {
    showNextActivity(currentCourse);
  }
}

document.getElementById("reconstruction-next").addEventListener("click", () => {
  reconstructionIndex++;
  if (reconstructionIndex >= reconstructionOrder.length) {
    showSummary();
  } else {
    showReconstructionQuestion();
  }
});

document.getElementById("reconstruction-show-answer").addEventListener("click", showAnswer);
document.getElementById("reconstruction-try-again").addEventListener("click", tryAgain);

document.addEventListener("DOMContentLoaded", () => {
  currentCourse = getCourse ? getCourse() : '';
  startReconstruction();
  const open = document.getElementById("open-info");
  const close = document.getElementById("close-info");
  const modal = document.getElementById("info-modal");
  if (open && close && modal) {
    open.addEventListener("click", () => modal.classList.remove("hidden"));
    close.addEventListener("click", () => modal.classList.add("hidden"));
    modal.classList.remove("hidden");
  }
});
