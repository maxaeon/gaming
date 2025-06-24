const reconstructionQuestions = [
  {
    argument: "All humans are mortal. Socrates is human. Therefore, Socrates is mortal.",
    question: "How should this argument be evaluated?",
    options: ["Invalid", "Valid and Sound", "Valid but Unsound", "Strong and Cogent"],
    answer: "Valid and Sound"
  },
  {
    argument: "All birds can fly. Penguins are birds. Therefore, penguins can fly.",
    question: "How should this argument be evaluated?",
    options: ["Invalid", "Valid and Sound", "Valid but Unsound", "Strong and Cogent"],
    answer: "Valid but Unsound"
  },
  {
    argument: "If it rains, the street is wet. The street is wet. Therefore, it rains.",
    question: "How should this argument be evaluated?",
    options: ["Invalid", "Valid and Sound", "Valid but Unsound", "Strong and Cogent"],
    answer: "Invalid"
  },
  {
    argument: "90% of voters polled support candidate X. Jane is a voter. Therefore, Jane probably supports candidate X.",
    question: "How should this argument be evaluated?",
    options: ["Invalid", "Valid and Sound", "Valid but Unsound", "Strong and Cogent"],
    answer: "Strong and Cogent"
  },
  {
    argument: "95% of birds observed can fly. Penguins are birds. Thus, penguins probably can fly.",
    question: "How should this argument be evaluated?",
    options: ["Invalid", "Valid and Sound", "Valid but Unsound", "Strong but Not Cogent"],
    answer: "Strong but Not Cogent"
  },
  {
    argument: "All triangles have three sides. This shape is a triangle. Therefore, this shape has three sides.",
    question: "How should this argument be evaluated?",
    options: ["Invalid", "Valid and Sound", "Valid but Unsound", "Strong and Cogent"],
    answer: "Valid and Sound"
  },
  {
    argument: "All dogs can fly. Max is a dog. Thus, Max can fly.",
    question: "How should this argument be evaluated?",
    options: ["Invalid", "Valid and Sound", "Valid but Unsound", "Strong and Cogent"],
    answer: "Valid but Unsound"
  },
  {
    argument: "All humans are robots. All robots are invisible. Thus, all humans are invisible.",
    question: "How should this argument be evaluated?",
    options: ["Invalid", "Valid and Sound", "Valid but Unsound", "Strong and Cogent"],
    answer: "Valid but Unsound"
  },
  {
    argument: "If it snows, then it is cold. It is cold. Thus, it snows.",
    question: "How should this argument be evaluated?",
    options: ["Invalid", "Valid and Sound", "Valid but Unsound", "Strong and Cogent"],
    answer: "Invalid"
  },
  {
    argument: "If you are a philosopher, then you think deeply. You are not a philosopher. Thus, you don\u2019t think deeply.",
    question: "How should this argument be evaluated?",
    options: ["Invalid", "Valid and Sound", "Valid but Unsound", "Strong and Cogent"],
    answer: "Invalid"
  },
  {
    argument: "If the car runs, then the battery works. The battery doesn\u2019t work. Therefore, the car doesn\u2019t run.",
    question: "How should this argument be evaluated?",
    options: ["Invalid", "Valid and Sound", "Valid but Unsound", "Strong and Cogent"],
    answer: "Valid and Sound"
  },
  {
    argument: "If Maria is an author, she writes books. Maria writes books. Thus, Maria is an author.",
    question: "How should this argument be evaluated?",
    options: ["Invalid", "Valid and Sound", "Valid but Unsound", "Strong and Cogent"],
    answer: "Invalid"
  },
  {
    argument: "All birds swim. Sparrows are birds. Thus, sparrows swim.",
    question: "How should this argument be evaluated?",
    options: ["Invalid", "Valid and Sound", "Valid but Unsound", "Strong and Cogent"],
    answer: "Valid but Unsound"
  },
  {
    argument: "If you study, you pass the test. If you pass the test, you graduate. Thus, if you study, you graduate.",
    question: "How should this argument be evaluated?",
    options: ["Invalid", "Valid and Sound", "Valid but Unsound", "Strong and Cogent"],
    answer: "Valid and Sound"
  },
  {
    argument: "You can have cake or ice cream. You have cake. Therefore, you don\u2019t have ice cream.",
    question: "How should this argument be evaluated?",
    options: ["Invalid", "Valid and Sound", "Valid but Unsound", "Strong and Cogent"],
    answer: "Invalid"
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
