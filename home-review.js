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

