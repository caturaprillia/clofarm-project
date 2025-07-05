import React from "react";

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
  },
  onboardLeft: {
    flex: "1 1 0",
    background: "#fff",
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "center",
    paddingTop: "100px",
    paddingLeft: "60px",
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
    padding: "90px 7vw 0 7vw",
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
    fontSize: "1.1rem",
    color: "#222",
    marginTop: "1.5rem",
    maxWidth: "500px",
    lineHeight: 1.6,
  },
  aboutImg: {
    width: 500,
    height: 500,
    objectFit: "contain",
    flex: "0 0 300px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
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
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    gap: "28px",
    margin: "0 0 24px 0",
    width: "100%",
    maxWidth: "1200px",
    flexWrap: "wrap",
    boxSizing: "border-box",
  },
  card: {
    background: "#fff",
    borderRadius: 12,
    boxShadow: "0 2px 8px 0 rgba(0,0,0,0.07)",
    overflow: "hidden",
    width: 272,
    minHeight: 270,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    position: "relative",
    transition: "transform 0.2s, box-shadow 0.2s",
    cursor: "pointer",
  },
  cardHover: {
    transform: "translateY(-8px) scale(1.03)",
    boxShadow: "0 8px 24px 0 rgba(50,169,96,0.13)",
  },
  image: {
    width: "100%",
    height: 140,
    objectFit: "cover",
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  title: {
    fontWeight: 600,
    fontSize: 18,
    color: "#222e3a",
    margin: "16px 0 8px 16px",
    textAlign: "left",
  },
  desc: {
    fontSize: 14,
    color: "#444",
    margin: "0 16px 16px 16px",
    textAlign: "left",
    minHeight: 40,
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    // background: "rgba(39,174,96,0.92)",
    color: "#fff",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    opacity: 0,
    transition: "opacity 0.2s",
    borderRadius: 12,
    zIndex: 2,
    padding: 20,
    textAlign: "center",
  },
  overlayShow: {
    opacity: 1,
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
    img: "/src/assets/images/dumpict.jpg",
    title: "Home",
    desc: "Smart farming platform for everyone.",
    overlay: "Explore more about Clofarm!",
  },
  {
    img: "/src/assets/images/dumpict.jpg",
    title: "Agrotourism",
    desc: "Connect with farmers and experts.",
    overlay: "Join the community!",
  },
  {
    img: "/src/assets/images/dumpict.jpg",
    title: "Mentorship",
    desc: "Learn with interactive tutorials.",
    overlay: "Start learning now!",
  },
  {
    img: "/src/assets/images/dumpict.jpg",
    title: "Tutorial",
    desc: "Agrotourism and more.",
    overlay: "Discover agrotourism!",
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
      <div style={featureCardStyles.title}>
        <b>{title}</b>
      </div>
      <div style={featureCardStyles.desc}>{desc}</div>
    </div>
  );
}

const navMenus = [
  { label: "Home", href: "#hero" },
  { label: "About Us", href: "#about" },
  { label: "Features", href: "#features" },
];

function Navbar() {
  const [hovered, setHovered] = React.useState(null);
  const [active, setActive] = React.useState("Home");
  const [loginHover, setLoginHover] = React.useState(false);

  // Update active menu on hash change (for anchor navigation)
  React.useEffect(() => {
    const onHashChange = () => {
      const hash = window.location.hash || "#hero";
      const found = navMenus.find((m) => m.href === hash);
      setActive(found ? found.label : "Home");
    };
    window.addEventListener("hashchange", onHashChange);
    onHashChange();
    return () => window.removeEventListener("hashchange", onHashChange);
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
        <div style={styles.aboutContainer}>
          <div style={styles.aboutText}>
            <h2 style={styles.aboutTitle}>About Us</h2>
            {/* <h3 style={styles.aboutBrand}>Clofarm</h3> */}
            <p style={styles.aboutDesc}>
              CloFarm is a smart farming platform that connects farmers and
              agricultural enthusiasts through innovation and collaboration.
              With features like Community, Agrotourism, Mentorship, Tutorials,
              and Articles, CloFarm supports users in learning, growing, and
              sharing knowledge. Its simple and user-friendly interface makes it
              easy to explore agricultural insights and build meaningful
              connections in the farming world.
            </p>
          </div>
          <img
            src="/src/assets/images/ilustrasi.png" // GANTI DI SINI
            alt="Clofarm Logo"
            style={styles.aboutImg}
          />
        </div>
      </section>

      {/* Section 3 */}
      <section id="features" style={styles.section3}>
        <div style={styles.section3Container}>
          <h2 style={styles.section3Title}>Features</h2>
          <div style={featureCardStyles.container}>
            {featureData.slice(0, 4).map((item, idx) => (
              <FeatureCard key={idx} {...item} />
            ))}
          </div>
          <div style={featureCardStyles.pagination}>
            <div
              style={{
                ...featureCardStyles.dot,
                ...featureCardStyles.dotActive,
              }}
            />
            <div style={featureCardStyles.dot} />
          </div>
        </div>
      </section>
    </>
  );
}

export default OnBoarding;
