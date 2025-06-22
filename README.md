# Philosophy Jeopardy Game

This repository contains a lightweight browser game that lets you review philosophy concepts Jeopardy‑style. All logic runs on the client so no server setup is required.

## Features

- Multiple topics including Ethics, Critical Thinking, and Intro to Philosophy
- Dynamic board built from question data files
- Modal dialog for answering each question with the ability to override incorrect marking
- Celebration screen once every question has been attempted
- Modern responsive styling using plain HTML and CSS

## Getting Started

Simply clone the repository and open **index.html** in a modern web browser. If your browser restricts loading JavaScript files from the filesystem you can serve the project locally:

```bash
python3 -m http.server 8000
```

Then navigate to `http://localhost:8000/`.

Choose a topic from the buttons at the top of the page. Click a board cell to reveal a question, type your answer, and submit. Once all cells have been cleared you can restart the game from the celebration screen.

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

Add your own topics by creating a new file in `data/` and loading it in `index.html`.

## Contributing

Issues and pull requests are welcome. Because the project is completely static you can quickly test changes by refreshing your browser after modifying any file.

