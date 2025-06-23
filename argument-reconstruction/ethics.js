// Reveal answer for each exercise
function setupReconstruction() {
  document.querySelectorAll('.reveal-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.target;
      const ans = document.getElementById(target);
      if (ans) ans.classList.remove('hidden');
    });
  });
}

document.addEventListener('DOMContentLoaded', setupReconstruction);
