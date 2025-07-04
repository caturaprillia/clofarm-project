import React from "react";
import { Link } from "react-router-dom";
import "./onBoard.css";

function OnBoarding() {
  return (
    <div className="onboard-container">
      <div className="onboard-left">
        {/* Gambar ilustrasi di sini */}
        <img
          src="/src/assets/images/onBoarding.jpg"
          alt="onBoard"
          title="onBoard"
          className="onboard-img"
        />
      </div>
      <div className="onboard-right">
        <h1 className="onboard-title">
          Grow Smarter: One Platform for Every Farming Journey
        </h1>
        <p className="onboard-desc">
          Discover a world where farming meets innovation. Join a thriving
          Community of farmers and enthusiasts, explore nature and culture
          through Agrotourism, get guided support with personalized Mentorship,
          master new skills with hands-on Tutorials, and stay informed with
          insightful Articles. Everything you need to grow, connect, and succeed
          right at your fingertips.
        </p>
        <Link to="/login" className="onboard-btn">
          Login
        </Link>
      </div>
    </div>
  );
}

export default OnBoarding;
