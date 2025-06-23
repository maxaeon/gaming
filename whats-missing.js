const whatsMissingCriticalThinking = [
  {
    prompt: "Premise 1: All mammals are warm-blooded.\n_____\nConclusion: Dolphins are warm-blooded.",
    missing: "Premise: Dolphins are mammals.",
    explanation: "Without stating dolphins are mammals, the conclusion does not logically follow."
  },
  {
    prompt: "Premise 1: If it rains, the picnic will be canceled.\n_____\nConclusion: Therefore, the picnic will be canceled.",
    missing: "Premise: It is raining.",
    explanation: "We must know if it's actually raining to conclude the picnic will be canceled."
  },
  {
    prompt: "Premise 1: Either Alice or Bob took the cookie.\nPremise 2: Alice didn't take the cookie.\n_____\nConclusion: Therefore, Bob took the cookie.",
    missing: "Missing: No one else besides Alice and Bob could have taken the cookie.",
    explanation: "We must confirm the limited choices to confidently conclude Bob took the cookie."
  },
  {
    prompt: "Premise 1: Successful students usually study regularly.\n_____\nConclusion: Maria will likely succeed as a student.",
    missing: "Premise: Maria studies regularly.",
    explanation: "Without confirming Maria’s study habits, we can’t infer her success."
  },
  {
    prompt: "Premise 1: People who exercise regularly tend to have better health.\n_____\nConclusion: Thus, Jonathan likely has good health.",
    missing: "Premise: Jonathan exercises regularly.",
    explanation: "We need information about Jonathan's exercise routine to reach this conclusion."
  },
  {
    prompt: "Premise 1: If you oversleep, you miss class.\nPremise 2: You did not oversleep.\n_____\nConclusion: Therefore, you did not miss class.",
    missing: "Missing: Oversleeping is the only way to miss class.",
    explanation: "This ignores other reasons you might miss class. You must confirm oversleeping is the sole reason."
  },
  {
    prompt: "Premise 1: If an animal is a bird, it has feathers.\n_____\nConclusion: Penguins have feathers.",
    missing: "Premise: Penguins are birds.",
    explanation: "You must explicitly establish penguins are birds for this conclusion."
  },
  {
    prompt: "Premise 1: Good arguments have true premises and valid logic.\n_____\nConclusion: Your argument is good.",
    missing: "Premise: Your argument has true premises and valid logic.",
    explanation: "You must confirm both truth and validity explicitly to conclude the argument is good."
  },
  {
    prompt: "Premise 1: If the alarm goes off, there is a fire.\n_____\nConclusion: There is no fire.",
    missing: "Premise: The alarm did not go off and no other signs indicate fire.",
    explanation: "Simply knowing the alarm isn't sounding isn't enough; confirm explicitly no other evidence suggests fire."
  },
  {
    prompt: "Premise 1: Students who complete their homework regularly tend to perform better.\n_____\nConclusion: Therefore, Sam will likely perform better.",
    missing: "Premise: Sam completes homework regularly.",
    explanation: "You must confirm Sam’s homework habits to infer performance improvement."
  }
];

let missingIndex = 0;
let missingOrder = [];

function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}

function startMissingGame() {
  missingOrder = whatsMissingCriticalThinking.slice();
  shuffle(missingOrder);
  missingIndex = 0;
  document.getElementById('missing-feedback').classList.add('hidden');
  document.getElementById('missing-next').classList.add('hidden');
  showMissing();
  document.getElementById('missing-game').classList.remove('hidden');
  const startBtn = document.getElementById('start-missing');
  if (startBtn) startBtn.classList.add('hidden');
}

function showMissing() {
  const q = missingOrder[missingIndex];
  document.getElementById('missing-prompt').innerText = q.prompt;
  document.getElementById('missing-input').value = '';
}

function submitMissing() {
  const q = missingOrder[missingIndex];
  const userText = document.getElementById('missing-input').value.trim();
  const feedback = document.getElementById('missing-feedback');
  if (userText.toLowerCase() === q.missing.toLowerCase()) {
    feedback.innerHTML = `<strong>Correct!</strong> ${q.explanation}`;
    feedback.style.color = '#4caf50';
  } else {
    feedback.innerHTML = `Incorrect. The missing premise was: <em>${q.missing}</em>. ${q.explanation}`;
    feedback.style.color = '#c62828';
  }
  feedback.classList.remove('hidden');
  document.getElementById('missing-next').classList.remove('hidden');
}

document.getElementById('missing-submit').addEventListener('click', submitMissing);
document.getElementById('missing-next').addEventListener('click', () => {
  missingIndex = (missingIndex + 1) % missingOrder.length;
  showMissing();
  document.getElementById('missing-feedback').classList.add('hidden');
  document.getElementById('missing-next').classList.add('hidden');
});

if (document.getElementById('start-missing')) {
  document.getElementById('start-missing').addEventListener('click', startMissingGame);
} else {
  startMissingGame();
}
