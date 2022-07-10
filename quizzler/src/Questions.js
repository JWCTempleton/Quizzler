export default function Questions(props) {
  console.log(props.quizData);
  return (
    <div>
      <p>{props.quizData.results[0].question}</p>
    </div>
  );
}
