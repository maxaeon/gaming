const citationData = {
  incorrect: 'Kant believes that one must never lie, writing, "Truthfulness in statements is a sacred duty..." (Kant, Ethics, pg. 31).',
  better: 'Kant argues explicitly against lying, writing, "To be truthful in all declarations is therefore a sacred command of reason..." (Kant 31).',
  source: 'Kant, Immanuel. <em>Groundwork of the Metaphysics of Morals</em>. Translated by Mary Gregor, Cambridge University Press, 1997.'
};

const conceptItems = [
  'Nazi-at-the-door case',
  'Doctrine of double effect (criticism)',
  'Individual circumstances',
  'Empathy and compassion',
  'Human flourishing (Aristotle)',
  'Importance of consequences',
  'Rigidity of absolute rules',
  'Moral dilemmas'
];

const orderSentences = [
  'Moral decisions often depend on circumstances and outcomes.',
  'Kant\u2019s insistence on absolute moral rules overlooks these important moral considerations.',
  'Thus, exceptionless moral rules are problematic.'
];

const betterThesis = 'While Kant asserts morality demands rules without exceptions, practical morality must consider outcomes and specific circumstances, making his position overly rigid.';

const rewriteExample = {
  prompt: "It could seem that Kant's views about moral rules, though sometimes reasonable, do not always clearly consider relevant complications from real-life complexities.",
  better: 'Although Kant\u2019s views on moral rules have merit, they can lead agents astray when moral principles or values come into conflict, such as when one must choose between lying and saving an innocent life.'
};

const dialogueExample = {
  prompt: 'Kant are totally wrong. They don\'t realize lying can sometimes save lives.',
  better: [
    'The paragraph should avoid oversimplified claims like \"totally wrong.\"',
    'Include explicit references to specific cases (e.g., Kant\u2019s Nazi-at-the-door case) to clarify and strengthen your critique.'
  ]
};

const proofExample = {
  prompt: "Aquinas say's explicitly in his Summa theologica that lying is always wrong (Aquinas Summa pg. 423).",
  better: 'Aquinas explicitly states in his <em>Summa Theologica</em> that lying is always morally wrong (Aquinas 423).',
  source: 'Aquinas, Thomas. <em>Summa Theologica</em>. Translated by the Fathers of the English Dominican Province, Benziger Brothers, 1947.'
};

const aiExample = {
  prompt: 'Kant\u2019s absolute rules ignore morally relevant consequences, making their ethics overly rigid.',
  better: 'The insistence on absolute moral rules by Kant neglects important considerations of consequences, resulting in overly rigid moral frameworks.'
};

function showCitation() {
  document.getElementById('citation-prompt').innerText = citationData.incorrect;
}

document.getElementById('citation-submit').addEventListener('click', () => {
  const ans = `<strong>Example Provided:</strong> ${citationData.better}<br><em>Source:</em> ${citationData.source}`;
  document.getElementById('citation-answer').innerHTML = ans;
  document.getElementById('citation-answer').classList.remove('hidden');   document.getElementById('citation-answer').hidden = false;
});

function buildConcepts() {
  const list = document.getElementById('concept-list');
  conceptItems.forEach(item => {
    const li = document.createElement('li');
    li.innerText = item;
    list.appendChild(li);
  });
}

document.getElementById('concept-submit').addEventListener('click', () => {
  const ans = 'Example provided: {Consequences & circumstances} [Importance of consequences, Nazi-at-the-door case, Individual circumstances]; {Critiques of rigidity} [Doctrine of double effect (criticism), Rigidity of absolute rules, Moral dilemmas]; {Human values} [Empathy and compassion, Human flourishing (Aristotle)].';
  document.getElementById('concept-answer').innerText = ans;
  document.getElementById('concept-answer').classList.remove('hidden');   document.getElementById('concept-answer').hidden = false;
});

let currentOrder = [2,0,1];
function renderOrder() {
  const list = document.getElementById('order-list');
  list.innerHTML = '';
  currentOrder.forEach((idx, i) => {
    const li = document.createElement('li');
    li.innerText = orderSentences[idx];
    const up = document.createElement('button');
    up.innerText = '↑';
    up.onclick = () => { if (i>0) { [currentOrder[i-1], currentOrder[i]] = [currentOrder[i], currentOrder[i-1]]; renderOrder(); } };
    const down = document.createElement('button');
    down.innerText = '↓';
    down.onclick = () => { if (i<currentOrder.length-1) { [currentOrder[i+1], currentOrder[i]] = [currentOrder[i], currentOrder[i+1]]; renderOrder(); } };
    li.append(' ', up, down);
    list.appendChild(li);
  });
}

document.getElementById('check-order').addEventListener('click', () => {
  const correct = currentOrder.every((val, idx) => val === idx);
  const fb = document.getElementById('order-feedback');
  if (correct) {
    fb.innerHTML = '<strong>Correct!</strong>';
  } else {
    fb.innerText = 'Not quite. Try again or reveal the example provided.';
    document.getElementById('order-reveal').classList.remove('hidden');     document.getElementById('order-reveal').hidden = false;
  }
});

document.getElementById('order-reveal').addEventListener('click', () => {
  document.getElementById('order-answer').innerHTML = orderSentences.map(s => `<div>${s}</div>`).join('');
  document.getElementById('order-answer').classList.remove('hidden');   document.getElementById('order-answer').hidden = false;
});

function showRewritePrompt() {
  document.getElementById('rewrite-prompt').innerText = rewriteExample.prompt;
}

document.getElementById('rewrite-reveal').addEventListener('click', () => {
  document.getElementById('rewrite-answer').innerHTML = `<strong>Example Provided:</strong> ${rewriteExample.better}`;
  document.getElementById('rewrite-answer').classList.remove('hidden');   document.getElementById('rewrite-answer').hidden = false;
});

document.getElementById('thesis-reveal').addEventListener('click', () => {
  document.getElementById('thesis-answer').innerHTML = `<strong>Example Provided:</strong> ${betterThesis}`;
  document.getElementById('thesis-answer').classList.remove('hidden');   document.getElementById('thesis-answer').hidden = false;
});

function showDialoguePrompt() {
  document.getElementById('dialogue-prompt').innerText = dialogueExample.prompt;
}

document.getElementById('dialogue-reveal').addEventListener('click', () => {
  const list = document.getElementById('dialogue-answer');
  list.innerHTML = '';
  dialogueExample.better.forEach(item => {
    const li = document.createElement('li');
    li.innerText = item;
    list.appendChild(li);
  });
  list.classList.remove('hidden');   list.hidden = false;
});

function showProofPrompt() {
  document.getElementById('proof-prompt').innerText = proofExample.prompt;
}

document.getElementById('proof-reveal').addEventListener('click', () => {
  document.getElementById('proof-answer').innerHTML = `<strong>Example Provided:</strong> ${proofExample.better}<br><em>Source:</em> ${proofExample.source}`;
  document.getElementById('proof-answer').classList.remove('hidden');   document.getElementById('proof-answer').hidden = false;
});

document.getElementById('ai-reveal').addEventListener('click', () => {
  document.getElementById('ai-answer').innerHTML = `<strong>Example Provided:</strong> ${aiExample.better}`;
  document.getElementById('ai-answer').classList.remove('hidden');   document.getElementById('ai-answer').hidden = false;
});

function showAIPrompt() {
  document.getElementById('ai-prompt').innerText = aiExample.prompt;
}

showCitation();
buildConcepts();
renderOrder();
showRewritePrompt();
showDialoguePrompt();
showProofPrompt();
showAIPrompt();

document.getElementById('start-project').addEventListener('click', () => {
  document.getElementById('project-area').classList.remove('hidden');   document.getElementById('project-area').hidden = false;
});

document.getElementById('reset-notes').addEventListener('click', () => {
  document.getElementById('project-notes').value = '';
});

document.getElementById('export-notes').addEventListener('click', () => {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  doc.text(document.getElementById('project-notes').value, 10, 10);
  doc.save('notes.pdf');
});

