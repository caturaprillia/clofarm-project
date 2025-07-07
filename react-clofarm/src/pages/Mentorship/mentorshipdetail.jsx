import { useParams } from "react-router-dom";
import React, { useState } from "react";
import { Select } from "antd";

const mentorships = [
  {
    id: 1,
    title: "Clofarm Mentorship",
    description: `Lorem ipsum dolor sit amet\nLorem ipsum dolor sit amet\nLorem ipsum dolor sit amet\nLorem ipsum dolor sit amet`,
    image:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
  },
  // ... mentorship lain
];

export default function Detail() {
  const { id } = useParams();
  const mentorship = mentorships.find((m) => m.id === Number(id));
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    occupation: "",
    email: "",
    address: "",
  });

  if (!mentorship) return <div>Mentorship tidak ditemukan</div>;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCancel = () => {
    setShowForm(false);
    setForm({ name: "", phone: "", occupation: "", email: "", address: "" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulasi submit
    alert("Pendaftaran berhasil!");
    setShowForm(false);
    setForm({ name: "", phone: "", occupation: "", email: "", address: "" });
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
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
          borderRadius: 14,
          boxShadow: "0 4px 24px 0 rgba(0,0,0,0.08)",
          padding: "25px 30px",
          maxWidth: 1150,
          margin: "0 auto 30px auto",
          width: "100%",
          boxSizing: "border-box",
          alignItems: "flex-start",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            display: "flex",
            width: "100%",
            gap: "3rem",
            alignItems: "flex-start",
          }}
        >
          <div style={{ flex: 1 }}>
            <h1
              style={{
                fontWeight: "bold",
                fontSize: "2rem",
                marginBottom: "1.2rem",
              }}
            >
              Mentorship
            </h1>
            <h2
              style={{
                fontWeight: "bold",
                fontSize: "1.5rem",
                marginBottom: "1.2rem",
              }}
            >
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
                background: "#27ae60",
                color: "#fff",
                border: "none",
                borderRadius: 8,
                padding: "10px 32px",
                fontWeight: 600,
                fontSize: "16.5px",
                cursor: "pointer",
                fontFamily: "Poppins, sans-serif",
                marginTop: "auto",
                transition: "background 0.18s",
                outline: "none",
                boxShadow: "none",
              }}
              onMouseEnter={(e) => {
                e.target.style.background = "#219150";
              }}
              onMouseLeave={(e) => {
                e.target.style.background = "#27ae60";
              }}
              onFocus={(e) => {
                e.target.style.outline = "none";
                e.target.style.boxShadow = "none";
              }}
              onBlur={(e) => {
                e.target.style.outline = "none";
                e.target.style.boxShadow = "none";
              }}
              onClick={() => setShowForm(true)}
            >
              Daftar
            </button>
          </div>
          <img
            src={mentorship.image}
            alt={mentorship.title}
            style={{
              width: 320,
              height: 260,
              objectFit: "cover",
              borderRadius: 16,
              marginTop: 18,
            }}
          />
        </div>
        {showForm && (
          <form
            onSubmit={handleSubmit}
            style={{
              marginTop: "2.5rem",
              fontFamily: "Poppins, sans-serif",
              width: "100%",
              maxWidth: "none",
              marginLeft: 0,
              marginRight: 0,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: 20,
              }}
            >
              <span style={{ fontSize: 22, marginRight: 8 }}>📝</span>
              <span style={{ fontWeight: 600, fontSize: 20 }}>Pendaftaran</span>
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "minmax(0,1fr) minmax(0,1fr) minmax(0,1fr)",
                gap: 40,
                width: "100%",
                marginBottom: 18,
              }}
            >
              <div style={{ display: "flex", flexDirection: "column" }}>
                <label
                  style={{ fontWeight: 500, fontSize: 14, marginBottom: 5 }}
                >
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  style={{
                    width: "100%",
                    height: 44,
                    borderRadius: 10,
                    fontSize: 16,
                    padding: "0 13px",
                    border: "1.5px solid #bbb",
                    boxSizing: "border-box",
                    overflow: "visible",
                    textOverflow: "clip",
                    outline: "none",
                  }}
                  onFocus={(e) =>
                    (e.target.style.border = "1.5px solid #27ae60")
                  }
                  onBlur={(e) => (e.target.style.border = "1.5px solid #bbb")}
                  required
                />
              </div>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <label
                  style={{ fontWeight: 500, fontSize: 14, marginBottom: 5 }}
                >
                  Phone Number
                </label>
                <input
                  type="text"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="Enter your phone number"
                  style={{
                    width: "100%",
                    height: 44,
                    borderRadius: 10,
                    fontSize: 16,
                    padding: "0 13px",
                    border: "1.5px solid #bbb",
                    boxSizing: "border-box",
                    overflow: "visible",
                    textOverflow: "clip",
                    outline: "none",
                  }}
                  onFocus={(e) =>
                    (e.target.style.border = "1.5px solid #27ae60")
                  }
                  onBlur={(e) => (e.target.style.border = "1.5px solid #bbb")}
                  required
                />
              </div>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <label
                  style={{ fontWeight: 500, fontSize: 14, marginBottom: 5 }}
                >
                  Occupation
                </label>
                <Select
                  value={form.occupation}
                  onChange={(value) => setForm({ ...form, occupation: value })}
                  placeholder="Select your occupation"
                  style={{ width: "100%", height: 44, fontSize: 16 }}
                  size="large"
                  options={[
                    { value: "Pelajar", label: "Pelajar" },
                    { value: "Mahasiswa", label: "Mahasiswa" },
                    { value: "Pekerja", label: "Pekerja" },
                    { value: "Lainnya", label: "Lainnya" },
                  ]}
                  allowClear
                  required
                />
              </div>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <label
                  style={{ fontWeight: 500, fontSize: 14, marginBottom: 5 }}
                >
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  style={{
                    width: "100%",
                    height: 44,
                    borderRadius: 10,
                    fontSize: 16,
                    padding: "0 13px",
                    border: "1.5px solid #bbb",
                    boxSizing: "border-box",
                    overflow: "visible",
                    textOverflow: "clip",
                    outline: "none",
                  }}
                  onFocus={(e) =>
                    (e.target.style.border = "1.5px solid #27ae60")
                  }
                  onBlur={(e) => (e.target.style.border = "1.5px solid #bbb")}
                  required
                />
              </div>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <label
                  style={{ fontWeight: 500, fontSize: 14, marginBottom: 5 }}
                >
                  Address
                </label>
                <input
                  type="text"
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  placeholder="Enter your address"
                  style={{
                    width: "100%",
                    height: 44,
                    borderRadius: 10,
                    fontSize: 16,
                    padding: "0 13px",
                    border: "1.5px solid #bbb",
                    boxSizing: "border-box",
                    overflow: "visible",
                    textOverflow: "clip",
                    outline: "none",
                  }}
                  onFocus={(e) =>
                    (e.target.style.border = "1.5px solid #27ae60")
                  }
                  onBlur={(e) => (e.target.style.border = "1.5px solid #bbb")}
                  required
                />
              </div>
            </div>
            <div
              style={{ display: "flex", justifyContent: "flex-end", gap: 16 }}
            >
              <button
                type="button"
                onClick={handleCancel}
                style={{
                  background: "#fff",
                  color: "#888",
                  border: "none",
                  fontWeight: 500,
                  fontSize: 15,
                  cursor: "pointer",
                  marginRight: 8,
                  outline: "none",
                  boxShadow: "none",
                }}
                onFocus={(e) => {
                  e.target.style.outline = "none";
                  e.target.style.boxShadow = "none";
                }}
                onBlur={(e) => {
                  e.target.style.outline = "none";
                  e.target.style.boxShadow = "none";
                }}
              >
                Cancel
              </button>
              <button
                type="submit"
                style={{
                  background: "#27ae60",
                  color: "#fff",
                  border: "none",
                  borderRadius: 8,
                  padding: "8px 24px",
                  fontWeight: 600,
                  fontSize: "15.5px",
                  cursor: "pointer",
                  fontFamily: "Poppins, sans-serif",
                  transition: "background 0.18s",
                  outline: "none",
                  boxShadow: "none",
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = "#219150";
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = "#27ae60";
                }}
                onFocus={(e) => {
                  e.target.style.outline = "none";
                  e.target.style.boxShadow = "none";
                }}
                onBlur={(e) => {
                  e.target.style.outline = "none";
                  e.target.style.boxShadow = "none";
                }}
              >
                Submit
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
