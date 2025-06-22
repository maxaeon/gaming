const philosopherQuotes = [
  { quote: "The unexamined life is not worth living.", philosopher: "Socrates" },
  { quote: "I think, therefore I am.", philosopher: "René Descartes" },
  { quote: "One cannot step twice in the same river.", philosopher: "Heraclitus" },
  { quote: "Happiness is the highest good.", philosopher: "Aristotle" },
  { quote: "God is dead! He remains dead! And we have killed him.", philosopher: "Friedrich Nietzsche" },
  { quote: "Entities should not be multiplied unnecessarily.", philosopher: "William of Ockham" },
  { quote: "To be is to be perceived.", philosopher: "George Berkeley" },
  { quote: "Man is condemned to be free.", philosopher: "Jean-Paul Sartre" },
  { quote: "Hell is other people.", philosopher: "Jean-Paul Sartre" },
  { quote: "The life of man [is] solitary, poor, nasty, brutish, and short.", philosopher: "Thomas Hobbes" },
  { quote: "Act only according to that maxim whereby you can at the same time will that it should become a universal law.", philosopher: "Immanuel Kant" },
  { quote: "I ought never to act except in such a way that I could also will that my maxim should become a universal law.", philosopher: "Immanuel Kant" },
  { quote: "No man's knowledge here can go beyond his experience.", philosopher: "John Locke" },
  { quote: "All that is solid melts into air.", philosopher: "Karl Marx" },
  { quote: "He who thinks great thoughts, often makes great errors.", philosopher: "Martin Heidegger" },
  { quote: "What is rational is actual, and what is actual is rational.", philosopher: "G.W.F. Hegel" },
  { quote: "The heart has its reasons, which reason does not know.", philosopher: "Blaise Pascal" },
  { quote: "That which does not kill us makes us stronger.", philosopher: "Friedrich Nietzsche" },
  { quote: "Happiness is pleasure and the absence of pain.", philosopher: "Epicurus" },
  { quote: "Philosophy begins in wonder.", philosopher: "Plato" },
];

let currentQuote = null;

function showRandomQuote() {
  const idx = Math.floor(Math.random() * philosopherQuotes.length);
  currentQuote = philosopherQuotes[idx];
  document.getElementById('quote-text').innerText = '"' + currentQuote.quote + '"';
  document.getElementById('quote-answer').value = '';
  document.getElementById('quote-feedback').classList.add('hidden');
  document.getElementById('quote-next').classList.add('hidden');
}

document.getElementById('quote-submit').addEventListener('click', () => {
  const guess = document.getElementById('quote-answer').value.trim();
  const feedback = document.getElementById('quote-feedback');
  if (guess.toLowerCase() === currentQuote.philosopher.toLowerCase()) {
    feedback.innerText = 'Correct!';
    feedback.style.color = '#4caf50';
  } else {
    feedback.innerText = `Nope, it was ${currentQuote.philosopher}.`;
    feedback.style.color = '#c62828';
  }
  feedback.classList.remove('hidden');
  document.getElementById('quote-next').classList.remove('hidden');
});

document.getElementById('quote-next').addEventListener('click', showRandomQuote);

showRandomQuote();
