import React, { useState } from "react";
import classes from "./authen.module.css";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../navbar/Navbar";

const Login = () => {
  const enteredEmail = useRef();
  const enteredPassWord = useRef();
  const enteredUserName = useRef();
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    const user = {
      email: enteredEmail.current.value,
      password: enteredPassWord.current.value,
      userName: enteredUserName.current.value,
    };
    console.log(user);

    fetch("http://localhost:5000/signup", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        if (result.status === 404) {
          alert(`Register is not success: ${result.message}`);
        } else {
          navigate("/login");
        }
      });
  };
  return (
    <>
      <Navbar />
      <div className={classes.main}>
        <h1>Sign Up</h1>
        <form action="/login" method="post" onSubmit={submitHandler}>
          <input
            className={classes.input_field}
            type="text"
            required
            placeholder="Enter User Name"
            ref={enteredUserName}
            name="userName"
          ></input>
          <input
            className={classes.input_field}
            type="email"
            required
            placeholder="Enter Email"
            ref={enteredEmail}
            name="email"
          ></input>
          <input
            className={classes.input_field}
            type="password"
            required
            placeholder="Enter Password"
            ref={enteredPassWord}
            name="password"
          ></input>
          <button className={classes.button} type="submit">
            Create Account
          </button>
        </form>
      </div>
    </>
  );
};

export default Login;
