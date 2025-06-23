# Thinkers' Arcade

This repository contains a set of lightweight browser games that let you review philosophy concepts. Everything runs in the browser, so no server setup is required. Clone the repo or visit the GitHub Pages site to start playing immediately.

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
- Intro Philosophy Chat covering ancient Greek thinkers

## Getting Started

You can play the games directly from the hosted GitHub Pages site:

```
https://maxaeon.github.io/jeopardy/
```

The homepage lists links to each activity including the Jeopardy board game,
flashcards, trivia, fallacy detective, and the lightweight chat pages.

Additional pages include:

- `flashcards/flashcards.html` – study individual questions without the board
- `trivia/trivia.html` – quick multiple-choice rounds
- `fallacy-detection/fallacy.html` – Fallacy Detective mini-game
- `argument-reconstruction/critical-thinking.html` – practice identifying missing premises
- `argument-reconstruction/intro-philosophy.html` – analyze classic philosophical arguments
- `chatbots/ethics-chat.html` – lightweight rotating chat with famous ethicists
- `chatbots/intro-philosophy-chat.html` – interactive chat with ancient Greek philosophers
- `writing/citation.html` – identify citation mistakes
- `writing/brainstorm.html` – build mind-map clusters for brainstorming
 - `writing/outlining.html` – outline builder for critiquing moral absolutism


## Project Structure

- **jeopardy/** – main board game
  - `index.html` – loads the question files and game script
  - `style.css` – visual styling for the board and modals
  - `script.js` – handles topic selection, board creation and answer validation
  - `data/` – JavaScript files containing question objects for each topic
- **flashcards/** – flashcard interface
- **trivia/** – multiple-choice quiz game
- **fallacy-detection/** – fallacy and missing premise exercises
- **chatbots/** – lightweight chat pages
- **writing/** – short activities for philosophical writing practice

## Contributing

Issues and pull requests are welcome.

