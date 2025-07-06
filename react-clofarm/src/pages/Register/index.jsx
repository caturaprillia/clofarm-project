import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";
import "./register.css";

function Register() {
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const isValid = username.trim() && name.trim() && phone.trim() && password.trim();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValid) return;
    setError("");
    setSuccess("");
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("username", username);
      formData.append("name", name);
      formData.append("phone_number", phone);
      formData.append("password", password);
      // formData.append("photo_url", ""); // opsional, bisa tambahkan jika ingin

      const response = await fetch("http://localhost:5000/auth/register", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.msg || "Register failed");
      }
      setSuccess("Register berhasil! Silakan login.");
      setTimeout(() => navigate("/login"), 1200);
    } catch (err) {
      setError(err.message || "Register failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-left">
        <form className="register-form" onSubmit={handleSubmit}>
          <div className="register-title">Register</div>
          {error && (
            <div style={{ color: "#e74c3c", fontSize: 14, marginBottom: 12, textAlign: "center" }}>{error}</div>
          )}
          {success && (
            <div style={{ color: "#27ae60", fontSize: 14, marginBottom: 12, textAlign: "center" }}>{success}</div>
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
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              className="input"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={loading}
            />
          </div>
          <div className="form-group">
            <label htmlFor="phone">Phone Number</label>
            <input
              type="text"
              id="phone"
              name="phone"
              className="input"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
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
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <EyeOutlined style={{ fontSize: 22, color: "#888" }} />
                ) : (
                  <EyeInvisibleOutlined style={{ fontSize: 22, color: "#888" }} />
                )}
              </span>
            </div>
          </div>
          <button
            type="submit"
            className={`register-btn${!isValid || loading ? " disabled" : ""}`}
            disabled={!isValid || loading}
          >
            {loading ? "Registering..." : "Register"}
          </button>
          <div className="auth-link">
            Already have an account?{" "}
            <Link to="/login" className="login-link">
              Log in
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

export default Register;
