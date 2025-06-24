const reconstructionQuestions = [
  {
    argument: "If minds can exist independently of bodies, then dualism is true. Near-death experiences suggest minds can exist independently. Therefore, dualism is true.",
    question: "What is the conclusion of this argument?",
    options: [
      "Dualism is true.",
      "Near-death experiences are reliable.",
      "Minds depend on bodies.",
      "Materialism is true."
    ],
    answer: "Dualism is true."
  },
  {
    argument: "All mental states correlate directly with physical brain states. If all mental states correlate directly with physical brain states, then materialism is true. Thus, materialism is true.",
    question: "Which statement is Premise 1?",
    options: [
      "All mental states correlate directly with physical brain states.",
      "If mental states correlate with brain states, materialism is true.",
      "Materialism is true.",
      "The mind is nonphysical."
    ],
    answer: "All mental states correlate directly with physical brain states."
  },
  {
    argument: "If the universe shows evidence of purposeful design, then there must be a designer. The universe shows evidence of purposeful design. Therefore, there must be a designer (God).",
    question: "Is this argument deductive or inductive?",
    options: ["Deductive", "Inductive", "Analogical", "Abductive"],
    answer: "Deductive"
  },
  {
    argument: "Most complex systems we observe (watches, computers) are designed by intelligent beings. The universe is a complex system. Thus, the universe probably has an intelligent designer.",
    question: "Which best describes this argument?",
    options: [
      "Inductive and strong",
      "Deductive and valid",
      "Inductive and weak",
      "Purely circular"
    ],
    answer: "Inductive and strong"
  },
  {
    argument: "If I am thinking, I exist. I am thinking. Therefore, I exist.",
    question: "How should we evaluate this argument?",
    options: [
      "Valid and sound",
      "Valid but unsound",
      "Invalid but sound",
      "Invalid and unsound"
    ],
    answer: "Valid and sound"
  },
  {
    argument: "If humans are immortal, then Socrates is immortal. Humans are immortal. Therefore, Socrates is immortal.",
    question: "Why is this argument unsound?",
    options: [
      "It has an invalid form.",
      "One premise is false.",
      "The conclusion doesn't follow.",
      "It is inductive."
    ],
    answer: "One premise is false."
  },
  {
    argument: "Most people believe they have free will. Thus, humans probably have free will.",
    question: "How strong is this inductive argument?",
    options: ["Strong", "Weak", "Deductively valid", "Unsound"],
    answer: "Weak"
  },
  {
    argument: "Every known mental event corresponds with brain activity. Therefore, mental events likely depend entirely on physical brain activity.",
    question: "Is this argument strong or weak?",
    options: ["Strong", "Weak", "Deductively valid", "Unsound"],
    answer: "Strong"
  },
  {
    argument: "All actions are determined by prior causes. Therefore, free will does not exist.",
    question: "Which missing premise would best support the conclusion?",
    options: [
      "Free will requires actions not fully determined by prior causes.",
      "People feel free when acting.",
      "Determinism is false.",
      "All causes are physical."
    ],
    answer: "Free will requires actions not fully determined by prior causes."
  },
  {
    argument: "If mental experiences were purely physical, we could fully explain consciousness scientifically. But we can't fully explain consciousness scientifically. Thus, consciousness is not purely physical.",
    question: "What pattern of reasoning does this argument use?",
    options: [
      "Valid modus tollens",
      "Valid modus ponens",
      "Inductive analogy",
      "Weak generalization"
    ],
    answer: "Valid modus tollens"
  }
];

let reconstructionOrder = [];
let reconstructionIndex = 0;
let currentCourse = '';
const MAX_QUESTIONS = 10;

function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}

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
