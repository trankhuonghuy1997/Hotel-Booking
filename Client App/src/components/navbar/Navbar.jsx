import "./navbar.css";
import { useSelector, useDispatch } from "react-redux";
import { loginAction } from "../../store/login-slice";
import { useNavigate } from "react-router-dom";

const Navbar = (props) => {
  const state = useSelector((state) => state.login);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const signUpHandler = () => {
    // props.onSignUp();
    dispatch(loginAction.signUp(state));
    navigate("/signup");
  };

  const loginHandler = () => {
    // props.onLogin();
    // dispatch(loginAction.login(state));
    dispatch(loginAction.signUp(state));
    navigate("/login");
  };

  const logoutHandler = () => {
    dispatch(loginAction.logout(state));
    localStorage.removeItem("name");
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <>
      {!state.isLogin && (
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

      {state.isLogin && (
        <div className="navbar">
          <div className="navContainer">
            <span className="logo">Booking Website</span>
            <div className="navItems">
              <p>{state.token}</p>
              <button className="navButton">Transacsions</button>
              <button className="navButton" onClick={logoutHandler}>
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
