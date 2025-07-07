import React, { useState, useEffect } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../components/UserContext";

// HILANGKAN BORDER INPUT SECARA GLOBAL DI FILE INI
const style = document.createElement("style");
style.innerHTML = `
  input[type="text"]:focus,
  input[type="text"]:active,
  input[type="text"]:hover {
    outline: none !important;
    border: none !important;
    box-shadow: none !important;
  }
`;
document.head.appendChild(style);

export default function Mentorship() {
  const [search, setSearch] = useState("");
  const [expandedCard, setExpandedCard] = useState(null);
  const [searchHover, setSearchHover] = useState(false);
  const [mentorships, setMentorships] = useState([]);
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { user } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMentorships = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        if (!token) throw new Error("Token not found. Please login again.");
        const [mentorshipRes, registRes] = await Promise.all([
          fetch("http://localhost:5000/mentorship", { headers: { Authorization: `Bearer ${token}` } }),
          fetch("http://localhost:5000/mentorship_regist", { headers: { Authorization: `Bearer ${token}` } })
        ]);
        if (!mentorshipRes.ok) {
          const errData = await mentorshipRes.json();
          throw new Error(errData.msg || "Failed to fetch mentorships");
        }
        if (!registRes.ok) {
          const errData = await registRes.json();
          throw new Error(errData.msg || "Failed to fetch registrations");
        }
        const mentorshipData = await mentorshipRes.json();
        const registData = await registRes.json();
        setMentorships(mentorshipData);
        setRegistrations(registData);
      } catch (err) {
        setError(err.message);
        setMentorships([]);
        setRegistrations([]);
      } finally {
        setLoading(false);
      }
    };
    fetchMentorships();
  }, []);

  const filteredMentorships = mentorships.filter((m) =>
    m.title?.toLowerCase().includes(search.toLowerCase())
  );

  // Get joined mentorship ids for this user
  const joinedIds = user ? registrations.filter(r => r.id_user === user.id_user).map(r => r.id_mentorship) : [];
  const joinedMentorships = filteredMentorships.filter(m => joinedIds.includes(m.id_mentorship));
  const notJoinedMentorships = filteredMentorships.filter(m => !joinedIds.includes(m.id_mentorship));

  const maxDesc = 50;

  if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "50vh", fontSize: 18, color: "#666" }}>
        Loading mentorships...
      </div>
    );
  }
  if (error) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "50vh", fontSize: 18, color: "#e74c3c" }}>
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
            fontWeight: 700,
            fontSize: "2.1rem",
            marginBottom: 32,
            letterSpacing: 1,
          }}
        >
          Mentorship
        </h1>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            background: "#fff",
            border: `2px solid ${searchHover ? "#27ae60" : "#d1d5db"}`,
            borderRadius: "8px",
            padding: "0 16px",
            height: "48px",
            margin: "0 0 32px 0",
            maxWidth: "100%",
            width: "100%",
            boxSizing: "border-box",
            overflow: "hidden",
            boxShadow: searchHover ? "0 0 0 2px #bfe4ce" : "none",
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
              caretColor: "#27ae60",
            }}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        {/* Joined Programs Section */}
        <h2 style={{ fontSize: 22, fontWeight: 600, margin: "32px 0 18px 0" }}>Programs You've Joined</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "25px", width: "100%" }}>
          {joinedMentorships.length === 0 ? (
            <div style={{ gridColumn: "span 4", color: "#888", fontSize: 17, textAlign: "center", padding: 32 }}>
              You haven't joined any mentorship programs yet.
            </div>
          ) : (
            joinedMentorships.map((m) => {
              const isLong = m.description?.length > maxDesc;
              const shortDesc = isLong
                ? m.description.slice(0, maxDesc).trim() + "... "
                : m.description;
              return (
                <div
                  key={m.id_mentorship}
                  style={{
                    background: "#fff",
                    border: "1px solid #e5e7eb",
                    borderRadius: "12px",
                    boxShadow: "0 1px 3px 0 rgba(0,0,0,0.05)",
                    width: "100%",
                    padding: 0,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "stretch",
                    fontFamily: "Poppins, sans-serif",
                    transition: "box-shadow 0.18s, transform 0.18s",
                    marginBottom: "25px",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow =
                      "0 4px 16px rgba(76,175,80,0.15)";
                    e.currentTarget.style.transform = "translateY(-4px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow =
                      "0 1px 3px 0 rgba(0,0,0,0.05)";
                    e.currentTarget.style.transform = "none";
                  }}
                >
                  <img
                    src={m.image_url}
                    alt={m.title}
                    style={{
                      width: "100%",
                      height: "125px",
                      objectFit: "cover",
                      borderTopLeftRadius: "12px",
                      borderTopRightRadius: "12px",
                      marginBottom: 0,
                    }}
                  />
                  <div
                    style={{
                      padding: "15px",
                      flex: 1,
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                    }}
                  >
                    <div>
                      <div
                        style={{
                          fontWeight: 600,
                          fontSize: "19px",
                          marginBottom: "8px",
                          color: "#111827",
                          fontFamily: "Poppins, sans-serif",
                        }}
                      >
                        {m.title}
                      </div>
                      {expandedCard === m.id_mentorship ? (
                        <div
                          style={{
                            color: "#6b7280",
                            fontSize: "16px",
                            marginBottom: "18px",
                            fontFamily: "Poppins, sans-serif",
                            lineHeight: 1.5,
                          }}
                        >
                          {m.description}
                        </div>
                      ) : (
                        <div
                          style={{
                            color: "#6b7280",
                            fontSize: "16px",
                            marginBottom: "18px",
                            fontFamily: "Poppins, sans-serif",
                            lineHeight: 1.5,
                            whiteSpace: "pre-line",
                          }}
                        >
                          {m.description && m.description.length > 100
                            ? (
                                <>
                                  {m.description.slice(0, 100)}...
                                  <span
                                    style={{ color: "#27ae60", cursor: "pointer", marginLeft: 6, fontWeight: 500 }}
                                    onClick={() => navigate(`/mentorship/${m.id_mentorship}`)}
                                  >
                                    See more
                                  </span>
                                </>
                              )
                            : m.description
                          }
                        </div>
                      )}
                    </div>
                    <button
                      style={{
                        background: "#27ae60",
                        color: "#fff",
                        border: "none",
                        borderRadius: 8,
                        padding: "10px 0",
                        fontWeight: 600,
                        fontSize: "16.5px",
                        cursor: "pointer",
                        width: "100%",
                        fontFamily: "Poppins, sans-serif",
                        marginTop: "auto",
                        transition: "background 0.18s",
                        textAlign: "center",
                        textDecoration: "none",
                        display: "block"
                      }}
                      onClick={() => navigate(`/mentorship/${m.id_mentorship}`)}
                    >
                      See Detail
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
        {/* Not Joined Programs Section */}
        <h2 style={{ fontSize: 22, fontWeight: 600, margin: "32px 0 18px 0" }}>Available Programs</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "25px", width: "100%" }}>
          {notJoinedMentorships.length === 0 ? (
            <div style={{ gridColumn: "span 4", color: "#888", fontSize: 17, textAlign: "center", padding: 32 }}>
              No available mentorship programs at the moment.
            </div>
          ) : (
            notJoinedMentorships.map((m) => {
              const isLong = m.description?.length > maxDesc;
              const shortDesc = isLong
                ? m.description.slice(0, maxDesc).trim() + "... "
                : m.description;
              return (
                <div
                  key={m.id_mentorship}
                  style={{
                    background: "#fff",
                    border: "1px solid #e5e7eb",
                    borderRadius: "12px",
                    boxShadow: "0 1px 3px 0 rgba(0,0,0,0.05)",
                    width: "100%",
                    padding: 0,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "stretch",
                    fontFamily: "Poppins, sans-serif",
                    transition: "box-shadow 0.18s, transform 0.18s",
                    marginBottom: "25px",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow =
                      "0 4px 16px rgba(76,175,80,0.15)";
                    e.currentTarget.style.transform = "translateY(-4px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow =
                      "0 1px 3px 0 rgba(0,0,0,0.05)";
                    e.currentTarget.style.transform = "none";
                  }}
                >
                  <img
                    src={m.image_url}
                    alt={m.title}
                    style={{
                      width: "100%",
                      height: "125px",
                      objectFit: "cover",
                      borderTopLeftRadius: "12px",
                      borderTopRightRadius: "12px",
                      marginBottom: 0,
                    }}
                  />
                  <div
                    style={{
                      padding: "15px",
                      flex: 1,
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                    }}
                  >
                    <div>
                      <div
                        style={{
                          fontWeight: 600,
                          fontSize: "19px",
                          marginBottom: "8px",
                          color: "#111827",
                          fontFamily: "Poppins, sans-serif",
                        }}
                      >
                        {m.title}
                      </div>
                      {expandedCard === m.id_mentorship ? (
                        <div
                          style={{
                            color: "#6b7280",
                            fontSize: "16px",
                            marginBottom: "18px",
                            fontFamily: "Poppins, sans-serif",
                            lineHeight: 1.5,
                          }}
                        >
                          {m.description}
                        </div>
                      ) : (
                        <div
                          style={{
                            color: "#6b7280",
                            fontSize: "16px",
                            marginBottom: "18px",
                            fontFamily: "Poppins, sans-serif",
                            lineHeight: 1.5,
                            whiteSpace: "pre-line",
                          }}
                        >
                          {m.description && m.description.length > 100
                            ? (
                                <>
                                  {m.description.slice(0, 100)}...
                                  <span
                                    style={{ color: "#27ae60", cursor: "pointer", marginLeft: 6, fontWeight: 500 }}
                                    onClick={() => navigate(`/mentorship/${m.id_mentorship}`)}
                                  >
                                    See more
                                  </span>
                                </>
                              )
                            : m.description
                          }
                        </div>
                      )}
                    </div>
                    <button
                      style={{
                        background: "#27ae60",
                        color: "#fff",
                        border: "none",
                        borderRadius: 8,
                        padding: "10px 0",
                        fontWeight: 600,
                        fontSize: "16.5px",
                        cursor: "pointer",
                        width: "100%",
                        fontFamily: "Poppins, sans-serif",
                        marginTop: "auto",
                        transition: "background 0.18s",
                        textAlign: "center",
                        textDecoration: "none",
                        display: "block"
                      }}
                      onClick={() => navigate(`/mentorship/${m.id_mentorship}`)}
                    >
                      See Detail
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
