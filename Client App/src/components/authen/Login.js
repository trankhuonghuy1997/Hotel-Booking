import React, { useState } from "react";
import classes from "./authen.module.css";
import { useSelector, useDispatch } from "react-redux";
import { loginAction } from "../../store/login-slice";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import Navbar from "../navbar/Navbar";

const Login = () => {
  const state = useSelector((state) => state.login);
  const dispatch = useDispatch();
  const enteredEmail = useRef();
  const enteredPassWord = useRef();
  const [user, setUser] = useState([]);
  const navigate = useNavigate();

  const submitHandler = (e) => {
    // onSubmit();
    e.preventDefault();

    const user = {
      email: enteredEmail.current.value,
      password: enteredPassWord.current.value,
    };
    fetch("http://localhost:5000/login", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 404) {
          alert(` Đăng nhập thất bại: ${data.message}`);
        } else {
          localStorage.setItem("token", JSON.stringify(data._id));
          localStorage.setItem("name", JSON.stringify(data.email));
          navigate("/");
          dispatch(loginAction.login(state));
        }
      });
  };
  return (
    <>
      <Navbar />
      <div className={classes.main}>
        <h1>Login</h1>
        <form action="/" method="post" onSubmit={submitHandler}>
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
            Login
          </button>
        </form>
      </div>
    </>
  );
};

export default Login;
