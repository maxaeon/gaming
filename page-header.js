// Dynamic header text based on query parameters
// Capture the script's base path once so event callbacks can resolve files
const scriptBase = (function() {
  const current = document.currentScript;
  if (!current) return '';
  const src = current.src;
  return src.substring(0, src.lastIndexOf('/'));
})();

const courseColors = {
  introPhilosophy: '#9c27b0',
  criticalThinking: '#f44336',
  ethics: '#2196f3',
  logic: '#ffeb3b',
  writing: '#424242'
};

function lightenColor(hex, factor = 0.6) {
  hex = hex.replace('#', '');
  if (hex.length === 3) {
    hex = hex.split('').map(c => c + c).join('');
  }
  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);
  const mix = c => Math.round(c + (255 - c) * factor);
  return `rgb(${mix(r)}, ${mix(g)}, ${mix(b)})`;
}

function applyCourseColor(key) {
  const color = courseColors[key] || '#9c27b0';
  const root = document.documentElement;
  root.style.setProperty('--accent-color', color);
  root.style.setProperty('--accent-light', lightenColor(color));
}

function resolvePath(file) {
  return scriptBase ? `${scriptBase}/${file}` : file;
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

function createCourseSidebar() {
  const sidebar = document.createElement('div');
  sidebar.id = 'course-sidebar';
  sidebar.classList.add('collapsed');
  const base = scriptBase || '.';
  const home = base + '/index.html';
  sidebar.innerHTML = `
    <button id="course-toggle" aria-label="Toggle course links">&#9776;</button>
    <nav>
      <a href="${home}#introPhilosophy" data-course="introPhilosophy">Intro</a>
      <a href="${home}#criticalThinking" data-course="criticalThinking">Reasoning</a>
      <a href="${home}#ethics" data-course="ethics">Ethics</a>
      <a href="${home}#logic" data-course="logic">Logic</a>
      <a href="${home}#writing" data-course="writing">Writing</a>
    </nav>`;
  document.body.appendChild(sidebar);
  const toggle = sidebar.querySelector('#course-toggle');
  if (toggle) toggle.addEventListener('click', () => {
    const collapsed = sidebar.classList.toggle('collapsed');
    toggle.textContent = collapsed ? '\u2630' : '\u00d7';
  });
}

function updatePageHeader(courseKey) {
  const header = document.getElementById('page-header');
  if (!header) return;
  if (!courseKey) {
    courseKey = header.dataset.defaultCourse;
  }
  const courseMap = {
    introPhilosophy: 'Intro to Philosophy',
    criticalThinking: 'Critical Thinking',
    ethics: 'Ethics',
    logic: 'Logic',
    writing: 'Writing'
  };
  const course = courseMap[courseKey] || (courseKey ? courseKey : 'Course');
  const h1 = document.querySelector('.container h1');
  const activity = h1 ? h1.textContent.trim() : 'Activity';
  header.textContent = `${course} \u2022 ${activity}`;
}

window.updatePageHeader = updatePageHeader;

function ensureOutcomesStyles() {
  if (document.getElementById('outcome-style')) return;
  const style = document.createElement('style');
  style.id = 'outcome-style';
  style.textContent = `
    #outcomes.learning-outcomes {
      margin-top: 0.5rem;
      padding: 0.5rem 0;
      font-size: 0.9em;
      color: var(--outcome-text, #555);
    }
    #outcomes.learning-outcomes h2 {
      font-size: 1em;
      margin: 0 0 0.25rem;
      color: inherit;
      font-weight: 600;
    }
    #outcomes.learning-outcomes ul {
      margin: 0;
      padding-left: 1.25rem;
    }
    #outcomes.learning-outcomes li {
      margin-bottom: 0.25rem;
      line-height: 1.4;
    }
  `;
  document.head.appendChild(style);
}

function renderOutcomes() {
  const container = document.querySelector('.container, main, body');
  const heading = container ? container.querySelector('h1') : document.querySelector('h1');
  if (!heading) return;
  let section = document.getElementById('outcomes');
  if (!section) {
    section = document.createElement('section');
    section.id = 'outcomes';
    section.className = 'learning-outcomes';
    section.setAttribute('aria-labelledby', 'outcomes-heading');
    section.hidden = true;
    section.innerHTML = '<h2 id="outcomes-heading">Learning outcomes</h2>';
    heading.insertAdjacentElement('afterend', section);
  }
  const outcomes = Array.isArray(window.activityOutcomes) ? window.activityOutcomes : [];
  const list = document.createElement('ul');
  list.className = 'outcome-items';
  outcomes.forEach(item => {
    const li = document.createElement('li');
    li.textContent = item;
    list.appendChild(li);
  });
  const existingList = section.querySelector('ul');
  if (existingList) existingList.remove();
  if (outcomes.length) {
    section.appendChild(list);
    section.hidden = false;
    section.removeAttribute('aria-hidden');
  } else {
    section.hidden = true;
    section.setAttribute('aria-hidden', 'true');
  }
}

window.renderActivityOutcomes = function(outcomes) {
  if (Array.isArray(outcomes)) {
    window.activityOutcomes = outcomes;
    renderOutcomes();
  }
};

function addSkipLink() {
  const link = document.createElement('a');
  link.href = '#main';
  link.className = 'skip-link';
  link.textContent = 'Skip to content';
  const first = document.body.firstChild;
  document.body.insertBefore(link, first);
}

function ensureMainId() {
  let main = document.getElementById('main');
  if (!main) {
    main = document.querySelector('main, .container');
    if (main) main.id = 'main';
  }
}

function initPageHeader() {
  const params = new URLSearchParams(window.location.search);
  const header = document.getElementById('page-header');
  let courseKey = params.get('course') || params.get('topic');
  if (!courseKey && header) {
    courseKey = header.dataset.defaultCourse;
  }
  applyCourseColor(courseKey);
  updatePageHeader(courseKey);

  ensureMainId();
  addSkipLink();
  ensureOutcomesStyles();
  renderOutcomes();

  loadHelpModal();
  createCourseSidebar();
  if (typeof createKeyTermsSidebar === 'function') {
    createKeyTermsSidebar(courseKey);
  }
}

if (document.readyState !== 'loading') {
  initPageHeader();
} else {
  window.addEventListener('DOMContentLoaded', initPageHeader);
}
