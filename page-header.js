// Dynamic header text based on query parameters
function resolvePath(file) {
  const src = document.currentScript.src;
  const base = src.substring(0, src.lastIndexOf('/'));
  return `${base}/${file}`;
}

function openHelp() {
  const modal = document.getElementById('help-modal');
  if (modal) modal.classList.remove('hidden');
}

function loadHelpModal() {
  fetch(resolvePath('help-modal.html'))
    .then(r => r.text())
    .then(html => {
      const wrapper = document.createElement('div');
      wrapper.id = 'help-modal';
      wrapper.classList.add('hidden');
      wrapper.hidden = true;
      wrapper.innerHTML = html;
      document.body.appendChild(wrapper);
      const close = wrapper.querySelector('#help-close');
      if (close) close.addEventListener('click', () => wrapper.classList.add('hidden'));
    });
}

window.addEventListener('DOMContentLoaded', () => {
  const header = document.getElementById('page-header');
  if (!header) return;
  const params = new URLSearchParams(window.location.search);
  const courseMap = {
    introPhilosophy: 'Intro to Philosophy',
    criticalThinking: 'Critical Thinking',
    ethics: 'Ethics',
    writing: 'Writing'
  };
  let courseKey = params.get('course');
  if (!courseKey) {
    const path = window.location.pathname;
    if (/intro-?philosophy/i.test(path)) courseKey = 'introPhilosophy';
    else if (/critical-?thinking/i.test(path)) courseKey = 'criticalThinking';
    else if (/ethics/i.test(path)) courseKey = 'ethics';
  }
  const course = courseMap[courseKey] || (courseKey ? courseKey : 'Course');
  const h1 = document.querySelector('.container h1');
  const activity = h1 ? h1.textContent.trim() : 'Activity';
  header.textContent = `${course} \u2022 ${activity}`;

  if (h1) {
    const help = document.createElement('a');
    help.href = '#';
    help.className = 'help-link';
    help.textContent = '?';
    help.addEventListener('click', (e) => { e.preventDefault(); openHelp(); });
    h1.appendChild(help);
  }

  loadHelpModal();
});
