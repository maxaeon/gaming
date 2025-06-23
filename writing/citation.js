const citationExercises = [
  {
    incorrect: 'Kant claims that moral rules must be universal without exception (Kant, Groundwork, p. 31).',
    apa: 'Kant (1785/1997) claims that moral rules must be universal without exception (<em>Groundwork of the Metaphysics of Morals</em>, p. 31).',
    mla: 'Kant claims that moral rules must be universal without exception (<em>Groundwork of the Metaphysics of Morals</em> 31).',
    explanation: 'APA needs the publication date and translator; MLA omits the date but italicizes the title and gives the page number without "p.".'
  },
  {
    incorrect: 'Aquinas argues that moral actions follow natural law (Summa Theologica, Aquinas, p. 423).',
    apa: 'Aquinas (1274/1947) argues that moral actions must follow natural law (<em>Summa Theologica</em>, p. 423).',
    mla: 'Aquinas argues moral actions must follow natural law (<em>Summa Theologica</em> 423).',
    explanation: 'Include author, date, and translator in APA; MLA keeps it simpler with the title and page number.'
  },
  {
    incorrect: 'Nussbaum claims that ethics must consider human capabilities ("Ethics and Capabilities," Philosophy Review, Martha Nussbaum, 2011, 56).',
    apa: 'Nussbaum, M. C. (2011). Ethics and capabilities. <em>Philosophy Review</em>, 23(2), 56.',
    mla: 'Nussbaum, Martha C. "Ethics and Capabilities." <em>Philosophy Review</em>, vol. 23, no. 2, 2011, p. 56.',
    explanation: 'APA uses initials and year in parentheses; MLA lists the volume and issue with "vol." and "no.".'
  },
  {
    incorrect: 'Rachels claims euthanasia can be morally permissible ("The Morality of Euthanasia," James Rachels, Ethics Collection, 1998, p. 104).',
    apa: 'Rachels, J. (1998). The morality of euthanasia. In J. Smith (Ed.), <em>Ethics Collection</em> (pp. 104–116). Routledge.',
    mla: 'Rachels, James. "The Morality of Euthanasia." <em>Ethics Collection</em>, edited by John Smith, Routledge, 1998, pp. 104–116.',
    explanation: 'APA specifies the editor and page range; MLA introduces the editor with "edited by".'
  }
];

let citationIndex = 0;

function showCitation() {
  const ex = citationExercises[citationIndex];
  document.getElementById('citation-prompt').innerText = ex.incorrect;
  document.getElementById('citation-input').value = '';
  document.getElementById('citation-answer').classList.add('hidden');
  document.getElementById('citation-next').classList.add('hidden');
}

function revealCitation() {
  const ex = citationExercises[citationIndex];
  const ansDiv = document.getElementById('citation-answer');
  ansDiv.innerHTML = `<strong>APA:</strong> ${ex.apa}<br><strong>MLA:</strong> ${ex.mla}<br><em>${ex.explanation}</em>`;
  ansDiv.classList.remove('hidden');
  document.getElementById('citation-next').classList.remove('hidden');
}

document.getElementById('citation-reveal').addEventListener('click', revealCitation);
document.getElementById('citation-next').addEventListener('click', () => {
  citationIndex = (citationIndex + 1) % citationExercises.length;
  showCitation();
});

window.addEventListener('DOMContentLoaded', showCitation);
