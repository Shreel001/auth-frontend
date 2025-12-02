import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserSignUpForm from "./pages/Authentication/signUp.jsx";
import UserLoginForm from "./pages/Authentication/login.jsx";
import Dashboard from "./pages/Dashboard/dashboard.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/user/signup" element={<UserSignUpForm />} />
        <Route path="/user/login" element={<UserLoginForm />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
