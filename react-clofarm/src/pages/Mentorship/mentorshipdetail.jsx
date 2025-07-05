import { useParams } from "react-router-dom";

const mentorships = [
  {
    id: 1,
    title: "Clofarm Mentorship",
    description: `Lorem ipsum dolor sit amet
Lorem ipsum dolor sit amet
Lorem ipsum dolor sit amet
Lorem ipsum dolor sit amet`,
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
  },
  // ... mentorship lain
];

export default function Detail() {
  const { id } = useParams();
  const mentorship = mentorships.find((m) => m.id === Number(id));

  if (!mentorship) return <div>Mentorship tidak ditemukan</div>;

  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        padding: "3rem 0",
        minHeight: "80vh",
      }}
    >
      <div
        style={{
          display: "flex",
          gap: "3rem",
          background: "#fff",
          borderRadius: "24px",
          boxShadow: "0 2px 16px rgba(0,0,0,0.07)",
          padding: "2.5rem 3rem",
          maxWidth: "900px",
          width: "100%",
        }}
      >
        <div style={{ flex: 1 }}>
          <h1 style={{ fontWeight: "bold", fontSize: "2rem", marginBottom: "1.2rem" }}>
            Mentorship
          </h1>
          <h2 style={{ fontWeight: "bold", fontSize: "1.5rem", marginBottom: "1.2rem" }}>
            {mentorship.title}
          </h2>
          <div
            style={{
              marginBottom: "2rem",
              fontSize: "1.1rem",
              color: "#444",
              lineHeight: 1.7,
              whiteSpace: "pre-line",
            }}
          >
            {mentorship.description}
          </div>
          <button
            style={{
              background: "#4CAF50",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              padding: "0.7rem 2.5rem",
              fontWeight: "bold",
              fontSize: "1.1rem",
              cursor: "pointer",
              boxShadow: "0 2px 8px rgba(76,175,80,0.08)",
            }}
          >
            Daftar
          </button>
        </div>
        <div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
          <img
            src={mentorship.image}
            alt={mentorship.title}
            style={{
              width: "320px",
              height: "320px",
              objectFit: "cover",
              borderRadius: "16px",
              boxShadow: "0 2px 12px rgba(0,0,0,0.10)",
            }}
          />
        </div>
      </div>
    </div>
  );
}