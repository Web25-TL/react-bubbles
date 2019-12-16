import React, { useState } from "react";
import { axiosWithAuth as axios } from "../utils/axiosWithAuth.js";

const Login = ({ history }) => {
  const [user, setUser] = useState({ username: "", password: "" });

  const handleChange = e => {
    e.preventDefault();
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const login = e => {
    e.preventDefault();
    axios()
      .post("/login", user)
      .then(res => {
        localStorage.setItem("token", res.data.payload);
        history.push("/bubbles");
      })
      .catch(err => console.log(err));
  };
  return (
    <>
      <h1>Welcome to the Bubble App!</h1>
      <h2>Login</h2>
      <form onSubmit={login}>
        <input
          type="text"
          name="username"
          value={user.username}
          onChange={handleChange}
          autoComplete="off"
        />

        <input
          type="password"
          name="password"
          value={user.password}
          onChange={handleChange}
          autoComplete="off"
        />
        <button type="submit"> Log In</button>
      </form>
    </>
  );
};

export default Login;
