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

function createCourseSidebar() {
  const sidebar = document.createElement('div');
  sidebar.id = 'course-sidebar';
  sidebar.classList.add('collapsed');
  const base = document.currentScript.src.substring(0, document.currentScript.src.lastIndexOf('/'));
  const home = base + '/index.html';
  sidebar.innerHTML = `
    <button id="course-toggle" aria-label="Toggle course links">&lsaquo;</button>
    <nav>
      <a href="${home}#introPhilosophy">Intro</a>
      <a href="${home}#criticalThinking">Critical</a>
      <a href="${home}#ethics">Ethics</a>
      <a href="${home}#logic">Logic</a>
    </nav>`;
  document.body.appendChild(sidebar);
  const toggle = sidebar.querySelector('#course-toggle');
  if (toggle) toggle.addEventListener('click', () => {
    const collapsed = sidebar.classList.toggle('collapsed');
    toggle.innerHTML = collapsed ? '&lsaquo;' : '&rsaquo;';
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
  let courseKey = params.get('course');
  if (!courseKey && header) {
    courseKey = header.dataset.defaultCourse;
  }
  const h1 = document.querySelector('.container h1');
  updatePageHeader(courseKey);

  ensureMainId();
  addSkipLink();

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
