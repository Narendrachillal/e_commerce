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

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (
      !formData.email ||
      !formData.password ||
      (state === "Sign Up" && !formData.username)
    ) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      const endpoint = state === "Login" ? "/user/login" : "/user/signup";
      const { data } = await axios.post(
        `http://localhost:4000${endpoint}`,
        formData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      if (data.success) {
        localStorage.setItem("auth-token", data.token);
        window.location.replace("/");
      } else {
        alert(data.error);
      }
    } catch (error) {
      console.error(`${state} Error:`, error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="loginsignup">
      <div className="loginsignup-container">
        <h1>{state}</h1>
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
        <button onClick={handleSubmit}>Continue</button>
        <p className="loginsignup-login">
          {state === "Sign Up" ? (
            <>
              Already have an account?{" "}
              <span onClick={() => setState("Login")}>Login here</span>
            </>
          ) : (
            <>
              Don't have an account?{" "}
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
