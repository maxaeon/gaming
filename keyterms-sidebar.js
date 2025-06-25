const courseColors = {
  introPhilosophy: '#9c27b0',
  criticalThinking: '#f44336',
  ethics: '#2196f3',
  logic: '#ffeb3b',
  writing: '#424242'
};

function createKeyTermsSidebar(courseKey) {
  if (document.body.classList.contains('home')) return;
  const termMap = {
    introPhilosophy: [
      'Dualism',
      'Materialism',
      'Natural Law',
      'Socratic Method',
      'Forms',
      'Prime Mover',
      'Stoicism',
      'Ontological Argument',
      'Rationalism',
      'Empiricism'
    ],
    criticalThinking: [
      'Deductive Argument',
      'Inductive Argument',
      'Logical Fallacy',
      'Fact Verification',
      'Confirmation Bias',
      'Sociocentrism',
      'Premise Indicator',
      'Conclusion Indicator',
      'Counterexample',
      'Ad Hominem'
    ],
    ethics: [
      'Categorical Imperative',
      'Consequentialism',
      'Deontology',
      'Virtue Ethics',
      'Eudaimonia',
      'Practical Wisdom',
      'Philosophical Bullshit',
      'Environmental Impact of AI',
      'Subjective Relativism',
      'Ethical Egoism',
      'Utilitarianism'
    ],
    logic: [
      'Validity',
      'Soundness',
      'Modus Ponens',
      'Modus Tollens',
      'Disjunctive Syllogism',
      'Hypothetical Syllogism',
      'Categorical Proposition',
      'Universal Affirmative',
      'Universal Negative',
      'Truth Table'
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
  const color = courseColors[courseKey] || '#009688';
  sidebar.style.borderLeftColor = color;
  toggle.style.background = color;
  toggle.addEventListener('click', (event) => {
    event.stopPropagation();
    const collapsed = sidebar.classList.toggle('collapsed');
    toggle.innerHTML = collapsed ? '&lsaquo;' : '&rsaquo;';
  });

  sidebar.addEventListener('click', () => {
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
