export default function Questions(props) {
  const answerElement = props.answers.map((answer) => {
    let styles = {
      backgroundColor: answer.isSelected ? "#D6DBF5" : "transparent",
    };

    if (props.submitState) {
      if (answer.isSelected && answer.correct) {
        styles = { backgroundColor: "#94D7A2" };
      }
      if (answer.isSelected && !answer.correct) {
        styles = { backgroundColor: "#F8BCBC" };
      }
    }

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
