const steps = [
  'Welcome! Select a course to see its activities.',
  'Use the sidebar to move between courses.',
  'Each activity includes a short description of what you\'ll do.'
];
let stepIndex = 0;
function showStep() {
  const text = document.getElementById('tour-text');
  const btn = document.getElementById('tour-next');
  if (!text || !btn) return;
  text.textContent = steps[stepIndex];
  btn.textContent = stepIndex === steps.length - 1 ? 'Done' : 'Next';
}
function endTour() {
  const modal = document.getElementById('tour-modal');
  if (modal) {
    modal.classList.add('hidden');
    modal.hidden = true;
    localStorage.setItem('tour-complete', '1');
  }
}
document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('tour-modal');
  const btn = document.getElementById('tour-next');
  if (!modal || !btn) return;
  if (!localStorage.getItem('tour-complete')) {
    modal.classList.remove('hidden');
    modal.hidden = false;
    showStep();
  }
  btn.addEventListener('click', () => {
    stepIndex++;
    if (stepIndex >= steps.length) {
      endTour();
    } else {
      showStep();
    }
  });
});
