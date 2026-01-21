import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/auth.css";
import api from "../api";

function Auth({ onLogin }) {
  const [mode, setMode] = useState("signin");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [confirmPassword, setConfirmPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");

  const navigate = useNavigate();

  // =====================
  // VALIDATION FUNCTIONS
  // =====================
  const validateSignInForm = () => {
    if (!email || !password) {
      alert("Please fill in all fields.");
      return false;
    }
    return true;
  };

  const validateSignUpForm = () => {
    if (!fullName || !email || !password || !confirmPassword || !phone) {
      alert("Please fill in all fields.");
      return false;
    }

    if (!email.includes("@")) {
      alert("Please enter a valid email address.");
      return false;
    }

    // phone must be numbers only
    if (!/^\d+$/.test(phone)) {
      alert("Phone number must contain numbers only.");
      return false;
    }

    if (password.length < 6) {
      alert("Password must be at least 6 characters.");
      return false;
    }

    // password must match confirm password
    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return false;
    }

    return true;
  };

  // =====================
  // LOGIN
  // =====================
  const handleSignIn = async (event) => {
    event.preventDefault();
    if (!validateSignInForm()) return;

    try {
      const response = await api.post("/api/auth/login", { email, password });
      const authenticatedUser = response.data.user;

      localStorage.setItem("user", JSON.stringify(authenticatedUser));
      onLogin(authenticatedUser);
      navigate("/");
    } catch (error) {
      alert(error.response?.data?.message || "Login failed");
    }
  };

  // =====================
  // SIGN UP
  // =====================
  const handleSignUp = async (event) => {
    event.preventDefault();
    if (!validateSignUpForm()) return;

    try {
      const response = await api.post("/api/auth/signup", {
        full_name: fullName,
        email,
        phone,
        password,
      });

      const authenticatedUser = response.data.user;

      localStorage.setItem("user", JSON.stringify(authenticatedUser));
      onLogin(authenticatedUser);
      navigate("/");
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
          <p>
            <span id="Blue">Precision. </span>
            <span id="dark-blue">Performance. </span>
            <span id="red">Control. </span>
          </p>
        </div>

        {/* TOGGLE */}
        <div className="auth-toggle">
          <button
            type="button"
            className={mode === "signin" ? "active" : ""}
            onClick={() => setMode("signin")}
          >
            Sign In
          </button>
          <button
            type="button"
            className={mode === "signup" ? "active" : ""}
            onClick={() => setMode("signup")}
          >
            Sign Up
          </button>
        </div>

        {/* FORM */}
        <form onSubmit={mode === "signin" ? handleSignIn : handleSignUp}>
          {mode === "signup" && (
            <div className="auth-field">
              <label>Full Name</label>
              <input
                type="text"
                placeholder="Rakan majed"
                value={fullName}
                onChange={(event) => setFullName(event.target.value)}
              />
            </div>
          )}

          <div className="auth-field">
            <label>Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>

          <div className="auth-field">
            <label>Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>

          {mode === "signup" && (
            <div className="auth-field">
              <label>Confirm Password</label>
              <input
                type="password"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
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
                onChange={(event) =>
                  setPhone(event.target.value.replace(/[^0-9]/g, ""))
                }
              />
            </div>
          )}

          <button type="submit" className="auth-submit">
            {mode === "signin" ? "Sign In" : "Create Account"}
          </button>
        </form>

        {/* FOOTER */}
        <p className="auth-footer">
          By continuing, you agree to our <span>Terms</span> &{" "}
          <span>Privacy Policy</span>.
        </p>
      </div>
    </div>
  );
}

export default Auth;
