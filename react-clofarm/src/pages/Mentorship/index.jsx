import React, { useState } from "react";
import { SearchOutlined } from "@ant-design/icons";

const mentorships = [
  {
    id: 1,
    title: "Mentor Pertanian",
    description:
      "Belajar langsung dari mentor berpengalaman di bidang pertanian organik.",
    image:
      "https://img.freepik.com/free-vector/farm-landscape_23-2147510615.jpg",
  },
  {
    id: 2,
    title: "Mentor Hidroponik",
    description: "Panduan dan konsultasi hidroponik dari ahlinya.",
    image:
      "https://img.freepik.com/free-vector/farm-landscape_23-2147510615.jpg",
  },
  {
    id: 3,
    title: "Mentor Bisnis Agrowisata",
    description: "Tips sukses membangun bisnis agrowisata.",
    image:
      "https://img.freepik.com/free-vector/farm-landscape_23-2147510615.jpg",
  },
  {
    id: 4,
    title: "Mentor Kompos & Pupuk",
    description: "Belajar membuat kompos dan pupuk alami.",
    image:
      "https://img.freepik.com/free-vector/farm-landscape_23-2147510615.jpg",
  },
];

export default function Mentorship() {
  const [search, setSearch] = useState("");
  const [expandedCard, setExpandedCard] = useState(null);
  const [searchHover, setSearchHover] = useState(false);

  const filteredMentorships = mentorships.filter((m) =>
    m.title.toLowerCase().includes(search.toLowerCase())
  );

  const maxDesc = 50;

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
            maxWidth: 1275,
            width: "100%",
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
            }}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "25px",
            width: "100%",
          }}
        >
          {filteredMentorships.map((m) => {
            const isLong = m.description.length > maxDesc;
            const shortDesc = isLong
              ? m.description.slice(0, maxDesc).trim() + "... "
              : m.description;
            return (
              <div
                key={m.id}
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
                  src={m.image}
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
                    {expandedCard === m.id ? (
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
                        {shortDesc}
                        {isLong && (
                          <span
                            style={{
                              color: "#27ae60",
                              cursor: "pointer",
                              fontWeight: 500,
                            }}
                            onClick={() => setExpandedCard(m.id)}
                          >
                            Lihat Selengkapnya
                          </span>
                        )}
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
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.background = "#219150";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.background = "#27ae60";
                    }}
                  >
                    Lihat Program
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
