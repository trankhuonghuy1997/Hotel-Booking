import classes from "./login.module.css";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const navigate = useNavigate();
  const emailRef = useRef();
  const passwordRef = useRef();
  const submitHandler = (e) => {
    // onSubmit();
    e.preventDefault();

    const user = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };
    fetch("http://localhost:5000/admin/login", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 200) {
          navigate("/");
        } else {
          alert(` Đăng nhập thất bại: ${data.message}`);
        }
      });
  };

  return (
    <>
      <div className={classes.main}>
        <h1>Login</h1>
        <form onSubmit={submitHandler}>
          <input
            className={classes.input_field}
            type="email"
            required
            placeholder="Enter Email"
            name="email"
            ref={emailRef}
          ></input>
          <input
            className={classes.input_field}
            type="password"
            required
            placeholder="Enter Password"
            name="password"
            ref={passwordRef}
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
