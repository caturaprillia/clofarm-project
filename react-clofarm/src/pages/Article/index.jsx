import React, { useState, useEffect } from "react";
import { SearchOutlined } from "@ant-design/icons";
import dumpict from "../../assets/images/dumpict.jpg";

const ArticleCard = ({ image_url, title, description, article_url }) => (
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
    <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
      <img
        src={image_url || require("../../assets/images/dumpict.jpg")}
        alt={title}
        style={{
          width: "90%",
          height: "180px",
          margin: "16px auto 0 auto",
          display: "block",
          objectFit: "cover",
          borderRadius: "8px",
          background: "#f0f0f0",
        }}
      />
    </div>
    <div
      style={{
        padding: "8px 12px 6px 12px",
        flex: 1,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <h3
        style={{
          margin: "12px 0 4px 0",
          fontSize: "1.08rem",
          fontWeight: 700,
          color: "#222",
        }}
      >
        {title}
      </h3>
      <div style={{ fontSize: "0.92rem", color: "#888", marginBottom: "8px" }}>
        {description}
      </div>
    </div>
    <div style={{ padding: "0 12px 12px 12px" }}>
      <a
        href={article_url}
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
        Read Article
      </a>
    </div>
  </div>
);

const Article = () => {
  const [searchHover, setSearchHover] = useState(false);
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch articles from backend
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true);
        // Get token from localStorage
        const token = localStorage.getItem("token");

        const response = await fetch("http://localhost:5000/articles", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch articles");
        }

        const data = await response.json();
        setArticles(data);
      } catch (err) {
        console.error("Error fetching articles:", err);
        setError(err.message);
        // Fallback to dummy data if API fails
        setArticles([
          {
            id_articles: 1,
            image_url: dumpict,
            title: "Teknologi Pertanian Modern",
            description: "Inovasi terbaru pertanian.",
            article_url: "https://example.com/article/1",
          },
          {
            id_articles: 2,
            image_url: dumpict,
            title: "Tips Merawat Tanaman",
            description: "Tips merawat tanaman organik.",
            article_url: "https://example.com/article/2",
          },
          {
            id_articles: 3,
            image_url: dumpict,
            title: "Peluang Bisnis Agrowisata",
            description: "Peluang bisnis agrowisata.",
            article_url: "https://example.com/article/3",
          },
          {
            id_articles: 4,
            image_url: dumpict,
            title: "Manfaat Kompos",
            description: "Manfaat kompos untuk tanah.",
            article_url: "https://example.com/article/4",
          },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  // Filter articles based on search term
  const filteredArticles = articles.filter(
    (article) =>
      article.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "50vh",
          fontSize: "18px",
          color: "#666",
        }}
      >
        Loading articles...
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
          fontSize: "18px",
          color: "#e74c3c",
        }}
      >
        Error: {error}
      </div>
    );
  }

  return (
    <div
      style={{
        background: "#f8f9fa",
        minHeight: "100vh",
        overflowY: "auto",
      }}
    >
      <div
        style={{
          background: "#fff",
          borderRadius: "14px",
          padding: "25px 30px",
          boxShadow: "0 4px 24px 0 rgba(0,0,0,0.08)",
          maxWidth: "1550px",
          margin: "0 auto 30px auto",
          boxSizing: "border-box",
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
            maxWidth: "100%", // perbaiki: pastikan 100%
            width: "100%",
            boxSizing: "border-box", // tambahkan agar tidak overflow
            overflow: "hidden", // tambahkan agar tidak overflow
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
          {filteredArticles.map((article) => (
            <ArticleCard key={article.id_articles} {...article} />
          ))}{" "}
        </div>{" "}
      </div>{" "}
    </div>
  );
};

export default Article;
