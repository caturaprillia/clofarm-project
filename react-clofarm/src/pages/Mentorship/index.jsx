import React, { useState } from "react";

const mentorships = [
  {
    id: 1,
    title: "Mentor Pertanian Organik",
    description: "Belajar langsung dari mentor berpengalaman di bidang pertanian organik.",
    image: "https://img.freepik.com/free-vector/farm-landscape_23-2147510615.jpg",
  },
  {
    id: 2,
    title: "Mentor Hidroponik",
    description: "Panduan dan konsultasi hidroponik dari ahlinya.",
    image: "https://img.freepik.com/free-vector/farm-landscape_23-2147510615.jpg",
  },
  {
    id: 3,
    title: "Mentor Bisnis Agrowisata",
    description: "Tips sukses membangun bisnis agrowisata.",
    image: "https://img.freepik.com/free-vector/farm-landscape_23-2147510615.jpg",
  },
  {
    id: 4,
    title: "Mentor Kompos & Pupuk",
    description: "Belajar membuat kompos dan pupuk alami.",
    image: "https://img.freepik.com/free-vector/farm-landscape_23-2147510615.jpg",
  },
];

export default function Mentorship() {
  const [search, setSearch] = useState("");

  const filteredMentorships = mentorships.filter((m) =>
    m.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ padding: "2rem" }}>
      <h1 style={{ fontWeight: "bold", fontSize: "2.5rem" }}>Mentorship</h1>
      <input
        type="text"
        placeholder="Search..."
        style={{
          width: "100%",
          padding: "1rem",
          margin: "1.5rem 0",
          borderRadius: "10px",
          border: "1px solid #ccc",
          fontSize: "1.1rem",
        }}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap" }}>
        {filteredMentorships.map((m) => (
          <div
            key={m.id}
            style={{
              background: "#fff",
              borderRadius: "16px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
              width: "300px",
              padding: "1rem",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <img
              src={m.image}
              alt={m.title}
              style={{
                width: "100%",
                height: "160px",
                objectFit: "cover",
                borderRadius: "12px",
                marginBottom: "1rem",
              }}
            />
            <div
              style={{
                fontWeight: "bold",
                fontSize: "1.1rem",
                marginBottom: "0.5rem",
                width: "100%",
                textAlign: "left",
              }}
            >
              {m.title}
            </div>
            <div style={{ color: "#555", marginBottom: "1.2rem" }}>{m.description}</div>
            <button
              style={{
                background: "#4CAF50",
                color: "#fff",
                border: "none",
                borderRadius: "8px",
                padding: "0.7rem 1.5rem",
                fontWeight: "bold",
                fontSize: "1rem",
                cursor: "pointer",
                width: "100%",
              }}
            >
              Lihat Program 
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
