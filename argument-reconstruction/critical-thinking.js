const reconstructionQuestions = [
  {
    argument: "Premise 1: All mammals are warm-blooded.\n_____\nConclusion: Dolphins are warm-blooded.",
    question: "Which premise completes the argument?",
    options: [
      "Dolphins live in the ocean.",
      "Dolphins are mammals.",
      "Warm-blooded animals are mammals.",
      "Dolphins breathe underwater."
    ],
    answer: "Dolphins are mammals."
  },
  {
    argument: "Premise 1: If it rains, the picnic will be canceled.\n_____\nConclusion: Therefore, the picnic will be canceled.",
    question: "Which premise is missing?",
    options: [
      "The picnic is outdoors.",
      "It is raining.",
      "The picnic will be fun.",
      "Canceling events is bad."
    ],
    answer: "It is raining."
  },
  {
    argument: "Premise 1: Either Alice or Bob took the cookie.\nPremise 2: Alice didn't take the cookie.\n_____\nConclusion: Therefore, Bob took the cookie.",
    question: "Which statement must also be true?",
    options: [
      "There was a cookie missing.",
      "No one else besides Alice and Bob could have taken the cookie.",
      "The cookie was chocolate chip.",
      "Bob loves cookies."
    ],
    answer: "No one else besides Alice and Bob could have taken the cookie."
  },
  {
    argument: "Premise 1: Successful students usually study regularly.\n_____\nConclusion: Maria will likely succeed as a student.",
    question: "Which premise fills the gap?",
    options: [
      "Maria studies regularly.",
      "Maria enjoys classes.",
      "Success is guaranteed.",
      "Maria is a student."
    ],
    answer: "Maria studies regularly."
  },
  {
    argument: "Premise 1: People who exercise regularly tend to have better health.\n_____\nConclusion: Thus, Jonathan likely has good health.",
    question: "What premise is needed?",
    options: [
      "Jonathan exercises regularly.",
      "Jonathan eats vegetables.",
      "Exercise is boring.",
      "Health is important."
    ],
    answer: "Jonathan exercises regularly."
  },
  {
    argument: "Premise 1: If you oversleep, you miss class.\nPremise 2: You did not oversleep.\n_____\nConclusion: Therefore, you did not miss class.",
    question: "Which hidden premise would make the reasoning work?",
    options: [
      "Oversleeping is the only way to miss class.",
      "You rarely miss class.",
      "Class starts early.",
      "You overslept last week."
    ],
    answer: "Oversleeping is the only way to miss class."
  },
  {
    argument: "Premise 1: If an animal is a bird, it has feathers.\n_____\nConclusion: Penguins have feathers.",
    question: "What should be added?",
    options: [
      "Penguins are birds.",
      "Penguins live in Antarctica.",
      "Feathers keep animals warm.",
      "All birds can fly."
    ],
    answer: "Penguins are birds."
  },
  {
    argument: "Premise 1: Good arguments have true premises and valid logic.\n_____\nConclusion: Your argument is good.",
    question: "Which completion makes the argument valid?",
    options: [
      "Your argument has true premises and valid logic.",
      "Good arguments are persuasive.",
      "You wrote this argument.",
      "Valid logic is complicated."
    ],
    answer: "Your argument has true premises and valid logic."
  },
  {
    argument: "Premise 1: If the alarm goes off, there is a fire.\n_____\nConclusion: There is no fire.",
    question: "Which assumption is required?",
    options: [
      "The alarm did not go off and no other signs indicate fire.",
      "Fire alarms are loud.",
      "Fires are dangerous.",
      "The alarm needs new batteries."
    ],
    answer: "The alarm did not go off and no other signs indicate fire."
  },
  {
    argument: "Premise 1: Students who complete their homework regularly tend to perform better.\n_____\nConclusion: Therefore, Sam will likely perform better.",
    question: "Fill in the blank.",
    options: [
      "Sam completes homework regularly.",
      "Homework is difficult.",
      "Sam studies at night.",
      "Performing better is rewarding."
    ],
    answer: "Sam completes homework regularly."
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
