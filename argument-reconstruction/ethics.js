const reconstructionQuestions = [
  {
    argument:
      "Animal cruelty causes unnecessary suffering. Causing unnecessary suffering is morally wrong. Therefore, animal cruelty is morally wrong.",
    question: "Which statement is the moral premise?",
    options: [
      "Animal cruelty causes unnecessary suffering.",
      "Causing unnecessary suffering is morally wrong.",
      "Animal cruelty is morally wrong.",
      "All animals deserve respect."
    ],
    answer: "Causing unnecessary suffering is morally wrong."
  },
  {
    argument:
      "Most philosophers teach logic. Dr. Lee is a philosopher. Thus, Dr. Lee probably teaches logic.",
    question: "What type of argument is this?",
    options: ["Deductive", "Inductive", "Abductive", "Analogical"],
    answer: "Inductive"
  },
  {
    argument:
      "Factory farming causes severe animal suffering. Causing unnecessary animal suffering is morally wrong. Therefore, factory farming is morally wrong.",
    question: "Which statement is the conclusion?",
    options: [
      "Factory farming causes severe animal suffering.",
      "Causing unnecessary animal suffering is morally wrong.",
      "Factory farming is morally wrong.",
      "Animals should not suffer."
    ],
    answer: "Factory farming is morally wrong."
  },
  {
    argument:
      "Genetic modification alters organisms profoundly. Therefore, genetic modification is morally wrong.",
    question: "Which premise is missing?",
    options: [
      "Genetic modification reduces biodiversity.",
      "Altering organisms profoundly is morally wrong.",
      "Genetic modification is necessary for progress.",
      "Humans have always modified nature."
    ],
    answer: "Altering organisms profoundly is morally wrong."
  },
  {
    argument:
      "All harm is morally unacceptable. Therefore, recreational hunting is morally unacceptable.",
    question: "Which premise is needed to make the argument valid?",
    options: [
      "Hunting boosts the economy.",
      "Recreational hunting causes harm.",
      "All animals are sentient.",
      "People enjoy hunting."
    ],
    answer: "Recreational hunting causes harm."
  },
  {
    argument:
      "All humans deserve basic respect. Therefore, John deserves basic respect.",
    question: "Which hidden premise completes the argument?",
    options: [
      "John is human.",
      "John is kind.",
      "Respect is earned.",
      "Humans are rational."
    ],
    answer: "John is human."
  },
  {
    argument:
      "All unnecessary suffering is morally wrong. Therefore, torture is morally wrong.",
    question: "What nonmoral premise is missing?",
    options: [
      "Torture is necessary.",
      "Torture causes unnecessary suffering.",
      "All pain is evil.",
      "Some people deserve torture."
    ],
    answer: "Torture causes unnecessary suffering."
  },
  {
    argument:
      "All mammals are warm-blooded. Whales are mammals. Therefore, whales are warm-blooded.",
    question: "Is this argument deductive or inductive?",
    options: ["Deductive", "Inductive", "Analogical", "Abductive"],
    answer: "Deductive"
  },
  {
    argument:
      "Most ethics students pass exams. Maria is an ethics student. Maria will likely pass the exam.",
    question: "How strong is this argument?",
    options: [
      "Deductively valid",
      "Strong inductive",
      "Weak inductive",
      "Fallacious"
    ],
    answer: "Strong inductive"
  },
  {
    argument: "All birds fly. Penguins are birds. Thus, penguins fly.",
    question: "Why is the argument unsound?",
    options: [
      "The structure is invalid.",
      "The second premise is false.",
      "The first premise is false.",
      "The conclusion is unjustified."
    ],
    answer: "The first premise is false."
  },
  {
    argument:
      "Nearly all philosophers are wealthy. Jane is a philosopher. Thus, Jane is probably wealthy.",
    question: "Why isn't this argument cogent?",
    options: [
      "Premises are irrelevant.",
      "Sample size too small.",
      "The premise is false.",
      "The conclusion doesn't follow."
    ],
    answer: "The premise is false."
  }
];

let reconstructionOrder = [];
let reconstructionIndex = 0;

function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}

function startReconstruction() {
  reconstructionOrder = reconstructionQuestions.slice();
  shuffle(reconstructionOrder);
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
  document.getElementById("reconstruction-feedback").classList.add("hidden");
  document.getElementById("reconstruction-next").classList.add("hidden");
}

function submitReconstruction(choice) {
  const q = reconstructionOrder[reconstructionIndex];
  const feedback = document.getElementById("reconstruction-feedback");
  if (choice === q.answer) {
    feedback.innerText = "Correct!";
    feedback.style.color = "#4caf50";
  } else {
    feedback.innerText = `Incorrect. The correct answer is ${q.answer}.`;
    feedback.style.color = "#c62828";
  }
  feedback.classList.remove("hidden");
  document.getElementById("reconstruction-next").classList.remove("hidden");
}

document.getElementById("reconstruction-next").addEventListener("click", () => {
  reconstructionIndex = (reconstructionIndex + 1) % reconstructionOrder.length;
  showReconstructionQuestion();
});

document.addEventListener("DOMContentLoaded", startReconstruction);
