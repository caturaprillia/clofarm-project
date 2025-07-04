import React, { useState } from "react";
import { Link } from "react-router-dom";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";
import "./register.css";

function Register() {
  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [telepon, setTelepon] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const isValid =
    nama.trim() && email.trim() && telepon.trim() && password.trim();
  return (
    <div className="auth-container">
      <div className="auth-left">
        <form className="register-form">
          <div className="register-title">Register</div>
          <div className="form-group">
            <label htmlFor="nama">Name</label>
            <input
              type="text"
              id="nama"
              name="nama"
              className="input"
              required
              value={nama}
              onChange={(e) => setNama(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              className="input"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="telepon">Phone Number</label>
            <input
              type="text"
              id="telepon"
              name="telepon"
              className="input"
              required
              value={telepon}
              onChange={(e) => setTelepon(e.target.value)}
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
                aria-label={showPassword ? "Hide password" : "Show password"}
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
          <button
            type="submit"
            className={`register-btn${!isValid ? " disabled" : ""}`}
            disabled={!isValid}
          >
            Register
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
