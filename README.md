# Philosophy Jeopardy Game

This repository contains a set of lightweight browser games that let you review philosophy concepts Jeopardy‑style. Everything runs in the browser, so no server setup is required. Clone the repo or visit the GitHub Pages site to start playing immediately.

## Features

- Multiple topics including Ethics, Critical Thinking, and Intro to Philosophy
- Dynamic board built from question data files
- Modal dialog for answering each question
- Scoreboard with support for single player or multiplayer teams
- Single-player mode lets you enter your name, displayed next to your score
- Simple flashcards page for quick review
- Multiple-choice trivia game for each course
- Fallacy Detective and What's Missing? mini-games to practice argument analysis
- "Who Said It?" quote quiz
- Ethics Chat page with rotating philosopher perspectives

## Getting Started

You can play the game directly from the hosted GitHub Pages site:

```
https://maxaeon.github.io/jeopardy/
```
To play locally, clone this repository and open `index.html` in a modern web browser. All data is bundled with the project so no build step is required. If your browser blocks local scripts, run a tiny HTTP server such as `python -m http.server` and navigate to `http://localhost:8000/`.

Additional pages include:

- `flashcards.html` – study individual questions without the board
- `trivia.html` – quick multiple-choice rounds
- `fallacy.html` – Fallacy Detective mini-game
- `whats-missing.html` – practice identifying missing premises
- `ethics-chat.html` – lightweight rotating chat with famous ethicists



## Project Structure

- **index.html** – main page that loads the question files and game script
- **style.css** – visual styling for the board and modals
- **script.js** – handles topic selection, board creation and answer validation
- **data/** – JavaScript files containing question objects for each topic

Each question file exports an object such as `ethicsQuestions` or `criticalThinkingQuestions`. Keys represent categories and map to an array of questions of the form:

```javascript
{
  question: "What is normative ethics?",
  answer: "The study of principles, rules, or theories guiding our actions and judgments.",
  points: 100
}
```

You can modify or add new question files under `data/` to tailor the content to your course.


## Contributing

Issues and pull requests are welcome.

