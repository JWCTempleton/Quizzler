export default function Welcome(props) {
  return (
    <div className={props.darkMode ? "welcome-dark" : "welcome"}>
      <h2>Welcome to the Quizzler App</h2>
      <button className="welcome-button" onClick={props.toggleStart}>
        Start Quiz
      </button>
    </div>
  );
}
