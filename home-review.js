// Toggle exam dropdowns on the homepage

document.querySelectorAll('.review-btn').forEach(btn => {
  const dropdown = btn.nextElementSibling;
  btn.setAttribute('aria-expanded', 'false');
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    document.querySelectorAll('.exam-dropdown').forEach(dd => {
      if (dd !== dropdown) {
        dd.classList.add('hidden');
        const b = dd.previousElementSibling;
        if (b) b.setAttribute('aria-expanded', 'false');
      }
    });
    dropdown.classList.toggle('hidden');
    btn.setAttribute('aria-expanded', String(!dropdown.classList.contains('hidden')));
  });
});

// Update homepage course progress bars from localStorage
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.course').forEach(course => {
    const key = course.dataset.course;
    const bar = course.querySelector('.course-progress-bar');
    if (!key || !bar) return;
    const value = parseInt(localStorage.getItem(`progress-${key}`) || '0', 10);
    if (!isNaN(value)) {
      const pct = Math.min(Math.max(value, 0), 100);
      bar.style.width = pct + '%';
    }
  });
});

