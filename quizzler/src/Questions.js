export default function Questions(props) {
  const answerElement = props.answers.map((answer) => (
    <button key={answer.id}>{answer.answer}</button>
  ));
  return (
    <div>
      <h3>{props.quizQuestion}</h3>
      <div>{answerElement}</div>
    </div>
  );
}
