import { useState } from "react";
import "./auth.css";
import { useNavigate } from "react-router-dom";
import logo from "../../media/logo4.png";

export default function UserLoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json(); // read once

      if (!response.ok) {
        setMessage(data.message || "Operation failed");
        return;
      }

      // store token
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data));

      navigate("/dashboard");
      setMessage("Login successful!");
    } catch (err) {
      setMessage("Error: " + err.message);
    }
  };

  return (
    <div className="auth-body">
      <div className="company-logo">
        <img src={logo} alt="Credex Logo" />
      </div>

      <div className="auth-container">
        <form autoComplete="off" className="auth-form login" onSubmit={handleSubmit}>
          
          <div>
            <label htmlFor="username">Username:</label>
            <input 
              type="text" 
              id="username" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="password">Password:</label>
            <input 
              type="password" 
              id="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit">Login</button>

          <div className="login-link">
            <p>
              New to Credex?{" "}
              <b><a href="/user/signup">Create account</a></b>
            </p>
          </div>

        </form>
      </div>

      <p className="message">{message}</p>

      <div className="trademark-footer">
        © 2025 Credex. All rights reserved
      </div>
    </div>
  );
}