import React from "react";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";

const navbarStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "64px",
  background: "#fff",
  boxShadow: "0 2px 8px 0 rgba(0,0,0,0.05)",
  display: "flex",
  alignItems: "center",
  zIndex: 100,
};

const navbarContainer = {
  width: "100%",
  maxWidth: "1200px",
  margin: "0 auto",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "0 32px",
};

const logoStyle = {
  display: "flex",
  alignItems: "center",
  fontWeight: 700,
  fontSize: "1.6rem",
  color: "#222e3a",
  textDecoration: "none",
  fontFamily: "Poppins, sans-serif",
};

const menuStyle = {
  display: "flex",
  alignItems: "center",
  gap: "20px",
};

const menuLinkStyle = {
  color: "#222e3a",
  textDecoration: "none",
  fontWeight: 500,
  fontSize: "0.97rem",
  fontFamily: "Poppins, sans-serif",
  cursor: "pointer",
  padding: "4px 6px",
  borderRadius: 0,
  borderBottom: "2.5px solid transparent",
  transition: "color 0.2s, border-bottom 0.2s",
};

const menuLinkActive = {
  color: "#27ae60",
  borderBottom: "2.5px solid #27ae60",
};

const menuLinkHover = {
  color: "#27ae60",
  borderBottom: "2.5px solid #27ae60",
};

const buttonStyle = {
  background: "#32a960",
  color: "#fff",
  border: "none",
  borderRadius: 6,
  padding: "0.7rem 2rem",
  fontWeight: 600,
  fontSize: "1rem",
  cursor: "pointer",
  marginLeft: "32px",
  fontFamily: "Poppins, sans-serif",
  display: "flex",
  alignItems: "center",
  gap: "8px",
  textDecoration: "none",
  transition: "background 0.2s, box-shadow 0.2s",
};

const buttonHoverStyle = {
  background: "#219150",
  boxShadow: "0 2px 12px 0 rgba(50,169,96,0.15)",
};

const styles = {
  onboardContainer: {
    display: "flex",
    flexDirection: "row",
    width: "100vw",
    minHeight: "100vh",
    background: "#f5f7fa",
    paddingTop: "64px",
    boxSizing: "border-box",
    paddingBottom: 0,
  },
  onboardLeft: {
    flex: "1 1 0",
    background: "#fff",
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "center",
    paddingTop: "120px",
    paddingLeft: "24px",
  },
  onboardImg: {
    position: "relative",
    zIndex: 2,
    maxWidth: "90%",
    maxHeight: "70vh",
    objectFit: "contain",
    marginLeft: 0,
  },
  onboardRight: {
    flex: "1 1 0",
    background: "#fff",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    padding: "120px 3vw 0 3vw",
  },
  onboardTitle: {
    fontSize: "2.7rem",
    fontWeight: 700,
    color: "#222e3a",
    marginBottom: "1.5rem",
    fontFamily: "Poppins, sans-serif",
    lineHeight: 1.1,
  },
  onboardDesc: {
    fontSize: "1.1rem",
    color: "#444",
    marginBottom: "2.2rem",
    maxWidth: "32rem",
    lineHeight: 1.6,
  },
  onboardBtn: {
    background: "#32a960",
    color: "#fff",
    fontSize: "1.1rem",
    fontWeight: 600,
    border: "none",
    borderRadius: 8,
    padding: "0.9rem 2.2rem",
    cursor: "pointer",
    transition: "background 0.2s, box-shadow 0.2s",
    outline: "none",
    boxShadow: "none",
    textDecoration: "none",
    marginTop: "16px",
  },
  // About Us Section
  aboutSection: {
    width: "100%",
    background: "#F4EEE7", // ubah dari #fff ke #F4EEE7
    padding: "64px 0",
    borderTop: "1px solid #e0e0e0",
  },
  aboutContainer: {
    maxWidth: "1200px",
    margin: "0 auto",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "40px",
    padding: "0 40px",
    flexWrap: "wrap",
    minHeight: "350px",
  },
  aboutText: {
    flex: "1 1 550px",
    minWidth: "350px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
  },
  aboutTitle: {
    fontSize: "2rem",
    fontWeight: 700,
    marginBottom: "0.5rem",
    paddingTop: 0,
    marginTop: 0,
    color: "#222e3a",
    fontFamily: "Poppins, sans-serif",
  },
  aboutBrand: {
    fontSize: "2.5rem",
    fontWeight: 700,
    color: "#32a960",
    margin: 0,
    fontFamily: "Poppins, sans-serif",
  },
  aboutBrandImg: {
    width: 120,
    height: 120,
    objectFit: "contain",
    margin: "16px 0 0 0",
    display: "block",
  },
  aboutDesc: {
    fontSize: "1.35rem",
    color: "#222",
    marginTop: "1.5rem",
    maxWidth: "500px",
    lineHeight: 1.6,
  },
  aboutImg: {
    position: "relative",
    width: 360,
    height: 360,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flex: "0 0 300px",
  },
  // Section 3
  section3: {
    width: "100%",
    background: "#32A960",
    minHeight: "300px",
    padding: "24px 0 64px 0",
    scrollMarginTop: "100px",
  },
  section3Container: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "0 10px",
    boxSizing: "border-box",
  },
  section3Title: {
    fontSize: "2rem",
    fontWeight: 700,
    color: "#222",
    fontFamily: "Poppins, sans-serif",
    marginBottom: "24px",
  },
  section3Desc: {
    fontSize: "1.1rem",
    color: "#222",
    marginTop: "1.5rem",
    maxWidth: "600px",
    lineHeight: 1.6,
  },
};

// Tambahkan style untuk fitur card
const featureCardStyles = {
  container: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "25px",
    width: "100%",
    maxWidth: "1200px",
    margin: "0 auto",
    justifyItems: "center",
    alignItems: "stretch",
    padding: "24px 0 0 0",
    marginBottom: 0,
  },
  card: {
    background: "#fff",
    border: "1px solid #e5e7eb",
    borderRadius: "12px",
    boxShadow: "0 1px 3px 0 rgba(0,0,0,0.05)",
    width: "100%",
    padding: 0,
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
    fontFamily: "Poppins, sans-serif",
    transition: "box-shadow 0.18s, transform 0.18s",
    cursor: "pointer",
  },
  cardHover: {
    boxShadow: "0 4px 16px rgba(76,175,80,0.15)",
    transform: "translateY(-4px)",
  },
  image: {
    width: "100%",
    height: 190,
    objectFit: "cover",
    borderTopLeftRadius: "12px",
    borderTopRightRadius: "12px",
    marginBottom: 0,
  },
  content: {
    padding: "15px",
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  title: {
    fontWeight: 600,
    fontSize: "19px",
    marginBottom: "8px",
    color: "#111827",
    fontFamily: "Poppins, sans-serif",
  },
  desc: {
    color: "#6b7280",
    fontSize: "16px",
    marginBottom: "18px",
    fontFamily: "Poppins, sans-serif",
    lineHeight: 1.5,
  },
  button: {
    background: "#27ae60",
    color: "#fff",
    border: "none",
    borderRadius: 8,
    padding: "10px 0",
    fontWeight: 600,
    fontSize: "16.5px",
    cursor: "pointer",
    width: "100%",
    fontFamily: "Poppins, sans-serif",
    marginTop: "auto",
    transition: "background 0.18s",
  },
  buttonHover: {
    background: "#219150",
  },
  pagination: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    marginTop: 10,
  },
};

const featureData = [
  {
    img: "/src/assets/images/community.jpeg",
    title: "Community",
    desc: "A space for farmers and agriculture enthusiasts to share experiences, discuss ideas, and build connections.",
  },
  {
    img: "/src/assets/images/agrotourism.jpeg",
    title: "Agrotourism",
    desc: "Provides information and promotion of farm-based tourism to introduce agricultural life to the public.",
  },
  {
    img: "/src/assets/images/mentorship.jpg",
    title: "Mentorship",
    desc: "Offers guidance from agricultural experts to help users improve their skills and knowledge.",
  },
  {
    img: "/src/assets/images/tutorial.jpeg",
    title: "Tutorial",
    desc: "Step-by-step guides on modern farming techniques that are easy to follow.",
  },
  {
    img: "/src/assets/images/article.jpeg",
    title: "Articles",
    desc: "A collection of informative articles on trends, technologies, and tips in the agricultural world.",
  },
];

function FeatureCard({ img, title, desc, overlay }) {
  const [hover, setHover] = React.useState(false);
  return (
    <div
      style={{
        ...featureCardStyles.card,
        ...(hover ? featureCardStyles.cardHover : {}),
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <img src={img} alt={title} style={featureCardStyles.image} />
      <div style={featureCardStyles.content}>
        <div style={featureCardStyles.title}>{title}</div>
        <div style={featureCardStyles.desc}>{desc}</div>
      </div>
    </div>
  );
}

const navMenus = [
  { label: "Home", href: "#hero" },
  { label: "About Us", href: "#about" },
];

function Navbar() {
  const [hovered, setHovered] = React.useState(null);
  const [active, setActive] = React.useState("Home");
  const [loginHover, setLoginHover] = React.useState(false);

  // Scroll spy: update active menu on scroll
  React.useEffect(() => {
    const handleScroll = () => {
      const sections = [
        { label: "Home", id: "hero" },
        { label: "About Us", id: "about" },
      ];
      const offset = 64; // tinggi navbar
      let found = "Home";
      let minTop = Number.POSITIVE_INFINITY;
      for (let i = 0; i < sections.length; i++) {
        const el = document.getElementById(sections[i].id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top - offset <= 0 && Math.abs(rect.top - offset) < minTop) {
            found = sections[i].label;
            minTop = Math.abs(rect.top - offset);
          }
        }
      }
      setActive(found);
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav style={navbarStyle}>
      <div style={navbarContainer}>
        <a href="#hero" style={logoStyle}>
          <img
            src="/src/assets/images/Logo.jpg"
            alt="Clofarm"
            style={{ height: 50, marginRight: 10 }}
          />
        </a>
        <div style={menuStyle}>
          {navMenus.map((item, idx) => (
            <a
              key={item.label}
              href={item.href}
              style={{
                ...menuLinkStyle,
                ...(active === item.label ? menuLinkActive : {}),
                ...(hovered === idx && active !== item.label
                  ? menuLinkHover
                  : {}),
              }}
              onMouseEnter={() => setHovered(idx)}
              onMouseLeave={() => setHovered(null)}
              onClick={() => setActive(item.label)}
            >
              {item.label}
            </a>
          ))}
          <a
            href="/login"
            style={{
              ...buttonStyle,
              ...(loginHover ? buttonHoverStyle : {}),
            }}
            onMouseEnter={() => setLoginHover(true)}
            onMouseLeave={() => setLoginHover(false)}
          >
            Login
          </a>
        </div>
      </div>
    </nav>
  );
}

function OnBoarding() {
  const [hover, setHover] = React.useState(false);
  const [featurePage, setFeaturePage] = React.useState(0); // 0: first 4, 1: Articles
  const cardsPerPage = 4;
  const totalPages = Math.ceil(featureData.length / cardsPerPage);

  const pagedFeatures = [];
  for (let i = 0; i < totalPages; i++) {
    pagedFeatures.push(
      featureData.slice(i * cardsPerPage, (i + 1) * cardsPerPage)
    );
  }

  return (
    <>
      {/* Navbar */}
      <Navbar />

      {/* Hero / OnBoarding Section */}
      <div style={styles.onboardContainer} id="hero">
        <div style={styles.onboardLeft}>
          <img
            src="/src/assets/images/onBoarding.jpg"
            alt="onBoard"
            title="onBoard"
            style={styles.onboardImg}
          />
        </div>
        <div style={styles.onboardRight}>
          <h1 style={styles.onboardTitle}>
            Grow Smarter: One Platform for Every Farming Journey
          </h1>
          <p style={styles.onboardDesc}>
            Discover a world where farming meets innovation. Join a thriving
            Community of farmers and enthusiasts, explore nature and culture
            through Agrotourism, get guided support with personalized
            Mentorship, master new skills with hands-on Tutorials, and stay
            informed with insightful Articles. Everything you need to grow,
            connect, and succeed right at your fingertips.
          </p>
          <a
            href="/login"
            style={{
              ...styles.onboardBtn,
              background: hover ? "#219150" : "#32a960",
              boxShadow: hover ? "0 2px 12px 0 rgba(50,169,96,0.15)" : "none",
            }}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
          >
            Get Started
          </a>
        </div>
      </div>

      {/* About Us Section */}
      <section id="about" style={styles.aboutSection}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            maxWidth: "1200px",
            margin: "0 auto",
            gap: "40px",
            padding: "0 40px",
            flexWrap: "wrap",
          }}
        >
          <div style={styles.aboutText}>
            <h2 style={styles.aboutTitle}>About Us</h2>
            <p style={styles.aboutDesc}>
              CloFarm is a smart farming platform that connects farmers and
              agricultural enthusiasts through innovation. With features like
              Community, Agrotourism, and Mentorship, it helps users learn,
              grow, and share knowledge in a simple, user-friendly way.
            </p>
          </div>
          <div
            style={{
              position: "relative",
              width: 340,
              height: 340,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img
              src="/src/assets/images/ilustrasi.png"
              alt="Clofarm Circle Large"
              style={{
                width: 320,
                height: 320,
                borderRadius: "50%",
                objectFit: "cover",
                boxShadow: "0 4px 20px 0 rgba(0,0,0,0.13)",
                position: "absolute",
                left: 0,
                top: 0,
                zIndex: 1,
              }}
            />
            <img
              src="/src/assets/images/ilustrasi2.jpeg"
              alt="Clofarm Circle Small"
              style={{
                width: 135,
                height: 135,
                borderRadius: "50%",
                objectFit: "cover",
                boxShadow: "0 2px 8px 0 rgba(0,0,0,0.13)",
                position: "absolute",
                left: -20,
                top: 200,
                zIndex: 2,
                border: "6px solid #fff",
              }}
            />
          </div>
        </div>
        <div
          style={{
            maxWidth: "1200px",
            margin: "48px auto 0 auto",
            padding: "0 40px 0 40px",
          }}
          id="features"
        >
          <h2 style={styles.section3Title}>Features Clofarm</h2>
          <div style={featureCardStyles.container}>
            {pagedFeatures[featurePage].map((item, idx) => (
              <FeatureCard key={idx} {...item} />
            ))}
            {/* Jika halaman terakhir kurang dari 4 card, tambahkan card kosong */}
            {pagedFeatures[featurePage].length < cardsPerPage &&
              Array(cardsPerPage - pagedFeatures[featurePage].length)
                .fill(null)
                .map((_, idx) => (
                  <div
                    key={"empty-" + idx}
                    style={{ background: "transparent" }}
                  />
                ))}
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: 16,
              marginTop: 16,
            }}
          >
            <button
              onClick={() => setFeaturePage(featurePage - 1)}
              disabled={featurePage === 0}
              style={{
                border: "none",
                background: "transparent",
                cursor: featurePage === 0 ? "not-allowed" : "pointer",
                fontSize: 24,
                padding: 8,
                opacity: featurePage === 0 ? 0.4 : 1,
              }}
            >
              <LeftOutlined />
            </button>
            <button
              onClick={() => setFeaturePage(featurePage + 1)}
              disabled={featurePage === totalPages - 1}
              style={{
                border: "none",
                background: "transparent",
                cursor:
                  featurePage === totalPages - 1 ? "not-allowed" : "pointer",
                fontSize: 24,
                padding: 8,
                opacity: featurePage === totalPages - 1 ? 0.4 : 1,
              }}
            >
              <RightOutlined />
            </button>
          </div>
        </div>
      </section>
    </>
  );
}

export default OnBoarding;
