import React from "react";
import { Dropdown, Menu, Avatar, Typography, Divider } from "antd";
import {
  UserOutlined,
  SettingOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { useUser } from '../UserContext';

const { Text } = Typography;

const ProfileDropdown = () => {
  const { user } = useUser();

  const menu = (
    <Menu style={{ width: 240, padding: 0, borderRadius: 12 }}>
      <Menu.Item
        key="profile"
        disabled
        style={{
          cursor: "default",
          padding: 16,
          background: "#fff",
          borderRadius: "12px 12px 0 0",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <Avatar size={48} src={user?.photo_url} icon={<UserOutlined />} />
          <div style={{ flex: 1 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <Text strong style={{ fontSize: 16 }}>
                {user?.name || "User"}
              </Text>
            </div>
            <div style={{ fontSize: 13, color: "#888" }}>
              @{user?.username || "-"}
            </div>
          </div>
        </div>
      </Menu.Item>
      <Divider style={{ margin: 0 }} />
      <Menu.Item
        key="settings"
        icon={<SettingOutlined />}
        style={{ fontWeight: 500, fontSize: 15, padding: "12px 24px" }}
      >
        <a
          href="/profile"
          style={{ color: "#222", transition: "color 0.2s" }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#32a960")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "#222")}
        >
          Profile Settings
        </a>
      </Menu.Item>
      <Divider style={{ margin: 0 }} />
      <Menu.Item
        key="signout"
        icon={<LogoutOutlined style={{ color: "#dc2626", fontSize: 18 }} />}
        style={{ color: "#dc2626", fontWeight: 500, fontSize: 15, padding: "12px 24px" }}
        onClick={() => {
          localStorage.removeItem('token');
          window.location.href = '/';
        }}
      >
        Sign Out
      </Menu.Item>
    </Menu>
  );

  return (
    <Dropdown overlay={menu} placement="bottomRight" trigger={["click"]}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          cursor: "pointer",
          padding: "8px 12px",
          borderRadius: 8,
          transition: "background-color 0.2s ease",
        }}
      >
        <Avatar size={32} src={user?.photo_url} icon={<UserOutlined />} />
        <span style={{ fontSize: 14, fontWeight: 500, color: "#333" }}>
          {user?.name || "User"}
        </span>
      </div>
    </Dropdown>
  );
};

export default ProfileDropdown;
