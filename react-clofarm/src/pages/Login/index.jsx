import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";
import "./login.css";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const isValid = username.trim() !== "" && password.trim() !== "";

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValid) return;

    try {
      setLoading(true);
      setError("");

      const formData = new FormData();
      formData.append("username", username);
      formData.append("password", password);

      const response = await fetch("http://localhost:5000/auth/login", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.msg || "Login failed");
      }

      // Save token to localStorage
      localStorage.setItem("token", data.access_token);

      // Redirect to home page
      navigate("/home");
    } catch (err) {
      console.error("Login error:", err);
      setError(err.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-left">
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="login-title">Log in</div>
          {error && (
            <div
              style={{
                color: "#e74c3c",
                fontSize: "14px",
                marginBottom: "16px",
                textAlign: "center",
              }}
            >
              {error}
            </div>
          )}
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
              disabled={loading}
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
                disabled={loading}
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
            <Link to="/forgot-password" className="forgot-link">
              Forgot Password?
            </Link>
          </div>
          <button
            type="submit"
            className={`login-btn${!isValid || loading ? " disabled" : ""}`}
            disabled={!isValid || loading}
          >
            {loading ? "Logging in..." : "Log in"}
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
