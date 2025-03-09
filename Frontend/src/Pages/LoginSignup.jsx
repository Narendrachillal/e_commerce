import React, { useState } from "react";
import axios from "axios";
import "./CSS/LoginSignup.css";

const LoginSignup = () => {
  const [state, setState] = useState("Login");
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState({ text: "", type: "" });
  const [loading, setLoading] = useState(false); // Disable button while processing

  // Email Validation Regex
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  // Password Validation Regex (6+ chars, 1 uppercase, 1 lowercase, 1 number, 1 special char)
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (
      !formData.email ||
      !formData.password ||
      (state === "Sign Up" && !formData.username)
    ) {
      setMessage({ text: "Please fill in all fields.", type: "error" });
      return;
    }

    if (!emailRegex.test(formData.email)) {
      setMessage({ text: "Invalid email format.", type: "error" });
      return;
    }

    if (!passwordRegex.test(formData.password)) {
      setMessage({
        text: "Password must be at least 6 characters, include an uppercase, a lowercase, a number, and a special character.",
        type: "error",
      });
      return;
    }

    setLoading(true); // Disable button while request is processing

    try {
      const endpoint = state === "Login" ? "/user/login" : "/user/signup";
      const { data } = await axios.post(
        `http://localhost:4000${endpoint}`,
        formData,
        { headers: { "Content-Type": "application/json" } }
      );

      if (data.success) {
        setMessage({ text: "Success! Redirecting...", type: "success" });
        console.log(data);
        localStorage.setItem("auth-token", data.token);
        setTimeout(() => window.location.replace("/"), 1000);
      } else {
        setMessage({ text: data.error, type: "error" });
      }
    } catch (error) {
      console.error(`${state} Error:`, error.response.data.error);
      setMessage({
        text: error.response.data.error,
        type: "error",
      });
    }

    setLoading(false); // Re-enable button
  };

  return (
    <div className="loginsignup">
      <div className="loginsignup-container">
        <h1>{state}</h1>

        {message.text && (
          <div className={`message ${message.type}`}>{message.text}</div>
        )}

        <div className="loginsignup-fields">
          {state === "Sign Up" && (
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={changeHandler}
              placeholder="Your Name"
            />
          )}
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={changeHandler}
            placeholder="Email Address"
          />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={changeHandler}
            placeholder="Password"
          />
        </div>

        <button onClick={handleSubmit} disabled={loading}>
          {loading ? "Processing..." : "Continue"}
        </button>

        <p className="loginsignup-login">
          {state === "Sign Up" ? (
            <>
              Already have an account?
              <span onClick={() => setState("Login")}>Login here</span>
            </>
          ) : (
            <>
              Don't have an account?
              <span onClick={() => setState("Sign Up")}>Click here</span>
            </>
          )}
        </p>

        <div className="loginsignup-agree">
          <input type="checkbox" id="agree" />
          <label htmlFor="agree">
            By continuing, I agree to the Terms of Use & Privacy Policy.
          </label>
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;
