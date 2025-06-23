const ethicalChatbots = {
  "Philosophy Student": {
    greeting: (userName) =>
      `Hey${userName ? ` ${userName}` : ""}! I'm a fellow philosophy student majoring in computer science. Ethics can be tricky, so I created this AI chatbot to talk directly with great moral thinkers. Let's dive in!`,
    introduceMill: "First, let's meet John Stuart Mill, who thinks morality is about maximizing happiness.",
    finalAssessment: (userName, alignmentScores) => {
      const highest = Object.entries(alignmentScores).sort((a,b)=>b[1]-a[1])[0];
      return `This was great${userName ? `, ${userName}` : ""}! Your ethical views align most with ${highest[0]}. Thanks for exploring ethics with me—I learned a lot too!`;
    }
  },

  "John Stuart Mill": {
    greeting: (userName) =>
      `Thanks for the intro! I'm John Stuart Mill. For me, morality is about achieving the greatest happiness for the greatest number.`,
    exchanges: [
      {
        question: "Do you agree morality should primarily focus on maximizing happiness?",
        theoristView: "Yes",
        responses: {
          Yes: "Exactly! The outcomes of our actions determine their morality.",
          No: "I see your point, though ignoring outcomes can overlook people's happiness.",
          "I'm not sure": "Fair enough. Considering consequences often clarifies things."
        }
      },
      {
        transition: "Let's apply this with a classic scenario:",
        question: `In the <span class="info" title="A runaway trolley will kill five people unless diverted, but diverting it kills one.">trolley problem</span>, would you divert the trolley?`,
        theoristView: "Yes",
        responses: {
          Yes: "Precisely! Choosing the option that saves more lives is morally right.",
          No: "I respect your caution. Yet, not acting results in greater harm.",
          "I'm not sure": "It's a difficult decision. Reflecting on outcomes can help clarify it."
        }
      }
    ],
    closings: {
      highAlignment: (userName) =>
        `You clearly resonate with utilitarian ethics${userName ? `, ${userName}` : ""}. But let's hear from Immanuel Kant next.`,
      moderateAlignment: (userName) =>
        `Interesting perspectives${userName ? `, ${userName}` : ""}. Perhaps Kant's approach can add clarity.`,
      lowAlignment: (userName) =>
        `Fascinating disagreements${userName ? `, ${userName}` : ""}. Kant might offer insights you'll appreciate more.`
    },
    nextTheorist: "Immanuel Kant"
  },

  "Immanuel Kant": {
    greeting: (userName) =>
      `Thank you, Mill. I'm Immanuel Kant. Unlike Mill, I believe morality is about following universal moral duties—the categorical imperative—not about consequences.`,
    exchanges: [
      {
        question: "Is it ever acceptable to make moral exceptions for yourself or loved ones?",
        theoristView: "No",
        responses: {
          No: "Exactly! Moral rules must be universal without exceptions.",
          Yes: "I strongly disagree. Exceptions undermine morality itself.",
          "I'm not sure": "Understandable, but universal consistency is key to morality."
        }
      },
      {
        transition: "Consider this challenging scenario:",
        question: `In the <span class="info" title="A Nazi solider knocks on your door and asks if you're hiding the Smith family in your basement; if you tell the truth and say yes, the soldier will kill the family and you. Kant argues lying here is still wrong.">Nazi-at-the-door scenario</span>, is lying morally acceptable to save a life?`,
        theoristView: "No",
        responses: {
          Yes: "Compassionate, but honesty must remain absolute and universal.",
          No: "Precisely! Truthfulness is always morally required.",
          "I'm not sure": "It is difficult, yet morality demands consistent honesty."
        }
      }
    ],
    closings: {
      highAlignment: (userName) =>
        `You align well with duty-based ethics${userName ? `, ${userName}` : ""}. Let's now meet Thomas Aquinas.`,
      moderateAlignment: (userName) =>
        `Thoughtful engagement${userName ? `, ${userName}` : ""}. Perhaps Aquinas will provide more insights.`,
      lowAlignment: (userName) =>
        `Interesting differences${userName ? `, ${userName}` : ""}. Aquinas' natural law might resonate better.`
    },
    nextTheorist: "St. Thomas Aquinas"
  },

  "St. Thomas Aquinas": {
    greeting: (userName) =>
      `Thanks, Kant. I'm Thomas Aquinas. Morality depends not just on universal rules but also intentions and fulfilling natural human purposes.`,
    exchanges: [
      {
        question: "Does the morality of an action significantly depend on one's intentions?",
        theoristView: "Yes",
        responses: {
          Yes: "Exactly! Good intentions are crucial for moral action.",
          No: "I respectfully disagree. Intentions deeply shape morality.",
          "I'm not sure": "Understandable. Reflecting on intentions often helps clarify moral judgments."
        }
      },
      {
        transition: "Given this, consider a sensitive case:",
        question: "Is abortion permissible if pregnancy severely threatens the mother's life?",
        theoristView: "No",
        responses: {
          Yes: "Compassionate, but directly ending life conflicts with natural law.",
          No: "Precisely! Natural law emphasizes preserving all innocent life.",
          "I'm not sure": "Difficult indeed. Natural law highlights life's inherent dignity."
        }
      }
    ],
    closings: {
      highAlignment: (userName) =>
        `You resonate strongly with natural law ethics${userName ? `, ${userName}` : ""}. Let's introduce Aristotle next.`,
      moderateAlignment: (userName) =>
        `Good reflections${userName ? `, ${userName}` : ""}. Aristotle might enhance our discussion further.`,
      lowAlignment: (userName) =>
        `Interesting viewpoints${userName ? `, ${userName}` : ""}. Aristotle’s virtue ethics could offer another angle.`
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
        theoristView: "Yes",
        responses: {
          Yes: "Exactly! Courage is a key virtue essential to character.",
          No: "Interesting, though balanced courage guided by wisdom is always virtuous.",
          "I'm not sure": "Understandable. Courage is often crucial to moral development."
        }
      },
      {
        question: "Should honesty be valued primarily as a virtue itself?",
        theoristView: "Yes",
        responses: {
          Yes: "Precisely! Honesty deeply shapes our virtuous character.",
          No: "Respectable point, yet honesty significantly contributes to moral character.",
          "I'm not sure": "Fair uncertainty. Reflecting on virtues can provide clarity."
        }
      }
    ],
    closings: {
      highAlignment: (userName) =>
        `You strongly align with virtue ethics${userName ? `, ${userName}` : ""}. Lastly, let's meet Nel Noddings.`,
      moderateAlignment: (userName) =>
        `Interesting thoughts${userName ? `, ${userName}` : ""}. Noddings' perspective on care might be valuable.`,
      lowAlignment: (userName) =>
        `Fascinating differences${userName ? `, ${userName}` : ""}. Perhaps Noddings' ethics of care will resonate better.`
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
        theoristView: "Yes",
        responses: {
          Yes: "Exactly! Empathy and care are essential to genuine morality.",
          No: "I see your point, but morality must include emotional relationships.",
          "I'm not sure": "Fair enough. Empathy often clarifies tough moral choices."
        }
      },
      {
        transition: "Let's apply this practically:",
        question: "Is it morally right to prioritize helping a close friend in crisis, even if you neglect broader social duties?",
        theoristView: "Yes",
        responses: {
          Yes: "Absolutely! Caring deeply about those close to us can justify prioritization.",
          No: "I respect your impartiality, yet close relationships sometimes take moral priority.",
          "I'm not sure": "Understandable. Empathy often guides us clearly in personal moral decisions."
        }
      }
    ],
    closings: {
      highAlignment: (userName) =>
        `Strong resonance with care ethics${userName ? `, ${userName}` : ""}. I'll now return you to our fellow student.`,
      moderateAlignment: (userName) =>
        `Thanks for the thoughtful discussion${userName ? `, ${userName}` : ""}. Back to our fellow student now.`,
      lowAlignment: (userName) =>
        `Interesting dialogue${userName ? `, ${userName}` : ""}. Let's return to our fellow student to wrap up.`
    },
    nextTheorist: "Philosophy Student"
  }
};

if (typeof window !== 'undefined') {
  window.ethicalChatbots = ethicalChatbots;
}
