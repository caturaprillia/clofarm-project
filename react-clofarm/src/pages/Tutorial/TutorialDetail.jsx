import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import cardImg from "../../assets/images/seed.jpg";


const steps = [
  {
    title: "Seeding Stage",
    desc: [
      "Prepare high-quality seeds.",
      "Soak the seeds in warm water for 24 hours.",
      "Drain and incubate the seeds for 2 days until they sprout.",
      "Prepare the seeding media: a mixture of soil, compost, and husks.",
      "Sprinkle the seeds on the media, water lightly, and cover with a thin layer of soil.",
      "Place them in a shaded and moist area for 7–14 days.",
    ],
  },
  {
    title: "Transplanting Stage",
    desc: [
      "Choose healthy seedlings (with at least 2–3 leaves).",
      "Prepare the land with raised beds or planting holes.",
      "Mix the soil with base fertilizer (compost or manure).",
      "Transplant the seedlings carefully to avoid damaging the roots.",
      "Plant with enough spacing between each plant.",
      "Water immediately after transplanting.",
    ],
  },
  {
    title: "Maintenance Stage",
    desc: [
      "Water the plants regularly, in the morning or evening.",
      "Weed the area every 1–2 weeks.",
      "Apply follow-up fertilizer according to plant age (organic/inorganic).",
      "Control pests and diseases using natural or chemical pesticides (if needed).",
      "Stake the plants if they are climbing or tall.",
    ],
  },
  {
    title: "Harvest Stage",
    desc: [
      "Use clean and sharp harvesting tools.",
      "Harvest in the morning to maintain freshness.",
      "Store the harvested crops in a shaded place before packaging.",
    ],
  },
];


// Komponen Card Tutorial identik dengan index.jsx
function TutorialCard({ thumbnail_url, title, description, tutorial_url }) {
  const cardStyle = {
    background: "#fff",
    border: "1px solid #e5e7eb",
    borderRadius: 12,
    boxShadow: "0 1px 3px 0 rgba(0,0,0,0.05)",
    width: "100%",
    minHeight: 320,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    padding: "0 0 18px 0"
  };
  const imgStyle = {
    width: "90%",
    height: 160,
    margin: "16px auto 0 auto",
    display: "block",
    objectFit: "cover",
    borderRadius: 8,
    background: "#e5e7eb"
  };
  const titleStyle = {
    fontWeight: 700,
    fontSize: 17,
    margin: "16px 0 8px 0",
    color: "#111827",
    textAlign: "left"
  };
  const descStyle = {
    color: "#6b7280",
    fontSize: 14,
    marginBottom: 18,
    fontFamily: "Poppins, sans-serif",
    lineHeight: 1.5,
    textAlign: "center"
  };
  const btnStyle = {
    background: "#27ae60",
    color: "#fff",
    border: "none",
    borderRadius: 8,
    padding: "10px 0",
    fontWeight: 600,
    fontSize: "16.5px",
    cursor: "pointer",
    width: "90%",
    fontFamily: "Poppins, sans-serif",
    marginTop: "auto",
    transition: "background 0.18s",
    textAlign: "center",
    textDecoration: "none",
    display: "block"
  };
  return (
    <div style={cardStyle}>
      <img src={thumbnail_url} alt={title} style={imgStyle} />
      <div style={titleStyle}>{title}</div>
      <div style={descStyle}>{description}</div>
      <a href={tutorial_url} target="_blank" rel="noopener noreferrer" style={btnStyle}>See Tutorial</a>
    </div>
  );
}

export default function TutorialDetail() {
  const { id } = useParams();
  const [otherTutorials, setOtherTutorials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [openSteps, setOpenSteps] = useState([]); // array of index step yang terbuka

  useEffect(() => {
    const fetchTutorials = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        const response = await fetch("http://localhost:5000/tutorials", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) throw new Error("Failed to fetch tutorials");
        const data = await response.json();
        console.log("Fetched tutorials:", data); // DEBUG
        // Filter agar tidak menampilkan tutorial yang sedang dibuka
        const filtered = data.filter((t) => String(t.id_tutorials) !== String(id));
        console.log("Filtered other tutorials:", filtered); // DEBUG
        setOtherTutorials(filtered.slice(0, 4));
        if (filtered.length === 0) {
          console.warn("No other tutorials found. Current id:", id, "All data:", data);
        }
      } catch (err) {
        setError(err.message);
        setOtherTutorials([]);
      } finally {
        setLoading(false);
      }
    };
    fetchTutorials();
  }, [id]);

  return (
    <div style={{
      background: "#f9fafb",
      minHeight: "100vh",
      width: "100%",
      padding: 0,
    }}>
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
            fontFamily: '"Poppins", sans-serif',
          }}
        >
          Seeding Stage Tutorial
        </h1>
        <div style={{ fontSize: "1.1rem", color: "#888", marginBottom: 28, fontFamily: 'Poppins, sans-serif' }}>
          You can see the tutorial details by clicking the number
        </div>
        <div
          style={{
            display: "flex",
            gap: 64,
            alignItems: "flex-start",
            marginBottom: 0,
          }}
        >
          {/* Step by step (expand/collapse) */}
          <div style={{ flex: 1, minWidth: 320, position: "relative" }}>
            {/* Vertical connecting line for all steps */}
            <div style={{
              position: "absolute",
              left: 20, // center of the circles (40px wide)
              top: 0,
              width: 4,
              height: `calc(100% - 40px)`,
              background: "#27ae60",
              zIndex: 0,
              borderRadius: 2,
            }} />
            {steps.map((step, idx) => {
              const isOpen = openSteps.includes(idx);
              const allOpen = openSteps.length === steps.length;
              return (
                <div
                  key={idx}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    marginBottom: idx < steps.length - 1 ? 32 : 0,
                    cursor: "pointer",
                    position: "relative",
                    zIndex: 1,
                  }}
                  onClick={() =>
                    setOpenSteps(
                      isOpen
                        ? openSteps.filter((i) => i !== idx)
                        : [...openSteps, idx]
                    )
                  }
                >
                  {/* Number + line, garis benar-benar menyambung antar bulatan */}
                  <div
                    style={{
                      position: "relative",
                      marginRight: 24,
                      width: 40,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      zIndex: 2,
                    }}
                  >
                    <div
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: "50%",
                        background: "#27ae60",
                        color: "#fff",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontWeight: 700,
                        fontSize: 22,
                        zIndex: 2,
                        transition: "background 0.18s",
                        fontFamily: '"Poppins", sans-serif',
                      }}
                    >
                      {idx + 1}
                    </div>
                  </div>
                  {/* Step content */}
                  <div>
                    <div
                      style={{
                        fontWeight: 600,
                        fontSize: 20,
                        marginBottom: isOpen && step.desc.length ? 6 : 18,
                        fontFamily: '"Poppins", sans-serif',
                      }}
                    >
                      {step.title}
                    </div>
                    {isOpen && step.desc.length > 0 && (
                      <ul
                        style={{
                          margin: 0,
                          paddingLeft: 18,
                          color: "#222",
                          fontSize: 16,
                          marginBottom: 18,
                          fontFamily: '"Poppins", sans-serif',
                        }}
                      >
                        {step.desc.map((d, i) => (
                          <li key={i}>{d}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
          {/* Gambar kanan */}
          <div style={{ flex: 1, display: "flex", justifyContent: "center" }}>
            <img
              src={cardImg}
              alt="Tutorial"
              style={{
                width: 380,
                height: 300,
                objectFit: "cover",
                borderRadius: 18,
                boxShadow: "0 2px 12px rgba(0,0,0,0.10)",
              }}
            />
          </div>
        </div>
        {/* Section Other Tutorial - SEKARANG DI DALAM CONTAINER PUTIH YANG SAMA */}
        <h2
          style={{
            fontSize: "2.1rem",
            fontWeight: 700,
            marginTop: 48,
            marginBottom: 32,
            letterSpacing: 1,
            color: "#222",
            textAlign: "left",
          }}
        >
          Clofarm Other Tutorial
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "25px",
            width: "100%",
            margin: 0,
            marginBottom: 32,
          }}
        >
          {loading ? (
            <div
              style={{
                textAlign: "center",
                color: "#888",
                fontSize: 18,
                padding: 32,
                gridColumn: "span 4",
              }}
            >
              Loading...
            </div>
          ) : error ? (
            <div
              style={{
                textAlign: "center",
                color: "#e74c3c",
                fontSize: 18,
                padding: 32,
                gridColumn: "span 4",
              }}
            >
              {error}
            </div>
          ) : (
            otherTutorials.length > 0 ? (
              otherTutorials.map((tut, idx) => (
                <TutorialCard key={tut.id_tutorials || idx} {...tut} />
              ))
            ) : (
              <div style={{ gridColumn: "span 4", textAlign: "center", color: "#888", fontSize: 17, padding: 32 }}>No other tutorials found.</div>
            )
          )}
        </div>
      </div>
    </div>
  );
}
