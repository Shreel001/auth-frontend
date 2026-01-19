import { useState } from "react";
import "./auth.css";
import logo from "../../media/logo4.png"

export default function UserSignUpForm() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = "http://localhost:8080/auth/signup";

    const body = { username, email, password, role };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const text = await response.text(); // 👈 always read raw text first

      if (!response.ok) {
        setMessage(text); // FULL backend error
        return;
      }

      setMessage("Signup successful!");
    } catch (err) {
      setMessage("Network error: " + err.message);
    }
  };

  return (
    <div className="auth-body">

      <div className="company-logo">
          <img src={logo} alt="A beautiful landscape"></img>
      </div>
      <div className="auth-container">
          <form autocomplete="off" className="auth-form" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="username">Username:</label>
              <input
                type="text"
                id="username"
                name="username"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                name="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="role">Role:</label>
              <select
                id="role"
                name="role"
                required
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="">Select a role</option>
                <option value="ACCOUNT MANAGER">ACCOUNT MANAGER</option>
                <option value="ADMIN">ADMIN</option>
                <option value="API USER">API USER</option>
              </select>
            </div>
            
            <button type="submit">Sign Up</button>

            <div className="login-link">
              <p>Already have an account ? <span><b><a href="http://localhost:3000/user/login">Login</a></b></span></p>
            </div>
        </form>
      </div>
      <p className="message">{message}</p>
      <div class="trademark-footer">
          © 2025 Credex. All rights reserved.
      </div>
    </div>
  );
}