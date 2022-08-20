export default function Questions(props) {
  const answerElement = props.answers.map((answer) => {
    let styles = {
      backgroundColor: answer.isSelected ? "#D6DBF5" : "transparent",
      color: answer.isSelected && "black",
    };

    if (props.submitState) {
      if (answer.isSelected && answer.correct) {
        styles = { backgroundColor: "#94D7A2", color: "black" };
      }
      if (answer.isSelected && !answer.correct) {
        styles = { backgroundColor: "#F8BCBC", color: "black" };
      }
      if (answer.correct) {
        styles = { backgroundColor: "#94D7A2", color: "black" };
      }
    }

    return (
      <button
        className={props.darkMode ? "questionButton-dark" : "questionButton"}
        style={styles}
        key={answer.id}
        onClick={() => props.toggleSelected(props.questionId, answer.id)}
      >
        {answer.answer}
      </button>
    );
  });
  return (
    <div
      className={props.darkMode ? "questionElement-dark" : "questionElement"}
    >
      <h3 className="question">{props.quizQuestion}</h3>
      <div className="answerSection">{answerElement}</div>
    </div>
  );
}
