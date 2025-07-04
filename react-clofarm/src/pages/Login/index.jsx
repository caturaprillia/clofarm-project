import React, { useState } from "react";
import { Link } from "react-router-dom";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";
import "./login.css";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const isValid = username.trim() !== "" && password.trim() !== "";
  return (
    <div className="auth-container">
      <div className="auth-left">
        <form className="login-form">
          <div className="login-title">Log in</div>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              className="input"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="form-group password-group">
            <label htmlFor="password">Password</label>
            <div className="input-password-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                className="input"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span
                className="eye-icon"
                onClick={() => setShowPassword((v) => !v)}
                tabIndex={0}
                role="button"
                aria-label={
                  showPassword ? "Sembunyikan password" : "Tampilkan password"
                }
              >
                {showPassword ? (
                  <EyeOutlined style={{ fontSize: 22, color: "#888" }} />
                ) : (
                  <EyeInvisibleOutlined
                    style={{ fontSize: 22, color: "#888" }}
                  />
                )}
              </span>
            </div>
          </div>
          <div className="login-forgot">
            <a href="#" className="forgot-link">
              Forgot Password?
            </a>
          </div>
          <button
            type="submit"
            className={`login-btn${!isValid ? " disabled" : ""}`}
            disabled={!isValid}
          >
            Log in
          </button>
          <div className="auth-link">
            Don't Have An Account?{" "}
            <Link to="/register" className="register-link">
              Register Now.
            </Link>
          </div>
        </form>
      </div>
      <div
        className="auth-divider"
        style={{
          background: "#f4eee7",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            background: "#ffffff",
            borderRadius: "65%",
            width: "500px",
            height: "500px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            className="logo-placeholder"
            style={{ background: "transparent" }}
          >
            <DotLottieReact
              src="https://lottie.host/5e51a5ba-367f-421c-859b-0c5d08027076/PCJTRPLG3c.lottie"
              loop
              autoplay
              style={{ width: "110%", height: "110%" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
