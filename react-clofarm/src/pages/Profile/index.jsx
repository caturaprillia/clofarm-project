import React, { useState } from "react";
import { UploadOutlined } from "@ant-design/icons";
import { Button, Input, Form, message } from "antd";

const Profile = () => {
  const [form] = Form.useForm();
  const [photo, setPhoto] = useState(
    "https://api.dicebear.com/7.x/adventurer-neutral/svg?seed=Eka"
  );
  const [emailVerified] = useState(true);
  const [isAllFilled, setIsAllFilled] = useState(false);

  // Default data
  const defaultValues = {
    name: "Eka Putri Jayanti",
    email: "eka.putri.jayanti@student.undiksha.ac.id",
    phone: "085858230833",
  };

  // Check if all required fields are filled
  const checkAllFilled = (changed, all) => {
    const values = { ...defaultValues, ...form.getFieldsValue(), ...all };
    const required = [values.name, values.email, values.phone];
    setIsAllFilled(required.every((v) => v && v.trim() !== ""));
  };

  const handleUpload = () => {
    message.info("Fitur upload belum diimplementasikan.");
  };

  return (
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
        Detail Profil
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
          src={photo}
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
        <Button
          icon={<UploadOutlined />}
          style={{
            background: "#1677ff",
            color: "#fff",
            fontWeight: 500,
            borderRadius: 8,
            marginBottom: 4,
          }}
          onClick={handleUpload}
        >
          Unggah Foto
        </Button>
        <a
          href="https://www.dicebear.com/"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "#1677ff", fontSize: 15, marginBottom: 2 }}
        ></a>
        <div
          style={{
            color: "#888",
            fontSize: 13,
            marginTop: 2,
            marginBottom: 8,
            textAlign: "center",
          }}
        >
          Foto profil kamu disarankan memiliki rasio 1 : 1 atau berukuran tidak
          lebih dari 2MB
        </div>
      </div>
      <Form
        form={form}
        layout="vertical"
        initialValues={defaultValues}
        onValuesChange={checkAllFilled}
        onFinish={() => message.success("Profil disimpan!")}
      >
        <Form.Item
          label={<span style={{ fontWeight: 500 }}>Nama</span>}
          name="name"
          style={{ marginBottom: 12 }}
          rules={[{ required: true, message: "Nama wajib diisi" }]}
        >
          <Input size="large" />
        </Form.Item>
        <Form.Item
          label={<span style={{ fontWeight: 500 }}>Alamat Email</span>}
          name="email"
          style={{ marginBottom: 4 }}
          rules={[
            { required: true, type: "email", message: "Masukkan email valid" },
          ]}
        >
          <Input size="large" />
        </Form.Item>
        <div
          style={{
            marginBottom: 10,
            marginTop: -2,
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          <span style={{ color: "#27ae60", fontSize: 18 }}>●</span>
          <span style={{ color: "#27ae60", fontWeight: 500, fontSize: 15 }}>
            Email Terverifikasi
          </span>
        </div>
        <Form.Item
          label={<span style={{ fontWeight: 500 }}>Nomor WhatsApp</span>}
          name="phone"
          style={{ marginBottom: 18 }}
        >
          <Input size="large" />
        </Form.Item>
        <Form.Item style={{ textAlign: "right", marginBottom: 0 }}>
          <Button
            type="primary"
            htmlType="submit"
            style={{
              background: "#27ae60",
              border: "none",
              borderRadius: 8,
              fontWeight: 600,
              fontSize: 16,
              padding: "0 32px",
              height: 40,
              transition: "background 0.2s",
            }}
            disabled={false}
          >
            Simpan
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Profile;
