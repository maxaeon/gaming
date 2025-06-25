const case1Steps = [
  {
    messages: [
      { speaker: "Holmes", text: "Professor Russell's manuscript has vanished. Watson and I could use your help." },
      { speaker: "Watson", text: "Shall we begin investigating?" }
    ],
    choices: ["Yes, let's begin.", "Not now"],
    responses: {
      "Yes, let's begin.": [
        { speaker: "Holmes", text: "Excellent. Let's look at the evidence." }
      ],
      "Not now": [
        { speaker: "Holmes", text: "Very well. Come back when you're ready." },
        { speaker: "System", text: "Chat closed", className: "chat-notice" }
      ]
    },
    endChoices: ["Not now"]
  },
  {
    messages: [
      { speaker: "Watson", text: "Let's review all the clues before we continue." }
    ],
    choices: ["Yes, let's review the clues.", "I'm ready—skip the recap."]
  },
  {
    messages: [
      { speaker: "Watson", text: "Housekeeper's Testimony: The housekeeper observed Alexander Greaves quietly reading in the library, far from the study, when the manuscript disappeared." },
      { speaker: "Holmes", text: "Does this clue seem reliable?" }
    ],
    choices: ["Yes, it sounds reliable.", "No, I'm doubtful.", "I'm not sure yet."],
    responses: {
      "Yes, it sounds reliable.": [ { speaker: "Holmes", text: "Indeed, a trustworthy observation." } ],
      "No, I'm doubtful.": [ { speaker: "Holmes", text: "Skepticism noted. Let's keep going." } ],
      "I'm not sure yet.": [ { speaker: "Holmes", text: "Fair enough. We'll weigh it with the rest." } ]
    }
  },
  {
    messages: [
      { speaker: "Watson", text: "Beatrice Lowell's Statement: Beatrice claims she saw Alexander near the professor's study precisely when the housekeeper saw him in the library." },
      { speaker: "Holmes", text: "Does this clue seem reliable?" }
    ],
    choices: ["Yes, it seems credible.", "No, I doubt it.", "I'm unsure."],
    responses: {
      "Yes, it seems credible.": [ { speaker: "Holmes", text: "Interesting, though it conflicts with the housekeeper." } ],
      "No, I doubt it.": [ { speaker: "Holmes", text: "Perhaps Beatrice misremembered." } ],
      "I'm unsure.": [ { speaker: "Holmes", text: "Let's keep an open mind." } ]
    }
  },
  {
    messages: [
      { speaker: "Holmes", text: "We now have conflicting testimony about Alexander's whereabouts. How might this discrepancy be explained?" }
    ],
    choices: [
      "Mistaken identity",
      "One witness is lying",
      "Poor lighting or eyesight"
    ],
    responses: {
      "Alexander has a twin": [
        { speaker: "Watson", text: "Actually, Alexander does have a twin who works at a print shop nearby." },
        { speaker: "Holmes", text: "Interesting. That might explain the conflicting accounts, though we still need evidence linking either brother to the theft." }
      ],
      "One witness is lying": [
        { speaker: "Holmes", text: "Indeed, if someone is lying we'll need proof of motive or deception before drawing conclusions." }
      ],
      "Poor lighting or eyesight": [
        { speaker: "Holmes", text: "Quite possible. A mistaken sighting would weaken the case against Alexander rather than reveal guilt." }
      ]
    }
  },
  {
    messages: [
      { speaker: "Watson", text: "Charles Finch's Alibi: Charles insists he remained at home all morning, yet his neighbor spotted him rushing away from his home around the time of the theft." },
      { speaker: "Holmes", text: "Does this clue seem reliable?" }
    ],
    choices: ["Yes, that looks suspicious.", "No, it could be innocent.", "I'm undecided."],
    responses: {
      "Yes, that looks suspicious.": [ { speaker: "Holmes", text: "Quite telling, isn't it?" } ],
      "No, it could be innocent.": [ { speaker: "Holmes", text: "We'll see how it fits with the rest." } ],
      "I'm undecided.": [ { speaker: "Holmes", text: "We'll gather more clues before judging." } ]
    }
  },
  {
    messages: [
      { speaker: "Watson", text: "Study Door Security: Professor Russell's study can only be accessed using a unique brass key, and Charles Finch is known to have borrowed the key a day earlier, claiming he had lost his own." },
      { speaker: "Holmes", text: "Does this clue seem reliable?" }
    ],
    choices: ["Yes, this is solid evidence.", "No, it seems questionable.", "I'm unsure."],
    responses: {
      "Yes, this is solid evidence.": [ { speaker: "Holmes", text: "A crucial fact to remember." } ],
      "No, it seems questionable.": [ { speaker: "Holmes", text: "We'll verify it against other evidence." } ],
      "I'm unsure.": [ { speaker: "Holmes", text: "Let's see how it fits with everything else." } ]
    }
  },
  {
    messages: [
      { speaker: "Holmes", text: "Keep those details in mind. Now let's test your deductions." }
    ]
  },
  {
    messages: [
      { speaker: "Watson", text: "Before we continue, remember that when Holmes says 'deduction' he means it in a looser, Holmesian sense—different from what your philosophy professor calls deduction." }
    ]
  },
  {
    messages: [
      { speaker: "Holmes", text: "Which two statements directly contradict each other?" }
    ],
    choices: [
      "Housekeeper’s statement vs. Beatrice’s statement about Alexander’s location.",
      "Charles’s alibi vs. neighbor’s observation.",
      "Alexander vs. Charles regarding study access."
    ],
    responses: {
      "Housekeeper’s statement vs. Beatrice’s statement about Alexander’s location.": [
        { speaker: "Holmes", text: "Yes, those accounts clash about where Alexander was, though Charles's alibi issue seems more revealing." }
      ],
      "Charles’s alibi vs. neighbor’s observation.": [
        { speaker: "Holmes", text: "Exactly. Charles's alibi conflicts with the neighbor's account." }
      ],
      "Alexander vs. Charles regarding study access.": [
        { speaker: "Holmes", text: "Consider the evidence carefully." }
      ]
    }
  },
  {
    messages: [
      { speaker: "Holmes", text: "Which piece of evidence most strongly implicates a suspect?" }
    ],
    choices: [
      "The housekeeper placing Alexander away from the study.",
      "Beatrice accusing Alexander of being near the study.",
      "Charles’s key access and contradictory alibi evidence."
    ],
    responses: {
      "The housekeeper placing Alexander away from the study.": [
        { speaker: "Holmes", text: "That weakens suspicion of Alexander." }
      ],
      "Beatrice accusing Alexander of being near the study.": [
        { speaker: "Holmes", text: "Interesting, but not our strongest lead." }
      ],
      "Charles’s key access and contradictory alibi evidence.": [
        { speaker: "Holmes", text: "Exactly. Those facts point strongly toward Charles." }
      ]
    }
  },
  {
    messages: [
      { speaker: "Holmes", text: "Considering the evidence and contradictions, who is the most likely culprit?" }
    ],
    choices: ["Alexander Greaves", "Beatrice Lowell", "Charles Finch"],
    responses: {
      "Alexander Greaves": [
        { speaker: "Holmes", text: "Alexander has an alibi placing him elsewhere." }
      ],
      "Beatrice Lowell": [
        { speaker: "Holmes", text: "Beatrice raised suspicion, but little supports her guilt." }
      ],
      "Charles Finch": [
        { speaker: "Holmes", text: "Indeed. The evidence against Charles is compelling." }
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
      { speaker: "Holmes", text: "Lady Harper's diamond necklace has vanished. Watson and I could use your help." },
      { speaker: "Watson", text: "Shall we begin investigating?" }
    ],
    choices: ["Yes, let's begin.", "Not now"],
    responses: {
      "Yes, let's begin.": [
        { speaker: "Holmes", text: "Excellent. Let's look at the evidence." }
      ],
      "Not now": [
        { speaker: "Holmes", text: "Very well. Come back when you're ready." },
        { speaker: "System", text: "Chat closed", className: "chat-notice" }
      ]
    },
    endChoices: ["Not now"]
  },
  {
    messages: [
      { speaker: "Watson", text: "Let's review all the clues before we continue." }
    ],
    choices: ["Yes, let's review the clues.", "I'm ready—skip the recap."]
  },
  {
    messages: [
      { speaker: "Watson", text: "Guard's Report: The guard saw Tom working outside in the garden around the time of the theft." },
      { speaker: "Holmes", text: "Does this clue seem reliable?" }
    ],
    choices: ["Yes, the guard seems reliable.", "No, I doubt his account.", "I'm not certain."],
    responses: {
      "Yes, the guard seems reliable.": [ { speaker: "Holmes", text: "A trustworthy guard, I'd say." } ],
      "No, I doubt his account.": [ { speaker: "Holmes", text: "We'll keep that doubt in mind." } ],
      "I'm not certain.": [ { speaker: "Holmes", text: "We'll compare it with other evidence." } ]
    }
  },
  {
    messages: [
      { speaker: "Watson", text: "Lucy's Statement: Lucy claims she was cleaning the parlor, but Edward says he saw her near the bedroom." },
      { speaker: "Holmes", text: "Does this clue seem reliable?" }
    ],
    choices: ["Yes, I believe her.", "No, I think she's mistaken.", "Hard to say."],
    responses: {
      "Yes, I believe her.": [ { speaker: "Holmes", text: "Her story does conflict with Edward's." } ],
      "No, I think she's mistaken.": [ { speaker: "Holmes", text: "Perhaps Lucy is mistaken." } ],
      "Hard to say.": [ { speaker: "Holmes", text: "We'll keep both accounts in mind." } ]
    }
  },
  {
    messages: [
      { speaker: "Watson", text: "Edward's Alibi: Edward insists he was away on business, yet his carriage was spotted near the house." },
      { speaker: "Holmes", text: "Does this clue seem reliable?" }
    ],
    choices: ["Yes, his alibi seems weak.", "No, the carriage sighting proves nothing.", "I'm uncertain."],
    responses: {
      "Yes, his alibi seems weak.": [ { speaker: "Holmes", text: "Indeed, that casts doubt on Edward." } ],
      "No, the carriage sighting proves nothing.": [ { speaker: "Holmes", text: "We'll see how it connects." } ],
      "I'm uncertain.": [ { speaker: "Holmes", text: "We'll keep his story in mind." } ]
    }
  },
  {
    messages: [
      { speaker: "Watson", text: "Bedroom Lock: The bedroom door uses a code known only to family, and Edward uses that code for his study." },
      { speaker: "Holmes", text: "Does this clue seem reliable?" }
    ],
    choices: ["Yes, that seems credible.", "No, I'm skeptical.", "I'm not sure."],
    responses: {
      "Yes, that seems credible.": [ { speaker: "Holmes", text: "That detail seems hard to dispute." } ],
      "No, I'm skeptical.": [ { speaker: "Holmes", text: "We'll verify it." } ],
      "I'm not sure.": [ { speaker: "Holmes", text: "We'll compare it with other clues." } ]
    }
  },
  {
    messages: [
      { speaker: "Watson", text: "Hidden Necklace: The maid later found the necklace tucked inside Lady Harper's writing desk." },
      { speaker: "Holmes", text: "Does this clue seem reliable?" }
    ],
    choices: ["Yes, that seems trustworthy.", "No, I'm unsure.", "It might be a misunderstanding."],
    responses: {
      "Yes, that seems trustworthy.": [ { speaker: "Holmes", text: "Curious. If it was stolen, why hide it there?" } ],
      "No, I'm unsure.": [ { speaker: "Holmes", text: "We'll need to verify her account, but keep it in mind." } ],
      "It might be a misunderstanding.": [ { speaker: "Holmes", text: "Possibly. We'll check further." } ]
    }
  },
  {
    messages: [
      { speaker: "Holmes", text: "Keep those details in mind. Now let's test your deductions." }
    ]
  },
  {
    messages: [
      { speaker: "Watson", text: "Before we continue, remember that when Holmes says 'deduction' he means it in a looser, Holmesian sense—different from what our philosophy professor calls a strict deduction." }
    ]
  },
  {
    messages: [
      { speaker: "Holmes", text: "Which clue suggests the necklace's disappearance may have been staged?" }
    ],
    choices: [
      "The guard seeing Tom outside.",
      "Edward's carriage near the house.",
      "The necklace turning up in Lady Harper's desk."
    ],
    responses: {
      "The guard seeing Tom outside.": [
        { speaker: "Holmes", text: "That only places Tom nearby." }
      ],
      "Edward's carriage near the house.": [
        { speaker: "Holmes", text: "Suspicious for Edward, yet it doesn't show the theft was faked." }
      ],
      "The necklace turning up in Lady Harper's desk.": [
        { speaker: "Holmes", text: "Precisely. Finding it there hints the theft was staged." }
      ]
    }
  },
  {
    messages: [
      { speaker: "Holmes", text: "Which piece of evidence most strongly points to who staged the theft?" }
    ],
    choices: [
      "Tom working outside.",
      "Lucy and Edward's disagreement about her location.",
      "Lady Harper's hidden necklace and recent insurance." 
    ],
    responses: {
      "Tom working outside.": [
        { speaker: "Holmes", text: "That doesn't show he planned the disappearance." }
      ],
      "Lucy and Edward's disagreement about her location.": [
        { speaker: "Holmes", text: "Odd, but it doesn't explain the necklace turning up." }
      ],
      "Lady Harper's hidden necklace and recent insurance.": [
        { speaker: "Holmes", text: "Indeed. Those details strongly suggest Lady Harper staged the theft." }
      ]
    }
  },
  {
    messages: [
      { speaker: "Holmes", text: "Considering the evidence and this new twist, who likely staged the theft?" }
    ],
    choices: ["Lucy", "Tom", "Lady Harper", "Edward Harper"],
    responses: {
      "Lucy": [
        { speaker: "Holmes", text: "Lucy's actions seem minor in comparison." }
      ],
      "Tom": [
        { speaker: "Holmes", text: "Tom was outside but nothing ties him to a staged theft." }
      ],
      "Lady Harper": [
        { speaker: "Holmes", text: "Indeed. With the necklace hidden in her desk, she appears to have faked the crime." }
      ],
      "Edward Harper": [
        { speaker: "Holmes", text: "Suspicious, but the hidden necklace points elsewhere." }
      ]
    },
    final: true,
    culprit: "Lady Harper"
  },
  {
    summary: true,
    culprit: "Lady Harper",
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
    'Holmes': 'speaker-sherlock',
    'Watson': 'speaker-watson'
  };
  const schemeSpeakerClasses = {
    blue: {
      'Holmes': 'blue-sherlock',
      'Watson': 'blue-watson'
    },
    teal: {
      'Holmes': 'teal-sherlock',
      'Watson': 'teal-watson'
    },
    purple: {
      'Holmes': 'purple-sherlock',
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
    if (speaker === 'System' || className === 'chat-notice') {
      div.classList.add('chat-notice');
    } else if (scheme === 'speaker' && className && baseClass !== className) {
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
        { speaker: 'Holmes', text: correct ? 'You guessed it!' : 'Not quite.' },
        { speaker: 'Holmes', text: correct ? `Excellent deduction! You've concluded that ${finalCulprit} was responsible.` : `Nice effort, but the culprit was ${finalCulprit}.` },
        { speaker: 'Holmes', text: 'Reflect on how each clue fit together to reveal the truth.' },
        { speaker: 'Holmes', text: 'Thank you for your time. Keep in touch if you want to practice solving more cases.' },
        { speaker: 'System', text: 'Chat closed', className: 'chat-notice' }
      ];
    }
    if (stepIndex < sherlockSteps.length) {
      await showStep();
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
      if (speaker === 'System' || speakerClass === 'chat-notice') {
        m.classList.add('chat-notice');
      } else if (scheme === 'speaker' && speakerClass && base !== speakerClass) {
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
