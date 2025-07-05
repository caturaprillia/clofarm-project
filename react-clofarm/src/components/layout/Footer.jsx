import React from "react";

const styles = {
  pageFooter: {
    padding: "15px 0",
    textAlign: "center",
    color: "#6b7280",
    fontSize: 14,
    background: "white",
    borderTop: "0.2px solid #e5e7eb",
    flexShrink: 0,
    fontFamily: "Poppins, sans-serif",
    width: "calc(100% - 280px)",
    marginLeft: 280,
  },
};

const Footer = () => (
  <footer style={styles.pageFooter}>
    &copy; {new Date().getFullYear()} Clofarm. All rights reserved.
  </footer>
);

export default Footer;
