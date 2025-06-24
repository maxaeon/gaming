// List of section ids in the order they appear. The optional "reflect" step
// was removed from the activity, so it is no longer included here.
const sections = ['intro','example','practice','template'];

function showSection(id) {
  // Hide all tracked sections first
  sections.forEach(sec => {
    const el = document.getElementById(sec);
    if (el) {
      el.classList.add('hidden');
      el.hidden = true;
    }
  });

  if (id === 'practice') {
    // When practicing, keep the example visible for reference
    ['example', 'practice'].forEach(sec => {
      const el = document.getElementById(sec);
      if (el) {
        el.classList.remove('hidden');
        el.hidden = false;
      }
    });
  } else {
    const target = document.getElementById(id);
    if (target) {
      target.classList.remove('hidden');
      target.hidden = false;
    }
  }
}

document.querySelectorAll('.next-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const next = btn.dataset.next;
    if (next) showSection(next);
  });
});

const analysisItems = [
  '<strong>Feedback on Thesis Clarity:</strong> The thesis ("Kant\u2019s theory has some problems because it doesn\u2019t consider real-life complexities") is present but vague. Consider revising to clearly state your argument, such as: "Kant\u2019s moral absolutism is inadequate for real-world moral decision-making because it rigidly ignores context and consequences."',
  '<strong>Feedback on Argument Structure:</strong> You briefly explain Kant\u2019s theory in paragraph one, which is good, but you jump quickly to criticisms without enough supporting detail. A stronger structure would clearly separate Kant\u2019s views from your critique and support those criticisms with detailed examples.',
  '<strong>Feedback on Citation Use:</strong> You provide Kant\u2019s murderer-at-the-door scenario without citing the original source. An accurate citation helps build credibility.',
  '<strong>Feedback on Use of Questions:</strong> Avoid rhetorical questions and instead clearly assert your position with reasons.',
  '<strong>Additional Suggestions:</strong> Strengthen your conclusion by explicitly summarizing your key criticisms of Kant.',
  '<em>APA Example:</em> Kant, I. (1797/1996). <em>The Metaphysics of Morals</em>. Cambridge University Press.',
  '<em>MLA Example:</em> Kant, Immanuel. <em>The Metaphysics of Morals</em>. Translated by Mary Gregor, Cambridge UP, 1996.'
];

function toggleAnalysis(btnId, listId) {
  const btn = document.getElementById(btnId);
  const list = document.getElementById(listId);
  if (!btn || !list) return;
  btn.addEventListener('click', () => {
    if (list.classList.contains('hidden')) {
      list.innerHTML = '';
      analysisItems.forEach(t => {
        const li = document.createElement('li');
        li.innerHTML = t;
        list.appendChild(li);
      });
      list.classList.remove('hidden');
      list.hidden = false;
      btn.innerText = 'Hide Analysis';
    } else {
      list.classList.add('hidden');
      list.hidden = true;
      btn.innerText = 'Show Analysis';
    }
  });
}

toggleAnalysis('analysis-toggle', 'analysis-list');
toggleAnalysis('practice-show', 'practice-answer');

function downloadTemplate() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  let y = 10;
  const pageHeight = doc.internal.pageSize.getHeight();

  function check(extra = 0) {
    if (y + extra > pageHeight - 10) {
      doc.addPage();
      y = 10;
    }
  }

  function field(label) {
    check(10);
    doc.text(label, 10, y);
    doc.line(60, y + 1, 200, y + 1);
    y += 10;
  }

  function boxes(opts) {
    check(8);
    opts.forEach((opt, i) => {
      const x = 10 + i * 40;
      doc.rect(x, y - 4, 4, 4);
      doc.text(opt, x + 6, y);
    });
    y += 8;
  }

  function feedback(lines) {
    check(lines * 6 + 6);
    doc.text('Feedback:', 10, y);
    y += 6;
    for (let i = 0; i < lines; i++) {
      doc.line(10, y, 200, y);
      y += 6;
    }
    y += 2;
  }

  doc.setFontSize(16);
  doc.text('Philosophy Paper Peer Review Worksheet', 10, y);
  y += 10;
  doc.setFontSize(12);

  ['Course Name:', 'Reviewer Name:', 'Paper Author Name:',
   'Paper Topic/Title:', 'Date of Review:'].forEach(field);

  y += 4;
  doc.setFontSize(14);
  doc.text('Step 1: Thesis Statement', 10, y); y += 8;
  doc.setFontSize(12);
  doc.text('Is the thesis statement clear, specific, and argumentative?', 10, y); y += 6;
  boxes(['Yes', 'No', 'Partially']);
  feedback(3);

  doc.setFontSize(14);
  doc.text('Step 2: Organization & Clarity', 10, y); y += 8;
  doc.setFontSize(12);
  doc.text('Does the paper have a clear logical structure?', 10, y); y += 6;
  boxes(['Yes', 'No', 'Partially']);
  feedback(3);

  doc.setFontSize(14);
  doc.text('Step 3: Quality of Argumentation', 10, y); y += 8;
  doc.setFontSize(12);
  doc.text('Does each paragraph clearly support the thesis or main claim?', 10, y); y += 6;
  boxes(['Yes', 'No', 'Partially']);
  doc.text('Does the author use clear evidence/examples from course texts or reputable sources?', 10, y); y += 6;
  boxes(['Yes', 'No', 'Partially']);
  feedback(3);

  doc.setFontSize(14);
  doc.text('Step 4: Citations and References', 10, y); y += 8;
  doc.setFontSize(12);
  doc.text('Are in-text citations accurate, clear, and consistently formatted (MLA/APA)?', 10, y); y += 6;
  boxes(['Yes', 'No', 'Partially']);
  doc.text('Are all references correctly formatted and relevant to the topic?', 10, y); y += 6;
  boxes(['Yes', 'No', 'Partially']);
  feedback(3);

  doc.setFontSize(14);
  doc.text('Step 5: Style, Grammar, and Readability', 10, y); y += 8;
  doc.setFontSize(12);
  doc.text('Is the writing clear, professional, and easy to understand?', 10, y); y += 6;
  boxes(['Yes', 'No', 'Partially']);
  doc.text('Are there significant grammar, spelling, or punctuation issues?', 10, y); y += 6;
  boxes(['Yes', 'No', 'Partially']);
  feedback(3);

  doc.setFontSize(14);
  doc.text('Step 6: Constructive Summary', 10, y); y += 8;
  doc.setFontSize(12);
  doc.text('Identify at least TWO strengths of the paper clearly:', 10, y); y += 6;
  doc.text('1.', 12, y); doc.line(18, y + 1, 200, y + 1); y += 8;
  doc.text('2.', 12, y); doc.line(18, y + 1, 200, y + 1); y += 8;
  doc.text('Clearly list at least TWO specific areas for improvement:', 10, y); y += 6;
  doc.text('1.', 12, y); doc.line(18, y + 1, 200, y + 1); y += 8;
  doc.text('2.', 12, y); doc.line(18, y + 1, 200, y + 1); y += 8;
  doc.text('Provide at least ONE concrete suggestion to help the author revise effectively:', 10, y); y += 6;
  doc.line(10, y, 200, y); y += 8;
  doc.line(10, y, 200, y); y += 8;
  doc.line(10, y, 200, y); y += 8;

  doc.save('peer-review-template.pdf');
}

document.getElementById('download-template').addEventListener('click', downloadTemplate);

window.addEventListener('DOMContentLoaded', () => showSection('intro'));
