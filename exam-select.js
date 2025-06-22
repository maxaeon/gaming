const topic = localStorage.getItem('selectedTopic');

// If topic wasn't selected, redirect back to index
if (!topic) {
  window.location.href = 'index.html';
}

// Handle exam selection
document.querySelectorAll('#exam-selector button').forEach(btn => {
  btn.addEventListener('click', () => {
    const exam = btn.dataset.exam;
    localStorage.setItem('selectedExam', exam);

    // hide selector and show board
    document.getElementById('exam-selector').classList.add('hidden');
    document.getElementById('jeopardy-board').classList.remove('hidden');

    // load questions using topic and exam type
    loadQuestions(topic, exam);
  });
});
