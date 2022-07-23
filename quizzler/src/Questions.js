export default function Questions(props) {
  const answerElement = props.answers.map((answer) => {
    const styles = {
      backgroundColor: answer.isSelected ? "#D6DBF5" : "transparent",
    };

    return (
      <button
        style={styles}
        key={answer.id}
        onClick={() => props.toggleSelected(props.questionId, answer.id)}
      >
        {answer.answer}
      </button>
    );
  });
  return (
    <div>
      <h3>{props.quizQuestion}</h3>
      <div>{answerElement}</div>
    </div>
  );
}
