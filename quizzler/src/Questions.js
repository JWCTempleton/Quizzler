export default function Questions(props) {
  console.log(props.quizData);
  const quizElement = props.quizData.results.map((quiz) => (
    <p>
      {quiz.question
        .replace(/(&quot;)/g, '"')
        .replace(/(&amp;)/g, "&")
        .replace(/(&#039;)/g, "'")}
    </p>
  ));
  return <div>{quizElement}</div>;
}
