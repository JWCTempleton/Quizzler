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
        className="questionButton"
        style={styles}
        key={answer.id}
        onClick={() => props.toggleSelected(props.questionId, answer.id)}
      >
        {answer.answer}
      </button>
    );
  });
  return (
    <div className="questionElement">
      <h3 className="question">{props.quizQuestion}</h3>
      <div className="answerSection">{answerElement}</div>
    </div>
  );
}
