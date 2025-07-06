import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import Footer from "./Footer";

const styles = {
  layout: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
    fontFamily: "Poppins, sans-serif",
    backgroundColor: "#f9fafb",
  },
  body: { display: "flex", flex: 1, width: "100%" },
  main: {
    flex: 1,
    padding: "30px 20px",
    width: "100%",
    maxWidth: "none",
    marginLeft: 280,
    marginTop: 65,
  },
};

const MainLayout = () => (
  <div style={styles.layout}>
    <Header />
    <div style={styles.body}>
      <Sidebar />
      <main style={styles.main}>
        <Outlet /> {/* Semua page fitur akan muncul di sini */}
      </main>
    </div>
    <Footer />
  </div>
);

export default MainLayout;
