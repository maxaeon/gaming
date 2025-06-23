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

  function addMessage(speaker, text, className) {
    if (!className) {
      className = speakerClasses[speaker] || 'chat-bot';
    }
    const div = document.createElement('div');
    div.className = `chat-message ${className}`;
    div.innerHTML = `<strong>${speaker}:</strong> ${text}`;
    chatBox.appendChild(div);
    chatBox.scrollTop = chatBox.scrollHeight;
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

  function handleChoice(option, reply, view) {
    addMessage('You', option, 'chat-user');
    addMessage(current, reply);
    if (option === view) {
      alignmentScores[current] = (alignmentScores[current] || 0) + 1;
    }
    exchangeIndex++;
    setTimeout(showExchange, 500);
  }

  function showExchange() {
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
        addMessage(current, closing);
      }
      current = data.nextTheorist;
      exchangeIndex = 0;
      if (current === 'Philosophy Student') {
        const finalText = bots['Philosophy Student'].finalAssessment('', alignmentScores);
        addMessage('Philosophy Student', finalText);
        controls.innerHTML = '';
        return;
      }
      alignmentScores[current] = 0;
      const greet = typeof bots[current].greeting === 'function'
        ? bots[current].greeting('')
        : bots[current].greeting;
      addMessage(current, greet);
      setTimeout(showExchange, 500);
      return;
    }
    const ex = exchanges[exchangeIndex];
    if (ex.transition) addMessage(current, ex.transition);
    addMessage(current, ex.question);
    showOptions(ex.responses, ex.theoristView);
  }

  function startConversation() {
    const student = bots['Philosophy Student'];
    const greet = typeof student.greeting === 'function' ? student.greeting('') : student.greeting;
    addMessage('Philosophy Student', greet);
    if (student.introduceMill) {
      addMessage('Philosophy Student', student.introduceMill);
    }
    current = 'John Stuart Mill';
    alignmentScores[current] = 0;
    const firstGreet = typeof bots[current].greeting === 'function'
      ? bots[current].greeting('')
      : bots[current].greeting;
    addMessage(current, firstGreet);
    showExchange();
  }

  document.addEventListener('DOMContentLoaded', startConversation);
})();
