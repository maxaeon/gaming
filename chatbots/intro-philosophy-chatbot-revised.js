const philosophyChatSteps = [
  {
    messages: [
      { speaker: "Philosophy Student", text: "I’m studying philosophy and also a bit of computer science. Ancient Greek philosophy can feel pretty abstract, so I created this AI chat to talk directly with philosophers like Thales, Socrates, and Plato. Ready to explore reality and existence together?" },
      { speaker: "Philosophy Student", text: "In ancient times, people explained reality through myths and gods. Thales suggested rational observation is better. Do you agree with him that rational explanations really help us understand reality clearly?" }
    ],
    choices: ["Yes, definitely", "No, not really", "I'm not sure"],
    responses: {
      "Yes, definitely": [
        { speaker: "System", text: "Thales entered the chat", className: "chat-notice" },
        { speaker: "Thales", text: "Absolutely! Rational thought helps us see the world clearly, without superstition." },
        { speaker: "System", text: "Heraclitus entered the chat", className: "chat-notice" },
        { speaker: "Heraclitus", text: "Reason can help—but remember, reality itself never stays still." }
      ],
      "No, not really": [
        { speaker: "System", text: "Thales entered the chat", className: "chat-notice" },
        { speaker: "Thales", text: "Absolutely! Rational thought helps us see the world clearly, without superstition." },
        { speaker: "System", text: "Heraclitus entered the chat", className: "chat-notice" },
        { speaker: "Heraclitus", text: "Reason can help—but remember, reality itself never stays still." }
      ],
      "I'm not sure": [
        { speaker: "System", text: "Thales entered the chat", className: "chat-notice" },
        { speaker: "Thales", text: "Absolutely! Rational thought helps us see the world clearly, without superstition." },
        { speaker: "System", text: "Heraclitus entered the chat", className: "chat-notice" },
        { speaker: "Heraclitus", text: "Reason can help—but remember, reality itself never stays still." }
      ]
    }
  },
  {
    messages: [
      { speaker: "Philosophy Student", text: "Thales, water as a basic element sounds odd. Can everything really boil down to just one fundamental thing?" }
    ],
    choices: ["Yes, definitely", "No, not really", "I'm not sure"],
    responses: {
      "Yes, definitely": [
        { speaker: "Thales", text: "Exactly! The simplicity of one fundamental element helps us understand nature clearly." }
      ],
      "No, not really": [
        { speaker: "Thales", text: "Fair enough! Maybe it’s not water, but searching for one fundamental principle still guides rational inquiry." }
      ],
      "I'm not sure": [
        { speaker: "Thales", text: "Thoughtful uncertainty! Philosophy starts exactly this way—asking questions." }
      ]
    },
    after: [
      { speaker: "Heraclitus", text: "But Thales, reality never holds still—how can one substance explain continuous change?" },
      { speaker: "Philosophy Student", text: "Good point, Heraclitus! You say everything changes constantly. Does that mean there’s no stability or permanence in reality at all?" }
    ]
  },
  {
    messages: [
      { speaker: "Heraclitus", text: "Precisely! Think of reality as a river—always flowing, never the same twice. Change is the ultimate truth." },
      { speaker: "Philosophy Student", text: "But if everything is changing, how can we ever have lasting knowledge of anything?" }
    ],
    choices: ["We can have lasting knowledge", "We can’t", "I'm not sure"],
    responses: {
      "We can have lasting knowledge": [
        { speaker: "Heraclitus", text: "Interesting! Perhaps the only lasting knowledge is knowing that nothing lasts." }
      ],
      "We can’t": [
        { speaker: "Heraclitus", text: "Exactly! Embracing uncertainty frees us to live wisely in constant change." }
      ],
      "I'm not sure": [
        { speaker: "Heraclitus", text: "Your hesitation makes sense. Accepting uncertainty might itself be wisdom." }
      ]
    },
    after: [
      { speaker: "System", text: "Socrates entered the chat", className: "chat-notice" },
      { speaker: "Socrates", text: "Well said, Heraclitus. Real wisdom begins by admitting we know far less than we think." },
      { speaker: "Philosophy Student", text: "Socrates, you say true wisdom is recognizing how little we actually know. Does that mean we should question everything endlessly?" }
    ]
  },
  {
    messages: [
      { speaker: "Socrates", text: "Exactly right! I believe we must always question our assumptions. Admitting our ignorance is the first step toward real wisdom." },
      { speaker: "Philosophy Student", text: "Is constantly questioning our beliefs really helpful? Doesn't it just lead us to confusion?" }
    ],
    choices: ["Yes, it's helpful", "No, it leads to confusion", "I'm not sure"],
    responses: {
      "Yes, it's helpful": [
        { speaker: "Socrates", text: "Precisely! Questioning our beliefs makes us wiser, even if uncomfortable." }
      ],
      "No, it leads to confusion": [
        { speaker: "Socrates", text: "You raise a good concern. Yet unexamined beliefs often lead us into error." }
      ],
      "I'm not sure": [
        { speaker: "Socrates", text: "An honest response! Even uncertainty can be a path toward deeper understanding." }
      ]
    },
    after: [
      { speaker: "System", text: "Plato entered the chat", className: "chat-notice" },
      { speaker: "Plato", text: "Absolutely, Socrates. Constant questioning guides us to deeper truths beyond appearances." },
      { speaker: "Philosophy Student", text: "Plato, you talk about deeper truths or ideal realities—what you call 'Forms.' Are these ideal Forms really something beyond our everyday experiences?" }
    ]
  },
  {
    messages: [
      { speaker: "Plato", text: "Yes, indeed. I'm Plato, Socrates’ student. I believe true reality includes perfect, eternal Forms—ideal standards of concepts like Justice, Beauty, or Goodness. For instance, we never encounter a perfect circle, yet we all understand that perfect form." },
      { speaker: "Philosophy Student", text: "Are these Forms real entities that exist beyond our world, or just useful ideas we've created?" }
    ],
    choices: ["Yes, they're real entities", "No, they're just ideas", "I'm not sure"],
    responses: {
      "Yes, they're real entities": [
        { speaker: "Plato", text: "Exactly! How else can we recognize imperfection without comparing it to perfection?" }
      ],
      "No, they're just ideas": [
        { speaker: "Plato", text: "Interesting skepticism. Yet how do we universally recognize concepts like justice or beauty if they don't truly exist?" }
      ],
      "I'm not sure": [
        { speaker: "Plato", text: "Reasonable hesitation! Reflecting carefully might reveal how deeply these ideals guide us." }
      ]
    },
    after: [
      { speaker: "System", text: "Aristotle entered the chat", className: "chat-notice" },
      { speaker: "Aristotle", text: "Plato's ideal Forms sound attractive—but isn't reality found in observable things around us rather than in abstract ideals?" },
      { speaker: "Philosophy Student", text: "Aristotle, you seem skeptical about Plato’s Forms. Do you think we should rely entirely on observing nature to understand reality?" }
    ]
  },
  {
    messages: [
      { speaker: "Aristotle", text: "Exactly! While Plato seeks abstract ideals, I think we must start with observing the real world. Reality is understood by seeing how things fulfill their natural purposes, or telos—for example, an acorn naturally becomes an oak." },
      { speaker: "Philosophy Student", text: "Do you agree with Aristotle that observing nature is enough to understand all reality?" }
    ],
    choices: ["Yes, definitely", "No, not really", "I'm not sure"],
    responses: {
      "Yes, definitely": [
        { speaker: "Aristotle", text: "Precisely! Careful observation grounds our philosophy in real experiences." }
      ],
      "No, not really": [
        { speaker: "Aristotle", text: "A thoughtful challenge. But isn’t observation our most reliable tool for understanding reality?" }
      ],
      "I'm not sure": [
        { speaker: "Aristotle", text: "Your uncertainty makes sense. Perhaps combining observation with rational thinking leads us closer to truth." }
      ]
    },
    after: [
      { speaker: "Plato", text: "Observation is indeed crucial, Aristotle. But without ideals guiding us, might our observations become aimless?" },
      { speaker: "Philosophy Student", text: "This conversation really clarified some deep metaphysical ideas for me! Did it help you, too? Philosophy may seem abstract at first, but talking it through like this definitely makes it clearer. Let’s keep exploring!" }
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
  let userName = '';
  const speakerClasses = {
    'Philosophy Student': 'speaker-student',
    'Thales': 'speaker-thales',
    'Heraclitus': 'speaker-heraclitus',
    'Socrates': 'speaker-socrates',
    'Plato': 'speaker-plato',
    'Aristotle': 'speaker-aristotle'
  };

  const speakerImages = {
    'You': '../assets/images/profile.png',
    'Philosophy Student': '../assets/images/student.png',
    'Thales': '../assets/images/thales.png',
    'Heraclitus': '../assets/images/heraclitus.png',
    'Socrates': '../assets/images/socrates.png',
    'Plato': '../assets/images/plato.png',
    'Aristotle': '../assets/images/aristotle.png'
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
    const img = speakerImages[speaker]
      ? `<img src="${speakerImages[speaker]}" alt="${speaker}" class="profile-pic">`
      : '';
    const time = `<div class="timestamp">${getTimestamp()}</div>`;
    if (speaker !== 'You') {
      div.innerHTML = `${img}<strong>${speaker}:</strong> <span class="typing">…</span>`;
      chatBox.appendChild(div);
      chatBox.scrollTop = chatBox.scrollHeight;
      const baseDelay = 1200;
      const extraDelay = Math.min(2500, text.length * 30);
      const delay = baseDelay + Math.random() * extraDelay;
      await new Promise(res => setTimeout(res, delay));
      div.innerHTML = `${img}<strong>${speaker}:</strong> ${text}${time}`;
      chatBox.scrollTop = chatBox.scrollHeight;
    } else {
      div.innerHTML = `${img}<strong>${speaker}:</strong> ${text}${time}`;
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
    const step = philosophyChatSteps[stepIndex];
    controls.innerHTML = '';
    const replies = step.responses[choice] || [];
    for (const m of replies) {
      await addMessage(m.speaker, m.text, m.className);
    }
    if (step.after) {
      for (const m of step.after) {
        await addMessage(m.speaker, m.text, m.className);
      }
    }
    stepIndex++;
    if (stepIndex < philosophyChatSteps.length) {
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

  function askForName() {
    return new Promise(resolve => {
      controls.innerHTML = '';
      const input = document.createElement('input');
      input.type = 'text';
      const btn = document.createElement('button');
      btn.textContent = 'Submit';
      btn.onclick = async () => {
        let val = input.value.trim();
        if (!/^[A-Za-z]{1,15}$/.test(val)) {
          alert('Please enter a valid name (letters only, up to 15 characters)');
          return;
        }
        if (val === val.toLowerCase()) {
          val = val.charAt(0).toUpperCase() + val.slice(1);
        }
        userName = val;
        controls.innerHTML = '';
        await addMessage('You', userName, 'chat-user');
        resolve();
      };
      controls.appendChild(input);
      controls.appendChild(btn);
    });
  }

  async function showStep() {
    const step = philosophyChatSteps[stepIndex];
    const messages = step.messages.slice();
    if (step.choices && userName && messages.length) {
      const last = messages[messages.length - 1];
      if (/\?\s*$/.test(last.text)) {
        last.text = last.text.replace(/\?\s*$/, `, ${userName}?`);
      }
    }
    for (const m of messages) {
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
      if (stepIndex < philosophyChatSteps.length) {
        setTimeout(showStep, 500);
      }
    }
  }

  document.addEventListener('DOMContentLoaded', async () => {
    await addMessage('Philosophy Student', "Hey there! What's your name?");
    await askForName();
    showStep();
  });
})();

