import React from "react";
import "./App.css";
import Welcome from "./Welcome";

function App() {
  const [startQuiz, setStartQuiz] = React.useState(false);

  const [quizData, setQuizData] = React.useState([]);

  function toggleStart() {
    setStartQuiz((prev) => !prev);
  }

  React.useEffect(() => {
    fetch(
      `https://opentdb.com/api.php?amount=5&category=9&difficulty=medium&type=multiple`
    )
      .then((res) => res.json())
      .then((data) => setQuizData(data));
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
      {startQuiz && <h2>Start Quiz</h2>}
    </div>
  );
}

export default App;
