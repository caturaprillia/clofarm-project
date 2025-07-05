import React, { useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import dumpict from "../../assets/images/dumpict.jpg";
const articles = [
  {
    id: 1,
    image: dumpict,
    title: "Teknologi Pertanian Modern",
    description: "Inovasi terbaru pertanian.",
    url: "https://example.com/article/1",
  },
  {
    id: 2,
    image: dumpict,
    title: "Tips Merawat Tanaman",
    description: "Tips merawat tanaman organik.",
    url: "https://example.com/article/2",
  },
  {
    id: 3,
    image: dumpict,
    title: "Peluang Bisnis Agrowisata",
    description: "Peluang bisnis agrowisata.",
    url: "https://example.com/article/3",
  },
  {
    id: 4,
    image: dumpict,
    title: "Manfaat Kompos",
    description: "Manfaat kompos untuk tanah.",
    url: "https://example.com/article/4",
  },
];
const ArticleCard = ({ image, title, description, url }) => (
  <div
    style={{
      background: "#fff",
      width: "100%",
      border: "1px solid #e5e7eb",
      boxShadow: "0 1px 6px 0 rgba(0,0,0,0.07)",
      borderRadius: "12px",
      overflow: "hidden",
      display: "flex",
      flexDirection: "column",
      minWidth: 0,
      maxWidth: 400,
      margin: "0 auto",
    }}
  >
    {" "}
    <div>
      {" "}
      <img
        src={image}
        alt={title}
        style={{
          width: "90%",
          height: "90%",
          margin: "16px auto 0 auto",
          display: "flex",
          objectFit: "cover",
          borderRadius: "8px",
          alignItems: "center",
          justifyContent: "center",
        }}
      />{" "}
    </div>{" "}
    <div
      style={{
        padding: "8px 12px 6px 12px",
        flex: 1,
        display: "flex",
        flexDirection: "column",
      }}
    >
      {" "}
      <h3
        style={{
          margin: "12px 0 4px 0",
          fontSize: "0.9rem",
          fontWeight: 700,
          color: "#222",
        }}
      >
        {" "}
        {title}{" "}
      </h3>{" "}
      <div style={{ fontSize: "0.75rem", color: "#888", marginBottom: "8px" }}>
        {" "}
        {description}{" "}
      </div>{" "}
    </div>{" "}
    <div style={{ padding: "0 12px 12px 12px" }}>
      {" "}
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
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
          fontSize: "0.95rem",
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
        {" "}
        Read Article{" "}
      </a>{" "}
    </div>{" "}
  </div>
);
const Article = () => {
  const [searchHover, setSearchHover] = useState(false);
  return (
    <div
      style={{
        padding: "0px 2px 0 2px",
        background: "#f9fafb",
        minHeight: "100vh",
        overflowY: "auto",
      }}
    >
      {" "}
      <div
        style={{
          padding: "25px 30px",
          borderRadius: "14px",
          margin: "0 auto 30px auto",
          maxWidth: "1550px",
          boxSizing: "border-box",
          background: "#fff",
          boxShadow: "0 4px 24px 0 rgba(0,0,0,0.08)",
        }}
      >
        {" "}
        <h1
          style={{
            margin: "8px 0 18px 0",
            color: "#222",
            fontSize: "2.1rem",
            fontWeight: 700,
          }}
        >
          {" "}
          Article{" "}
        </h1>{" "}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            background: "#fff",
            border: `2px solid ${searchHover ? "#27ae60" : "#d1d5db"}`,
            borderRadius: "8px",
            padding: "0 16px",
            height: "48px",
            marginBottom: "30px",
            boxShadow: searchHover ? "0 0 0 2px #bfe4ce" : "none",
            transition: "border-color 0.2s, box-shadow 0.2s",
            maxWidth: 985,
            width: "100%",
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
          />
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "25px",
            width: "100%",
            maxWidth: "1400px",
            margin: "0 auto",
          }}
        >
          {" "}
          {articles.map((article) => (
            <ArticleCard key={article.id} {...article} />
          ))}{" "}
        </div>{" "}
      </div>{" "}
    </div>
  );
};
export default Article;
