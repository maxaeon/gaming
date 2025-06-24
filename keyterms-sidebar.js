function createKeyTermsSidebar(courseKey) {
  if (document.body.classList.contains('home')) return;
  const termMap = {
    introPhilosophy: [
      'Dualism',
      'Materialism',
      'Natural Law'
    ],
    criticalThinking: [
      'Deductive Argument',
      'Inductive Argument',
      'Logical Fallacy',
      'Fact Verification'
    ],
    ethics: [
      'Categorical Imperative',
      'Consequentialism',
      'Deontology',
      'Virtue Ethics',
      'Eudaimonia',
      'Practical Wisdom',
      'Philosophical Bullshit',
      'Environmental Impact of AI'
    ]
  };
  const terms = termMap[courseKey];
  if (!terms) return;
  const sidebar = document.createElement('div');
  sidebar.id = 'keyterm-sidebar';
  sidebar.classList.add('collapsed');
  sidebar.innerHTML = `<button id="keyterm-toggle" aria-label="Toggle Key Terms">&lsaquo;</button>` +
    `<div id="keyterm-content"><h2>Key Terms</h2><ul class="explain-list">` +
    terms.map(t => `<li><span class="explain-term" data-term="${t}"><em><strong>${t}</strong></em></span></li>`).join('') +
    `</ul></div>`;
  document.body.appendChild(sidebar);
  const toggle = sidebar.querySelector('#keyterm-toggle');
  toggle.addEventListener('click', () => {
    const collapsed = sidebar.classList.toggle('collapsed');
    toggle.innerHTML = collapsed ? '&lsaquo;' : '&rsaquo;';
  });
  if (typeof attachExplainHandlers === 'function') {
    attachExplainHandlers();
  }
}

if (typeof window !== 'undefined') {
  window.createKeyTermsSidebar = createKeyTermsSidebar;
}
