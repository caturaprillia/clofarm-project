import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import cardImg from "../../assets/images/dumpict.jpg";

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

// Komponen Card Tutorial sesuai desain gambar user
function TutorialCard({ thumbnail_url, title, description, tutorial_url }) {
  return (
    <div
      style={{
        border: "1px solid #e5e7eb", // samakan dengan card lain
        borderRadius: 12, // samakan dengan card lain
        boxShadow: "0 1px 6px 0 rgba(0,0,0,0.08)", // samakan dengan card lain
        background: "#fff",
        padding: "0 0 24px 0",
        display: "flex",
        flexDirection: "column",
        alignItems: "stretch",
        minHeight: 10,
        maxWidth: 270,
        height: 320,
        margin: "0 auto",
        transition: "box-shadow 0.18s, border 0.18s",
      }}
    >
      <img
        src={thumbnail_url || cardImg}
        alt={title}
        style={{
          width: "100%",
          height: 150,
          objectFit: "cover",
          borderTopLeftRadius: 12, // samakan dengan card lain
          borderTopRightRadius: 12, // samakan dengan card lain
          background: "#f0f0f0",
        }}
      />
      <div style={{ padding: "18px 18px 0 18px", flex: 1 }}>
        <div
          style={{
            fontWeight: 700,
            fontSize: 20,
            marginBottom: 6,
            color: "#222",
            lineHeight: 1.2,
          }}
        >
          {title}
        </div>
        <div
          style={{
            color: "#8a929b",
            fontSize: 16,
            marginBottom: 24,
            lineHeight: 1.2,
            minHeight: 10,
          }}
        >
          {description}
        </div>
      </div>
      <div style={{ padding: "0 18px" }}>
        <a
          href={tutorial_url || "#"}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            width: "100%",
            display: "block",
            background: "#27ae60",
            color: "#fff",
            border: "none",
            borderRadius: 6,
            padding: "7px 0",
            fontWeight: 700,
            textAlign: "center",
            textDecoration: "none",
            fontSize: "1.05rem",
            marginTop: 0,
            transition: "background 0.18s, color 0.18s",
            boxShadow: "0 1px 4px 0 rgba(39,174,96,0.08)",
            letterSpacing: 0.2,
          }}
          onMouseEnter={(e) => {
            e.target.style.background = "#219150";
          }}
          onMouseLeave={(e) => {
            e.target.style.background = "#27ae60";
          }}
        >
          See Tutorial
        </a>
      </div>
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
        // Filter agar tidak menampilkan tutorial yang sedang dibuka
        const filtered = data.filter(
          (t) => String(t.id_tutorials) !== String(id)
        );
        setOtherTutorials(filtered.slice(0, 4));
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
    <div style={{ padding: 32, maxWidth: 1300, margin: "0 auto" }}>
      <div
        style={{
          background: "#fff",
          borderRadius: 14,
          boxShadow: "0 4px 24px 0 rgba(0,0,0,0.08)",
          padding: "32px 36px 40px 36px",
        }}
      >
        <h1
          style={{
            fontSize: 36,
            fontWeight: 700,
            marginBottom: 36,
            letterSpacing: 1,
          }}
        >
          Clofarm Tutorial
        </h1>
        <div
          style={{
            display: "flex",
            gap: 64,
            alignItems: "flex-start",
            marginBottom: 0,
          }}
        >
          {/* Step by step (expand/collapse) */}
          <div style={{ flex: 1, minWidth: 320 }}>
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
                        zIndex: 1,
                        transition: "background 0.18s",
                      }}
                    >
                      {idx + 1}
                    </div>
                    {/* Garis penghubung antar bulatan, hanya jika step aktif */}
                    {idx < steps.length - 1 && isOpen && (
                      <div
                        style={{
                          position: "absolute",
                          top: 40, // tepat di bawah bulatan
                          left: "50%",
                          transform: "translateX(-50%)",
                          width: 4,
                          height: 40,
                          background: "#27ae60",
                          borderRadius: 2,
                          zIndex: 0,
                        }}
                      />
                    )}
                  </div>
                  {/* Step content */}
                  <div>
                    <div
                      style={{
                        fontWeight: 600,
                        fontSize: 20,
                        marginBottom: isOpen && step.desc.length ? 6 : 18,
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
            fontSize: 28,
            fontWeight: 700,
            marginTop: 48,
            marginBottom: 24,
            letterSpacing: 0.5,
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
            gap: 28,
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
            otherTutorials.map((tut, idx) => (
              <TutorialCard key={idx} {...tut} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
