# Philosophy Jeopardy Game

This repository contains a lightweight browser game that lets you review philosophy concepts Jeopardy‑style. All logic runs on the client so no server setup is required.

## Features

- Multiple topics including Ethics, Critical Thinking, and Intro to Philosophy
- Dynamic board built from question data files
- Modal dialog for answering each question
- Scoreboard with support for single player, multiplayer or a bot opponent

## Getting Started

You can play the game directly from the hosted GitHub Pages site:

```
https://maxaeon.github.io/jeopardy/
```


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


## Contributing

Issues and pull requests are welcome.

