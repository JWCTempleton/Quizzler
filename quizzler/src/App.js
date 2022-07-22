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
    const quizQuestions = [];
    fetch(
      `https://opentdb.com/api.php?amount=5&category=9&difficulty=medium&type=multiple`
    )
      .then((res) => res.json())
      .then((data) =>
        data.results.map((question) =>
          quizQuestions.push({
            id: nanoid(),
            question: question.question
              .replace(/&quot;/g, '"')
              .replace(/&#039;/g, "'"),
            answers: [
              ...question.incorrect_answers.map((incorrect) => ({
                id: nanoid(),
                answer: incorrect
                  .replace(/&quot;/g, '"')
                  .replace(/&#039;/g, "'")
                  .replace(/&ouml;/g, "Ö"),
                correct: false,
                isSelected: false,
              })),
              {
                id: nanoid(),
                answer: question.correct_answer
                  .replace(/&quot;/g, '"')
                  .replace(/&#039;/g, "'"),
                correct: true,
                isSelected: false,
              },
            ],
          })
        )
      );
    setQuizData(quizQuestions);
  }, []);

  console.log(quizData);

  function toggleSelected(id) {
    setQuizData((oldData) =>
      oldData.map((oldQuestion) => {
        const newAnswerSelected = oldQuestion.answers.map((answer) => {
          return answer.id === id
            ? { ...answer, isSelected: !answer.isSelected }
            : { ...answer, isSelected: false };
        });
        return { ...oldQuestion, answers: newAnswerSelected };
      })
    );
  }

  const questionElements = quizData.map((each) => (
    <Questions
      key={each.id}
      quizQuestion={each.question}
      answers={each.answers}
      toggleSelected={toggleSelected}
    />
  ));

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
      {startQuiz && <div>{questionElements}</div>}
    </div>
  );
}

export default App;
