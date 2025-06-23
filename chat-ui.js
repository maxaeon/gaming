// Manages simple alternating chat using the ethicalChatbots definitions

document.addEventListener('DOMContentLoaded', () => {
  const chatBox = document.getElementById('chat-box');
  const input = document.getElementById('user-input');
  const sendBtn = document.getElementById('send-btn');

  const theorists = Object.keys(window.ethicalChatbots || {});
  let nextIndex = 0;

  function appendMessage(text, className) {
    const div = document.createElement('div');
    div.className = `chat-message ${className}`;
    div.textContent = text;
    chatBox.appendChild(div);
    chatBox.scrollTop = chatBox.scrollHeight;
  }

  function getNextTheorist() {
    const t = theorists[nextIndex % theorists.length];
    nextIndex++;
    return t;
  }

  function botReply() {
    const speaker = getNextTheorist();
    const message = window.ethicalChatbots[speaker].system;
    const typing = document.createElement('div');
    typing.className = 'chat-message chat-bot';
    typing.textContent = '…';
    chatBox.appendChild(typing);
    chatBox.scrollTop = chatBox.scrollHeight;
    const delay = 1000 + Math.random() * 1000; // 1-2 seconds
    setTimeout(() => {
      typing.textContent = message;
    }, delay);
  }

  function handleSend() {
    const text = input.value.trim();
    if (!text) return;
    appendMessage(text, 'chat-user');
    input.value = '';
    botReply();
  }

  sendBtn.addEventListener('click', handleSend);
  input.addEventListener('keypress', e => {
    if (e.key === 'Enter') handleSend();
  });

  botReply();
});
