import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Form, Input, Select, Button, notification } from "antd";
import { useUser } from "../../components/UserContext";

export default function MentorshipDetail() {
  const { id } = useParams();
  const { user } = useUser();
  const [mentorship, setMentorship] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [showWhatsapp, setShowWhatsapp] = useState(false);
  const [form] = Form.useForm();
  const [registration, setRegistration] = useState(null);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        const [mentRes, regRes] = await Promise.all([
          fetch(`http://localhost:5000/mentorship/${id}`, { headers: { Authorization: `Bearer ${token}` } }),
          fetch("http://localhost:5000/mentorship_regist", { headers: { Authorization: `Bearer ${token}` } })
        ]);
        if (!mentRes.ok) throw new Error("Failed to fetch mentorship detail");
        const data = await mentRes.json();
        setMentorship(data);
        if (regRes.ok && user) {
          const regList = await regRes.json();
          const reg = regList.find(r => r.id_user === user.id_user && String(r.id_mentorship) === String(id));
          if (reg) {
            setRegistration(reg);
            setShowWhatsapp(true);
            setShowForm(false);
          } else {
            setRegistration(null);
            setShowWhatsapp(false);
          }
        }
      } catch (err) {
        setError(err.message);
        setMentorship(null);
      } finally {
        setLoading(false);
      }
    };
    fetchDetail();
  }, [id, user]);

  const handleCancel = () => {
    setShowForm(false);
    form.resetFields();
  };

  const handleSubmit = async (values) => {
    setSubmitting(true);
    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();
      formData.append("id_mentorship", id);
      formData.append("name", values.name);
      formData.append("email", values.email);
      formData.append("phone_number", values.phone_number);
      formData.append("address", values.address);
      formData.append("occupation", values.occupation);
      const res = await fetch("http://localhost:5000/mentorship_regist", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });
      let isJson = res.headers.get("content-type")?.includes("application/json");
      if (!res.ok) {
        let errMsg = "Failed to register";
        if (isJson) {
          const errData = await res.json();
          errMsg = errData.msg || errMsg;
        }
        notification.error({ message: "Registration Failed", description: errMsg });
        throw new Error(errMsg);
      }
      notification.success({ message: "Registration Success", description: "Registration successful! Click the WhatsApp button below to join the group." });
      setShowForm(false);
      setShowWhatsapp(true);
      form.resetFields();
    } catch (err) {
      // error notification already shown
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error || !mentorship) return <div>Error: {error || "Not found"}</div>;

  return (
    <div style={{ background: "#f9fafb", minHeight: "100vh", width: "100%" }}>
      <div
        style={{
          background: "#fff",
          borderRadius: 14,
          boxShadow: "0 4px 24px 0 rgba(0,0,0,0.08)",
          padding: "25px 30px",
          maxWidth: 1550,
          margin: "0 auto 30px auto",
          boxSizing: "border-box",
          display: "flex",
          flexDirection: "column",
          gap: 32,
        }}
      >
        {/* Atas: deskripsi dan gambar, konsisten dengan index.jsx */}
        <div style={{ display: "flex", width: "100%", gap: "3rem", alignItems: "flex-start", flexWrap: "wrap" }}>
          <div style={{ flex: 1 }}>
            <h1 style={{ fontWeight: "bold", fontSize: "2rem", marginBottom: "1.2rem" }}>Mentorship</h1>
            <h2 style={{ fontWeight: "bold", fontSize: "1.5rem", marginBottom: "1.2rem" }}>{mentorship.title}</h2>
            <div style={{ marginBottom: "2rem", fontSize: "1.1rem", color: "#444", lineHeight: 1.7, whiteSpace: "pre-line" }}>{mentorship.description}</div>
            {/* If registered, show registration data and WhatsApp button */}
            {registration ? (
              <div style={{ marginBottom: 24, background: "#f6fef8", border: "1.5px solid #22c55e", borderRadius: 10, padding: 20, maxWidth: 520 }}>
                <div style={{ fontWeight: 600, fontSize: 17, marginBottom: 10 }}>Your Registration Data</div>
                <div style={{ marginBottom: 6 }}><b>Name:</b> {registration.name}</div>
                <div style={{ marginBottom: 6 }}><b>Email:</b> {registration.email}</div>
                <div style={{ marginBottom: 6 }}><b>Phone:</b> {registration.phone_number}</div>
                <div style={{ marginBottom: 6 }}><b>Occupation:</b> {registration.occupation}</div>
                <div style={{ marginBottom: 6 }}><b>Address:</b> {registration.address}</div>
                <a
                  href={mentorship.mentorship_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "inline-block",
                    marginTop: 18,
                    background: "#27ae60",
                    color: "#fff",
                    fontWeight: 700,
                    fontSize: "1.15rem",
                    borderRadius: 8,
                    padding: "0.9rem 2.5rem",
                    textDecoration: "none",
                    boxShadow: "0 2px 8px rgba(76,175,80,0.08)",
                    letterSpacing: 0.5,
                    transition: "background 0.18s",
                    textAlign: "center"
                  }}
                >
                  Join WhatsApp Group
                </a>
              </div>
            ) : (
              <>
                {!showWhatsapp && (
                  <Button
                    type="primary"
                    style={{ background: "#27ae60", border: "none", borderRadius: 8, fontWeight: 600, fontSize: 16, padding: "10px 32px", height: 44, marginBottom: 18 }}
                    onClick={() => setShowForm((v) => !v)}
                  >
                    {showForm ? "Tutup Form" : "Register"}
                  </Button>
                )}
                {showWhatsapp && (
                  <a
                    href={mentorship.mentorship_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "inline-block",
                      marginTop: 18,
                      background: "#27ae60",
                      color: "#fff",
                      fontWeight: 700,
                      fontSize: "1.15rem",
                      borderRadius: 8,
                      padding: "0.9rem 2.5rem",
                      textDecoration: "none",
                      boxShadow: "0 2px 8px rgba(76,175,80,0.08)",
                      letterSpacing: 0.5,
                      transition: "background 0.18s",
                      textAlign: "center"
                    }}
                  >
                    Join WhatsApp Group
                  </a>
                )}
              </>
            )}
          </div>
          <img
            src={mentorship.image_url}
            alt={mentorship.title}
            style={{
              width: 320,
              height: 460,
              objectFit: "cover",
              borderRadius: 16,
              marginTop: 18,
              boxShadow: "0 2px 12px rgba(0,0,0,0.10)",
            }}
          />
        </div>
        {/* Form horizontal Ant Design */}
        {!registration && showForm && !showWhatsapp && (
          <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
            <Form
              form={form}
              layout="vertical"
              onFinish={handleSubmit}
              style={{
                width: "100%",
                maxWidth: 1100,
                background: "#fff",
                borderRadius: 12,
                padding: "32px 32px 24px 32px",
                boxShadow: "0 1px 6px 0 rgba(0,0,0,0.04)",
                display: "flex",
                flexWrap: "wrap",
                gap: 0,
              }}
            >
              <Form.Item
                name="name"
                label="Full Name"
                rules={[{ required: true, message: "Please enter your full name" }]}
                style={{ display: "inline-block", width: "24%", minWidth: 200, marginRight: "1%" }}
              >
                <Input placeholder="Enter your full name" size="large" />
              </Form.Item>
              <Form.Item
                name="phone_number"
                label="Phone Number"
                rules={[{ required: true, message: "Please enter your phone number" }]}
                style={{ display: "inline-block", width: "24%", minWidth: 200, marginRight: "1%" }}
              >
                <Input placeholder="Enter your phone number" size="large" />
              </Form.Item>
              <Form.Item
                name="occupation"
                label="Occupation"
                rules={[{ required: true, message: "Please select your occupation" }]}
                style={{ display: "inline-block", width: "24%", minWidth: 200, marginRight: "1%" }}
              >
                <Select placeholder="Select your occupation" size="large">
                  <Select.Option value="Student">Student</Select.Option>
                  <Select.Option value="Employed">Employed</Select.Option>
                  <Select.Option value="Unemployed">Unemployed</Select.Option>
                  <Select.Option value="Looking for a job">Looking for a job</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item
                name="email"
                label="Email"
                rules={[{ required: true, type: "email", message: "Please enter a valid email" }]}
                style={{ display: "inline-block", width: "24%", minWidth: 200 }}
              >
                <Input placeholder="Enter your email" size="large" />
              </Form.Item>
              <Form.Item
                name="address"
                label="Address"
                rules={[{ required: true, message: "Please enter your address" }]}
                style={{ width: "100%", marginTop: 8 }}
              >
                <Input placeholder="Enter your address" size="large" />
              </Form.Item>
              <div style={{ width: "100%", display: "flex", justifyContent: "flex-end", gap: 12, alignItems: "center", marginTop: 8 }}>
                <Button onClick={handleCancel} style={{ background: "#fff", color: "#888", border: "1px solid #bbb", borderRadius: 8, fontWeight: 500, fontSize: 15, padding: "9px 24px" }}>Cancel</Button>
                <Button type="primary" htmlType="submit" loading={submitting} style={{ background: "#27ae60", border: "none", borderRadius: 8, fontWeight: 600, fontSize: 15, padding: "9px 32px" }}>Submit</Button>
              </div>
            </Form>
          </div>
        )}
      </div>
    </div>
  );
}