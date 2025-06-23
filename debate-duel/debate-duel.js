const topics = {
  A: {
    title: "Should social media platforms regulate misinformation?",
    rounds: [
      {
        opponent: "Social media should never regulate misinformation because doing so violates free speech and opens the door to censorship.",
        options: [
          { text: "Protecting free speech is important, but allowing harmful misinformation like dangerous medical falsehoods can directly harm public health.", type: "strong", feedback: "Strong response! You've balanced free speech considerations with evidence of potential harm." },
          { text: "You're wrong—regulation is always needed because people lie.", type: "weak", feedback: "Weak response: Your claim lacks clarity and evidence." },
          { text: "So you're saying you support people lying and causing harm?", type: "fallacious", feedback: "Fallacious response: You've used a logical fallacy (strawman)—misrepresenting your opponent’s argument." }
        ]
      },
      {
        opponent: "But if we allow regulation, who decides what counts as misinformation? It risks becoming subjective and biased.",
        options: [
          { text: "You raise a valid concern about bias, which is why transparent guidelines and independent fact-checking standards are necessary.", type: "strong", feedback: "Strong response! You addressed the bias concern and proposed safeguards." },
          { text: "Bias happens anyway, so we shouldn't worry too much.", type: "weak", feedback: "Weak response: This dismissal doesn't address the bias problem." },
          { text: "If we don't regulate misinformation, society will completely collapse.", type: "fallacious", feedback: "Fallacious response: That's a slippery slope fallacy." }
        ]
      }
    ]
  },
  B: {
    title: "Is artificial intelligence beneficial or dangerous?",
    rounds: [
      {
        opponent: "AI is beneficial; it automates tedious tasks and enhances productivity.",
        options: [
          { text: "AI indeed provides benefits, but ignoring potential harms like job loss and biases can be dangerous. Balance is key.", type: "strong", feedback: "Strong response! You acknowledged benefits while highlighting potential harms." },
          { text: "AI just takes away jobs; it’s bad.", type: "weak", feedback: "Weak response: It's vague and lacks supporting reasoning." },
          { text: "Either AI saves the world or destroys humanity—there’s no middle ground.", type: "fallacious", feedback: "Fallacious response: This presents a false dilemma." }
        ]
      },
      {
        opponent: "But focusing on potential dangers could slow down innovation and economic growth.",
        options: [
          { text: "True, but responsible development explicitly addresses risks while still allowing progress.", type: "strong", feedback: "Strong response! You advocate balanced progress with risk management." },
          { text: "Innovation matters more than anything.", type: "weak", feedback: "Weak response: This overlooks valid safety concerns." },
          { text: "If we allow AI, it will inevitably wipe out humanity.", type: "fallacious", feedback: "Fallacious response: This is a slippery slope to extinction." }
        ]
      }
    ]
  },
  C: {
    title: "Should animal testing be banned in all circumstances?",
    rounds: [
      {
        opponent: "Animal testing helps save human lives by enabling vital medical advances.",
        options: [
          { text: "Medical advances are important, but reducing unnecessary suffering by seeking alternatives wherever possible should be our goal.", type: "strong", feedback: "Strong response! You acknowledged benefits while proposing humane alternatives." },
          { text: "Animal testing is cruel, end of story.", type: "weak", feedback: "Weak response: This ignores the reasoning about medical advances." },
          { text: "Anyone supporting animal testing explicitly enjoys animal cruelty.", type: "fallacious", feedback: "Fallacious response: That's an appeal to emotion." }
        ]
      },
      {
        opponent: "Completely banning it could halt progress on lifesaving treatments.",
        options: [
          { text: "That's why many advocate tighter regulation and investment in alternatives rather than an outright ban.", type: "strong", feedback: "Strong response! You provide a balanced compromise." },
          { text: "Progress will happen anyway.", type: "weak", feedback: "Weak response: This doesn't address the issue." },
          { text: "If we ban testing, humanity will never cure diseases again.", type: "fallacious", feedback: "Fallacious response: That's a slippery slope." }
        ]
      }
    ]
  },
  D: {
    title: "Should college education be tuition-free?",
    rounds: [
      {
        opponent: "Tuition-free college places an unfair tax burden on people who don’t benefit from higher education.",
        options: [
          { text: "Your fairness concern is important, but investing in education benefits society through better employment, lower crime rates, and economic growth.", type: "strong", feedback: "Strong response! You address fairness while explaining societal benefits." },
          { text: "Everyone should just pay taxes anyway; who cares?", type: "weak", feedback: "Weak response: This ignores the fairness objection." },
          { text: "Only selfish people oppose tuition-free education.", type: "fallacious", feedback: "Fallacious response: That's an ad hominem." }
        ]
      },
      {
        opponent: "But how would we fund it without cutting other essential programs?",
        options: [
          { text: "We could explore a mix of progressive taxes and cost-sharing plans while carefully evaluating spending priorities.", type: "strong", feedback: "Strong response! You proposed constructive funding options." },
          { text: "Funding isn't a big deal; money will appear.", type: "weak", feedback: "Weak response: This doesn't provide a realistic solution." },
          { text: "If we don't make college free, the economy will collapse.", type: "fallacious", feedback: "Fallacious response: That's an exaggerated slippery slope." }
        ]
      }
    ]
  }
};

let currentTopic = null;
let roundIndex = 0;
const counts = { strong: 0, weak: 0, fallacious: 0 };

function showTopics() {
  document.getElementById('intro').classList.add('hidden');   document.getElementById('intro').hidden = true;
  document.getElementById('topic-select').classList.remove('hidden');   document.getElementById('topic-select').hidden = false;
}

function startTopic(key) {
  currentTopic = topics[key];
  roundIndex = 0;
  counts.strong = counts.weak = counts.fallacious = 0;
  document.getElementById('topic-select').classList.add('hidden');   document.getElementById('topic-select').hidden = true;
  document.getElementById('debate-title').innerText = currentTopic.title;
  document.getElementById('debate').classList.remove('hidden');   document.getElementById('debate').hidden = false;
  showRound();
}

function showRound() {
  const round = currentTopic.rounds[roundIndex];
  document.getElementById('opponent').innerText = round.opponent;
  const respDiv = document.getElementById('responses');
  respDiv.innerHTML = '';
  round.options.forEach(opt => {
    const btn = document.createElement('button');
    btn.className = 'option-btn';
    btn.innerText = opt.text;
    btn.onclick = () => chooseResponse(opt);
    respDiv.appendChild(btn);
  });
  document.getElementById('feedback').classList.add('hidden');   document.getElementById('feedback').hidden = true;
  document.getElementById('next-round').classList.add('hidden');   document.getElementById('next-round').hidden = true;
}

function chooseResponse(option) {
  counts[option.type]++;
  const fb = document.getElementById('feedback');
  fb.innerText = option.feedback;
  fb.style.color = option.type === 'strong' ? '#4caf50' : option.type === 'weak' ? '#ff9800' : '#c62828';
  fb.classList.remove('hidden');   fb.hidden = false;
  document.getElementById('next-round').classList.remove('hidden');   document.getElementById('next-round').hidden = false;
}

function nextRound() {
  roundIndex++;
  if (roundIndex < currentTopic.rounds.length) {
    showRound();
  } else {
    showSummary();
  }
}

function showSummary() {
  document.getElementById('debate').classList.add('hidden');   document.getElementById('debate').hidden = true;
  const text = `You chose strong arguments: ${counts.strong}/2\n` +
               `You chose weak arguments: ${counts.weak}/2\n` +
               `Logical fallacies used: ${counts.fallacious}`;
  document.getElementById('summary-text').innerText = text;
  document.getElementById('summary').classList.remove('hidden');   document.getElementById('summary').hidden = false;
  showNextActivity('criticalThinking');
}

document.getElementById('start-btn').addEventListener('click', showTopics);
document.querySelectorAll('.topic-btn').forEach(btn => {
  btn.addEventListener('click', () => startTopic(btn.dataset.topic));
});
document.getElementById('next-round').addEventListener('click', nextRound);
