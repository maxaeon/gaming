const timelineStart = -650;
const timelineEnd = 2025;

const philosophyTimeline = [
  {
    name: "Thales of Miletus",
    era: "Ancient Philosophy",
    dates: "c. 624–546 BCE",
    startYear: -624,
    endYear: -546,
    bio: "The first Western philosopher known for proposing rational explanations rather than myths, suggesting water is the fundamental substance.",
    keyIdeas: ["Rational explanations over mythology", "Monism: water as fundamental element"],
    quote: "All things are water.",
    reflectionQuestion: {
      question: "Can all reality be explained by one fundamental substance?",
      responses: {
        yes: "Interesting! Like Thales, you appreciate simplicity in explanations.",
        no: "Reasonable skepticism—perhaps reality is indeed more complex.",
        unsure: "A thoughtful stance! Philosophy begins precisely from such uncertainties."
      }
    }
  },
  {
    name: "Heraclitus",
    era: "Ancient Philosophy",
    dates: "c. 535–475 BCE",
    startYear: -535,
    endYear: -475,
    bio: "Famous for emphasizing that reality is constantly changing, symbolized by the ever-flowing river.",
    keyIdeas: ["Flux (constant change)", "Unity of opposites"],
    quote: "You cannot step twice into the same river.",
    reflectionQuestion: {
      question: "Is constant change the ultimate truth about reality?",
      responses: {
        yes: "You align with Heraclitus' view of perpetual flux.",
        no: "You favor stability—a valid counterpoint to constant change.",
        unsure: "Thoughtful reflection; perhaps the truth lies between change and stability."
      }
    }
  },
  {
    name: "Parmenides",
    era: "Ancient Philosophy",
    dates: "c. 515–450 BCE",
    startYear: -515,
    endYear: -450,
    bio: "Argued reality is unchanging, timeless, and unified; change and plurality are illusions.",
    keyIdeas: ["Reality as eternal and unchanging", "Illusion of change"],
    quote: "What is, is uncreated and indestructible.",
    reflectionQuestion: {
      question: "Could change really be an illusion?",
      responses: {
        yes: "Intriguing! You're sympathetic to Parmenides' radical perspective.",
        no: "Understandable! Our senses strongly suggest otherwise.",
        unsure: "A wise position; Parmenides' ideas challenge common intuition."
      }
    }
  },
  {
    name: "Socrates",
    era: "Ancient Philosophy",
    dates: "470–399 BCE",
    startYear: -470,
    endYear: -399,
    bio: "Father of Western ethics; famous for the Socratic method—using questions to reveal ignorance and seek truth.",
    keyIdeas: ["Socratic method", "Virtue as knowledge"],
    quote: "The unexamined life is not worth living.",
    reflectionQuestion: {
      question: "Is continuously questioning your beliefs beneficial?",
      responses: {
        yes: "Exactly what Socrates believed—questioning leads to wisdom!",
        no: "A thoughtful counterpoint—perhaps excessive questioning causes confusion.",
        unsure: "Fair stance; Socrates would encourage you to continue reflecting."
      }
    }
  },
  {
    name: "Plato",
    era: "Ancient Philosophy",
    dates: "427–347 BCE",
    startYear: -427,
    endYear: -347,
    bio: "Student of Socrates; believed in eternal, ideal Forms beyond physical reality, guiding true knowledge.",
    keyIdeas: ["Theory of Forms", "Idealism", "Allegory of the Cave"],
    quote: "Knowledge is justified true belief.",
    reflectionQuestion: {
      question: "Are there perfect, eternal ideals existing beyond our experiences?",
      responses: {
        yes: "You share Plato’s belief in transcendent ideals!",
        no: "Reasonable skepticism; perhaps ideals are human inventions.",
        unsure: "Good reflection; Plato’s forms provoke thoughtful questioning."
      }
    }
  },
  {
    name: "Aristotle",
    era: "Ancient Philosophy",
    dates: "384–322 BCE",
    startYear: -384,
    endYear: -322,
    bio: "Plato’s student; emphasized empirical observation and virtue ethics to understand reality.",
    keyIdeas: ["Virtue ethics", "Golden mean", "Empirical observation"],
    quote: "We are what we repeatedly do. Excellence, then, is not an act, but a habit.",
    reflectionQuestion: {
      question: "Is virtue about consistently choosing moderation?",
      responses: {
        yes: "Precisely Aristotle’s point—moderation guides moral character!",
        no: "An interesting position; you might prioritize other moral considerations.",
        unsure: "A thoughtful hesitation; perhaps moderation is complex in practice."
      }
    }
  },
  {
    name: "Confucius",
    era: "Eastern Philosophy",
    dates: "551–479 BCE",
    startYear: -551,
    endYear: -479,
    bio: "Chinese philosopher emphasizing ethics, social harmony, and personal virtue through self-cultivation.",
    keyIdeas: ["Virtue ethics", "Filial piety", "Social harmony"],
    quote: "What you do not wish for yourself, do not do to others.",
    reflectionQuestion: {
      question: "Is achieving social harmony a key goal of morality?",
      responses: {
        yes: "Precisely Confucius’ ethical viewpoint!",
        no: "You might prioritize individual freedom or other moral considerations.",
        unsure: "A reflective position—Confucius encourages practical moral contemplation."
      }
    }
  },
  {
    name: "Gautama Buddha",
    era: "Eastern Philosophy",
    dates: "c. 5th to 4th century BCE",
    startYear: -500,
    endYear: -400,
    bio: "Spiritual leader whose teachings on suffering, impermanence, and enlightenment influenced Eastern philosophy.",
    keyIdeas: ["Four Noble Truths", "Eightfold Path", "Impermanence"],
    quote: "All conditioned things are impermanent—strive diligently.",
    reflectionQuestion: {
      question: "Is accepting impermanence essential for human flourishing?",
      responses: {
        yes: "Exactly aligned with Buddha’s central teachings!",
        no: "Perhaps you find meaning in permanence or stability.",
        unsure: "A thoughtful stance; Buddha’s teachings encourage reflection on impermanence."
      }
    }
  },
  {
    name: "Hypatia of Alexandria",
    era: "Late Ancient Philosophy",
    dates: "c. 370–415 CE",
    startYear: 370,
    endYear: 415,
    bio: "Influential mathematician, astronomer, and Neoplatonist philosopher, famous for teaching and preserving classical knowledge.",
    keyIdeas: ["Neoplatonism", "Rational inquiry", "Integration of philosophy and science"],
    quote: "Reserve your right to think, for even to think wrongly is better than not to think at all.",
    reflectionQuestion: {
      question: "Is it essential to integrate scientific and philosophical thinking?",
      responses: {
        yes: "Exactly Hypatia’s stance!",
        no: "Interesting—perhaps you see them as fundamentally separate.",
        unsure: "A thoughtful stance; Hypatia encouraged continued inquiry."
      }
    }
  },
  {
    name: "Augustine of Hippo",
    era: "Medieval Philosophy",
    dates: "354–430 CE",
    startYear: 354,
    endYear: 430,
    bio: "Christian philosopher who integrated Platonic thought into theology, emphasizing faith and inner experience.",
    keyIdeas: ["Faith seeking understanding", "Theory of original sin", "Nature of time"],
    quote: "Our hearts are restless until they rest in You.",
    reflectionQuestion: {
      question: "Is faith necessary to truly understand philosophical truths?",
      responses: {
        yes: "Augustine would certainly agree with your insight!",
        no: "Interesting—you prefer reason independently of faith.",
        unsure: "Fair uncertainty—Augustine’s thought encourages deep reflection."
      }
    }
  },
  {
    name: "Thomas Aquinas",
    era: "Medieval Philosophy",
    dates: "1225–1274",
    startYear: 1225,
    endYear: 1274,
    bio: "Synthesized Aristotelian philosophy with Christian theology, known for natural law and proofs of God's existence.",
    keyIdeas: ["Natural law theory", "Five ways to prove God's existence", "Reason complementing faith"],
    quote: "To one who has faith, no explanation is necessary. To one without faith, no explanation is possible.",
    reflectionQuestion: {
      question: "Can reason alone reveal moral truths?",
      responses: {
        yes: "Aquinas believed reason and faith both reveal moral truths.",
        no: "Interesting—perhaps you see faith or other means as crucial too.",
        unsure: "Thoughtful hesitation; Aquinas encourages balanced reflection."
      }
    }
  },
  {
    name: "René Descartes",
    era: "Modern Philosophy",
    dates: "1596–1650",
    startYear: 1596,
    endYear: 1650,
    bio: "Considered the father of modern philosophy, famous for dualism (mind-body distinction) and rationalism.",
    keyIdeas: ["Mind-body dualism", "Cogito, ergo sum (I think, therefore I am)", "Methodic doubt"],
    quote: "I think, therefore I am.",
    reflectionQuestion: {
      question: "Can you doubt everything except your own existence?",
      responses: {
        yes: "Exactly Descartes’ foundational insight!",
        no: "Interesting—perhaps you find other certainties beyond self-existence.",
        unsure: "A reflective stance—methodic doubt is meant to challenge exactly this."
      }
    }
  },
  {
    name: "David Hume",
    era: "Modern Philosophy",
    dates: "1711–1776",
    startYear: 1711,
    endYear: 1776,
    bio: "Empiricist philosopher skeptical of causation and induction, emphasizing experience over reason.",
    keyIdeas: ["Empiricism", "Problem of induction", "Hume's fork"],
    quote: "Reason is the slave of the passions.",
    reflectionQuestion: {
      question: "Is knowledge about the world limited strictly to our experience?",
      responses: {
        yes: "Precisely Hume’s empiricist stance!",
        no: "Intriguing; you might see reason extending beyond immediate experience.",
        unsure: "Fair uncertainty; Hume challenges common assumptions."
      }
    }
  },
  {
    name: "Immanuel Kant",
    era: "Modern Philosophy",
    dates: "1724–1804",
    startYear: 1724,
    endYear: 1804,
    bio: "Synthesized rationalism and empiricism; argued moral duties must apply universally (categorical imperative).",
    keyIdeas: ["Categorical imperative", "Phenomena vs. noumena", "Transcendental idealism"],
    quote: "Act only according to that maxim whereby you can at the same time will that it should become a universal law.",
    reflectionQuestion: {
      question: "Should morality require rules that apply universally, without exception?",
      responses: {
        yes: "Exactly Kant’s rigorous ethical approach!",
        no: "Thought-provoking; exceptions might feel necessary sometimes.",
        unsure: "A reasonable hesitation—Kant’s absolutism provokes deep questions."
      }
    }
  },
  {
    name: "Friedrich Nietzsche",
    era: "Continental Philosophy",
    dates: "1844–1900",
    startYear: 1844,
    endYear: 1900,
    bio: "Challenged traditional morality; known for concepts like the death of God, will to power, and the Übermensch.",
    keyIdeas: ["Will to power", "Death of God", "Critique of traditional morality"],
    quote: "God is dead! He remains dead! And we have killed him.",
    reflectionQuestion: {
      question: "Does morality need a religious or metaphysical foundation?",
      responses: {
        yes: "Nietzsche would strongly challenge that assumption.",
        no: "Precisely Nietzsche’s radical insight!",
        unsure: "An honest uncertainty; Nietzsche challenges us profoundly here."
      }
    }
  },
  {
    name: "Jean-Paul Sartre",
    era: "Continental Philosophy",
    dates: "1905–1980",
    startYear: 1905,
    endYear: 1980,
    bio: "Existentialist philosopher who emphasized radical freedom, responsibility, and authenticity.",
    keyIdeas: ["Existentialism", "Radical freedom", "Authenticity"],
    quote: "Existence precedes essence.",
    reflectionQuestion: {
      question: "Do we create our own meaning in life?",
      responses: {
        yes: "Exactly Sartre's existentialist position!",
        no: "Interesting—you might prefer meaning from external sources.",
        unsure: "A deeply thoughtful position; existentialism challenges certainty here."
      }
    }
  },
  {
    name: "Simone de Beauvoir",
    era: "Feminist Philosophy",
    dates: "1908–1986",
    startYear: 1908,
    endYear: 1986,
    bio: "Existential feminist philosopher known for exploring gender oppression and women's freedom.",
    keyIdeas: ["Existential feminism", "Gender as socially constructed", "Women's autonomy"],
    quote: "One is not born, but rather becomes, a woman.",
    reflectionQuestion: {
      question: "Is gender identity primarily shaped by society?",
      responses: {
        yes: "Exactly Beauvoir’s influential argument!",
        no: "A challenging perspective—perhaps biology or personal choice play a stronger role for you.",
        unsure: "Thoughtful hesitation; Beauvoir’s ideas invite deeper consideration."
      }
    }
  },
  {
    name: "Bertrand Russell",
    era: "Analytic Philosophy",
    dates: "1872–1970",
    startYear: 1872,
    endYear: 1970,
    bio: "Analytic philosopher known for contributions to logic, language, epistemology, and social criticism.",
    keyIdeas: ["Analytic method", "Theory of descriptions", "Logical atomism"],
    quote: "Philosophy is to be studied for the sake of the questions themselves.",
    reflectionQuestion: {
      question: "Can logic and language clarify philosophical problems?",
      responses: {
        yes: "You share Russell’s analytic approach!",
        no: "A different perspective—perhaps philosophy transcends linguistic analysis.",
        unsure: "Fair hesitation; analytic philosophy encourages clarity."
      }
    }
  },
  {
    name: "Ludwig Wittgenstein",
    era: "Analytic Philosophy",
    dates: "1889–1951",
    startYear: 1889,
    endYear: 1951,
    bio: "Influential analytic philosopher; explored limits of language, meaning, and philosophy itself.",
    keyIdeas: ["Picture theory of language", "Language-games", "Limits of language"],
    quote: "Whereof one cannot speak, thereof one must be silent.",
    reflectionQuestion: {
      question: "Are philosophical problems fundamentally misunderstandings of language?",
      responses: {
        yes: "Exactly Wittgenstein’s stance!",
        no: "You see philosophical issues extending beyond linguistic confusion.",
        unsure: "Thoughtful reflection—Wittgenstein encourages deep consideration of language."
      }
    }
  },
  {
    name: "David Chalmers",
    era: "Contemporary Philosophy",
    dates: "1966–present",
    startYear: 1966,
    endYear: 2025,
    bio: "Contemporary philosopher of mind; famous for the hard problem of consciousness and philosophical zombies.",
    keyIdeas: ["Hard problem of consciousness", "Philosophical zombies", "Property dualism"],
    quote: "There is nothing we know more intimately than conscious experience, but there is nothing harder to explain.",
    reflectionQuestion: {
      question: "Can consciousness be explained purely by physical processes?",
      responses: {
        yes: "An optimistic stance—Chalmers sees significant explanatory gaps here.",
        no: "Precisely Chalmers’ famous argument!",
        unsure: "Thoughtful hesitation; the complexity of consciousness invites deep philosophical reflection."
      }
    }
  },
  {
    name: "Kwame Anthony Appiah",
    era: "Postcolonial",
    dates: "b. 1954",
    startYear: 1954,
    endYear: 2025,
    bio: "Global citizenship advocate; wrote on race, identity, cosmopolitanism.",
    keyIdeas: ["Cosmopolitanism", "Experiments in ethics", "African identity"],
    quote: "There is no Western civilization...",
    reflectionQuestion: {
      question: "Is cosmopolitan ethics essential in a global world?",
      responses: {
        yes: "Appiah certainly thinks so!",
        no: "Perhaps you find local identities more important.",
        unsure: "This is a key question of his philosophy."
      }
    }
  }
];

let currentIndex = 0;

function updateHighlight(entry) {
  const highlight = document.getElementById('timeline-highlight');
  const range = timelineEnd - timelineStart;
  const startPercent = (entry.startYear - timelineStart) / range;
  const endPercent = (entry.endYear - timelineStart) / range;
  highlight.style.left = `${startPercent * 100}%`;
  highlight.style.width = `${(endPercent - startPercent) * 100}%`;
}

function displayEntry(index) {
  const entry = philosophyTimeline[index];
  document.getElementById('philosopher-name').innerText = entry.name;
  document.getElementById('philosopher-era').innerText = `${entry.era} (${entry.dates})`;
  document.getElementById('philosopher-bio').innerText = entry.bio;
  const list = document.getElementById('philosopher-keyideas');
  list.innerHTML = '';
  entry.keyIdeas.forEach(idea => {
    const li = document.createElement('li');
    li.textContent = idea;
    list.appendChild(li);
  });
  document.getElementById('philosopher-quote').innerText = entry.quote;
  document.getElementById('reflection-question').innerText = entry.reflectionQuestion.question;
  document.getElementById('reflection-feedback').classList.add('hidden');
  updateHighlight(entry);
}

function handleResponse(type) {
  const entry = philosophyTimeline[currentIndex];
  const msg = entry.reflectionQuestion.responses[type];
  const fb = document.getElementById('reflection-feedback');
  fb.innerText = msg;
  fb.classList.remove('hidden');
}

document.getElementById('btn-yes').onclick = () => handleResponse('yes');
document.getElementById('btn-no').onclick = () => handleResponse('no');
document.getElementById('btn-unsure').onclick = () => handleResponse('unsure');

document.getElementById('next-btn').addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % philosophyTimeline.length;
  displayEntry(currentIndex);
});

document.getElementById('prev-btn').addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + philosophyTimeline.length) % philosophyTimeline.length;
  displayEntry(currentIndex);
});

function initTimelineHover() {
  const bar = document.getElementById('timeline-bar');
  const tooltip = document.getElementById('timeline-tooltip');
  bar.addEventListener('mousemove', (e) => {
    const rect = bar.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    const year = Math.round(timelineStart + percent * (timelineEnd - timelineStart));
    const names = philosophyTimeline
      .filter(p => year >= p.startYear && year <= p.endYear)
      .map(p => p.name);
    if (names.length) {
      tooltip.style.opacity = 1;
      tooltip.style.left = `${percent * 100}%`;
      const displayYear = year < 0 ? `${Math.abs(year)} BCE` : year;
      tooltip.innerText = `${displayYear}: ${names.join(', ')}`;
    } else {
      tooltip.style.opacity = 0;
    }
  });
  bar.addEventListener('mouseleave', () => {
    tooltip.style.opacity = 0;
  });
}

function formatYear(year) {
  if (year >= 1) {
    return year - 1; // adjust for missing year zero
  }
  if (year === 0) {
    return 1;
  }
  return `${Math.abs(year)} BCE`;
}

function initLabels() {
  const ticks = document.getElementById('timeline-ticks');
  ticks.innerHTML = '';
  const range = timelineEnd - timelineStart;
  const step = 500;
  let firstTick = Math.ceil(timelineStart / step) * step;
  for (let y = firstTick; y <= timelineEnd; y += step) {
    const tick = document.createElement('div');
    tick.className = 'timeline-tick';
    const left = ((y - timelineStart) / range) * 100;
    tick.style.left = `${left}%`;
    const lbl = document.createElement('span');
    lbl.className = 'tick-label';
    const display = formatYear(y);
    lbl.textContent = display;
    tick.appendChild(lbl);
    ticks.appendChild(tick);
  }

}

window.addEventListener('DOMContentLoaded', () => {
  displayEntry(currentIndex);
  initTimelineHover();
  initLabels();
});
