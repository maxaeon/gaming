const reconstructionQuestions = [
  {
    argument:
      "Since all mammals breathe air and whales are mammals, it follows that whales breathe air.",
    question: "What is the conclusion of this argument?",
    options: [
      "All mammals breathe air.",
      "Whales are mammals.",
      "Whales breathe air."
    ],
    answer: "Whales breathe air."
  },
  {
    argument:
      "Since all mammals breathe air and whales are mammals, it follows that whales breathe air.",
    question: "Which option correctly lists the premises?",
    options: [
      "All mammals breathe air; Whales are mammals.",
      "All mammals breathe air; Whales breathe air.",
      "Whales are mammals; Whales breathe air.",
      "Only: Whales breathe air."
    ],
    answer: "All mammals breathe air; Whales are mammals."
  },
  {
    argument:
      "Maria studied logic, and everyone who studies logic becomes better at reasoning. Therefore, Maria became better at reasoning.",
    question: "What is the conclusion of this argument?",
    options: [
      "Maria studied logic.",
      "Everyone who studies logic becomes better at reasoning.",
      "Maria became better at reasoning."
    ],
    answer: "Maria became better at reasoning."
  },
  {
    argument:
      "Maria studied logic, and everyone who studies logic becomes better at reasoning. Therefore, Maria became better at reasoning.",
    question: "Which option correctly lists the premises?",
    options: [
      "Maria studied logic; Everyone who studies logic becomes better at reasoning.",
      "Maria studied logic; Maria became better at reasoning.",
      "Everyone who studies logic becomes better at reasoning; Maria became better at reasoning.",
      "Maria studied logic only."
    ],
    answer: "Maria studied logic; Everyone who studies logic becomes better at reasoning."
  },
  {
    argument:
      "The project deadline was missed. Projects that miss deadlines lose funding. Therefore, this project will lose funding.",
    question: "What is the conclusion of this argument?",
    options: [
      "The project deadline was missed.",
      "This project will lose funding.",
      "Projects that miss deadlines lose funding."
    ],
    answer: "This project will lose funding."
  },
  {
    argument:
      "The project deadline was missed. Projects that miss deadlines lose funding. Therefore, this project will lose funding.",
    question: "Which option correctly lists the premises?",
    options: [
      "The project deadline was missed; Projects that miss deadlines lose funding.",
      "The project deadline was missed; This project will lose funding.",
      "Projects that miss deadlines lose funding; This project will lose funding.",
      "Only: The project deadline was missed."
    ],
    answer: "The project deadline was missed; Projects that miss deadlines lose funding."
  },
  {
    argument:
      "If a country has a strong economy, it attracts immigrants. Country X is attracting immigrants. So, country X must have a strong economy.",
    question: "What is the conclusion of this argument?",
    options: [
      "A country with a strong economy attracts immigrants.",
      "Country X is attracting immigrants.",
      "Country X must have a strong economy."
    ],
    answer: "Country X must have a strong economy."
  },
  {
    argument:
      "If a country has a strong economy, it attracts immigrants. Country X is attracting immigrants. So, country X must have a strong economy.",
    question: "Which option correctly lists the premises?",
    options: [
      "If a country has a strong economy, it attracts immigrants; Country X is attracting immigrants.",
      "Country X is attracting immigrants; Country X must have a strong economy.",
      "If a country has a strong economy, it attracts immigrants; Country X must have a strong economy.",
      "Country X must have a strong economy only."
    ],
    answer: "If a country has a strong economy, it attracts immigrants; Country X is attracting immigrants."
  },
  {
    argument:
      "If a country has a strong economy, it attracts immigrants. Country X is attracting immigrants. So, country X must have a strong economy.",
    question: "Is this argument valid or invalid?",
    options: [
      "Valid",
      "Invalid (Affirming the Consequent)",
      "Invalid (Denying the Antecedent)",
      "Sound"
    ],
    answer: "Invalid (Affirming the Consequent)"
  },
  {
    argument:
      "Either the battery is dead, or the starter is broken. The battery is not dead. Therefore, the starter must be broken.",
    question: "What is the conclusion of this argument?",
    options: [
      "Either the battery is dead or the starter is broken.",
      "The battery is not dead.",
      "The starter must be broken."
    ],
    answer: "The starter must be broken."
  },
  {
    argument:
      "Either the battery is dead, or the starter is broken. The battery is not dead. Therefore, the starter must be broken.",
    question: "Which option correctly lists the premises?",
    options: [
      "Either the battery is dead or the starter is broken; The battery is not dead.",
      "Either the battery is dead or the starter is broken; The starter must be broken.",
      "The battery is not dead; The starter must be broken.",
      "Only: The battery is not dead."
    ],
    answer: "Either the battery is dead or the starter is broken; The battery is not dead."
  },
  {
    argument:
      "Either the battery is dead, or the starter is broken. The battery is not dead. Therefore, the starter must be broken.",
    question: "Identify the valid argument form used.",
    options: [
      "Disjunctive Syllogism",
      "Modus Ponens",
      "Modus Tollens",
      "Hypothetical Syllogism"
    ],
    answer: "Disjunctive Syllogism"
  }
];

let reconstructionOrder = [];
let reconstructionIndex = 0;
let currentCourse = '';
const MAX_QUESTIONS = 12;

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
