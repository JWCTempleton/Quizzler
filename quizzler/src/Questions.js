export default function Questions(props) {
  console.log(props.quizData);
  const quizElement = props.quizData.results.map((quiz) => {
    const questionArray = [];
    questionArray.push(quiz.correct_answer);
    questionArray.push(...quiz.incorrect_answers);

    return (
      <div>
        <p key={quiz.question}>
          {quiz.question
            .replace(/(&quot;)/g, '"')
            .replace(/(&amp;)/g, "&")
            .replace(/(&#039;)/g, "'")}
        </p>
        <div>
          {questionArray.map((answer) => (
            <button key={answer}>
              {answer
                .replace(/(&quot;)/g, '"')
                .replace(/(&amp;)/g, "&")
                .replace(/(&#039;)/g, "'")}
            </button>
          ))}
        </div>
      </div>
    );
  });
  return <div>{quizElement}</div>;
}
