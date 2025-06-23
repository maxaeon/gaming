const concepts = [
  'Moral Dilemmas (where rules conflict)',
  'Nazi-at-the-door scenario (Kant)',
  'Doctrine of double effect (Aquinas)',
  'Importance of Consequences',
  'Empathy and Compassion',
  'Individual Circumstances',
  'Practical Wisdom (Aristotle)',
  'Limitations of Universal Rules',
  'Human Flourishing (eudaimonia)',
  'Real-life Examples (self-defense, lying to protect others, etc.)',
  'Context Sensitivity',
  'Rigidity of Exceptionless Rules',
  'Ethical Flexibility',
  'Intention vs. Outcome'
];

function buildPool() {
  const pool = document.getElementById('concept-pool');
  concepts.forEach((text, idx) => {
    const li = document.createElement('li');
    li.innerText = text;
    li.id = 'concept-' + idx;
    li.draggable = true;
    li.addEventListener('dragstart', e => {
      e.dataTransfer.setData('text/plain', li.id);
    });
    pool.appendChild(li);
  });
}

function enableDrops() {
  document.querySelectorAll('.drop-zone').forEach(zone => {
    zone.addEventListener('dragover', e => e.preventDefault());
    zone.addEventListener('drop', e => {
      e.preventDefault();
      const id = e.dataTransfer.getData('text/plain');
      const item = document.getElementById(id);
      if (item) zone.querySelector('ul').appendChild(item);
    });
  });
}

document.getElementById('show-suggested').addEventListener('click', () => {
  const example =
    '<strong>Cluster 1: Problems with Absolute Rules</strong><ul>' +
    '<li>Moral Dilemmas (where rules conflict)</li>' +
    '<li>Nazi-at-the-door scenario (Kant)</li>' +
    '<li>Rigidity of Exceptionless Rules</li>' +
    '<li>Doctrine of double effect (Aquinas)</li></ul>' +
    '<strong>Cluster 2: Importance of Context and Consequences</strong><ul>' +
    '<li>Individual Circumstances</li>' +
    '<li>Importance of Consequences</li>' +
    '<li>Real-life Examples (self-defense, lying to protect others, etc.)</li>' +
    '<li>Context Sensitivity</li></ul>' +
    '<strong>Cluster 3: Alternative Moral Considerations</strong><ul>' +
    '<li>Empathy and Compassion</li>' +
    '<li>Practical Wisdom (Aristotle)</li>' +
    '<li>Human Flourishing (eudaimonia)</li>' +
    '<li>Intention vs. Outcome</li>' +
    '<li>Ethical Flexibility</li></ul>';
  const div = document.getElementById('suggested');
  div.innerHTML = example;
  div.classList.remove('hidden');
});

window.addEventListener('DOMContentLoaded', () => {
  buildPool();
  enableDrops();
});
