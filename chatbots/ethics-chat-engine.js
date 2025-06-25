(function() {
  const chatBox = document.getElementById('chat-box');
  const controls = document.getElementById('chat-controls');
  const bots = window.ethicalChatbots || {};
  let current = 'Philosophy Student';
  let exchangeIndex = 0;
  let awaitingChoice = false;
  const alignmentScores = {};
  const speakerClasses = {
    'John Stuart Mill': 'speaker-mill',
    'Immanuel Kant': 'speaker-kant',
    'St. Thomas Aquinas': 'speaker-aquinas',
    'Aristotle': 'speaker-aristotle',
    'Nel Noddings': 'speaker-noddings',
    'Philosophy Student': 'speaker-student'
  };

  const speakerImages = {
    'You': '../assets/images/profile.png',
    'John Stuart Mill': '../assets/images/mill.png',
    'Immanuel Kant': '../assets/images/kant.png',
    'St. Thomas Aquinas': '../assets/images/aquinas.png',
    'Aristotle': '../assets/images/aristotle.png',
    'Nel Noddings': '../assets/images/noddings.png',
    'Philosophy Student': '../assets/images/student.png'
  };

  async function addMessage(speaker, text, className) {
    if (!className) {
      className = speakerClasses[speaker] || 'chat-bot';
    }
    const div = document.createElement('div');
    div.className = `chat-message ${className}`;
    const img = speakerImages[speaker]
      ? `<img src="${speakerImages[speaker]}" alt="${speaker}" class="profile-pic">`
      : '';
    if (speaker !== 'You') {
      div.innerHTML = `${img}<strong>${speaker}:</strong> <span class="typing">…</span>`;
      chatBox.appendChild(div);
      chatBox.scrollTop = chatBox.scrollHeight;
      const baseDelay = 1000;
      const extraDelay = Math.min(2000, text.length * 20);
      const delay = baseDelay + Math.random() * extraDelay;
      await new Promise(res => setTimeout(res, delay));
      div.innerHTML = `${img}<strong>${speaker}:</strong> ${text}`;
      chatBox.scrollTop = chatBox.scrollHeight;
    } else {
      div.innerHTML = `${img}<strong>${speaker}:</strong> ${text}`;
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
          closing = data.closings.highAlignment('');
        } else if (score > 0) {
          closing = data.closings.moderateAlignment('');
        } else {
          closing = data.closings.lowAlignment('');
        }
        await addMessage(current, closing);
      }
      const next = data.nextTheorist;
      await addMessage('System', `${current} added ${next} to the chat`, 'chat-notice');
      current = next;
      exchangeIndex = 0;
      if (current === 'Philosophy Student') {
        const finalText = bots['Philosophy Student'].finalAssessment('', alignmentScores);
        await addMessage('Philosophy Student', finalText);
        controls.innerHTML = '';
        return;
      }
      alignmentScores[current] = 0;
      const greet = typeof bots[current].greeting === 'function'
        ? bots[current].greeting('')
        : bots[current].greeting;
      await addMessage(current, greet);
      setTimeout(showExchange, 500);
      return;
    }
    const ex = exchanges[exchangeIndex];
    if (ex.transition) await addMessage(current, ex.transition);
    await addMessage(current, ex.question);
    showOptions(ex.responses, ex.theoristView);
  }

  async function startConversation() {
    const student = bots['Philosophy Student'];
    const greet = typeof student.greeting === 'function' ? student.greeting('') : student.greeting;
    await addMessage('Philosophy Student', greet);
    if (student.introduceMill) {
      await addMessage('Philosophy Student', student.introduceMill);
    }
    current = 'John Stuart Mill';
    alignmentScores[current] = 0;
    const firstGreet = typeof bots[current].greeting === 'function'
      ? bots[current].greeting('')
      : bots[current].greeting;
    await addMessage(current, firstGreet);
    showExchange();
  }

  document.addEventListener('DOMContentLoaded', startConversation);
})();
