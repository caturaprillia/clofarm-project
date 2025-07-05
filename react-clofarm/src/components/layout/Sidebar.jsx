// Nama file: Sidebar.jsx

import React from "react";
import { Menu } from "antd";
import { NavLink, useLocation } from "react-router-dom";
import {
  HomeOutlined,
  TeamOutlined,
  EnvironmentOutlined,
  UserSwitchOutlined,
  ReadOutlined,
  FileTextOutlined,
} from "@ant-design/icons";
import Logo from "../../assets/images/Logo.png";

// CSS Sidebar sesuai gambar referensi
const SidebarStyles = `
  .sidebar-container {
    position: fixed;
    left: 0;
    top: 0;
    height: 100vh;
    width: 280px;
    background: #fff;
    min-height: 100vh;
    border-right: 1px solid #e5e7eb;
    padding: 12px 0;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    flex-grow: 0;
    z-index: 100;
  }
  .sidebar-logo {
    width: 120px;
    height: 120px;
    margin-bottom: 12px;
    flex-shrink: 0;
  }
  .sidebar-menu.ant-menu {
    width: 100%;
    border-right: none !important;
    background: transparent !important;
    padding: 0 20px;
    box-sizing: border-box;
  }
  .sidebar-menu .ant-menu-item {
    height: 52px;
    padding: 0 !important;
    margin-bottom: 12px !important;
    border-radius: 10px;
    display: flex;
    align-items: center;
    background: #fff !important;
    box-shadow: none;
    border: none;
    cursor: pointer;
    transition: box-shadow 0.18s, color 0.18s, background 0.18s;
  }
  .sidebar-menu .ant-menu-item a {
    display: flex;
    align-items: center;
    width: 100%;
    height: 100%;
    text-decoration: none;
    padding-left: 12px;
    box-sizing: border-box;
  }
  .sidebar-icon-wrapper {
    width: 34px;
    height: 34px;
    background-color: #fff;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 16px;
    box-shadow: 0 2px 6px #e0e0e0;
    transition: background 0.18s, color 0.18s, box-shadow 0.18s;
  }
  .sidebar-icon-wrapper .anticon {
    font-size: 18px;
    color: #47C069; /* hijau muda */
    transition: color 0.18s;
  }
  .sidebar-label {
    font-weight: 600;
    font-size: 16px;
    color: #222;
    transition: color 0.18s;
  }
  /* --- Hover & Aktif --- */
  .sidebar-menu .ant-menu-item-selected,
  .sidebar-menu .ant-menu-item:not(.ant-menu-item-selected):hover {
    background: #fff !important;
    box-shadow: 0 4px 16px #b7f5df;
  }
  .sidebar-menu .ant-menu-item-selected a .sidebar-label,
  .sidebar-menu .ant-menu-item:not(.ant-menu-item-selected):hover a .sidebar-label {
    color: #47C069 !important;
  }
  .sidebar-menu .ant-menu-item-selected .sidebar-icon-wrapper,
  .sidebar-menu .ant-menu-item:not(.ant-menu-item-selected):hover .sidebar-icon-wrapper {
    background: #219150 !important;
    color: #fff !important;
    box-shadow: 0 4px 16px #b7f5df;
  }
  .sidebar-menu .ant-menu-item-selected .sidebar-icon-wrapper .anticon,
  .sidebar-menu .ant-menu-item:not(.ant-menu-item-selected):hover .sidebar-icon-wrapper .anticon {
    color: #fff !important;
  }
`;

const menuItems = [
  {
    key: "/home",
    label: (
      <NavLink to="/home">
        <span className="sidebar-icon-wrapper">
          <HomeOutlined />
        </span>
        <span className="sidebar-label">Home</span>
      </NavLink>
    ),
  },
  {
    key: "/community",
    label: (
      <NavLink to="/community">
        <span className="sidebar-icon-wrapper">
          <TeamOutlined />
        </span>
        <span className="sidebar-label">Community</span>
      </NavLink>
    ),
  },
  {
    key: "/agrotourism",
    label: (
      <NavLink to="/agrotourism">
        <span className="sidebar-icon-wrapper">
          <EnvironmentOutlined />
        </span>
        <span className="sidebar-label">Agrotourism</span>
      </NavLink>
    ),
  },
  {
    key: "/mentorship",
    label: (
      <NavLink to="/mentorship">
        <span className="sidebar-icon-wrapper">
          <UserSwitchOutlined />
        </span>
        <span className="sidebar-label">Mentorship</span>
      </NavLink>
    ),
  },
  {
    key: "/tutorial",
    label: (
      <NavLink to="/tutorial">
        <span className="sidebar-icon-wrapper">
          <ReadOutlined />
        </span>
        <span className="sidebar-label">Tutorial</span>
      </NavLink>
    ),
  },
  {
    key: "/article",
    label: (
      <NavLink to="/article">
        <span className="sidebar-icon-wrapper">
          <FileTextOutlined />
        </span>
        <span className="sidebar-label">Article</span>
      </NavLink>
    ),
  },
];

function Sidebar() {
  const location = useLocation();
  const selectedKey = "/" + location.pathname.split("/")[1];

  return (
    <>
      <style>{SidebarStyles}</style>
      <aside className="sidebar-container">
        <img
          src={Logo}
          alt="Logo"
          className="sidebar-logo"
          style={{ objectFit: "contain" }}
        />
        <Menu
          theme="light"
          mode="inline"
          items={menuItems}
          selectedKeys={[selectedKey]}
          className="sidebar-menu"
        />
      </aside>
    </>
  );
}

export default Sidebar;
