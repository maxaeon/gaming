document.querySelectorAll('#topic-selector button').forEach(btn => {
  btn.addEventListener('click', () => {
    localStorage.setItem('selectedTopic', btn.dataset.topic);
    window.location.href = 'exam-select.html';
  });
});
