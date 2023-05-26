import "./navbar.css";
import { useSelector, useDispatch } from "react-redux";
import { loginAction } from "../../store/login-slice";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Navbar = (props) => {
  const state = useSelector((state) => state.login);
  let [email, setEmail] = useState("");
  useEffect(() => {
    const email = JSON.parse(localStorage.getItem("name"));
    setEmail(email);
  }, [email]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const signUpHandler = () => {
    dispatch(loginAction.signUp(state));
    navigate("/signup");
  };

  const toHomePagehandler = () => {
    navigate("/");
  };

  const loginHandler = () => {
    dispatch(loginAction.signUp(state));
    navigate("/login");
  };

  const logoutHandler = () => {
    dispatch(loginAction.logout(state));
    localStorage.removeItem("name");
    localStorage.removeItem("token");
    navigate("/login");
  };
  const toTransactionpage = () => {
    navigate("/transaction");
  };

  return (
    <>
      {!state.isLogin && (
        <div className="navbar">
          <div className="navContainer">
            <p onClick={toHomePagehandler} className="logo">
              Booking Website
            </p>
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
            <span className="logo" onClick={toHomePagehandler}>
              Booking Website
            </span>
            <div className="navItems">
              <p>{email}</p>
              <button className="navButton" onClick={toTransactionpage}>
                Transacsions
              </button>
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
