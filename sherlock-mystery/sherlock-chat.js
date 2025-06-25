const case1Steps = [
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
      { speaker: "Watson", text: "Just a quick note: when Sherlock speaks of <span class=\"explain-term\" data-term=\"Holmesian Deduction\">deduction</span>, he isn't using the strict philosophical sense." }
    ]
  },
  {
    messages: [
      { speaker: "Watson", text: "Let's review all the clues before we continue." },
      { speaker: "Watson", text: "Housekeeper's Testimony: The housekeeper observed Alexander Greaves quietly reading in the library, far from the study, when the manuscript disappeared." },
      { speaker: "Watson", text: "Beatrice Lowell's Statement: Beatrice claims she saw Alexander near the professor's study precisely when the housekeeper saw him in the library." },
      { speaker: "Watson", text: "Charles Finch's Alibi: Charles insists he remained at home all morning, yet his neighbor spotted him rushing away from his home around the time of the theft." },
      { speaker: "Watson", text: "Study Door Security: Professor Russell's study can only be accessed using a unique brass key, and Charles Finch is known to have borrowed the key a day earlier, claiming he had lost his own." }
    ],
    after: [
      { speaker: "Sherlock", text: "Keep those details in mind. Now let's test your deductions." }
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
        { speaker: "Sherlock", text: "Yes, those accounts clash about where Alexander was, though Charles's alibi issue seems more revealing." }
      ],
      "Charles’s alibi vs. neighbor’s observation.": [
        { speaker: "Sherlock", text: "Exactly. Charles's alibi conflicts with the neighbor's account." }
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
    },
    final: true,
    culprit: "Charles Finch"
  },
  {
    summary: true,
    culprit: "Charles Finch",
    messages: []
  }
];

const case2Steps = [
  {
    messages: [
      { speaker: "Sherlock", text: "Lady Harper's diamond necklace has vanished. Watson and I could use your help." },
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
      { speaker: "Watson", text: "Just a quick note: when Sherlock speaks of <span class=\"explain-term\" data-term=\"Holmesian Deduction\">deduction</span>, he isn't using the strict philosophical sense." }
    ]
  },
  {
    messages: [
      { speaker: "Watson", text: "Let's review all the clues before we continue." },
      { speaker: "Watson", text: "Guard's Report: The guard saw Tom working outside in the garden around the time of the theft." },
      { speaker: "Watson", text: "Lucy's Statement: Lucy claims she was cleaning the parlor, but Edward says he saw her near the bedroom." },
      { speaker: "Watson", text: "Edward's Alibi: Edward insists he was away on business, yet his carriage was spotted near the house." },
      { speaker: "Watson", text: "Bedroom Lock: The bedroom door uses a code known only to family, and Edward uses that code for his study." }
    ],
    after: [
      { speaker: "Sherlock", text: "Keep those details in mind. Now let's test your deductions." }
    ]
  },
  {
    messages: [
      { speaker: "Sherlock", text: "Which two statements directly contradict each other?" }
    ],
    choices: [
      "Lucy's statement vs. Edward's claim about her location.",
      "Edward's alibi vs. carriage sighting.",
      "Tom vs. Edward regarding code access."
    ],
    responses: {
      "Lucy's statement vs. Edward's claim about her location.": [
        { speaker: "Sherlock", text: "Not quite. Both could be mistaken." }
      ],
      "Edward's alibi vs. carriage sighting.": [
        { speaker: "Sherlock", text: "Correct. Edward's alibi conflicts with the carriage sighting." }
      ],
      "Tom vs. Edward regarding code access.": [
        { speaker: "Sherlock", text: "Consider the evidence carefully." }
      ]
    }
  },
  {
    messages: [
      { speaker: "Sherlock", text: "Which piece of evidence most strongly implicates a suspect?" }
    ],
    choices: [
      "The guard seeing Tom outside.",
      "The dispute over Lucy's whereabouts.",
      "Edward's code access and contradictory alibi."
    ],
    responses: {
      "The guard seeing Tom outside.": [
        { speaker: "Sherlock", text: "That doesn't tie Tom directly to the bedroom." }
      ],
      "The dispute over Lucy's whereabouts.": [
        { speaker: "Sherlock", text: "Interesting, but not our strongest lead." }
      ],
      "Edward's code access and contradictory alibi.": [
        { speaker: "Sherlock", text: "Exactly. Those facts point strongly toward Edward." }
      ]
    }
  },
  {
    messages: [
      { speaker: "Sherlock", text: "Considering the evidence and contradictions, who is the most likely culprit?" }
    ],
    choices: ["Lucy", "Tom", "Edward Harper"],
    responses: {
      "Lucy": [
        { speaker: "Sherlock", text: "Lucy seems suspicious, yet the evidence is thin." }
      ],
      "Tom": [
        { speaker: "Sherlock", text: "Tom was outside, but that doesn't link him to the theft." }
      ],
      "Edward Harper": [
        { speaker: "Sherlock", text: "Indeed. The evidence against Edward is compelling." }
      ]
    },
    final: true,
    culprit: "Edward Harper"
  },
  {
    summary: true,
    culprit: "Edward Harper",
    messages: []
  }
];

const sherlockCases = [case1Steps, case2Steps];
let caseIndex = parseInt(localStorage.getItem('sherlock-case-index') || '0', 10);
let sherlockSteps = sherlockCases[caseIndex % sherlockCases.length];
localStorage.setItem('sherlock-case-index', (caseIndex + 1) % sherlockCases.length);

(function() {
  const chatBox = document.getElementById('chat-box');
  const controls = document.getElementById('chat-controls');
  const extras = document.getElementById('chat-extras');
  const colorToggle = extras ? extras.querySelector('#color-toggle') : null;
  const emojiButtons = extras ? extras.querySelectorAll('.emoji-btn') : [];
  let stepIndex = 0;
  let awaitingChoice = false;
  let userGuess = null;
  let finalCulprit = null;
  const speakerClasses = {
    'Sherlock': 'speaker-sherlock',
    'Watson': 'speaker-watson'
  };
  const schemeSpeakerClasses = {
    blue: {
      'Sherlock': 'blue-sherlock',
      'Watson': 'blue-watson'
    },
    teal: {
      'Sherlock': 'teal-sherlock',
      'Watson': 'teal-watson'
    },
    purple: {
      'Sherlock': 'purple-sherlock',
      'Watson': 'purple-watson'
    }
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
    const schemeMap = schemeSpeakerClasses[scheme] || {};
    const schemeClass = schemeMap[speaker];
    div.className = `chat-message ${baseClass}`;
    if (scheme === 'speaker' && className && baseClass !== className) {
      div.classList.add(className);
    } else if (schemeClass) {
      div.classList.add(schemeClass);
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
    if (step.final) {
      userGuess = choice;
      finalCulprit = step.culprit;
    }
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
    if (sherlockSteps[stepIndex] && sherlockSteps[stepIndex].summary) {
      const finalStep = sherlockSteps[stepIndex];
      const correct = userGuess === finalCulprit;
      finalStep.messages = [
        { speaker: 'Sherlock', text: correct ? 'You guessed it!' : 'Not quite.' },
        { speaker: 'Sherlock', text: correct ? `Excellent deduction! You've concluded that ${finalCulprit} was responsible.` : `Nice effort, but the culprit was ${finalCulprit}.` },
        { speaker: 'Sherlock', text: 'Reflect on how each clue fit together to reveal the truth.' },
        { speaker: 'Sherlock', text: 'Thank you for your time. Keep in touch if you want to practice solving more cases.' },
        { speaker: 'System', text: 'Chat closed', className: 'chat-notice' }
      ];
    }
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
      const schemeMap = schemeSpeakerClasses[scheme] || {};
      const schemeClass = schemeMap[speaker];
      m.className = `chat-message ${base}`;
      if (scheme === 'speaker' && speakerClass && base !== speakerClass) {
        m.classList.add(speakerClass);
      } else if (schemeClass) {
        m.classList.add(schemeClass);
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
