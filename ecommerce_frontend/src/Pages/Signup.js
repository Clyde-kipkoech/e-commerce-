import { useState } from "react";

import { useNavigate } from "react-router-dom";  // ✅ correct import
import "./Signup.css";
import axios from "axios";


const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // ✅ create navigate function

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

 
const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  setMessage("");

  try {
    await axios.post("http://127.0.0.1:8000/api/users/", {
      email: formData.email,
      password: formData.password,
      first_name: formData.name || formData.email,
    });

    setMessage("Signup successful! Please log in.");
    navigate("/"); // redirect to login page
    setFormData({ name: "", email: "", password: "" });
  } catch (err) {
    setMessage(err.response?.data?.message || "Signup failed");
    console.error("Signup error:", err);
  }

  setLoading(false);
};



  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={handleSubmit}>
        <h2>Create Account</h2>

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? "Signing Up..." : "Sign Up"}
        </button>

        {message && <p className="message">{message}</p>}

        <p className="login-text">
          Already have an account? <a href="/">Login</a>
        </p>
      </form>
    </div>
  );
};

export default Signup;
