import React, { useState, useRef, useEffect } from "react";
import { FilterOutlined } from "@ant-design/icons";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import homeHeader from "../../assets/images/home.jpg";

const forYou = [
  { title: "Agrotourism", desc: "Danau Beratan", sub: "Desa Candikuning, Kec. Baturiti" },
  { title: "Mentorship", desc: "Danau Beratan", sub: "Desa Candikuning, Kec. Baturiti" },
  { title: "Tutorial", desc: "Danau Beratan", sub: "Desa Candikuning, Kec. Baturiti" },
  { title: "Article", desc: "Danau Beratan", sub: "Desa Candikuning, Kec. Baturiti" },
];

const bahanPokok = ["Corn", "Rice", "Tomato", "Chili", "Wheat"];

export default function Home() {
  const [showFilter, setShowFilter] = useState(false);
  const filterRef = useRef();

  // Tutup dropdown jika klik di luar
  useEffect(() => {
    function handleClickOutside(event) {
      if (filterRef.current && !filterRef.current.contains(event.target)) {
        setShowFilter(false);
      }
    }
    if (showFilter) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showFilter]);

  return (
    <div style={{ background: "#f8f9fa", minHeight: "100vh" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "2.5rem 1.5rem 0 1.5rem" }}>
        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div />
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div
              ref={filterRef}
              style={{ position: "relative" }}
            >
              <FilterOutlined
                style={{ fontSize: 28, color: "#4CAF50", cursor: "pointer" }}
                onClick={() => setShowFilter((prev) => !prev)}
              />
              {showFilter && (
                <div
                  style={{
                    position: "absolute",
                    top: 36,
                    right: 0,
                    background: "#fff",
                    border: "1px solid #ccc",
                    borderRadius: 8,
                    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                    zIndex: 10,
                    minWidth: 140,
                  }}
                >
                  {bahanPokok.map((item) => (
                    <div
                      key={item}
                      style={{
                        padding: "0.7rem 1rem",
                        cursor: "pointer",
                        borderBottom: "1px solid #f0f0f0",
                        fontWeight: 500,
                        color: "#4CAF50",
                      }}
                      onClick={() => {
                        setShowFilter(false);
                        alert("Filter: " + item);
                      }}
                    >
                      {item}
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: "50%",
                background: "#e0e0e0",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 13,
                color: "#888",
              }}
            >
              {/* Avatar user */}
            </div>
            <span style={{ color: "#888", fontSize: 15 }}>Sign Out</span>
          </div>
        </div>

        {/* Banner */}
        <div
          style={{
            width: "100%",
            height: 320,
            backgroundImage: `url(${homeHeader})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            borderRadius: 16,
            margin: "1.2rem 0 2.5rem 0",
          }}
        />

        {/* Statistics */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            width: "100%",
          }}
        >
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: "bold", color: "#4CAF50", fontSize: 22, marginBottom: 8 }}>
              Statistics
            </div>
            <div style={{ color: "#444", fontSize: 13, marginBottom: 12 }}>
              Danau Beratan Danau BeratanDanau BeratanDanau BeratanDanau Beratan Danau BeratanDanau BeratanDanau BeratanDanau Beratan
            </div>
            <div style={{ display: "flex", alignItems: "flex-end", height: 250 }}>
              {[40, 80, 65, 60, 58, 90].map((h, i) => (
                <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", width: 50, margin: "0 8px" }}>
                  <div
                    style={{
                      width: 50,
                      height: h * 2,
                      background: "#72b76c",
                      borderRadius: 10,
                      transition: "height 0.3s",
                    }}
                  />
                  <div
                    style={{
                      marginTop: 8,
                      fontWeight: 700,
                      fontSize: 15,
                      fontFamily: "inherit",
                      color: "#22313F",
                      letterSpacing: 1,
                      lineHeight: "1.2",
                      textAlign: "center",
                    }}
                  >
                    {["JAN", "FEB", "MAR", "APR", "MAY", "JUN"][i]}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ flexShrink: 0, marginLeft: 0 }}>
            <DotLottieReact
              src="https://lottie.host/92591761-7108-4b14-9bee-024d3882b7fe/x0KINVoj2a.lottie"
              loop
              autoplay
              style={{ width: 250, height: 250 }}
            />
          </div>
        </div>

        {/* For you */}
        <div style={{ fontWeight: "bold", color: "#4CAF50", fontSize: 22, marginBottom: 16 }}>
          For you
        </div>
        <div style={{ display: "flex", gap: 18 }}>
          {forYou.map((item) => (
            <div
              key={item.title}
              style={{
                background: "#fff",
                border: "1.5px solid #ccc",
                borderRadius: "16px",
                padding: "1.2rem 1.2rem 1.5rem 1.2rem",
                minWidth: 200,
                flex: 1,
                boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  width: "100%",
                  height: 70,
                  background: "#d3d3d3",
                  borderRadius: 8,
                  marginBottom: "1rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: "bold",
                  fontSize: 20,
                  color: "#444",
                }}
              >
                {item.title}
              </div>
              <div style={{ fontWeight: "bold", fontSize: 15, marginBottom: 2 }}>{item.desc}</div>
              <div style={{ fontSize: 13, color: "#888", marginBottom: 8 }}>{item.sub}</div>
              <span style={{ color: "#4CAF50", fontWeight: 500, fontSize: 13, cursor: "pointer" }}>
                More
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
