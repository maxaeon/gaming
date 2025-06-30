# Φ interactive

This repository contains a set of lightweight browser games that let you review philosophy concepts. Everything runs in the browser, so no server setup is required. Clone the repo or visit the GitHub Pages site to start playing immediately.

## Features

- Multiple topics including Ethics, Critical Thinking, and Intro to Philosophy
- Dynamic board built from question data files
- Modal dialog for answering each question
- Scoreboard with support for single player or multiplayer teams
- Single-player mode lets you enter your name, displayed next to your score
- Simple flashcards page for quick review
- Multiple-choice trivia game for each course
- Smarter multiple-choice options for person-based questions
- "Who Said It?" quote quiz
- Ethics Chat page with rotating philosopher perspectives
- Intro Philosophy Chat covering ancient Greek thinkers
- Chat pages support optional profile pictures stored in `assets/images/`; add your own PNG files (e.g., `aristotle.png`)
- Chats include a color scheme toggle cycling through **speaker**, **blue**, **teal**, and **purple** themes so philosophers remain visually distinct
- Writing games now include a "Start Your Own Project" mode with templates that can be exported as PDF, DOCX, or PNG. Thesis prompts are editable and you can export just the thesis or a combined document with your answers.

## Getting Started

You can play the games directly from the hosted GitHub Pages site:

```
https://maxaeon.github.io/gaming/
```

The homepage lists links to each activity including the Jeopardy board game,
flashcards, trivia, Sherlock Holmes mystery, and the lightweight chat pages.

### Vendor Libraries

Some activities rely on third-party JavaScript libraries for exporting
documents. Placeholder copies are stored in the `vendor/` directory. To enable
PDF or DOCX export locally, replace these placeholders with the real libraries
listed in `vendor/README.md`.

Additional pages include:

- `flashcards/flashcards.html` – study individual questions without the board
- `trivia/trivia.html` – quick multiple-choice rounds
- `sherlock-mystery/sherlock.html` – Sherlock Holmes Mystery mini-game
- `argument-reconstruction/critical-thinking.html` – practice identifying missing premises
- `argument-reconstruction/intro-philosophy.html` – analyze classic philosophical arguments
- `chatbots/ethics-chat.html` – lightweight rotating chat with famous ethicists
- `chatbots/intro-philosophy-chat.html` – interactive chat with ancient Greek philosophers
- `writing/citation.html` – citation practice focused on MLA style
- `writing/brainstorm.html` – build mind-map clusters for brainstorming
- `writing/outlining.html` – outline builder for critiquing moral absolutism
- `writing/thesis-evaluation.html` – evaluate and revise a thesis draft
- `writing/draft-development.html` – step-by-step draft development with export options
- `writing/peer-review.html` – practice giving constructive peer feedback
- `writing/writing.html` – combined quick-writing challenges
- `prover/prover.html` – Proof Lab for practicing derivations


## Project Structure

- **jeopardy/** – main board game
  - `index.html` – loads the question files and game script
  - `style.css` – visual styling for the board and modals
  - `script.js` – handles topic selection, board creation and answer validation
  - `data/` – JavaScript files containing question objects for each topic
- **flashcards/** – flashcard interface
- **trivia/** – multiple-choice quiz game
- **sherlock-mystery/** – detective logic exercises
- **chatbots/** – lightweight chat pages
- **writing/** – short activities for philosophical writing practice
- **prover/** – interactive derivation practice

### Custom Flashcard Sets

Two optional data files in `jeopardy/data` let you override the built-in
question banks with your own flashcards:

- `intro-philosophy-flashcards.js` – defines `window.introPhilosophyFlashcards`
- `critical-thinking-flashcards.js` – defines `window.criticalThinkingFlashcards`

If present, these objects are used by the Flashcards and Trivia pages in place
of the bundled exam questions.

## Contributing

Issues and pull requests are welcome.

