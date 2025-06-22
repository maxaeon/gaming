// Handles topic dropdown toggling and exam selection on index.html

document.querySelectorAll('#topic-selector .topic-btn').forEach(topicBtn => {
  topicBtn.addEventListener('click', () => {
    const dropdown = topicBtn.nextElementSibling;
    // Close other dropdowns
    document.querySelectorAll('#topic-selector .exam-dropdown').forEach(dd => {
      if (dd !== dropdown) dd.classList.add('hidden');
    });
    dropdown.classList.toggle('hidden');
  });
});

// When an exam button is clicked, load questions and reveal the board

document.querySelectorAll('#topic-selector .exam-dropdown button').forEach(examBtn => {
  examBtn.addEventListener('click', () => {
    const examType = examBtn.dataset.exam;
    const topic = examBtn.closest('.course').querySelector('.topic-btn').dataset.topic;
    document.getElementById('topic-selector').classList.add('hidden');
    document.getElementById('jeopardy-board').classList.remove('hidden');
    loadQuestions(topic, examType);
  });
});
