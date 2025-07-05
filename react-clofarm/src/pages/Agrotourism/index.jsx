import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { SearchOutlined, EnvironmentOutlined, DollarCircleOutlined, StarFilled } from "@ant-design/icons";
import dumpict from "../../assets/images/dumpict.jpg";
import { notification } from "antd";

// Data Dummy
const dummyData = [
    {
        id: 1,
        name: "Clofarm",
        city: "Tabanan",
        province: "Bali",
        price: "Rp50.000",
        image: dumpict,
        description: "Clofarm adalah destinasi agrowisata edukasi dan rekreasi keluarga di tengah alam pedesaan yang asri.",
        rating: 4.8,
        gmaps: "https://maps.google.com/?q=Desa+Beraban+Kediri",
    },
    {
        id: 2,
        name: "Jatiluwih Rice Terraces",
        city: "Jatiluwih",
        province: "Bali",
        price: "Rp40.000",
        image: dumpict,
        description: "Jatiluwih menawarkan pemandangan sawah terasering yang menakjubkan dan udara sejuk pegunungan.",
        rating: 4.7,
        gmaps: "https://maps.google.com/?q=Jatiluwih+Penebel",
    },
    {
        id: 3,
        name: "Tegalalang Farm",
        city: "Gianyar",
        province: "Bali",
        price: "Rp25.000",
        image: dumpict,
        description: "Tegalalang Farm cocok untuk wisata keluarga dan edukasi pertanian modern di Bali.",
        rating: 4.6,
        gmaps: "https://maps.google.com/?q=Tegalalang+Gianyar",
    },
    {
        id: 4,
        name: "Big Tree Farms Bamboo",
        city: "Abiansemal",
        province: "Bali",
        price: "Rp75.000",
        image: dumpict,
        description: "Wisata pertanian organik dengan arsitektur bambu terbesar di dunia.",
        rating: 4.9,
        gmaps: "https://maps.google.com/?q=Sibang+Kaja+Abiansemal",
    },
];

// Objek Styles dipindahkan ke atas agar bisa diakses
const styles = {
  // Layout Utama
  pageWrapper: {
    background: "#f9fafb",
    minHeight: "100vh",
    padding: "32px",
  },
  container: {
    padding: "32px 40px",
    borderRadius: "18px",
    margin: "0 auto",
    maxWidth: "1400px",
    boxSizing: "border-box",
    background: "#fff",
    boxShadow: "0 4px 24px 0 rgba(0,0,0,0.08)",
  },
  title: {
    fontSize: "2.1rem",
    fontWeight: 700,
    marginBottom: 32,
    letterSpacing: 1,
  },
  // Search Bar
  searchWrapper: {
    marginBottom: 32,
    display: "flex",
    alignItems: "center",
    background: "#fff",
    border: `2px solid #d1d5db`,
    borderRadius: "8px",
    padding: "0 16px",
    height: "48px",
    boxShadow: "none",
    transition: "border-color 0.2s, box-shadow 0.2s",
    maxWidth: 1000,
    width: "100%",
  },
  searchWrapperHover: {
    border: `2px solid #27ae60`,
    boxShadow: "0 0 0 2px #bfe4ce",
  },
  searchIcon: {
    fontSize: 22,
    color: "#b0b7c3",
    marginRight: 10,
    transition: "color 0.2s",
  },
  searchIconHover: {
    color: "#27ae60",
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
  },
  // Grid & Card
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "25px",
    marginTop: 10,
    width: "100%",
  },
  card: {
    background: "#fff",
    border: "1px solid #e5e7eb",
    boxShadow: "0 1px 3px 0 rgba(0,0,0,0.05)",
    borderRadius: "12px",
    display: "flex",
    flexDirection: "column",
  },
  cardImage: {
    width: "100%",
    height: 160,
    objectFit: "cover",
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  cardContent: {
    padding: "15px",
  },
  cardTitle: {
    margin: "0 0 8px 0",
    fontSize: "16px",
    fontWeight: 600,
    color: "#111827",
  },
  cardInfo: {
    fontSize: "14px",
    color: "#6b7280",
    marginBottom: 4,
    display: "flex",
    alignItems: "center",
    gap: 6,
  },
  cardPrice: {
    color: "#059669",
    fontWeight: 600,
  },
};

// Komponen Card
const AgrotourismCard = ({ image, name, city, province, price, onClick }) => (
  <div style={styles.card} onClick={onClick} tabIndex={0} role="button">
    <img src={image} alt={name} style={styles.cardImage} />
    <div style={styles.cardContent}>
      <h3 style={styles.cardTitle}>{name}</h3>
      <div style={styles.cardInfo}>
        <EnvironmentOutlined style={{ color: "#059669" }} /> {city}, {province}
      </div>
      <div style={{ ...styles.cardInfo, color: "#6b7280" }}>
        <DollarCircleOutlined style={{ color: "#059669" }} /> {price}
      </div>
    </div>
  </div>
);

const DUMMY_USER = {
  username: "John Doe",
  profilePic: "https://i.pravatar.cc/100",
};

function StarRating({ value, onChange }) {
  return (
    <div style={{ fontSize: 28, color: "#bbb", marginBottom: 8, cursor: "pointer" }}>
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          style={{ color: star <= value ? "#27ae60" : "#bbb", transition: "color 0.2s" }}
          onClick={() => onChange(star)}
          onMouseOver={e => e.target.style.cursor = 'pointer'}
        >
          ★
        </span>
      ))}
    </div>
  );
}

const MainCard = ({ children }) => (
  <div style={{
    padding: "25px 30px",
    borderRadius: "14px",
    margin: "0 auto 30px auto",
    maxWidth: "1200px",
    boxSizing: "border-box",
    background: "#fff",
    boxShadow: "0 4px 24px 0 rgba(0,0,0,0.08)",
  }}>
    {children}
  </div>
);

function AgrotourismDetail() {
  const { id } = useParams();
  const data = dummyData.find((item) => String(item.id) === String(id));
  const [rating, setRating] = React.useState(0);
  const [review, setReview] = React.useState("");
  const [photoURL, setPhotoURL] = React.useState("");

  if (!data) return <MainCard><div>Agrotourism not found.</div></MainCard>;

  const handleCancel = () => {
    setRating(0);
    setReview("");
    setPhotoURL("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!rating || !review.trim() || !photoURL.trim()) {
      notification.error({ message: "Please complete all fields!" });
      return;
    }
    notification.success({ message: "Review submitted successfully!" });
    setRating(0);
    setReview("");
    setPhotoURL("");
  };

  return (
    <MainCard>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 32, alignItems: "flex-start" }}>
        <div style={{ flex: 1, minWidth: 260 }}>
          <h2 style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: 10 }}>{data.name}</h2>
          <div style={{ color: "#222", fontSize: 16, marginBottom: 18 }}>
            <div>{data.description}</div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 18, marginBottom: 8 }}>
            <span style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 18 }}>
              <DollarCircleOutlined style={{ color: "#27ae60", fontSize: 20 }} />
              <span style={{ fontWeight: 500, fontSize: 18, color: "#222" }}>{data.price}</span>
            </span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
            <StarFilled style={{ color: "#27ae60", fontSize: 20 }} />
            <span style={{ fontWeight: 500, fontSize: 18, color: "#222" }}>{data.rating}</span>
          </div>
        </div>
        <div style={{ flex: 1, minWidth: 320, display: "flex", flexDirection: "column", alignItems: "center" }}>
          <img src={data.image} alt={data.name} style={{ width: 370, height: 200, objectFit: "cover", borderRadius: 16, marginBottom: 10 }} />
          <div style={{ fontWeight: 600, fontSize: 20, letterSpacing: 1, textAlign: "center", marginTop: 8 }}>{data.city}, {data.province}</div>
          <a href={data.gmaps} target="_blank" rel="noopener noreferrer" style={{
            marginTop: 10,
            background: "#27ae60",
            color: "#fff",
            border: "none",
            borderRadius: 16,
            padding: "6px 22px",
            fontWeight: 600,
            fontSize: 15,
            cursor: "pointer",
            textDecoration: "none",
            display: "inline-block",
            textAlign: "center"
          }}>VISIT</a>
        </div>
      </div>
      <h2 style={{ fontSize: "1.3rem", fontWeight: 700, margin: "38px 0 16px 0" }}>{data.name} Reviews</h2>
      <form onSubmit={handleSubmit} style={{ border: "1px solid #bbb", borderRadius: 10, padding: 24, background: "#fafbfc", position: "relative", width: "90%" }}>
        <div style={{ fontWeight: 600, fontSize: 17, marginBottom: 12, display: "flex", alignItems: "center", gap: 8 }}>
          <img src="https://img.icons8.com/ios-filled/24/27ae60/feedback.png" alt="review" style={{ width: 22, height: 22 }} />
          Write a Review
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
          <img src={DUMMY_USER.profilePic} alt="profile" style={{ width: 38, height: 38, borderRadius: "50%", objectFit: "cover" }} />
          <span style={{ fontWeight: 500 }}>{DUMMY_USER.username}</span>
        </div>
        <StarRating value={rating} onChange={setRating} />
        <textarea placeholder="Share your experience about this place" style={{ width: "100%", minHeight: 48, borderRadius: 6, border: "1px solid #bbb", padding: 8, marginBottom: 8, resize: "vertical" }} value={review} onChange={e => setReview(e.target.value)} />
        <div style={{ fontSize: 14, marginBottom: 4 }}><span style={{ color: "#e74c3c" }}>*</span> Photo URL</div>
        <input type="text" placeholder="https://your-photo-url.com" style={{ marginBottom: 12, width: "100%", borderRadius: 6, border: "1px solid #bbb", padding: 6 }} value={photoURL} onChange={e => setPhotoURL(e.target.value)} />
        <div style={{ display: "flex", justifyContent: "flex-end", gap: 10 }}>
          <button type="button" onClick={handleCancel} style={{ background: "none", border: "none", color: "#888", fontWeight: 500, fontSize: 15, cursor: "pointer" }}>Cancel</button>
          <button type="submit" style={{ background: "#27ae60", color: "#fff", border: "none", borderRadius: 16, padding: "6px 22px", fontWeight: 600, fontSize: 15, cursor: "pointer" }}>Submit</button>
        </div>
      </form>
    </MainCard>
  );
}

function AgrotourismList() {
  const [search, setSearch] = useState("");
  const [searchHover, setSearchHover] = useState(false);
  const navigate = useNavigate();
  const filteredData = dummyData.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <MainCard>
      <h1 style={styles.title}>Agrotourism</h1>
      <div
        style={{ ...styles.searchWrapper, ...(searchHover ? styles.searchWrapperHover : {}) }}
        onMouseEnter={() => setSearchHover(true)}
        onMouseLeave={() => setSearchHover(false)}
      >
        <SearchOutlined
          style={{ ...styles.searchIcon, ...(searchHover ? styles.searchIconHover : {}) }}
        />
        <input
          type="text"
          placeholder="Search..."
          style={styles.searchInput}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div style={styles.grid}>
        {filteredData.map((item) => (
          <AgrotourismCard key={item.id} {...item} onClick={() => navigate(`/agrotourism/${item.id}`)} />
        ))}
      </div>
    </MainCard>
  );
}

export default function Agrotourism() {
  const params = useParams();
  // Jika ada id di URL, tampilkan detail, jika tidak tampilkan daftar
  if (params.id) {
    return <AgrotourismDetail />;
  }
  return <AgrotourismList />;
}