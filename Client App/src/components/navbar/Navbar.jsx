import "./navbar.css";

const Navbar = (props) => {
  const signUpHandler = () => {
    props.onSignUp();
  };

  const loginHandler = () => {
    props.onLogin();
  };

  return (
    <>
      {!props.login && (
        <div className="navbar">
          <div className="navContainer">
            <span className="logo">Booking Website</span>
            <div className="navItems">
              <button className="navButton" onClick={signUpHandler}>
                Sign Up
              </button>
              <button className="navButton" onClick={loginHandler}>
                Login
              </button>
            </div>
          </div>
        </div>
      )}

      {props.login && (
        <div className="navbar">
          <div className="navContainer">
            <span className="logo">Booking Website</span>
            <div className="navItems">
              <p>Email</p>
              <button className="navButton">Transacsions</button>
              <button className="navButton">Logout</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
