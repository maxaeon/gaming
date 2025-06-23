function getCourse() {
  const params = new URLSearchParams(window.location.search);
  return params.get('course');
}

function showNextActivity(course) {
  const container = document.querySelector('.container');
  if (!container) return;
  const map = {
    introPhilosophy: {
      label: 'Flashcards',
      url: '../flashcards/flashcards.html?course=introPhilosophy'
    },
    criticalThinking: {
      label: 'Flashcards',
      url: '../flashcards/flashcards.html?course=criticalThinking'
    },
    ethics: { label: 'Flashcards', url: '../flashcards/flashcards.html?course=ethics' }
  };
  const rec = map[course];
  const div = document.createElement('div');
  div.id = 'next-activity';
  const home = document.createElement('button');
  home.textContent = 'Back to Home';
  home.addEventListener('click', () => { window.location.href = '../index.html'; });
  div.appendChild(home);
  if (rec) {
    const p = document.createElement('p');
    const a = document.createElement('a');
    a.href = rec.url;
    a.textContent = `Next: ${rec.label}`;
    p.appendChild(a);
    div.appendChild(p);
  }
  container.appendChild(div);
}
