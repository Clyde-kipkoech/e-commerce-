// Login.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import "./Login.css"; // Import styles

const Login = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate(); 


  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
  e.preventDefault();
  setLoading(true);
  setMessage("");

  try {
    const res = await axios.post("http://127.0.0.1:8000/api/login/", {
  email: credentials.email,
  password: credentials.password,
});

localStorage.setItem("access", res.data.access);
localStorage.setItem("refresh", res.data.refresh);
localStorage.setItem("user", JSON.stringify(res.data.user)); // 👈 save user info

setMessage("Login successful!");

// redirect admin to dashboard, normal users to home
if (res.data.user.is_staff) {
  navigate("/add-product");
} else {
  navigate("/home");
}

  } catch (error) {
    setMessage(error.response?.data?.non_field_errors?.[0] || "Invalid credentials");
    console.error(error);
  }

  setLoading(false);
};

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleLogin}>
        <h2>Welcome Back</h2>

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={credentials.email}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={credentials.password}
          onChange={handleChange}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>

        {message && <p className="message">{message}</p>}

        <p className="signup-text">
          Don’t have an account? <a href="/signup">Sign Up</a>
        </p>
      </form>
    </div>
  );
};

export default Login;
