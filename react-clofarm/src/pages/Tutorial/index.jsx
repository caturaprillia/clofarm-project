import React from "react";
import Sidebar from "../../components/layout/Sidebar";
import "./tutorial.css";

const Tutorial = () => (
  <div className="main-layout">
    <Sidebar />
    <div className="main-content">
      <header className="main-header">
        <span className="brand">WebfmSI.com</span>
        <div className="header-actions">
          <span className="signout">Sign Out</span>
          <span className="settings-icon">⚙️</span>
        </div>
      </header>
      <div className="page-content">
        <h1 className="page-title">Books Page</h1>
        <p className="page-desc">
          Get Data list of the books. Demonstrate use JWT to retrieve the
          private endpoints.
        </p>
        <input className="search-input" placeholder="Search books..." />
        <div className="books-grid">
          {/* Contoh card buku, bisa diganti dengan map data */}
          <div className="book-card">
            <div className="book-title">Harry potter edit</div>
            <div className="book-desc">update description updated</div>
            <div className="book-actions">
              <span>✏️</span>
              <span>🔍</span>
              <span>🗑️</span>
            </div>
          </div>
          <div className="book-card">
            <div className="book-title">Romeo and Juliet</div>
            <div className="book-actions">
              <span>✏️</span>
              <span>🔍</span>
              <span>🗑️</span>
            </div>
          </div>
          {/* Tambahkan card lain sesuai kebutuhan */}
        </div>
      </div>
    </div>
  </div>
);

export default Tutorial;
