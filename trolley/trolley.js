const scenarios = [
  {
    description: "A runaway trolley is barreling down the track toward five innocent workers tied to the rails. You can pull a lever and divert the trolley onto another track, where it will kill one innocent worker instead.",
    actionLabel: "Pull the Lever",
    inactionLabel: "Do Nothing",
    actionOutcome: "You pull the lever, saving five people but killing one.",
    inactionOutcome: "You do nothing and the trolley kills five people.",
    reflection: "Did you choose to maximize lives saved, or did another moral consideration influence your decision?"
  },
  {
    description: "You stand on a footbridge overlooking the trolley track. A runaway trolley below is about to hit five people. A large man stands next to you. If you push him off the bridge onto the track below, he'll die but will stop the trolley, saving the five others.",
    actionLabel: "Push the Man",
    inactionLabel: "Do Nothing",
    actionOutcome: "You push the man. He dies, but the trolley stops before hitting the five people.",
    inactionOutcome: "You do nothing. The trolley kills the five people on the track.",
    reflection: "Did the difference between actively causing harm versus passively allowing harm affect your decision? Why or why not?"
  },
  {
    description: "A trolley is about to kill three strangers. You can divert the trolley onto another track, but it will kill one close family member or friend tied to that track instead.",
    actionLabel: "Sacrifice Loved One",
    inactionLabel: "Protect Loved One",
    actionOutcome: "You divert the trolley, saving the strangers but killing someone close to you.",
    inactionOutcome: "You do nothing. The trolley kills the three strangers, sparing your loved one.",
    reflection: "Reflect on why personal relationships influenced your decision. Should personal attachments override objective calculations about numbers?"
  },
  {
    description: "You're a surgeon with five patients, each needing a different organ transplant. Without transplants, they'll die. A healthy, innocent visitor has arrived—perfectly matching all five patients. You can secretly kill this visitor to save five lives.",
    actionLabel: "Kill Visitor",
    inactionLabel: "Do Nothing",
    actionOutcome: "You kill the visitor and use the organs to save the five patients.",
    inactionOutcome: "You do nothing. The five patients die awaiting organs.",
    reflection: "Does involving active murder in this medical context differ morally from diverting the trolley? Why or why not?"
  },
  {
    description: "An angry mob threatens to riot, potentially killing many innocent people unless you publicly execute a single innocent prisoner. Executing this innocent person would stop the riot.",
    actionLabel: "Execute Prisoner",
    inactionLabel: "Do Nothing",
    actionOutcome: "You execute the innocent prisoner. The mob disperses, preventing further deaths.",
    inactionOutcome: "You do nothing. The mob riots and many innocents are harmed.",
    reflection: "Does the innocent prisoner’s right to life outweigh the greater number of lives potentially saved?"
  }
];

const aiScenario = {
  description: "A trolley is heading toward a highly-skilled surgeon who saves thousands of lives annually. You can divert the trolley onto another track where it will kill five people with no special skills or roles. What do you choose?",
  actionLabel: "Divert Toward Five",
  inactionLabel: "Save the Surgeon",
  actionOutcome: "You divert the trolley, sacrificing five to save the surgeon.",
  inactionOutcome: "You do nothing and the surgeon dies, but the five others live.",
  reflection: "Did considering social roles or future consequences influence your decision here?"
};

let currentIndex = 0;
let pullCount = 0;
let inactionCount = 0;

const scenarioText = document.getElementById('scenario-text');
const actionBtn = document.getElementById('action-btn');
const inactionBtn = document.getElementById('inaction-btn');
const resultDiv = document.getElementById('result');
const resultText = document.getElementById('result-text');
const reflectionText = document.getElementById('reflection-question');
const nextBtn = document.getElementById('next-btn');
const summaryDiv = document.getElementById('summary');

function showScenario() {
  const data = scenarios[currentIndex];
  scenarioText.innerText = data.description;
  actionBtn.innerText = data.actionLabel;
  inactionBtn.innerText = data.inactionLabel;
  resultDiv.classList.add('hidden');
  document.getElementById('scenario').classList.remove('hidden');
}

function handleChoice(choice) {
  const data = scenarios[currentIndex];
  const outcome = choice === 'action' ? data.actionOutcome : data.inactionOutcome;
  if (choice === 'action') pullCount++; else inactionCount++;
  resultText.innerText = outcome;
  reflectionText.innerText = data.reflection;
  resultDiv.classList.remove('hidden');
  document.getElementById('scenario').classList.add('hidden');
}

function nextScenario() {
  currentIndex++;
  if (currentIndex < scenarios.length) {
    showScenario();
  } else {
    showSummary();
  }
}

function showSummary() {
  resultDiv.classList.add('hidden');
  summaryDiv.classList.remove('hidden');
  summaryDiv.innerHTML =
    `<p>You chose the utilitarian option ${pullCount} time(s) and refused ${inactionCount} time(s).</p>` +
    `<p>Consequences matter, but ethics also involves principles, rights, and virtues beyond mere calculation.</p>`;
}


actionBtn.addEventListener('click', () => handleChoice('action'));
inactionBtn.addEventListener('click', () => handleChoice('inaction'));
nextBtn.addEventListener('click', nextScenario);

window.addEventListener('DOMContentLoaded', () => {
  scenarios.push(aiScenario);
  showScenario();
});
