import { useState } from "react";
import "./auth.css";
import { useNavigate } from "react-router-dom";
import logo from "../../media/logo4.png"

export default function UserLoginForm() {
  const [isLogin, setIslogin] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = "http://localhost:8080/auth/login";

    const body = { username, password};

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        const errData = await response.json();
        setMessage(errData.message || "Operation failed");
        return;
      }else{
        setIslogin(true)
      }

      const data = await response.json();
      if (isLogin) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data));
        navigate("/dashboard");
      }
      setMessage(isLogin ? "Login successful!" : "Signup successful!");
    } catch (err) {
      setMessage("Error: " + err.message);
    }
  };

  return (
    <div className="auth-body">
      <div className="company-logo">
          <img src={logo} alt="A beautiful landscape"></img>
      </div>
      <div className="auth-container">
          <form autocomplete="off" className="auth-form login" onSubmit={handleSubmit}>
            <div>
                <label for="username" onChange={(e) => setUsername(e.target.value)} value={username}>Username:</label>
                <input type="text" id="username" name="username" required/>
            </div>
            
            <div>
                <label for="password" onChange={(e) => setPassword(e.target.value)} value={password}>Password:</label>
                <input type="password" id="password" name="password" required/>
            </div>
            
            <button type="submit">Login</button>

            <div className="login-link">
              <p>New to Credex ? <span><b><a href="http://localhost:3001/user/signup">Create account</a></b></span></p>
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