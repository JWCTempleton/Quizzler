export default function NavBar(props) {
  return (
    <nav className={props.darkMode ? "dark" : ""}>
      <h1 className={props.darkMode ? "dark" : ""}>Quizzler</h1>
      <div className="toggler">
        <p className="toggler--light">Light</p>
        <div className="toggler--slider" onClick={props.toggleDarkMode}>
          <div className="toggler--slider--circle"></div>
        </div>
        <p className="toggler--dark">Dark</p>
      </div>
    </nav>
  );
}
