import React, { useState, useEffect } from "react";
import { UploadOutlined } from "@ant-design/icons";
import { Button, Input, Form, message, Popconfirm, notification } from "antd";
import { useUser } from "../../components/UserContext";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [form] = Form.useForm();
  const { user, loading, fetchUser } = useUser();
  const [isAllFilled, setIsAllFilled] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      form.setFieldsValue({
        name: user.name,
        username: user.username,
        phone: user.phone_number || "",
        photo_url: user.photo_url || "",
      });
    }
  }, [user, form]);

  // Check if all required fields are filled
  const checkAllFilled = (changed, all) => {
    const values = { ...form.getFieldsValue(), ...all };
    const required = [
      values.name,
      values.username,
      values.phone,
      values.photo_url,
    ];
    setIsAllFilled(required.every((v) => v && v.trim() !== ""));
  };

  const handleUpload = () => {
    message.info("Fitur upload belum diimplementasikan.");
  };

  const handleFinish = () => {
    setShowConfirm(true);
  };

  const handleConfirmSave = async () => {
    try {
      const values = form.getFieldsValue();
      const token = localStorage.getItem("token");
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("phone_number", values.phone);
      formData.append("photo_url", values.photo_url);
      // username tidak bisa diubah, tidak perlu dikirim
      const res = await fetch("http://localhost:5000/auth/profile", {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });
      if (res.ok) {
        notification.success({
          message: "Profile updated successfully!",
          placement: "topRight",
        });
        setShowConfirm(false);
        fetchUser(); // refresh user context
        navigate("/profile");
      } else {
        const data = await res.json();
        notification.error({
          message: data.msg || "Failed to update profile",
          placement: "topRight",
        });
      }
    } catch (err) {
      notification.error({
        message: "Failed to update profile",
        placement: "topRight",
      });
    }
  };

  const handleCancelSave = () => {
    setShowConfirm(false);
  };

  if (loading)
    return (
      <div style={{ textAlign: "center", marginTop: 40 }}>
        Loading profile...
      </div>
    );
  if (!user)
    return (
      <div style={{ textAlign: "center", marginTop: 40 }}>User not found.</div>
    );

  return (
    <>
      <style>{`
        .profile-input input.ant-input {
          border: 1.5px solid #d9d9d9 !important;
          background: #fff !important;
          color: #222 !important;
          border-radius: 8px !important;
          font-size: 16px !important;
          padding: 10px 16px !important;
          min-height: 40px !important;
          transition: border-color 0.2s;
          box-shadow: none !important;
          outline: none !important;
          display: block !important;
        }
        .profile-input input.ant-input:focus,
        .profile-input input.ant-input:hover,
        .profile-input input.ant-input.ant-input-focused {
          border: 1.5px solid #27ae60 !important;
          outline: none !important;
          box-shadow: none !important;
        }
      `}</style>
      <div
        style={{
          maxWidth: 820,
          margin: "32px auto",
          background: "#fff",
          borderRadius: 18,
          boxShadow: "0 4px 24px 0 rgba(0,0,0,0.08)",
          padding: "36px 48px 28px 48px",
          fontFamily: "Poppins, sans-serif",
        }}
      >
        <h2 style={{ fontWeight: 700, fontSize: 24, marginBottom: 18 }}>
          Profile Details
        </h2>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginBottom: 10,
          }}
        >
          <img
            src={
              user.photo_url ||
              "https://api.dicebear.com/7.x/adventurer-neutral/svg?seed=Eka"
            }
            alt="Profile"
            style={{
              width: 80,
              height: 80,
              borderRadius: "50%",
              objectFit: "cover",
              marginBottom: 8,
              border: "2px solid #eee",
            }}
          />
          <div
            style={{
              color: "#888",
              fontSize: 13,
              marginTop: 2,
              marginBottom: 8,
              textAlign: "center",
            }}
          >
            Your profile picture is recommended to have a 1:1 ratio and be less
            than 2MB in size.
          </div>
        </div>
        <Form
          form={form}
          layout="vertical"
          onValuesChange={checkAllFilled}
          onFinish={handleFinish}
        >
          <Form.Item
            className="profile-input"
            label={<span style={{ fontWeight: 500 }}>Full Name</span>}
            name="name"
            style={{ marginBottom: 12 }}
            rules={[{ required: true, message: "Full name is required" }]}
          >
            <Input size="large" placeholder="Enter your full name" />
          </Form.Item>
          <Form.Item
            className="profile-input"
            label={<span style={{ fontWeight: 500 }}>Username</span>}
            name="username"
            style={{ marginBottom: 12 }}
          >
            <Input size="large" disabled placeholder="Your username" />
          </Form.Item>
          <Form.Item
            className="profile-input"
            label={<span style={{ fontWeight: 500 }}>Phone Number</span>}
            name="phone"
            style={{ marginBottom: 12 }}
          >
            <Input size="large" placeholder="Enter your WhatsApp number" />
          </Form.Item>
          <Form.Item
            className="profile-input"
            label={<span style={{ fontWeight: 500 }}>Image URL</span>}
            name="photo_url"
            style={{ marginBottom: 18 }}
          >
            <Input size="large" placeholder="https://your-image-url.com" />
          </Form.Item>
          <Form.Item style={{ textAlign: "right", marginBottom: 0 }}>
            <Popconfirm
              title="Are you sure you want to save your profile?"
              open={showConfirm}
              onConfirm={handleConfirmSave}
              onCancel={handleCancelSave}
              okText="Yes"
              cancelText="No"
            >
              <Button
                type="primary"
                htmlType="submit"
                style={{
                  background: isAllFilled ? "#27ae60" : "#e0e0e0",
                  color: isAllFilled ? "#fff" : "#aaa",
                  border: "none",
                  borderRadius: 8,
                  fontWeight: 600,
                  fontSize: 16,
                  padding: "0 32px",
                  height: 40,
                  transition: "background 0.2s, color 0.2s",
                  cursor: isAllFilled ? "pointer" : "not-allowed",
                }}
                disabled={!isAllFilled}
              >
                Save
              </Button>
            </Popconfirm>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default Profile;
