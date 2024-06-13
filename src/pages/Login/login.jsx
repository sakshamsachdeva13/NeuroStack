import React, { useState } from "react";
import classes from "./login.module.css";
import neuroStackImage from "../../assets/NeuroStack.jpg";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    // Basic client-side validation
    console.log(username);    
    console.log(password)
    if (username.trim() === "" || password.trim() === "") {
      setError("Please enter a username and password");
      
    }
  };
  return (
    <div className={classes.container}>
      <div className={classes.photo}>
        <img src={neuroStackImage} alt="Logo" />
      </div>
      <div className={classes.loginOptions}>
        <h2>Login</h2>
        <form className={classes.form}>
          <label htmlFor="username">Username:</label>
          <br />
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className={classes.input}
          />
          <br />
          <label htmlFor="password">Password:</label>
          <br />
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={classes.input}
          />
          <br />
          <button onClick={handleLogin} className={classes.submit}>
            Login
          </button>
        </form>
        {error && <p className={classes.error}>{error}</p>}
      </div>
    </div>
  );
}

export default Login;
