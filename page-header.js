// Dynamic header text based on query parameters
window.addEventListener('DOMContentLoaded', () => {
  const header = document.getElementById('page-header');
  if (!header) return;
  const params = new URLSearchParams(window.location.search);
  const courseMap = {
    introPhilosophy: 'Intro to Philosophy',
    criticalThinking: 'Critical Thinking',
    ethics: 'Ethics',
    writing: 'Writing'
  };
  const courseKey = params.get('course');
  const course = courseMap[courseKey] || (courseKey ? courseKey : 'Course');
  const h1 = document.querySelector('.container h1');
  const activity = h1 ? h1.textContent.trim() : 'Activity';
  header.textContent = `${course} \u2022 ${activity}`;
});
