import React, { useState, useRef, useEffect } from "react";
import { FilterOutlined, LogoutOutlined, SettingOutlined } from "@ant-design/icons";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import homeHeader from "../../assets/images/home.jpg";
import AgrotourismCard from '../Agrotourism';
import TutorialCard from '../Tutorial';
import { useNavigate } from "react-router-dom";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';


const bahanPokok = ["Corn", "Rice", "Tomato", "Chili", "Wheat"];

// Style untuk card mini Home
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
  fontSize: 19,
  margin: "16px 0 8px 0",
  color: "#111827",
  textAlign: "center"
};
const descStyle = {
  color: "#6b7280",
  fontSize: 16,
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
const noDataStyle = {
  fontWeight: 700,
  fontSize: 20,
  color: "#888",
  margin: "auto"
};

export default function Home() {
  const [showFilter, setShowFilter] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const profileRef = useRef();
  const filterRef = useRef();
  const [hoveredBar, setHoveredBar] = useState(null);
  const [latest, setLatest] = useState({
    agrotourism: null,
    mentorship: null,
    tutorial: null,
    article: null,
  });
  const navigate = useNavigate();
  // Dummy user data (replace with real data if available)
  const user = {
    name: "Eka",
    email: "user@email.com",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg"
  };

  // Tutup dropdown jika klik di luar
  useEffect(() => {
    function handleClickOutside(event) {
      if (filterRef.current && !filterRef.current.contains(event.target)) {
        setShowFilter(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfile(false);
      }
    }
    if (showFilter || showProfile) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showFilter, showProfile]);

  useEffect(() => {
    async function fetchLatest() {
      const token = localStorage.getItem('token');
      const headers = { Authorization: `Bearer ${token}` };
      const [agroArr, mentorArr, tutArr, artArr] = await Promise.all([
        fetch('http://localhost:5000/agrotourism', { headers }).then(res => res.json()),
        fetch('http://localhost:5000/mentorship', { headers }).then(res => res.json()),
        fetch('http://localhost:5000/tutorials', { headers }).then(res => res.json()),
        fetch('http://localhost:5000/articles', { headers }).then(res => res.json()),
      ]);
      // Ambil data terbaru (id terbesar) dari masing-masing array
      const getLatest = (arr, idKey = 'id') => {
        if (!Array.isArray(arr) || arr.length === 0) return null;
        return arr.reduce((max, item) => (item[idKey] > (max?.[idKey] ?? -Infinity) ? item : max), arr[0]);
      };
      setLatest({
        agrotourism: getLatest(agroArr, 'id_agrowisata'),
        mentorship: getLatest(mentorArr, 'id_mentorship'),
        tutorial: getLatest(tutArr, 'id_tutorials'),
        article: getLatest(artArr, 'id_articles'),
      });
    }
    fetchLatest();
  }, []);

  const latestCards = [
    { type: 'Agrotourism', data: latest.agrotourism },
    { type: 'Mentorship', data: latest.mentorship },
    { type: 'Tutorial', data: latest.tutorial },
    { type: 'Article', data: latest.article },
  ];

  return (    <div style={{ background: "#f9fafb", minHeight: "100vh" }}>
      <div style={{
        background: "#fff",
        borderRadius: 14,
        boxShadow: "0 4px 24px 0 rgba(0,0,0,0.08)",
        padding: "25px 30px",
        maxWidth: 1550,
        margin: "0 auto 30px auto",
        boxSizing: "border-box"
      }}>
        {/* Judul halaman Home di atas banner */}
        {/* <div style={{ fontWeight: 700, color: "#4CAF50", fontSize: 32, marginBottom: 18, letterSpacing: 1 }}>
          Home
        </div> */}

        {/* Banner */}
        <div
          style={{
            width: "100%",
            height: 200,
            backgroundImage: `url(${homeHeader})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            borderRadius: 16,
            margin: "1.2rem 0 2.5rem 0",
          }}
        />

        {/* Statistics */}
        <div style={{
          display: "flex",
          alignItems: "flex-start",
          gap: 56,
          margin: "0 auto 32px auto",
          maxWidth: 1100,
        }}>
          {/* Kiri: Judul dan Lottie */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", minWidth: 340 }}>
            <div style={{ fontWeight: 700, color: "#4CAF50", fontSize: 28, marginBottom: 18, letterSpacing: 1 }}>
              Statistics
            </div>
            <div style={{ flexShrink: 0, display: "flex", alignItems: "center", height: "100%" }}>
              <DotLottieReact
                src="https://lottie.host/92591761-7108-4b14-9bee-024d3882b7fe/x0KINVoj2a.lottie"
                loop
                autoplay
                style={{ width: 320, height: 320, maxWidth: 380, maxHeight: 340 }}
              />
            </div>
          </div>
          {/* Kanan: Card Statistik */}
          <div style={{
            background: "#fff",
            border: "2px solid #4CAF50",
            borderRadius: 16,
            padding: "32px 32px 32px 32px",
            minWidth: 700,
            maxWidth: 1200,
            flex: 1,
            boxSizing: "border-box",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginLeft: 20
          }}>
            {/* Judul chart */}
            <div style={{ color: "#222", fontSize: 18, marginBottom: 12, fontWeight: 600, letterSpacing: 1, textAlign: "center" }}>
              Today Prices of Commodities
            </div>
            {/* Bar Chart Responsive dengan Recharts */}
            <div style={{ width: "100%", height: 300, maxWidth: 1200 }}>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart
                  data={[
                    { name: "Rice", value: 50 },
                    { name: "Chili", value: 85 },
                    { name: "Tomato", value: 70 },
                    { name: "Onion", value: 60 },
                    { name: "Shallots", value: 65 },
                    { name: "Egg", value: 35 },
                    { name: "Corn", value: 55 },
                    { name: "Wheat", value: 40 },
                    { name: "Potato", value: 75 },
                  ]}
                  margin={{ top: 30, right: 30, left: 10, bottom: 30 }}
                  barCategoryGap="60%"
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" tick={{ fontWeight: 700, fontSize: 16, fill: "#22313F" }} axisLine={{ stroke: '#888', strokeWidth: 2 }} tickLine={false} />
                  <YAxis tick={{ fontWeight: 700, fontSize: 15, fill: "#444" }} axisLine={{ stroke: '#888', strokeWidth: 2 }} tickLine={false} width={50} domain={[0, 100]} tickFormatter={v => `${v}k`} />
                  <Tooltip cursor={{ fill: 'rgba(140,196,127,0.12)' }} contentStyle={{ borderRadius: 8, fontWeight: 700, fontSize: 16, color: '#22313F', border: '1.5px solid #8BC47F' }} formatter={v => [`${v}k`, 'Price']} />
                  <Bar dataKey="value" fill="#8BC47F" radius={[10, 10, 10, 10]} barSize={36} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* For you */}
        <div style={{ fontWeight: "bold", color: "#4CAF50", fontSize: 22, marginBottom: 16 }}>
          What's New?
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 25 }}>
          {/* Agrotourism */}
          <div style={cardStyle}>
            {latest.agrotourism ? (
              <>
                <img src={latest.agrotourism.image_url} alt={latest.agrotourism.name} style={imgStyle} />
                <div style={titleStyle}>{latest.agrotourism.name}</div>
                <div style={descStyle}>{latest.agrotourism.city}, {latest.agrotourism.province}</div>
                <button onClick={() => navigate(`/agrotourism/${latest.agrotourism.id_agrowisata}`)} style={btnStyle}>Lihat Detail</button>
              </>
            ) : <div style={noDataStyle}>No data</div>}
          </div>
          {/* Mentorship */}
          <div style={cardStyle}>
            {latest.mentorship ? (
              <>
                <img src={latest.mentorship.image_url} alt={latest.mentorship.title} style={imgStyle} />
                <div style={titleStyle}>{latest.mentorship.title}</div>
                <div style={descStyle}>
                  {latest.mentorship.description && latest.mentorship.description.length > 100
                    ? (
                        <>
                          {latest.mentorship.description.slice(0, 100)}...
                          <span
                            style={{ color: "#27ae60", cursor: "pointer", marginLeft: 6, fontWeight: 500 }}
                            onClick={() => navigate(`/mentorship/${latest.mentorship.id_mentorship}`)}
                          >
                            See more
                          </span>
                        </>
                      )
                    : latest.mentorship.description
                  }
                </div>
                <button onClick={() => navigate(`/mentorship/${latest.mentorship.id_mentorship}`)} style={btnStyle}>Lihat Program</button>
              </>
            ) : <div style={noDataStyle}>No data</div>}
          </div>
          {/* Tutorial */}
          <div style={cardStyle}>
            {latest.tutorial ? (
              <>
                <img src={latest.tutorial.thumbnail_url} alt={latest.tutorial.title} style={imgStyle} />
                <div style={titleStyle}>{latest.tutorial.title}</div>
                <div style={descStyle}>{latest.tutorial.description}</div>
                <a href={latest.tutorial.tutorial_url} target="_blank" rel="noopener noreferrer" style={btnStyle}>Lihat Tutorial</a>
              </>
            ) : <div style={noDataStyle}>No data</div>}
          </div>
          {/* Article */}
          <div style={cardStyle}>
            {latest.article ? (
              <>
                <img src={latest.article.image_url} alt={latest.article.title} style={imgStyle} />
                <div style={titleStyle}>{latest.article.title}</div>
                <div style={descStyle}>{latest.article.description}</div>
                <a href={latest.article.article_url} target="_blank" rel="noopener noreferrer" style={btnStyle}>Read Article</a>
              </>
            ) : <div style={noDataStyle}>No data</div>}
          </div>
        </div>
      </div>
    </div>
  );
}
