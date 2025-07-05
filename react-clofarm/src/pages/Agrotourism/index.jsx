import React, { useState } from "react";
import { SearchOutlined, EnvironmentOutlined, DollarCircleOutlined } from "@ant-design/icons";
import dumpict from "../../assets/images/dumpict.jpg";

// Data Dummy
const dummyData = [
    { id: 1, name: "Clofarm", location: "Desa Beraban, Kec. Kediri", price: "Rp50.000", image: dumpict },
    { id: 2, name: "Jatiluwih Rice Terraces", location: "Desa Jatiluwih, Kec. Penebel", price: "Rp40.000", image: dumpict },
    { id: 3, name: "Tegalalang Farm", location: "Jl. Raya Tegallalang, Gianyar", price: "Rp25.000", image: dumpict },
    { id: 4, name: "Big Tree Farms Bamboo", location: "Desa Sibang Kaja, Abiansemal", price: "Rp75.000", image: dumpict },
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
    margin: "0 0 24px 0",
    color: "#111827",
    fontSize: "2.1rem",
    fontWeight: 700,
  },
  // Search Bar
  searchWrapper: {
    display: "flex",
    alignItems: "center",
    background: "#fff",
    border: `2px solid #d1d5db`,
    borderRadius: "8px",
    padding: "0 16px",
    height: "48px",
    marginBottom: "32px",
    transition: "border-color 0.2s, box-shadow 0.2s",
  },
  searchWrapperHover: {
    borderColor: "#27ae60",
    boxShadow: "0 0 0 3px rgba(39, 174, 96, 0.2)",
  },
  searchIcon: {
    fontSize: 20,
    color: "#9ca3af",
    marginRight: 12,
  },
  searchIconHover: {
    color: "#27ae60",
  },
  searchInput: {
    width: "100%",
    height: "100%",
    fontSize: "16px",
    border: "none",
    outline: "none",
    background: "transparent",
  },
  // Grid & Card
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
    gap: "32px",
  },
  card: {
    background: "#fff",
    border: "1px solid #e5e7eb",
    boxShadow: "0 1px 3px 0 rgba(0,0,0,0.05)",
    borderRadius: "12px",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
  },
  cardImage: {
    width: "100%",
    height: 180,
    objectFit: "cover",
  },
  cardContent: {
    padding: "16px",
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  cardTitle: {
    margin: 0,
    fontSize: "1.1rem",
    fontWeight: 700,
    color: "#111827",
  },
  cardInfo: {
    margin: 0,
    fontSize: "0.9rem",
    color: "#6b7280",
    display: "flex",
    alignItems: "center",
    gap: 8,
  },
  cardPrice: {
    color: "#059669",
    fontWeight: 600,
  },
};

// Komponen Card
const AgrotourismCard = ({ image, name, location, price }) => (
  <div style={styles.card}>
    <img src={image} alt={name} style={styles.cardImage} />
    <div style={styles.cardContent}>
      <h3 style={styles.cardTitle}>{name}</h3>
      <div style={styles.cardInfo}>
        <EnvironmentOutlined /> {location}
      </div>
      <div style={{...styles.cardInfo, ...styles.cardPrice}}>
        <DollarCircleOutlined /> {price}
      </div>
    </div>
  </div>
);

// Komponen Halaman Utama
const Agrotourism = () => {
  const [search, setSearch] = useState("");
  const [searchHover, setSearchHover] = useState(false);
  const filteredData = dummyData.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={styles.pageWrapper}>
      <div style={styles.container}>
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
            <AgrotourismCard key={item.id} {...item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Agrotourism;