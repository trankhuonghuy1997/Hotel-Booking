import React from "react";
import classes from "./authen.module.css";

const AuthenForm = ({ islogin, onSubmit }) => {
  const submitHandler = () => {
    onSubmit();
  };
  return (
    <div className={classes.main}>
      <h1>{islogin === true ? "Login" : "Sign Up"}</h1>
      <form action="/" onSubmit={submitHandler}>
        <input
          className={classes.input_field}
          type="email"
          required
          placeholder="Enter Email"
        ></input>
        <input
          className={classes.input_field}
          type="password"
          required
          placeholder="Enter Password"
        ></input>
        <button className={classes.button} type="submit">
          {islogin === true ? "Login" : "Create Account"}
        </button>
      </form>
    </div>
  );
};

export default AuthenForm;
