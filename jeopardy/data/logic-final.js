// Final review questions for the Logic course
window.logicFinalQuestions = {
  "Proof Techniques": [
    { question: "Which rule infers Q from P and P → Q?", answer: "Modus Ponens.", points: 100 },
    { question: "What proof strategy assumes a statement to derive it conditionally?", answer: "Conditional proof.", points: 200 },
    { question: "What do we call proving a statement by deriving a contradiction from its negation?", answer: "Indirect proof (reductio ad absurdum).", points: 300 },
    { question: "Which rule combines separate statements into P ∧ Q?", answer: "Conjunction introduction.", points: 400 },
    { question: "Which rule derives Q from P ∧ Q?", answer: "Conjunction elimination.", points: 500 }
  ],

  "Complex Connectives": [
    { question: "Symbolize 'P only if Q'.", answer: "P → Q.", points: 100 },
    { question: "Which connective does '↔' represent?", answer: "Biconditional.", points: 200 },
    { question: "When is a biconditional P ↔ Q true?", answer: "When P and Q have the same truth value.", points: 300 },
    { question: "Translate 'Unless P, Q' into symbols.", answer: "¬P → Q.", points: 400 },
    { question: "How is exclusive or expressed in symbols?", answer: "(P ∨ Q) ∧ ¬(P ∧ Q) or P ⊕ Q.", points: 500 }
  ],

  "Predicate Logic Basics": [
    { question: "What symbol expresses 'for all'?", answer: "∀.", points: 100 },
    { question: "What symbol expresses 'there exists'?", answer: "∃.", points: 200 },
    { question: "Translate 'All cats are mammals' into predicate logic.", answer: "∀x (Cat(x) → Mammal(x)).", points: 300 },
    { question: "Translate 'Some dogs bark' into predicate logic.", answer: "∃x (Dog(x) ∧ Bark(x)).", points: 400 },
    { question: "In predicate logic, what is the domain?", answer: "The set of objects the variables range over.", points: 500 }
  ],

  "Quantifiers & Identity": [
    { question: "Negate '∀x P(x)' using a quantifier.", answer: "∃x ¬P(x).", points: 100 },
    { question: "Negate '∃x P(x)' using a quantifier.", answer: "∀x ¬P(x).", points: 200 },
    { question: "What does '=' mean in predicate logic?", answer: "It asserts two names refer to the same object.", points: 300 },
    { question: "Symbolize 'Only one P'.", answer: "∃x (P(x) ∧ ∀y (P(y) → y = x)).", points: 400 },
    { question: "What quantifier order expresses 'Everyone loves someone'?", answer: "∀x ∃y Loves(x, y).", points: 500 }
  ],

  "Modal Logic": [
    { question: "What does the modal operator '□' mean?", answer: "Necessarily.", points: 100 },
    { question: "What does the modal operator '◇' mean?", answer: "Possibly.", points: 200 },
    { question: "In modal logic, what is a possible world?", answer: "A complete way things might have been.", points: 300 },
    { question: "What does '□P → P' express?", answer: "If necessarily P then P (axiom T).", points: 400 },
    { question: "Translate 'It is possible that P'.", answer: "◇P.", points: 500 }
  ],

  "Advanced Inference": [
    { question: "What does a conditional derivation from P leading to contradiction show?", answer: "¬P by indirect proof.", points: 100 },
    { question: "Which rule eliminates an existential quantifier?", answer: "Existential instantiation.", points: 200 },
    { question: "Which rule introduces a universal quantifier?", answer: "Universal generalization.", points: 300 },
    { question: "What role does identity play in predicate proofs?", answer: "It allows substitution of identical terms.", points: 400 },
    { question: "In modal logic, what does '◇□P' mean?", answer: "It is possible that necessarily P.", points: 500 }
  ]
};
