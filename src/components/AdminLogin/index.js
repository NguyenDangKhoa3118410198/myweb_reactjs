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
      <div className="login-container">
         <h1 className="name-form">Login</h1>
         <form onSubmit={handleSubmit}>
            <label className="label-name">Email:</label>
            <input
               type="text"
               value={email}
               onChange={(e) => setEmail(e.target.value)}
               required
            />
            <label className="label-name">Password:</label>
            <input
               type="password"
               value={password}
               onChange={(e) => setPassword(e.target.value)}
               required
            />
            <button className="button-login" type="submit">
               Login
            </button>
         </form>
      </div>
   );
};

export default Login;
