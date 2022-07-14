import React from "react";
import "./App.css";
import Welcome from "./Welcome";
import Questions from "./Questions";
import { nanoid } from "nanoid";

function App() {
  const [startQuiz, setStartQuiz] = React.useState(false);

  const [quizData, setQuizData] = React.useState([]);

  function toggleStart() {
    setStartQuiz((prev) => !prev);
  }

  React.useEffect(() => {
    const questionsData = [];
    fetch(
      `https://opentdb.com/api.php?amount=5&category=9&difficulty=medium&type=multiple`
    )
      .then((res) => res.json())
      .then((data) =>
        data.results.map((quizQuestion) =>
          questionsData.push({
            id: nanoid(),
            question: quizQuestion.question,
            correctAnswer: {
              correct: true,
              answer: quizQuestion.correct_answer,
            },
            incorrectAnswers: {
              correct: false,
              answers: quizQuestion.incorrect_answers,
            },
          })
        )
      );
    setQuizData(questionsData);
  }, []);

  console.log(quizData);

  return (
    <div className="App">
      <header className="header">
        <h1 className="header-title">Quizzler</h1>
      </header>
      {!startQuiz && (
        <div className="welcome">
          <Welcome />
          <button className="welcome-button" onClick={toggleStart}>
            Start Quiz
          </button>
        </div>
      )}
      {startQuiz && (
        <div>
          {/* <Questions quizData={quizData} /> */}
          Start
        </div>
      )}
    </div>
  );
}

export default App;
