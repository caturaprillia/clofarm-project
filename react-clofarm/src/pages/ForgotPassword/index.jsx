import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import "./forgot-password.css";

function ForgotPassword() {
  const [username, setUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const isValid =
    username.trim() !== "" &&
    newPassword.trim() !== "" &&
    confirmPassword.trim() !== "" &&
    newPassword === confirmPassword;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValid) {
      setError("Pastikan semua field terisi dan password cocok.");
      return;
    }
    setLoading(true);
    setError("");
    setSuccess("");
    // Simulasi request
    setTimeout(() => {
      setLoading(false);
      setSuccess("Password berhasil diubah!");
      setTimeout(() => navigate("/login"), 1500);
    }, 1200);
  };

  return (
    <div className="auth-container">
      <div className="auth-left">
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="login-title">Forgot Password</div>
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
          {success && (
            <div
              style={{
                color: "#32a960",
                fontSize: "14px",
                marginBottom: "16px",
                textAlign: "center",
              }}
            >
              {success}
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
            <label htmlFor="newPassword">New Password</label>
            <div className="input-password-wrapper">
              <input
                type={showNewPassword ? "text" : "password"}
                id="newPassword"
                name="newPassword"
                className="input"
                required
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                disabled={loading}
              />
              <span
                className="eye-icon"
                onClick={() => setShowNewPassword((v) => !v)}
                tabIndex={0}
                role="button"
                aria-label={
                  showNewPassword
                    ? "Sembunyikan password"
                    : "Tampilkan password"
                }
              >
                {showNewPassword ? (
                  <EyeOutlined style={{ fontSize: 22, color: "#888" }} />
                ) : (
                  <EyeInvisibleOutlined
                    style={{ fontSize: 22, color: "#888" }}
                  />
                )}
              </span>
            </div>
          </div>
          <div className="form-group password-group">
            <label htmlFor="confirmPassword">Confirm New Password</label>
            <div className="input-password-wrapper">
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                name="confirmPassword"
                className="input"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                disabled={loading}
              />
              <span
                className="eye-icon"
                onClick={() => setShowConfirmPassword((v) => !v)}
                tabIndex={0}
                role="button"
                aria-label={
                  showConfirmPassword
                    ? "Sembunyikan password"
                    : "Tampilkan password"
                }
              >
                {showConfirmPassword ? (
                  <EyeOutlined style={{ fontSize: 22, color: "#888" }} />
                ) : (
                  <EyeInvisibleOutlined
                    style={{ fontSize: 22, color: "#888" }}
                  />
                )}
              </span>
            </div>
          </div>
          <div style={{ display: "flex", gap: "10px", marginTop: "1.5rem" }}>
            <button
              type="submit"
              className={`continue-btn${
                !isValid || loading ? " disabled" : ""
              }`}
              disabled={!isValid || loading}
            >
              {loading ? "Processing..." : "Continue"}
            </button>
            <button
              type="button"
              className="cancel-btn"
              onClick={() => navigate("/login")}
              disabled={loading}
            >
              Cancel
            </button>
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
              src="https://lottie.host/92262bf8-34fd-4672-832f-e13164070de6/wo0RgU9lVe.lottie"
              loop
              autoplay
              style={{ width: "135%", height: "135%" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
