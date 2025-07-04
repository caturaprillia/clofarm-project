import React, { useState } from "react";
import {
  HomeOutlined,
  TeamOutlined,
  EnvironmentOutlined,
  SolutionOutlined,
  BookOutlined,
  FileTextOutlined,
} from "@ant-design/icons";
import "./Sidebar.css";

const menuItems = [
  { label: "Home", icon: <HomeOutlined /> },
  { label: "Community", icon: <TeamOutlined /> },
  { label: "Agrotourism", icon: <EnvironmentOutlined /> },
  { label: "Mentorship", icon: <SolutionOutlined /> },
  { label: "Tutorial", icon: <BookOutlined /> },
  { label: "Article", icon: <FileTextOutlined /> },
];

function Sidebar() {
  const [active, setActive] = useState(4); // Tutorial as default active
  return (
    <div className="sidebar-nav">
      {menuItems.map((item, idx) => (
        <button
          key={item.label}
          className={`sidebar-btn${active === idx ? " active" : ""}`}
          onClick={() => setActive(idx)}
        >
          <span className="sidebar-icon">{item.icon}</span>
          <span className="sidebar-label">{item.label}</span>
        </button>
      ))}
    </div>
  );
}

export default Sidebar;
