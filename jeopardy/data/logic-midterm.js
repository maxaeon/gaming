// Midterm review questions for the Logic course
window.logicMidtermQuestions = {
  "Logic Basics": [
    { question: "What is a premise in an argument?", answer: "A statement offered as support for a conclusion.", points: 100 },
    { question: "Define a deductive argument.", answer: "An argument where the conclusion necessarily follows if the premises are true.", points: 200 },
    { question: "What does it mean for an argument to be valid?", answer: "If the premises are true, the conclusion must be true.", points: 300 },
    { question: "What is a sound argument?", answer: "A valid argument with all true premises.", points: 400 },
    { question: "Can an invalid argument have a true conclusion?", answer: "Yes, but the conclusion is not guaranteed by the premises.", points: 500 }
  ],

  "Valid & Invalid Forms": [
    { question: "State the form of Modus Ponens.", answer: "If P then Q; P; therefore Q.", points: 100 },
    { question: "Which form is 'If P then Q; Not Q; therefore Not P'?", answer: "Modus Tollens.", points: 200 },
    { question: "What invalid form is 'If P then Q; Q; therefore P'?", answer: "Affirming the Consequent.", points: 300 },
    { question: "What invalid form is 'If P then Q; Not P; therefore Not Q'?", answer: "Denying the Antecedent.", points: 400 },
    { question: "What form infers Q from 'P or Q' and 'Not P'?", answer: "Disjunctive Syllogism.", points: 500 }
  ],

  "Symbolization": [
    { question: "Which symbol represents 'and'?", answer: "∧ (conjunction).", points: 100 },
    { question: "How do you symbolize 'Either P or Q'?", answer: "P ∨ Q.", points: 200 },
    { question: "What does the symbol '¬' represent?", answer: "Negation.", points: 300 },
    { question: "Symbolize 'If P then Q'.", answer: "P → Q.", points: 400 },
    { question: "Symbolize 'P if and only if Q'.", answer: "P ↔ Q.", points: 500 }
  ],

  "Truth Tables": [
    { question: "How many rows does a truth table for two variables have?", answer: "Four rows.", points: 100 },
    { question: "When is a conjunction P ∧ Q true?", answer: "Only when both P and Q are true.", points: 200 },
    { question: "When is a conditional P → Q false?", answer: "When P is true and Q is false.", points: 300 },
    { question: "What do we call a statement true on every row of its table?", answer: "A tautology.", points: 400 },
    { question: "How can a truth table show two statements are equivalent?", answer: "They share the same truth value on every row.", points: 500 }
  ],

  "Evaluating Arguments": [
    { question: "How can a truth table show an argument is valid?", answer: "Every row making the premises true also makes the conclusion true.", points: 100 },
    { question: "What does a row with true premises and a false conclusion indicate?", answer: "The argument is invalid.", points: 200 },
    { question: "In a truth table, what do 'T' and 'F' stand for?", answer: "True and False.", points: 300 },
    { question: "Must a valid argument have all true premises?", answer: "No, validity concerns form, not truth of premises.", points: 400 },
    { question: "What is the purpose of a partial truth table?", answer: "To find a counterexample without completing every row.", points: 500 }
  ]
};
