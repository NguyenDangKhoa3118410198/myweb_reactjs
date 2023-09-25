import React, { useState } from "react";
import "./AdminLogin.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`Email: ${email}, Password: ${password}`);
  };

  return (
    <div className="login-wrapper">
      <div className="admin-form-container">
        <h1 className="name-form">Login</h1>
        <form className="admin-form" onSubmit={handleSubmit}>
          <label className="label-name" htmlFor="emailInput">
            Email
          </label>
          <input
            id="emailInput"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder=" abc@gmail.com"
            required
          />
          <label className="label-name" htmlFor="passwordInput">
            Password
          </label>
          <input
            id="passwordInput"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder=" xxxxxxxx"
            required
          />
          <button className="button-login" type="submit">
            Login
          </button>
        </form>
        <p className="forgot-password">Forgot your password ?</p>
      </div>
    </div>
  );
};

export default Login;
