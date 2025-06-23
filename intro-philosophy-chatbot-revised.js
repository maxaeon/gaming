const philosophyChatSteps = [
  {
    messages: [
      { speaker: "Philosophy Student", text: "Hey there! I’m also a student learning philosophy and computer science. Ancient Greek philosophy can feel pretty abstract, so I created this AI chat to talk directly with philosophers like Thales, Socrates, and Plato. Ready to explore reality and existence together?" },
      { speaker: "Philosophy Student", text: "In ancient times, people explained reality through myths and gods. Thales, you suggested rational observation is better. Do you think rational explanations really help us understand reality clearly?" }
    ],
    choices: ["Yes", "No", "Unsure"],
    responses: {
      "Yes": [
        { speaker: "Thales", text: "Absolutely! Rational thought helps us see the world clearly, without superstition." },
        { speaker: "Heraclitus", text: "Reason can help—but remember, reality itself never stays still." }
      ],
      "No": [
        { speaker: "Thales", text: "Absolutely! Rational thought helps us see the world clearly, without superstition." },
        { speaker: "Heraclitus", text: "Reason can help—but remember, reality itself never stays still." }
      ],
      "Unsure": [
        { speaker: "Thales", text: "Absolutely! Rational thought helps us see the world clearly, without superstition." },
        { speaker: "Heraclitus", text: "Reason can help—but remember, reality itself never stays still." }
      ]
    }
  },
  {
    messages: [
      { speaker: "Philosophy Student", text: "Thales, water as a basic element sounds odd. Can everything really boil down to just one fundamental thing?" }
    ],
    choices: ["Yes", "No", "Unsure"],
    responses: {
      "Yes": [
        { speaker: "Thales", text: "Exactly! The simplicity of one fundamental element helps us understand nature clearly." }
      ],
      "No": [
        { speaker: "Thales", text: "Fair enough! Maybe it’s not water, but searching for one fundamental principle still guides rational inquiry." }
      ],
      "Unsure": [
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
      { speaker: "Heraclitus", text: "Precisely! I'm Heraclitus. Think of reality as a river—always flowing, never the same twice. Change is the ultimate truth." },
      { speaker: "Philosophy Student", text: "But if everything is changing, how can we ever have lasting knowledge of anything?" }
    ],
    choices: ["We can have lasting knowledge", "We can’t", "Unsure"],
    responses: {
      "We can have lasting knowledge": [
        { speaker: "Heraclitus", text: "Interesting! Perhaps the only lasting knowledge is knowing that nothing lasts." }
      ],
      "We can’t": [
        { speaker: "Heraclitus", text: "Exactly! Embracing uncertainty frees us to live wisely in constant change." }
      ],
      "Unsure": [
        { speaker: "Heraclitus", text: "Your hesitation makes sense. Accepting uncertainty might itself be wisdom." }
      ]
    },
    after: [
      { speaker: "Socrates", text: "Well said, Heraclitus. Real wisdom begins by admitting we know far less than we think." },
      { speaker: "Philosophy Student", text: "Socrates, you say true wisdom is recognizing how little we actually know. Does that mean we should question everything endlessly?" }
    ]
  },
  {
    messages: [
      { speaker: "Socrates", text: "Exactly right! I'm Socrates, and I believe we must always question our assumptions. Admitting our ignorance is the first step toward real wisdom." },
      { speaker: "Philosophy Student", text: "Is constantly questioning our beliefs really helpful? Doesn't it just lead us to confusion?" }
    ],
    choices: ["Helpful", "Leads to confusion", "Unsure"],
    responses: {
      "Helpful": [
        { speaker: "Socrates", text: "Precisely! Questioning our beliefs makes us wiser, even if uncomfortable." }
      ],
      "Leads to confusion": [
        { speaker: "Socrates", text: "You raise a good concern. Yet unexamined beliefs often lead us into error." }
      ],
      "Unsure": [
        { speaker: "Socrates", text: "An honest response! Even uncertainty can be a path toward deeper understanding." }
      ]
    },
    after: [
      { speaker: "Plato", text: "Absolutely, Socrates. Constant questioning guides us to deeper truths beyond appearances." },
      { speaker: "Philosophy Student", text: "Plato, you talk about deeper truths or ideal realities—what you call 'Forms.' Are these ideal Forms really something beyond our everyday experiences?" }
    ]
  },
  {
    messages: [
      { speaker: "Plato", text: "Yes, indeed. I'm Plato, Socrates’ student. I believe true reality includes perfect, eternal Forms—ideal standards of concepts like Justice, Beauty, or Goodness. For instance, we never encounter a perfect circle, yet we all understand that perfect form." },
      { speaker: "Philosophy Student", text: "Are these Forms real entities that exist beyond our world, or just useful ideas we've created?" }
    ],
    choices: ["Real entities", "Just ideas", "Unsure"],
    responses: {
      "Real entities": [
        { speaker: "Plato", text: "Exactly! How else can we recognize imperfection without comparing it to perfection?" }
      ],
      "Just ideas": [
        { speaker: "Plato", text: "Interesting skepticism. Yet how do we universally recognize concepts like justice or beauty if they don't truly exist?" }
      ],
      "Unsure": [
        { speaker: "Plato", text: "Reasonable hesitation! Reflecting carefully might reveal how deeply these ideals guide us." }
      ]
    },
    after: [
      { speaker: "Aristotle", text: "Plato, your ideal Forms sound attractive—but isn't reality found in observable things around us rather than in abstract ideals?" },
      { speaker: "Philosophy Student", text: "Aristotle, you seem skeptical about Plato’s Forms. Do you think we should rely entirely on observing nature to understand reality?" }
    ]
  },
  {
    messages: [
      { speaker: "Aristotle", text: "Exactly! I'm Aristotle. While Plato seeks abstract ideals, I think we must start with observing the real world. Reality is understood by seeing how things fulfill their natural purposes, or telos—for example, an acorn naturally becomes an oak." },
      { speaker: "Philosophy Student", text: "Is observing nature truly enough to understand all reality, Aristotle?" }
    ],
    choices: ["Yes", "No", "Unsure"],
    responses: {
      "Yes": [
        { speaker: "Aristotle", text: "Precisely! Careful observation grounds our philosophy in real experiences." }
      ],
      "No": [
        { speaker: "Aristotle", text: "A thoughtful challenge. But isn’t observation our most reliable tool for understanding reality?" }
      ],
      "Unsure": [
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
  let stepIndex = 0;
  const speakerClasses = {
    'Philosophy Student': 'speaker-student',
    'Thales': 'speaker-thales',
    'Heraclitus': 'speaker-heraclitus',
    'Socrates': 'speaker-socrates',
    'Plato': 'speaker-plato',
    'Aristotle': 'speaker-aristotle'
  };

  async function addMessage(speaker, text, className) {
    if (!className) {
      className = speakerClasses[speaker] || 'chat-bot';
    }
    const div = document.createElement('div');
    div.className = `chat-message ${className}`;
    if (div.classList.contains('chat-bot')) {
      div.innerHTML = `<strong>${speaker}:</strong> <span class="typing">…</span>`;
      chatBox.appendChild(div);
      chatBox.scrollTop = chatBox.scrollHeight;
      await new Promise(res => setTimeout(res, 1000));
      div.innerHTML = `<strong>${speaker}:</strong> ${text}`;
      chatBox.scrollTop = chatBox.scrollHeight;
    } else {
      div.innerHTML = `<strong>${speaker}:</strong> ${text}`;
      chatBox.appendChild(div);
      chatBox.scrollTop = chatBox.scrollHeight;
    }
  }

  function showChoices(step) {
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
    await addMessage('You', choice, 'chat-user');
    const step = philosophyChatSteps[stepIndex];
    controls.innerHTML = '';
    const replies = step.responses[choice] || [];
    for (const m of replies) {
      await addMessage(m.speaker, m.text);
    }
    if (step.after) {
      for (const m of step.after) {
        await addMessage(m.speaker, m.text);
      }
    }
    stepIndex++;
    if (stepIndex < philosophyChatSteps.length) {
      setTimeout(showStep, 500);
    }
  }

  async function showStep() {
    const step = philosophyChatSteps[stepIndex];
    for (const m of step.messages) {
      await addMessage(m.speaker, m.text);
    }
    if (step.choices) {
      showChoices(step);
    } else {
      if (step.after) {
        for (const m of step.after) {
          await addMessage(m.speaker, m.text);
        }
      }
      stepIndex++;
      if (stepIndex < philosophyChatSteps.length) {
        setTimeout(showStep, 500);
      }
    }
  }

  document.addEventListener('DOMContentLoaded', showStep);
})();

