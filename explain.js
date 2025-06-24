const explainData = {
  "Categorical Imperative": [
    "The Categorical Imperative clearly states that you must act only according to maxims (rules) you could consistently want everyone else to follow universally. For instance, lying is always wrong because universal dishonesty would undermine trust entirely.",
    "The Means-End Formulation of Kant’s Categorical Imperative explicitly instructs us to treat humanity—ourselves and others—always as ends in themselves, never merely as means. This means explicitly respecting people’s dignity and autonomy, rather than using them as tools for our own purposes."
  ],
  "Consequentialism": [
    "Consequentialism explicitly states that the morality of an action depends entirely on its consequences. Good actions are those that clearly produce the best overall outcomes, such as maximum happiness.",
    "Utilitarianism, the best-known form of consequentialism, explicitly defines moral rightness by the Greatest Happiness Principle: an action is morally right if it produces the greatest amount of happiness for the greatest number of people."
  ],
  "Deontology": [
    "Deontology is an ethical framework that clearly emphasizes duties and moral rules. Unlike consequentialism, deontology explicitly argues that some actions (like lying or harming innocents) are inherently wrong regardless of outcomes. Kant’s categorical imperative is a primary example of deontology."
  ],
  "Virtue Ethics": [
    "Virtue Ethics explicitly emphasizes developing good character traits—virtues like courage, honesty, and generosity. Morality is clearly about cultivating these virtues and exercising practical wisdom.",
    "Aristotle explicitly argues that virtue is a balanced, moderate state between extremes (excess and deficiency). For example, courage is the clear midpoint between recklessness and cowardice. Virtuous behavior explicitly requires moderation and balance."
  ],
  "Philosophical Bullshit": [
    "Philosopher Harry Frankfurt explicitly defines 'bullshit' as statements made without any genuine concern for truth or accuracy—often intended simply to impress or sound meaningful without real substance. Philosophical writing requires clearly avoiding such meaningless or empty language and instead demands precise, truthful, and verifiable statements."
  ],
  "Environmental Impact of AI": [
    "Artificial Intelligence (AI) technologies, especially large-scale models, explicitly require significant amounts of energy and computing resources to train and operate. This results in substantial carbon emissions and environmental impact. Responsible use of AI clearly involves balancing convenience and efficiency with awareness of its environmental footprint."
  ],
  "Fact Verification": [
    "Fact verification explicitly involves checking the accuracy and truthfulness of claims, statements, or references against reliable, authoritative sources. This skill is critical in academic and philosophical writing to avoid misinformation and to ensure credibility. Always verify explicitly by consulting credible sources, original texts, or reputable experts."
  ],
  "Eudaimonia": [
    "Eudaimonia is an ancient Greek term explicitly translated as happiness, flourishing, or human well-being. Aristotle explicitly describes eudaimonia as the highest goal of human life, achieved through the active pursuit of virtue, rational thought, and practical wisdom (phronesis). It means living a fulfilling life, not just experiencing temporary pleasure."
  ],
  "Practical Wisdom": [
    "Practical wisdom, or phronesis, explicitly refers to the ability to make good judgments and choose appropriate actions based on experience, reason, and virtue. Aristotle emphasizes practical wisdom as essential for effectively navigating complex ethical situations, clearly guiding us to act morally and wisely in everyday life."
  ],
  "Natural Law": [
    "Natural Law explicitly refers to the idea that moral principles are rooted in human nature itself and discoverable by reason. Philosopher Thomas Aquinas clearly argues natural law provides universal standards for morality, derived from rational understanding of human purposes. It often serves explicitly as the basis for arguments about human rights and justice."
  ],
  "Dualism": [
    "Dualism explicitly claims reality consists of two fundamentally different kinds of substances: physical (material) and mental (immaterial)."
  ],
  "Materialism": [
    "Materialism explicitly states that everything that exists, including minds and consciousness, is purely physical matter and its interactions."
  ],
  "Deductive Argument": [
    "A deductive argument explicitly aims to provide logically conclusive support for its conclusion. If the premises are true, the conclusion must clearly be true.",
    "A deductive argument is clearly valid if the conclusion follows logically from the premises. If an argument is both valid and explicitly has true premises, it is sound—guaranteeing a true conclusion."
  ],
  "Inductive Argument": [
    "An inductive argument explicitly provides probable (but not guaranteed) support for its conclusion, based on evidence or examples.",
    "An inductive argument is clearly strong if the premises make the conclusion highly probable. If a strong argument explicitly has true premises, it is cogent—indicating a likely, but not guaranteed, true conclusion."
  ],
  "Logical Fallacy": [
    "A logical fallacy explicitly refers to a mistake in reasoning or argumentation that weakens or invalidates an argument.",
    "The Ad Hominem fallacy explicitly occurs when someone attacks the character or traits of the person making the argument, rather than addressing the argument itself, which clearly fails to logically challenge the argument itself."
  ]
};

function attachExplainHandlers() {
  document.querySelectorAll('.explain-term').forEach(el => {
    el.addEventListener('click', () => showExplanation(el.dataset.term));
  });
}

function showExplanation(term) {
  const texts = explainData[term];
  if (!texts) return;
  const overlay = document.createElement('div');
  overlay.className = 'explain-overlay';
  const popup = document.createElement('div');
  popup.className = 'explain-popup';
  const close = document.createElement('button');
  close.className = 'explain-close';
  close.textContent = 'X';
  const text = document.createElement('div');
  text.className = 'explain-text';
  text.textContent = texts[0];
  const controls = document.createElement('div');
  controls.className = 'explain-version';
  if (texts.length > 1) {
    texts.forEach((_, idx) => {
      const span = document.createElement('span');
      span.textContent = `${idx + 1}/${texts.length}`;
      span.className = 'version-btn' + (idx === 0 ? ' active' : '');
      span.dataset.index = idx;
      controls.appendChild(span);
    });
    controls.addEventListener('click', e => {
      if (e.target.classList.contains('version-btn')) {
        const i = parseInt(e.target.dataset.index, 10);
        text.textContent = texts[i];
        controls.querySelectorAll('.version-btn').forEach(btn => btn.classList.remove('active'));
        e.target.classList.add('active');
      }
    });
  }
  close.onclick = () => overlay.remove();
  popup.appendChild(close);
  popup.appendChild(text);
  if (texts.length > 1) popup.appendChild(controls);
  overlay.appendChild(popup);
  document.body.appendChild(overlay);
}

if (typeof window !== 'undefined') {
  window.addEventListener('DOMContentLoaded', attachExplainHandlers);
}
