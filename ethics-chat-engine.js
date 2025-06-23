(function() {
  const chatBox = document.getElementById('chat-box');
  const controls = document.getElementById('chat-controls');
  const bots = window.ethicalChatbots || {};
  let current = 'Philosophy Student';
  let exchangeIndex = 0;
  const alignmentScores = {};
  const speakerClasses = {
    'John Stuart Mill': 'speaker-mill',
    'Immanuel Kant': 'speaker-kant',
    'St. Thomas Aquinas': 'speaker-aquinas',
    'Aristotle': 'speaker-aristotle',
    'Nel Noddings': 'speaker-noddings',
    'Philosophy Student': 'speaker-student'
  };

  const avatarPaths = {
    'John Stuart Mill': 'avatars/mill.png',
    'Immanuel Kant': 'avatars/kant.png',
    'St. Thomas Aquinas': 'avatars/aquinas.png',
    'Aristotle': 'avatars/aristotle.png',
    'Nel Noddings': 'avatars/noddings.png',
    'Philosophy Student': 'avatars/student.png',
    'You': 'avatars/user.png'
  };

  async function addMessage(speaker, text, className) {
    if (!className) {
      className = speakerClasses[speaker] || 'chat-bot';
    }
    const div = document.createElement('div');
    div.className = `chat-message ${className}`;
    const avatar = avatarPaths[speaker] || 'avatars/placeholder.png';
    if (div.classList.contains('chat-bot')) {
      div.innerHTML = `<img class="avatar" src="${avatar}" alt="${speaker}"> <strong>${speaker}:</strong> <span class="typing">…</span>`;
      chatBox.appendChild(div);
      chatBox.scrollTop = chatBox.scrollHeight;
      await new Promise(res => setTimeout(res, 1000));
      div.innerHTML = `<img class="avatar" src="${avatar}" alt="${speaker}"> <strong>${speaker}:</strong> ${text}`;
      chatBox.scrollTop = chatBox.scrollHeight;
    } else {
      div.innerHTML = `<img class="avatar" src="${avatar}" alt="${speaker}"> <strong>${speaker}:</strong> ${text}`;
      chatBox.appendChild(div);
      chatBox.scrollTop = chatBox.scrollHeight;
    }
  }

  function showOptions(responses, view) {
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
      current = data.nextTheorist;
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
