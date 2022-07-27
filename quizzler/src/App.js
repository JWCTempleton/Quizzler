import React from "react";
import "./App.css";
import Welcome from "./Welcome";
import Questions from "./Questions";
import { nanoid } from "nanoid";

function App() {
  const [startQuiz, setStartQuiz] = React.useState(false);

  const [loading, setLoading] = React.useState(false);

  const [quizData, setQuizData] = React.useState([]);

  const [submitted, setSubmitted] = React.useState(false);

  function toggleStart() {
    setStartQuiz((prev) => !prev);
  }

  function toggleSubmit() {
    setSubmitted((prev) => !prev);
  }

  React.useEffect(() => {
    setLoading(true);
    const quizQuestions = [];

    async function getQuizQuestions() {
      const res = await fetch(
        `https://opentdb.com/api.php?amount=5&category=9&difficulty=medium&type=multiple`
      );
      const data = await res.json();
      data.results.map((question) =>
        quizQuestions.push({
          id: nanoid(),
          question: question.question
            .replace(/&quot;/g, '"')
            .replace(/&#039;/g, "'")
            .replace(/&aring;/g, "å")
            .replace(/&auml;/g, "ä")
            .replace(/&ouml;/g, "ö"),
          answers: [
            ...question.incorrect_answers.map((incorrect) => ({
              id: nanoid(),
              answer: incorrect
                .replace(/&quot;/g, '"')
                .replace(/&#039;/g, "'")
                .replace(/&aring;/g, "å")
                .replace(/&auml;/g, "ä")
                .replace(/&ouml;/g, "ö"),
              correct: false,
              isSelected: false,
            })),
            {
              id: nanoid(),
              answer: question.correct_answer
                .replace(/&quot;/g, '"')
                .replace(/&#039;/g, "'")
                .replace(/&aring;/g, "å")
                .replace(/&auml;/g, "ä")
                .replace(/&ouml;/g, "ö"),
              correct: true,
              isSelected: false,
            },
          ],
        })
      );
      setQuizData(quizQuestions);
      setLoading(false);
    }
    getQuizQuestions();
    // fetch(
    //   `https://opentdb.com/api.php?amount=5&category=9&difficulty=medium&type=multiple`
    // )
    //   .then((res) => res.json())
    //   .then((data) =>
    //     data.results.map((question) =>
    //       quizQuestions.push({
    //         id: nanoid(),
    //         question: question.question
    //           .replace(/&quot;/g, '"')
    //           .replace(/&#039;/g, "'"),
    //         answers: [
    //           ...question.incorrect_answers.map((incorrect) => ({
    //             id: nanoid(),
    //             answer: incorrect
    //               .replace(/&quot;/g, '"')
    //               .replace(/&#039;/g, "'")
    //               .replace(/&ouml;/g, "Ö"),
    //             correct: false,
    //             isSelected: false,
    //           })),
    //           {
    //             id: nanoid(),
    //             answer: question.correct_answer
    //               .replace(/&quot;/g, '"')
    //               .replace(/&#039;/g, "'")
    //               .replace(/&aring;/g, "å")
    //               .replace(/&auml;/g, "ä")
    //               .replace(/&ouml;/g, "ö"),
    //             correct: true,
    //             isSelected: false,
    //           },
    //         ],
    //       })
    //     )
    //   );
    // setQuizData(quizQuestions);
    // setLoading(false);
    // console.log(quizQuestions);
  }, []);

  //This works to change isSelected state but it only works for one question!
  //I need to incorporate the question id itself
  // function toggleSelected(id) {
  //   setQuizData((oldData) =>
  //     oldData.map((oldQuestion) => {
  //       const newAnswerSelected = oldQuestion.answers.map((answer) => {
  //         return answer.id === id
  //           ? { ...answer, isSelected: !answer.isSelected }
  //           : { ...answer, isSelected: false };
  //       });
  //       return { ...oldQuestion, answers: newAnswerSelected };
  //     })
  //   );
  // }

  function toggleSelected(questionId, answerId) {
    setQuizData((oldData) =>
      oldData.map((oldQuestion) => {
        if (questionId === oldQuestion.id) {
          const newAnswerSelected = oldQuestion.answers.map((answer) => {
            return answer.id === answerId
              ? { ...answer, isSelected: !answer.isSelected }
              : { ...answer, isSelected: false };
          });
          return { ...oldQuestion, answers: newAnswerSelected };
        }
        return { ...oldQuestion };
      })
    );
  }

  const questionElements = quizData.map((each) => (
    <Questions
      key={each.id}
      quizQuestion={each.question}
      questionId={each.id}
      answers={each.answers}
      toggleSelected={toggleSelected}
      submitState={submitted}
    />
  ));

  return (
    <div className="App">
      <header className="header">
        <h1 className="header-title">Quizzler</h1>
      </header>

      {loading ? (
        <div>
          <p>Loading...</p>
        </div>
      ) : (
        !startQuiz && (
          <div className="welcome">
            <Welcome />
            <button className="welcome-button" onClick={toggleStart}>
              Start Quiz
            </button>
          </div>
        )
      )}
      {startQuiz && (
        <div className="quiz-body">
          {questionElements}
          <button className="submit-button" onClick={toggleSubmit}>
            Submit
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
