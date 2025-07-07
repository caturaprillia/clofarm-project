import React, { useState, useEffect } from "react";
import { SearchOutlined } from "@ant-design/icons";
import cardImg from "../../assets/images/dumpict.jpg";
import { useNavigate } from "react-router-dom";

// --- Komponen Kartu Tutorial ---
const TutorialCard = ({ thumbnail_url, title, description, tutorial_url }) => (
  <div style={styles.card}>
    <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
      <img
        src={thumbnail_url || cardImg}
        alt={title}
        style={{
          width: "90%",
          height: "160px",
          margin: "16px auto 0 auto",
          display: "block",
          objectFit: "cover",
          borderRadius: "8px",
          background: "#f0f0f0",
        }}
      />
    </div>
    <div style={styles.cardContent}>
      <h3 style={styles.cardTitle}>{title}</h3>
      <p style={styles.cardDescription}>{description}</p>
    </div>
    <div style={{ padding: "0 12px 12px 12px" }}>
      <a
        href={tutorial_url}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          width: "100%",
          display: "block",
          background: "#27ae60",
          color: "#fff",
          border: "none",
          borderRadius: "6px",
          padding: "7px 0",
          fontWeight: "bold",
          textAlign: "center",
          textDecoration: "none",
          fontSize: "1.05rem",
          transition: "background 0.2s, color 0.2s",
        }}
        onMouseEnter={(e) => {
          e.target.style.background = "#219150";
          e.target.style.color = "#fff";
        }}
        onMouseLeave={(e) => {
          e.target.style.background = "#27ae60";
          e.target.style.color = "#fff";
        }}
      >
        See Tutorial
      </a>
    </div>
  </div>
);

export default function TutorialPage() {
  const [searchHover, setSearchHover] = useState(false);
  const [tutorials, setTutorials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTutorials = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        if (!token) throw new Error("Token not found. Please login again.");
        const response = await fetch("http://localhost:5000/tutorials", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          const errData = await response.json();
          throw new Error(errData.msg || "Failed to fetch tutorials");
        }
        const data = await response.json();
        setTutorials(data);
      } catch (err) {
        setError(err.message);
        setTutorials([]);
      } finally {
        setLoading(false);
      }
    };
    fetchTutorials();
  }, []);

  const filteredTutorials = tutorials.filter(
    (tutorial) =>
      tutorial.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tutorial.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "50vh",
          fontSize: 18,
          color: "#666",
        }}
      >
        Loading tutorials...
      </div>
    );
  }
  if (error) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "50vh",
          fontSize: 18,
          color: "#e74c3c",
        }}
      >
        Error: {error}
      </div>
    );
  }

  return (
    <div style={{ background: "#f9fafb", minHeight: "100vh", width: "100%" }}>
      <div
        style={{
          background: "#fff",
          borderRadius: 14,
          boxShadow: "0 4px 24px 0 rgba(0,0,0,0.08)",
          padding: "25px 30px",
          maxWidth: 1550,
          margin: "0 auto 30px auto",
          boxSizing: "border-box",
        }}
      >
        <h1
          style={{
            fontSize: "2.1rem",
            fontWeight: 700,
            marginBottom: 32,
            letterSpacing: 1,
          }}
        >
          Tutorial
        </h1>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            background: "#fff",
            border: searchHover ? "1px solid #27ae60" : "1px solid #e5e7eb", // hover: hijau, normal: abu
            borderRadius: "12px",
            padding: "0 16px",
            height: "48px",
            marginBottom: 32,
            maxWidth: "100%",
            width: "100%",
            boxSizing: "border-box",
            overflow: "hidden",
            boxShadow: searchHover ? "0 0 0 2px #bfe4ce" : "none", // hover: glow/blur, normal: none
            transition: "border-color 0.2s, box-shadow 0.2s",
          }}
          onMouseEnter={() => setSearchHover(true)}
          onMouseLeave={() => setSearchHover(false)}
        >
          <SearchOutlined
            style={{
              fontSize: 22,
              color: searchHover ? "#27ae60" : "#b0b7c3",
              marginRight: 10,
              transition: "color 0.2s",
            }}
          />
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: "100%",
              height: "100%",
              padding: 0,
              fontSize: "16px",
              border: "none",
              outline: "none",
              background: "transparent",
              margin: 0,
              display: "flex",
              alignItems: "center",
              lineHeight: 1,
              boxShadow: "none",
            }}
          />
        </div>
        <div style={{ ...styles.cardGrid, marginTop: 10 }}>
          {/* Card Dummy selalu muncul di awal */}
          <div
            style={{
              ...styles.card,
              cursor: "pointer",
              border: "1px solid #e5e7eb",
              maxWidth: 310,
              height: 340,
              transition: "box-shadow 0.18s, border-color 0.18s",
            }}
            onClick={() => navigate("/tutorial/1")}
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter") navigate("/tutorial/1");
            }}
          >
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <img
                src={cardImg}
                alt="Dummy Tutorial"
                style={{
                  width: "90%",
                  height: "160px",
                  margin: "16px auto 0 auto",
                  display: "block",
                  objectFit: "cover",
                  borderRadius: "8px",
                  background: "#f0f0f0",
                }}
              />
            </div>
            <div style={styles.cardContent}>
              <h3 style={styles.cardTitle}>Seeding Stage</h3>
              <p style={styles.cardDescription}>
                Seed preparation and germination steps.
              </p>
            </div>
            <div style={{ padding: "0 12px 12px 12px" }}>
              <span
                style={{
                  width: "100%",
                  display: "block",
                  background: "#27ae60",
                  color: "#fff",
                  border: "none",
                  borderRadius: "6px",
                  padding: "5px 0",
                  fontWeight: "bold",
                  textAlign: "center",
                  textDecoration: "none",
                  fontSize: "1.05rem",
                  transition: "background 0.2s, color 0.2s",
                }}
              >
                See Tutorial
              </span>
            </div>
          </div>
          {/* Card tutorial asli */}
          {filteredTutorials.map((tutorial) => (
            <TutorialCard key={tutorial.id_tutorials} {...tutorial} />
          ))}
        </div>
      </div>
    </div>
  );
}

// --- Objek Gaya (CSS-in-JS) ---
const styles = {
  // --- Layout Utama ---
  pageContainer: {
    display: "flex",
    flexDirection: "column",
    height: "100vh",
    fontFamily: '"Poppins", sans-serif',
    backgroundColor: "#f9fafb",
  },
  bodyContainer: {
    display: "flex",
    flex: 1,
    overflow: "hidden",
    width: "100%",
  },
  mainContent: {
    flex: 1,
    padding: "30px 20px", // lebih kecil
    overflowY: "auto",
    width: "100%",
    maxWidth: "none",
  },
  // --- Header & Footer ---
  pageHeader: {
    padding: "15px 40px",
    background: "white",
    borderBottom: "1px solid #e5e7eb",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexShrink: 0,
  },
  pageFooter: {
    padding: "15px 0",
    textAlign: "center",
    color: "#6b7280",
    fontSize: 14,
    background: "white",
    borderTop: "1px solid #e5e7eb",
    flexShrink: 0,
  },
  headerButton: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    background: "#f9fafb",
    border: "1px solid #d1d5db",
    borderRadius: 8,
    padding: "8px 16px",
    fontSize: 15,
    fontWeight: 500,
    color: "#374151",
    cursor: "pointer",
  },
  settingsIcon: { fontSize: 22, color: "#6b7280", cursor: "pointer" },

  // --- Konten Utama ---
  contentHeader: {
    paddingBottom: "20px",
    borderBottom: "1px solid #e5e7eb",
    marginBottom: "30px",
  },
  searchInputWrapper: {
    display: "flex",
    alignItems: "center",
    background: "white",
    border: "2px solid #d1d5db",
    borderRadius: "8px",
    padding: "0 16px",
    height: "48px",
    marginBottom: "30px",
    transition: "border-color 0.2s, box-shadow 0.2s",
  },
  searchInput: {
    width: "100%",
    height: "100%",
    padding: 0,
    fontSize: "16px",
    border: "none",
    outline: "none",
    background: "transparent",
    margin: 0,
    display: "flex",
    alignItems: "center",
    lineHeight: 1,
    boxShadow: "none",
  },
  cardGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "25px",
    width: "100%",
    margin: 0,
  },
  card: {
    backgroundColor: "white",
    border: "1px solid #e5e7eb",
    boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.05)",
    borderRadius: "12px",
    display: "flex",
    flexDirection: "column",
  },
  cardContent: { padding: "15px" },
  cardTitle: {
    margin: "0 0 8px 0",
    fontSize: 19,
    fontWeight: 600,
    color: "#222",
    fontFamily: '"Poppins", sans-serif',
  },
  cardDescription: {
    margin: 0,
    fontSize: 16,
    color: "#888",
    fontFamily: '"Poppins", sans-serif',
  },
};
