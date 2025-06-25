(function() {
  const chatBox = document.getElementById('chat-box');
  const controls = document.getElementById('chat-controls');
  const extras = document.getElementById('chat-extras');
  const colorToggle = extras ? extras.querySelector('#color-toggle') : null;
  const emojiButtons = extras ? extras.querySelectorAll('.emoji-btn') : [];
  const bots = window.ethicalChatbots || {};
  let current = 'Sage';
  let exchangeIndex = 0;
  let awaitingChoice = false;
  let userName = '';
  const alignmentScores = {};
  const speakerClasses = {
    'John Stuart Mill': 'speaker-mill',
    'Immanuel Kant': 'speaker-kant',
    'St. Thomas Aquinas': 'speaker-aquinas',
    'Aristotle': 'speaker-aristotle',
    'Nel Noddings': 'speaker-noddings',
    'Sage': 'speaker-student'
  };

  const schemeSpeakerClasses = {
    blue: {
      'John Stuart Mill': 'blue-mill',
      'Immanuel Kant': 'blue-kant',
      'St. Thomas Aquinas': 'blue-aquinas',
      'Aristotle': 'blue-aristotle',
      'Nel Noddings': 'blue-noddings',
      'Sage': 'blue-student'
    },
    teal: {
      'John Stuart Mill': 'teal-mill',
      'Immanuel Kant': 'teal-kant',
      'St. Thomas Aquinas': 'teal-aquinas',
      'Aristotle': 'teal-aristotle',
      'Nel Noddings': 'teal-noddings',
      'Sage': 'teal-student'
    },
    purple: {
      'John Stuart Mill': 'purple-mill',
      'Immanuel Kant': 'purple-kant',
      'St. Thomas Aquinas': 'purple-aquinas',
      'Aristotle': 'purple-aristotle',
      'Nel Noddings': 'purple-noddings',
      'Sage': 'purple-student'
    }
  };

  const speakerImages = {
    'You': '../assets/images/profile.png',
    'John Stuart Mill': '../assets/images/mill.png',
    'Immanuel Kant': '../assets/images/kant.png',
    'St. Thomas Aquinas': '../assets/images/aquinas.png',
    'Aristotle': '../assets/images/aristotle.png',
    'Nel Noddings': '../assets/images/noddings.png',
    'Sage': '../assets/images/student.png'
  };

  const colorSchemes = ['speaker', 'blue', 'teal', 'purple'];
  let colorSchemeIndex = 0;

  const schemeButtonColors = {
    speaker: getComputedStyle(document.documentElement)
      .getPropertyValue('--accent-light') || '#ce93d8',
    blue: '#90caf9',
    teal: '#80cbc4',
    purple: '#ce93d8'
  };

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
    const img = speakerImages[speaker]
      ? `<img src="${speakerImages[speaker]}" alt="${speaker}" class="profile-pic">`
      : '';
    const time = `<div class="timestamp">${getTimestamp()}</div>`;
    if (speaker !== 'You') {
      div.innerHTML = `${img}<div class="chat-content"><strong class="speaker-name">${speaker}:</strong> <span class="typing">…</span></div>`;
      chatBox.appendChild(div);
      chatBox.scrollTop = chatBox.scrollHeight;
      const baseDelay = 1000;
      const extraDelay = Math.min(2000, text.length * 20);
      const delay = baseDelay + Math.random() * extraDelay;
      await new Promise(res => setTimeout(res, delay));
      div.innerHTML = `${img}<div class="chat-content"><strong class="speaker-name">${speaker}:</strong><div class="chat-text">${text}</div>${time}</div>`;
      chatBox.scrollTop = chatBox.scrollHeight;
    } else {
      div.innerHTML = `${img}<div class="chat-content"><strong class="speaker-name">${speaker}:</strong><div class="chat-text">${text}</div>${time}</div>`;
      chatBox.appendChild(div);
      chatBox.scrollTop = chatBox.scrollHeight;
    }
  }

  function showOptions(responses, view) {
    awaitingChoice = true;
    controls.innerHTML = '';
    Object.keys(responses).forEach(option => {
      const btn = document.createElement('button');
      btn.className = 'option-btn';
      btn.textContent = option;
      btn.onclick = () => handleChoice(option, responses[option], view);
      controls.appendChild(btn);
    });
    updateColors();
  }

  async function handleChoice(option, reply, view) {
    if (!awaitingChoice) return;
    awaitingChoice = false;
    controls.querySelectorAll('button').forEach(b => b.disabled = true);
    await addMessage('You', option, 'chat-user');
    await addMessage(current, reply);
    if (option === view) {
      alignmentScores[current] = (alignmentScores[current] || 0) + 1;
    }
    exchangeIndex++;
    setTimeout(showExchange, 500);
  }

  async function showExchange() {
    const data = bots[current];
    const exchanges = data.exchanges || [];
    if (exchangeIndex >= exchanges.length) {
      controls.innerHTML = '';
      if (exchanges.length) {
        const score = alignmentScores[current] || 0;
        let closing;
        if (score === exchanges.length) {
          closing = data.closings.highAlignment(userName);
        } else if (score > 0) {
          closing = data.closings.moderateAlignment(userName);
        } else {
          closing = data.closings.lowAlignment(userName);
        }
        await addMessage(current, closing);
      }
      const next = data.nextTheorist;
      await addMessage('System', `${current} added ${next} to the chat`, 'chat-notice');
      current = next;
      exchangeIndex = 0;
      if (current === 'Sage') {
        const finalText = bots['Sage'].finalAssessment(userName, alignmentScores);
        await addMessage('Sage', finalText);
        await showFinalReflection();
        return;
      }
      alignmentScores[current] = 0;
      const greet = typeof bots[current].greeting === 'function'
        ? bots[current].greeting(userName)
        : bots[current].greeting;
      await addMessage(current, greet);
      setTimeout(showExchange, 500);
      return;
    }
    const ex = exchanges[exchangeIndex];
    if (ex.transition) await addMessage(current, ex.transition);
    let questionText = ex.question;
    if (userName && /\?\s*$/.test(questionText)) {
      questionText = questionText.replace(/\?\s*$/, `, ${userName}?`);
    }
    await addMessage(current, questionText);
    showOptions(ex.responses, ex.theoristView);
  }

  async function handleReflectionChoice(option, reply) {
    if (!awaitingChoice) return;
    awaitingChoice = false;
    controls.querySelectorAll('button').forEach(b => b.disabled = true);
    await addMessage('You', option, 'chat-user');
    await addMessage('Sage', reply);
    if (bots['Sage'].farewell) {
      await addMessage('Sage', bots['Sage'].farewell);
    }
    await addMessage('System', 'Chat closed', 'chat-notice');
    controls.innerHTML = '';
  }

  async function showFinalReflection() {
    const question = bots['Sage'].closingQuestion;
    const responses = bots['Sage'].closingResponses;
    if (!question || !responses) {
      if (bots['Sage'].farewell) {
        await addMessage('Sage', bots['Sage'].farewell);
      }
      await addMessage('System', 'Chat closed', 'chat-notice');
      return;
    }
    await addMessage('Sage', question);
    awaitingChoice = true;
    controls.innerHTML = '';
    Object.keys(responses).forEach(opt => {
      const btn = document.createElement('button');
      btn.className = 'option-btn';
      btn.textContent = opt;
      btn.onclick = () => handleReflectionChoice(opt, responses[opt]);
      controls.appendChild(btn);
    });
    updateColors();
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
    const btnColor = schemeButtonColors[scheme] || schemeButtonColors.speaker;
    if (colorToggle) {
      colorToggle.style.background = btnColor;
      colorToggle.style.color = '#000';
    }
    controls.querySelectorAll('.option-btn').forEach(b => {
      b.style.background = btnColor;
      b.style.color = '#000';
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

  async function startConversation() {
    await addMessage('Sage', "Hey there! What's your name?");
    await askForName();
    await addMessage('Sage', `Good to meet you, ${userName}!`);
    const student = bots['Sage'];
    const greet = typeof student.greeting === 'function' ? student.greeting(userName) : student.greeting;
    await addMessage('Sage', greet);

    let selected = null;
    await new Promise(resolve => {
      awaitingChoice = true;
      const options = {
        "Yes, let's chat!": "Great! Let's dive in.",
        "Sure, I guess": "No worries, let's take it slow. Here we go.",
        "No thanks": "Goodbye and good luck learning about ethics!"
      };
      controls.innerHTML = '';
      Object.keys(options).forEach(opt => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.textContent = opt;
        btn.onclick = async () => {
          if (!awaitingChoice) return;
          awaitingChoice = false;
          selected = opt;
          controls.querySelectorAll('button').forEach(b => b.disabled = true);
          await addMessage('You', opt, 'chat-user');
          await addMessage('Sage', options[opt]);
          if (opt === 'No thanks') {
            await addMessage('System', 'Chat closed', 'chat-notice');
            resolve();
            return;
          }
          if (student.introduceMill) {
            await addMessage('Sage', student.introduceMill);
          }
          resolve();
        };
        controls.appendChild(btn);
      });
      updateColors();
    });

    if (selected !== 'No thanks') {
      current = 'John Stuart Mill';
      alignmentScores[current] = 0;
      const firstGreet = typeof bots[current].greeting === 'function'
        ? bots[current].greeting(userName)
        : bots[current].greeting;
      await addMessage(current, firstGreet);
      showExchange();
    }
  }

  document.addEventListener('DOMContentLoaded', startConversation);
})();
