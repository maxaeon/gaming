let fallacyIndex = 0;
let fallacyOrder = [];

function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}

function startFallacyGame() {
  fallacyOrder = fallacyExamples.slice();
  shuffle(fallacyOrder);
  fallacyIndex = 0;
  document.getElementById('fallacy-feedback').classList.add('hidden');
  document.getElementById('fallacy-next').classList.add('hidden');
  showFallacy();
  document.getElementById('fallacy-game').classList.remove('hidden');
}

function showFallacy() {
  const ex = fallacyOrder[fallacyIndex];
  document.getElementById('fallacy-statement').innerText = ex.statement;
  const optsDiv = document.getElementById('fallacy-options');
  optsDiv.innerHTML = '';
  const fallacies = Object.keys(fallacyDefinitions);
  fallacies.forEach(name => {
    const btn = document.createElement('button');
    btn.className = 'option-btn';
    btn.innerText = name;
    btn.onclick = () => submitFallacy(name);
    optsDiv.appendChild(btn);
  });
}

function submitFallacy(choice) {
  const ex = fallacyOrder[fallacyIndex];
  const feedback = document.getElementById('fallacy-feedback');
  if (choice === ex.fallacy) {
    feedback.innerHTML = `<strong>Correct!</strong> ${ex.explanation}`;
    feedback.style.color = '#4caf50';
  } else {
    feedback.innerHTML = `Incorrect. It was <em>${ex.fallacy}</em>. ${ex.explanation}`;
    feedback.style.color = '#c62828';
  }
  feedback.classList.remove('hidden');
  document.getElementById('fallacy-next').classList.remove('hidden');
}

document.getElementById('fallacy-next').addEventListener('click', () => {
  fallacyIndex = (fallacyIndex + 1) % fallacyOrder.length;
  showFallacy();
  document.getElementById('fallacy-feedback').classList.add('hidden');
  document.getElementById('fallacy-next').classList.add('hidden');
});

if (document.getElementById('start-fallacy')) {
  document.getElementById('start-fallacy').addEventListener('click', startFallacyGame);
} else {
  startFallacyGame();
}
