const ethicalChatbots = {
  "Sage": {
    greeting: () =>
      "I'm Sage, a friendly chatbot who lives at the intersection of philosophy and computer science. I'd love to explore ethics with you by chatting with some famous moral theorists about their views. Are you up for it?",
    introduceMill: "First, let's meet John Stuart Mill, who thinks morality is about maximizing happiness.",
    finalAssessment: (userName, alignmentScores) => {
      return `This was great${userName ? `, ${userName}` : ""}! Which parts of each philosopher's theory resonated with you? Which ideas do you disagree with? Thanks for exploring ethics with me—I learned a lot too!`;
    }
  },

  "John Stuart Mill": {
    greeting: (userName) =>
      `Thanks for the intro! I'm John Stuart Mill. For me, morality is about achieving the greatest happiness for the greatest number.`,
    exchanges: [
      {
        question: "Do you agree morality should primarily focus on maximizing happiness?",
        theoristView: "Yes, definitely",
        responses: {
          "Yes, definitely": "Exactly! The outcomes of our actions determine their morality.",
          "No, not really": "I see your point, though ignoring outcomes can overlook people's happiness.",
          "I'm not sure": "Fair enough. Considering consequences often clarifies things."
        }
      },
      {
        transition: "Let's apply this with a classic scenario:",
        question: `In the <span class="info" title="A runaway trolley will kill five people unless diverted, but diverting it kills one.">trolley problem</span>, would you divert the trolley?`,
        theoristView: "Yes, definitely",
        responses: {
          "Yes, definitely": "Precisely! Choosing the option that saves more lives is morally right.",
          "No, not really": "I respect your caution. Yet, not acting results in greater harm.",
          "I'm not sure": "It's a difficult decision. Reflecting on outcomes can help clarify it."
        }
      }
    ],
    closings: {
      highAlignment: (userName) =>
        `You clearly resonate with utilitarian ethics${userName ? `, ${userName}` : ""}. Someone who disagrees with me is Immanuel Kant, so I've added him to the chat. Kant believes morality is about following universal duties, not just happiness.`,
      moderateAlignment: (userName) =>
        `Interesting perspectives${userName ? `, ${userName}` : ""}. I've invited Immanuel Kant, who argues morality comes from universal duties rather than consequences.`,
      lowAlignment: (userName) =>
        `Fascinating disagreements${userName ? `, ${userName}` : ""}. I've added Immanuel Kant to explain his view that morality rests on universal duties.`
    },
    nextTheorist: "Immanuel Kant"
  },

  "Immanuel Kant": {
    greeting: (userName) =>
      `Thank you, Mill. I'm Immanuel Kant. Unlike Mill, I believe morality is about following universal moral duties—the categorical imperative—not about consequences.`,
    exchanges: [
      {
        question: "Is it ever acceptable to make moral exceptions for yourself or loved ones?",
        theoristView: "No, not really",
        responses: {
          "No, not really": "Exactly! Moral rules must be universal without exceptions.",
          "Yes, definitely": "I strongly disagree. Exceptions undermine morality itself.",
          "I'm not sure": "Understandable, but universal consistency is key to morality."
        }
      },
      {
        transition: "Consider this challenging scenario:",
        question: `In the <span class="info" title="A Nazi solider knocks on your door and asks if you're hiding the Smith family in your basement; if you tell the truth and say yes, the soldier will kill the family and you. Kant argues lying here is still wrong.">Nazi-at-the-door scenario</span>, is lying morally acceptable to save a life?`,
        theoristView: "No, not really",
        responses: {
          "Yes, definitely": "Compassionate, but honesty must remain absolute and universal.",
          "No, not really": "Precisely! Truthfulness is always morally required.",
          "I'm not sure": "It is difficult, yet morality demands consistent honesty."
        }
      }
    ],
    closings: {
      highAlignment: (userName) =>
        `You align well with duty-based ethics${userName ? `, ${userName}` : ""}. To deepen the discussion I've added Thomas Aquinas. He emphasizes natural law and intentions.`,
      moderateAlignment: (userName) =>
        `Thoughtful engagement${userName ? `, ${userName}` : ""}. I've invited Thomas Aquinas, who focuses on natural law and intentions.`,
      lowAlignment: (userName) =>
        `Interesting differences${userName ? `, ${userName}` : ""}. Thomas Aquinas, whom I've added, argues morality depends on natural law and intentions.`
    },
    nextTheorist: "St. Thomas Aquinas"
  },

  "St. Thomas Aquinas": {
    greeting: (userName) =>
      `Thanks, Kant. I'm Thomas Aquinas. Morality depends not just on universal rules but also intentions and fulfilling natural human purposes.`,
    exchanges: [
      {
        question: "Does the morality of an action significantly depend on one's intentions?",
        theoristView: "Yes, definitely",
        responses: {
          "Yes, definitely": "Exactly! Good intentions are crucial for moral action.",
          "No, not really": "I respectfully disagree. Intentions deeply shape morality.",
          "I'm not sure": "Understandable. Reflecting on intentions often helps clarify moral judgments."
        }
      },
      {
        transition: "Given this, consider a sensitive case:",
        question: "Is abortion permissible if pregnancy severely threatens the mother's life?",
        theoristView: "No, not really",
        responses: {
          "Yes, definitely": "Compassionate, but directly ending life conflicts with natural law.",
          "No, not really": "Precisely! Natural law emphasizes preserving all innocent life.",
          "I'm not sure": "Difficult indeed. Natural law highlights life's inherent dignity."
        }
      }
    ],
    closings: {
      highAlignment: (userName) =>
        `You resonate strongly with natural law ethics${userName ? `, ${userName}` : ""}. I've added Aristotle to share his focus on cultivating virtue for human flourishing.`,
      moderateAlignment: (userName) =>
        `Good reflections${userName ? `, ${userName}` : ""}. Aristotle will join us next to discuss virtue and flourishing.`,
      lowAlignment: (userName) =>
        `Interesting viewpoints${userName ? `, ${userName}` : ""}. I've invited Aristotle, who centers morality on developing virtue.`
    },
    nextTheorist: "Aristotle"
  },

  "Aristotle": {
    greeting: (userName) =>
      `Thanks, Aquinas. I'm Aristotle. Morality involves developing virtues leading to eudaimonia—human flourishing—not just rules or outcomes.`,
    exchanges: [
      {
        transition: "Let's reflect on virtues directly:",
        question: "Is moral courage always virtuous, regardless of outcomes?",
        theoristView: "Yes, definitely",
        responses: {
          "Yes, definitely": "Exactly! Courage is a key virtue essential to character.",
          "No, not really": "Interesting, though balanced courage guided by wisdom is always virtuous.",
          "I'm not sure": "Understandable. Courage is often crucial to moral development."
        }
      },
      {
        question: "Should honesty be valued primarily as a virtue itself?",
        theoristView: "Yes, definitely",
        responses: {
          "Yes, definitely": "Precisely! Honesty deeply shapes our virtuous character.",
          "No, not really": "Respectable point, yet honesty significantly contributes to moral character.",
          "I'm not sure": "Fair uncertainty. Reflecting on virtues can provide clarity."
        }
      }
    ],
    closings: {
      highAlignment: (userName) =>
        `You strongly align with virtue ethics${userName ? `, ${userName}` : ""}. I've now added Nel Noddings to share her ethics of care perspective.`,
      moderateAlignment: (userName) =>
        `Interesting thoughts${userName ? `, ${userName}` : ""}. I've invited Nel Noddings, who emphasizes empathy and care.`,
      lowAlignment: (userName) =>
        `Fascinating differences${userName ? `, ${userName}` : ""}. Nel Noddings will join us next to discuss ethics of care.`
    },
    nextTheorist: "Nel Noddings"
  },

  "Nel Noddings": {
    greeting: (userName) =>
      `Thanks, Aristotle. I'm Nel Noddings. Morality fundamentally involves empathy, care, and emotional relationships.`,
    exchanges: [
      {
        transition: "Reflecting on relationships and care:",
        question: "Should moral decisions prioritize empathy in personal relationships over impartial rules?",
        theoristView: "Yes, definitely",
        responses: {
          "Yes, definitely": "Exactly! Empathy and care are essential to genuine morality.",
          "No, not really": "I see your point, but morality must include emotional relationships.",
          "I'm not sure": "Fair enough. Empathy often clarifies tough moral choices."
        }
      },
      {
        transition: "Let's apply this practically:",
        question: "Is it morally right to prioritize helping a close friend in crisis, even if you neglect broader social duties?",
        theoristView: "Yes, definitely",
        responses: {
          "Yes, definitely": "Absolutely! Caring deeply about those close to us can justify prioritization.",
          "No, not really": "I respect your impartiality, yet close relationships sometimes take moral priority.",
          "I'm not sure": "Understandable. Empathy often guides us clearly in personal moral decisions."
        }
      }
    ],
    closings: {
      highAlignment: (userName) =>
        `Strong resonance with care ethics${userName ? `, ${userName}` : ""}. I'm adding Sage back to the chat to conclude.`,
      moderateAlignment: (userName) =>
        `Thanks for the thoughtful discussion${userName ? `, ${userName}` : ""}. I'm returning you to Sage now.`,
      lowAlignment: (userName) =>
        `Interesting dialogue${userName ? `, ${userName}` : ""}. I'll add Sage back so we can wrap up.`
    },
    nextTheorist: "Sage"
  }
};

if (typeof window !== 'undefined') {
  window.ethicalChatbots = ethicalChatbots;
}
