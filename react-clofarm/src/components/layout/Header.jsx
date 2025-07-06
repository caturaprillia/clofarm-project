import React from "react";
import ProfileDropdown from "./ProfileDropdown";

const styles = {
  pageHeader: {
    position: "fixed",
    top: 0,
    left: 280,
    right: 0,
    zIndex: 101,
    width: "calc(100% - 280px)",
    height: 35,
    padding: "15px 40px",
    background: "white",
    borderBottom: "0.2px solid #e5e7eb",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexShrink: 0,
    fontFamily: "Poppins, sans-serif",
  },
  headerButton: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    background: "#f9fafb",
    border: "1px solid #d1d5db",
    borderRadius: 8,
    padding: "8px 16px",
    fontSize: 15,
    fontWeight: 500,
    color: "#374151",
    cursor: "pointer",
  },
  headerRight: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
    marginRight: "105px",
  },
  headerLeft: {
    flex: 2,
  },
};

const Header = () => {
  // Sample user data - replace with actual user data from your auth system
  const user = {
    name: "Eka",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    points: 2055,
    certificates: 0,
    profileProgress: 54,
  };

  return (
    <header style={styles.pageHeader}>
      {/* Left side - empty space */}
      <div style={styles.headerLeft}></div>
      {/* Right side - ProfileDropdown only */}
      <div style={styles.headerRight}>
        <ProfileDropdown user={user} />
      </div>
    </header>
  );
};

export default Header;
