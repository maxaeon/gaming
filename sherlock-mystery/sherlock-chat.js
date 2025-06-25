const sherlockSteps = [
  {
    messages: [
      { speaker: "Sherlock", text: "Professor Russell's manuscript has vanished. Watson and I could use your help." },
      { speaker: "Watson", text: "Shall we begin investigating?" }
    ],
    choices: ["Yes, let's begin.", "Not now"],
    responses: {
      "Yes, let's begin.": [
        { speaker: "Sherlock", text: "Excellent. Let's look at the evidence." }
      ],
      "Not now": [
        { speaker: "Sherlock", text: "Very well. Come back when you're ready." },
        { speaker: "System", text: "Chat closed", className: "chat-notice" }
      ]
    },
    endChoices: ["Not now"]
  },
  {
    messages: [
      { speaker: "Watson", text: "We have several clues. Which one should we examine?" }
    ],
    choices: [
      "Housekeeper's Testimony",
      "Beatrice Lowell's Statement",
      "Charles Finch's Alibi",
      "Study Door Security"
    ],
    responses: {
      "Housekeeper's Testimony": [
        { speaker: "Watson", text: "The housekeeper observed Alexander Greaves quietly reading in the library, far from the study, when the manuscript disappeared." }
      ],
      "Beatrice Lowell's Statement": [
        { speaker: "Watson", text: "Beatrice claims she saw Alexander near the professor's study precisely when the housekeeper saw him in the library." }
      ],
      "Charles Finch's Alibi": [
        { speaker: "Watson", text: "Charles insists he remained at home all morning, yet his neighbor spotted him rushing away from his home around the time of the theft." }
      ],
      "Study Door Security": [
        { speaker: "Watson", text: "Professor Russell's study can only be accessed using a unique brass key, and Charles Finch is known to have borrowed the key a day earlier, claiming he had lost his own." }
      ]
    },
    after: [
      { speaker: "Sherlock", text: "Keep that in mind. Now let's test your deductions." }
    ]
  },
  {
    messages: [
      { speaker: "Sherlock", text: "Which two statements directly contradict each other?" }
    ],
    choices: [
      "Housekeeper’s statement vs. Beatrice’s statement about Alexander’s location.",
      "Charles’s alibi vs. neighbor’s observation.",
      "Alexander vs. Charles regarding study access."
    ],
    responses: {
      "Housekeeper’s statement vs. Beatrice’s statement about Alexander’s location.": [
        { speaker: "Sherlock", text: "Not quite. Those could both be true." }
      ],
      "Charles’s alibi vs. neighbor’s observation.": [
        { speaker: "Sherlock", text: "Correct. Charles's alibi conflicts with the neighbor's account." }
      ],
      "Alexander vs. Charles regarding study access.": [
        { speaker: "Sherlock", text: "Consider the evidence carefully." }
      ]
    }
  },
  {
    messages: [
      { speaker: "Sherlock", text: "Which piece of evidence most strongly implicates a suspect?" }
    ],
    choices: [
      "The housekeeper placing Alexander away from the study.",
      "Beatrice accusing Alexander of being near the study.",
      "Charles’s key access and contradictory alibi evidence."
    ],
    responses: {
      "The housekeeper placing Alexander away from the study.": [
        { speaker: "Sherlock", text: "That weakens suspicion of Alexander." }
      ],
      "Beatrice accusing Alexander of being near the study.": [
        { speaker: "Sherlock", text: "Interesting, but not our strongest lead." }
      ],
      "Charles’s key access and contradictory alibi evidence.": [
        { speaker: "Sherlock", text: "Exactly. Those facts point strongly toward Charles." }
      ]
    }
  },
  {
    messages: [
      { speaker: "Sherlock", text: "Considering the evidence and contradictions, who is the most likely culprit?" }
    ],
    choices: ["Alexander Greaves", "Beatrice Lowell", "Charles Finch"],
    responses: {
      "Alexander Greaves": [
        { speaker: "Sherlock", text: "Alexander has an alibi placing him elsewhere." }
      ],
      "Beatrice Lowell": [
        { speaker: "Sherlock", text: "Beatrice raised suspicion, but little supports her guilt." }
      ],
      "Charles Finch": [
        { speaker: "Sherlock", text: "Indeed. The evidence against Charles is compelling." }
      ]
    }
  },
  {
    messages: [
      { speaker: "Sherlock", text: "Excellent deduction! You've concluded that Charles Finch took Professor Russell's manuscript." },
      { speaker: "Sherlock", text: "Reflect on how each clue fit together to reveal the truth." },
      { speaker: "System", text: "Chat closed", className: "chat-notice" }
    ]
  }
];

(function() {
  const chatBox = document.getElementById('chat-box');
  const controls = document.getElementById('chat-controls');
  const extras = document.getElementById('chat-extras');
  const colorToggle = extras ? extras.querySelector('#color-toggle') : null;
  const emojiButtons = extras ? extras.querySelectorAll('.emoji-btn') : [];
  let stepIndex = 0;
  let awaitingChoice = false;
  const speakerClasses = {
    'Sherlock': 'speaker-sherlock',
    'Watson': 'speaker-watson'
  };
  const colorSchemes = ['speaker', 'blue', 'teal', 'purple'];
  let colorSchemeIndex = 0;

  function getTimestamp() {
    return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  async function addMessage(speaker, text, className) {
    if (!className) {
      className = speakerClasses[speaker] || 'chat-bot';
    }
    const div = document.createElement('div');
    div.dataset.speaker = speaker;
    div.dataset.speakerClass = className;
    const baseClass = speaker === 'You' ? 'chat-user' : 'chat-bot';
    const scheme = colorSchemes[colorSchemeIndex];
    div.className = `chat-message ${baseClass}`;
    if (scheme === 'speaker' && className && baseClass !== className) {
      div.classList.add(className);
    } else if (scheme !== 'speaker') {
      div.classList.add(`theme-${scheme}`);
    }
    const time = `<div class="timestamp">${getTimestamp()}</div>`;
    if (speaker !== 'You') {
      div.innerHTML = `<div class="chat-content"><strong class="speaker-name">${speaker}:</strong> <span class="typing">…</span></div>`;
      chatBox.appendChild(div);
      chatBox.scrollTop = chatBox.scrollHeight;
      const delay = 1200 + Math.random() * Math.min(2500, text.length * 30);
      await new Promise(res => setTimeout(res, delay));
      div.innerHTML = `<div class="chat-content"><strong class="speaker-name">${speaker}:</strong><div class="chat-text">${text}</div>${time}</div>`;
      chatBox.scrollTop = chatBox.scrollHeight;
    } else {
      div.innerHTML = `<div class="chat-content"><strong class="speaker-name">${speaker}:</strong><div class="chat-text">${text}</div>${time}</div>`;
      chatBox.appendChild(div);
      chatBox.scrollTop = chatBox.scrollHeight;
    }
  }

  function showChoices(step) {
    awaitingChoice = true;
    controls.innerHTML = '';
    step.choices.forEach(opt => {
      const btn = document.createElement('button');
      btn.className = 'option-btn';
      btn.innerText = opt;
      btn.onclick = () => handleChoice(opt);
      controls.appendChild(btn);
    });
  }

  async function handleChoice(choice) {
    if (!awaitingChoice) return;
    awaitingChoice = false;
    controls.querySelectorAll('button').forEach(b => b.disabled = true);
    await addMessage('You', choice, 'chat-user');
    const step = sherlockSteps[stepIndex];
    controls.innerHTML = '';
    const replies = step.responses ? (step.responses[choice] || []) : [];
    for (const m of replies) {
      await addMessage(m.speaker, m.text, m.className);
    }
    if (step.after) {
      for (const m of step.after) {
        await addMessage(m.speaker, m.text, m.className);
      }
    }
    if (step.endChoices && step.endChoices.includes(choice)) {
      return;
    }
    stepIndex++;
    if (stepIndex < sherlockSteps.length) {
      setTimeout(showStep, 500);
    }
  }

  function updateColors() {
    const scheme = colorSchemes[colorSchemeIndex];
    const msgs = chatBox.querySelectorAll('.chat-message');
    msgs.forEach(m => {
      const speakerClass = m.dataset.speakerClass;
      const speaker = m.dataset.speaker;
      const base = speaker === 'You' ? 'chat-user' : 'chat-bot';
      m.className = `chat-message ${base}`;
      if (scheme === 'speaker' && speakerClass && base !== speakerClass) {
        m.classList.add(speakerClass);
      } else if (scheme !== 'speaker') {
        m.classList.add(`theme-${scheme}`);
      }
    });
  }

  if (colorToggle) {
    colorToggle.addEventListener('click', () => {
      colorSchemeIndex = (colorSchemeIndex + 1) % colorSchemes.length;
      updateColors();
    });
  }

  if (emojiButtons.length) {
    emojiButtons.forEach(btn => {
      btn.addEventListener('click', () => addMessage('You', btn.textContent, 'chat-user'));
    });
  }

  async function showStep() {
    const step = sherlockSteps[stepIndex];
    for (const m of step.messages) {
      await addMessage(m.speaker, m.text, m.className);
    }
    if (step.choices) {
      showChoices(step);
    } else {
      if (step.after) {
        for (const m of step.after) {
          await addMessage(m.speaker, m.text, m.className);
        }
      }
      stepIndex++;
      if (stepIndex < sherlockSteps.length) {
        setTimeout(showStep, 500);
      }
    }
  }

  document.addEventListener('DOMContentLoaded', showStep);
})();
