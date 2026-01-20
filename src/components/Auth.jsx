import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";  // Import useNavigate from react-router-dom
import "../styles/auth.css";
import api from "../api";
function Auth({ onLogin }) {
  const [mode, setMode] = useState("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");

  const navigate = useNavigate();  // Initialize useNavigate hook

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/api/auth/login", { email, password });
      // On success, store user data in localStorage
      localStorage.setItem("user", JSON.stringify(res.data.user));
      onLogin(res.data.user);  // Call the onLogin function passed from the parent component

      // Redirect to the home page after successful login
      navigate("/");  // This will redirect the user to the home page
    } catch (error) {
      alert(error.response?.data?.message || "Login failed");
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/api/auth/signup", {
        full_name: fullName,
        email,
        phone,
        password,
      });
      // On success, store user data in localStorage and log in the user
      localStorage.setItem("user", JSON.stringify(res.data.user));
      onLogin(res.data.user);  // Automatically log in the user after signup

      // Redirect to the home page after successful sign-up
      navigate("/");  // This will redirect the user to the home page
    } catch (error) {
      alert(error.response?.data?.message || "Sign-up failed");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        {/* BRAND */}
        <div className="auth-brand">
          <h1>BMW Rentals</h1>
          <p><span id="Blue">Precision. </span><span id="dark-blue">Performance. </span><span id="red">Control. </span></p>
        </div>

        {/* TOGGLE */}
        <div className="auth-toggle">
          <button className={mode === "signin" ? "active" : ""} onClick={() => setMode("signin")}>
            Sign In
          </button>
          <button className={mode === "signup" ? "active" : ""} onClick={() => setMode("signup")}>
            Sign Up
          </button>
        </div>

        {/* FORM */}
        <form>
          {mode === "signup" && (
            <div className="auth-field">
              <label>Full Name</label>
              <input
                type="text"
                placeholder="John Doe"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>
          )}

          <div className="auth-field">
            <label>Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="auth-field">
            <label>Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {mode === "signup" && (
            <div className="auth-field">
              <label>Confirm Password</label>
              <input
                type="password"
                placeholder="••••••••"
              />
            </div>
          )}

          {mode === "signup" && (
            <div className="auth-field">
              <label>Phone</label>
              <input
                type="text"
                placeholder="Your phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
          )}

          <button type="submit" className="auth-submit" onClick={mode === "signin" ? handleLogin : handleSignUp}>
            {mode === "signin" ? "Sign In" : "Create Account"}
          </button>
        </form>

        {/* FOOTER */}
        <p className="auth-footer">
          By continuing, you agree to our <span>Terms</span> & <span>Privacy Policy</span>.
        </p>
      </div>
    </div>
  );
}

export default Auth;
