function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}

function looksLikePerson(answer) {
  const words = answer.trim().split(/\s+/);
  if (words.length === 0 || words.length > 4) return false;
  return words.every(w => /^[A-Z][A-Za-z\u00C0-\u017F'\-]*$/.test(w));
}

function questionExpectsPerson(question, answer) {
  if (/\bwho\b|which (philosopher|thinker|person)|\bwhose\b/i.test(question)) {
    return true;
  }
  return looksLikePerson(answer);
}

if (typeof window !== 'undefined') {
  window.shuffle = shuffle;
  window.looksLikePerson = looksLikePerson;
  window.questionExpectsPerson = questionExpectsPerson;
}
