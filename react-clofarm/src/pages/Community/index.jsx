import React, { useState, useEffect, useRef } from "react";
import illustration from "../../assets/images/community.jpg"; // Ganti dengan path gambar Anda
import {
  HeartOutlined,
  HeartFilled,
  MessageOutlined,
  PlusCircleFilled,
  SearchOutlined,
  CloseOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { Modal, Button, Form, Input, Drawer } from "antd";

const postsData = [
  {
    id: 1,
    user: { name: "nama", username: "username", avatar: "", date: "tanggal" },
    content: "Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet",
    image: "",
    likes: 0,
    comments: 0,
    initialComments: [],
  },
  {
    id: 2,
    user: { name: "nama", username: "username", avatar: "", date: "tanggal" },
    content: "Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet",
    image: "",
    likes: 2,
    comments: 0,
    initialComments: [],
  },
];

const users = [
  { id: 1, name: "nama", username: "username", avatar: "" },
  { id: 2, name: "nama", username: "username", avatar: "" },
  { id: 3, name: "nama", username: "username", avatar: "" },
];

const currentUsername = "nana"; // Ganti dengan username user login

export default function Community() {
  // State untuk like per post dan jumlah like
  const [liked, setLiked] = useState({});
  const [likesCount, setLikesCount] = useState(
    postsData.reduce((acc, post) => ({ ...acc, [post.id]: post.likes }), {})
  );
  const [commentsCount, setCommentsCount] = useState(
    postsData.reduce((acc, post) => ({ ...acc, [post.id]: post.comments }), {})
  );
  const [showCommentForm, setShowCommentForm] = useState({});
  const [commentInput, setCommentInput] = useState({});
  const [comments, setComments] = useState(
    postsData.reduce(
      (acc, post) => ({
        ...acc,
        [post.id]: post.initialComments || [],
      }),
      {}
    )
  );
  const [openMenuPostId, setOpenMenuPostId] = useState(null);
  const menuRef = useRef();
  const [addDrawerOpen, setAddDrawerOpen] = useState(false);
  const [addForm] = Form.useForm();

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpenMenuPostId(null);
      }
    }
    if (openMenuPostId !== null) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openMenuPostId]);

  const handleLike = (postId) => {
    setLiked((prev) => ({
      ...prev,
      [postId]: !prev[postId],
    }));
    setLikesCount((prev) => ({
      ...prev,
      [postId]: prev[postId] + (liked[postId] ? -1 : 1),
    }));
  };

  const handleCommentIconClick = (postId) => {
    setShowCommentForm((prev) => ({
      ...prev,
      [postId]: !prev[postId],
    }));
  };

  const handleCommentInputChange = (postId, value) => {
    setCommentInput((prev) => ({
      ...prev,
      [postId]: value,
    }));
  };

  const handleCommentSubmit = (postId) => {
    if (!commentInput[postId] || commentInput[postId].trim() === "") return;
    setCommentsCount((prev) => ({
      ...prev,
      [postId]: prev[postId] + 1,
    }));
    setComments((prev) => ({
      ...prev,
      [postId]: [
        ...prev[postId],
        { username: currentUsername, text: commentInput[postId] },
      ],
    }));
    setCommentInput((prev) => ({
      ...prev,
      [postId]: "",
    }));
  };

  return (
    <div
      style={{
        background: "#f8f9fa",
        minHeight: "100vh",
      }}
    >
      <div
        style={{
          background: "#fff",
          borderRadius: "14px",
          padding: "25px 30px",
          boxShadow: "0 4px 24px 0 rgba(0,0,0,0.08)",
          maxWidth: "1550px",
          margin: "0 auto 30px auto",
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: "2rem",
            boxSizing: "border-box",
          }}
        >
          {/* Bagian utama */}
          <div style={{ flex: 3, minWidth: 0 }}>
            <h1
              style={{
                margin: "8px 0 18px 0",
                color: "#222",
                fontSize: "2.1rem",
                fontWeight: 700,
              }}
            >
              Community
            </h1>
            {postsData.map((post, index) => (
              <div
                key={post.id}
                style={{
                  background: "#fff",
                  border: "1.5px solid #e5e7eb",
                  borderRadius: "16px",
                  marginBottom: "1.5rem",
                  padding: "1.5rem",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                  marginTop: index === 0 ? "26px" : undefined,
                }}
              >
                {/* Header post */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "0.7rem",
                    background: "none",
                    boxShadow: "none",
                  }}
                >
                  <div
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: "50%",
                      background: "#e0e0e0",
                      marginRight: 12,
                    }}
                  />
                  <div
                    style={{ flex: 1, background: "none", boxShadow: "none" }}
                  >
                    <div
                      style={{
                        fontWeight: "bold",
                        fontSize: 15,
                        background: "none",
                        boxShadow: "none",
                      }}
                    >
                      {post.user.name}
                    </div>
                    <div
                      style={{
                        fontSize: 13,
                        color: "#888",
                        background: "none",
                        boxShadow: "none",
                      }}
                    >
                      {post.user.username}
                    </div>
                  </div>
                  <div
                    style={{
                      color: "#888",
                      fontSize: 13,
                      marginRight: 12,
                      background: "none",
                      boxShadow: "none",
                    }}
                  >
                    {post.user.date}
                  </div>
                  <div
                    style={{
                      position: "relative",
                      background: "none",
                      boxShadow: "none",
                    }}
                  >
                    <div
                      style={{
                        fontSize: 20,
                        color: "#aaa",
                        cursor: "pointer",
                        background: "none",
                        boxShadow: "none",
                      }}
                      onClick={() =>
                        setOpenMenuPostId(
                          post.id === openMenuPostId ? null : post.id
                        )
                      }
                    >
                      ⋮
                    </div>
                    {openMenuPostId === post.id && (
                      <div
                        ref={menuRef}
                        style={{
                          position: "absolute",
                          top: 24,
                          right: 0,
                          background: "#fff",
                          border: "1px solid #e5e7eb",
                          borderRadius: 8,
                          boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                          zIndex: 10,
                          minWidth: 120,
                        }}
                      >
                        <button
                          style={{
                            width: "100%",
                            padding: "0.7rem 1rem",
                            border: "none",
                            background: "none",
                            textAlign: "left",
                            cursor: "pointer",
                            transition: "background 0.2s",
                          }}
                          onMouseEnter={(e) => {
                            e.target.style.background = "#f0f0f0";
                          }}
                          onMouseLeave={(e) => {
                            e.target.style.background = "transparent";
                          }}
                          onClick={() => {
                            // TODO: handle edit
                            setOpenMenuPostId(null);
                            alert("Edit post " + post.id);
                          }}
                        >
                          Edit
                        </button>
                        <button
                          style={{
                            width: "100%",
                            padding: "0.7rem 1rem",
                            border: "none",
                            background: "none",
                            textAlign: "left",
                            color: "#e74c3c",
                            cursor: "pointer",
                            transition: "background 0.2s",
                          }}
                          onMouseEnter={(e) => {
                            e.target.style.background = "#f8d7da";
                          }}
                          onMouseLeave={(e) => {
                            e.target.style.background = "transparent";
                          }}
                          onClick={() => {
                            // TODO: handle delete
                            setOpenMenuPostId(null);
                            alert("Hapus post " + post.id);
                          }}
                        >
                          Hapus
                        </button>
                      </div>
                    )}
                  </div>
                </div>
                {/* Konten post */}
                <div style={{ marginBottom: "1rem", color: "#222" }}>
                  {post.content}
                </div>
                <div
                  style={{
                    width: "100%",
                    height: 120,
                    background: "#d3d3d3",
                    borderRadius: 8,
                    marginBottom: "1rem",
                  }}
                />
                {/* Icon komentar & like */}
                <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                  <span
                    style={{ display: "flex", alignItems: "center", gap: 4 }}
                  >
                    <MessageOutlined
                      style={{
                        fontSize: 20,
                        color: "#bbb",
                        cursor: "pointer",
                        transition: "color 0.2s",
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.color = "#4CAF50";
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.color = "#bbb";
                      }}
                      onClick={() => handleCommentIconClick(post.id)}
                    />
                    {commentsCount[post.id] > 0 && (
                      <span
                        style={{ fontSize: 15, color: "#bbb", minWidth: 18 }}
                      >
                        {commentsCount[post.id]}
                      </span>
                    )}
                  </span>
                  <span
                    style={{ display: "flex", alignItems: "center", gap: 4 }}
                  >
                    {liked[post.id] ? (
                      <HeartFilled
                        style={{
                          fontSize: 20,
                          color: "#e74c3c",
                          cursor: "pointer",
                        }}
                        onClick={() => handleLike(post.id)}
                      />
                    ) : (
                      <HeartOutlined
                        style={{
                          fontSize: 20,
                          color: "#e74c3c",
                          cursor: "pointer",
                        }}
                        onClick={() => handleLike(post.id)}
                      />
                    )}
                    {likesCount[post.id] > 0 && (
                      <span
                        style={{ fontSize: 15, color: "#e74c3c", minWidth: 18 }}
                      >
                        {likesCount[post.id]}
                      </span>
                    )}
                  </span>
                </div>
                {/* Form komentar */}
                {showCommentForm[post.id] && (
                  <div style={{ marginTop: "1rem" }}>
                    {/* Daftar komentar */}
                    {comments[post.id] && comments[post.id].length > 0 && (
                      <div style={{ marginBottom: "0.7rem" }}>
                        {comments[post.id].map((komentar, idx) => (
                          <div
                            key={idx}
                            style={{
                              background: "#f3f3f3",
                              borderRadius: "8px",
                              padding: "0.5rem 1rem",
                              marginBottom: "0.4rem",
                              fontSize: "0.98rem",
                              color: "#333",
                            }}
                          >
                            <div
                              style={{
                                fontWeight: "bold",
                                color: "#4CAF50",
                                marginBottom: 2,
                              }}
                            >
                              {komentar.username}
                            </div>
                            <div>{komentar.text}</div>
                          </div>
                        ))}
                      </div>
                    )}
                    {/* Form komentar */}
                    <div style={{ display: "flex", gap: 8 }}>
                      <input
                        type="text"
                        placeholder="Tulis komentar..."
                        value={commentInput[post.id] || ""}
                        onChange={(e) =>
                          handleCommentInputChange(post.id, e.target.value)
                        }
                        style={{
                          flex: 1,
                          padding: "0.5rem 1rem",
                          borderRadius: "8px",
                          border: "1px solid #e5e7eb",
                          fontSize: "1rem",
                          transition: "border-color 0.2s",
                          outline: "none",
                        }}
                        onFocus={(e) => {
                          e.target.style.borderColor = "#27ae60";
                          e.target.style.outline = "none";
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = "#e5e7eb";
                          e.target.style.outline = "none";
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.borderColor = "#27ae60";
                        }}
                        onMouseLeave={(e) => {
                          if (document.activeElement !== e.target) {
                            e.target.style.borderColor = "#e5e7eb";
                          }
                        }}
                      />
                      <button
                        onClick={() => handleCommentSubmit(post.id)}
                        disabled={
                          !commentInput[post.id] ||
                          commentInput[post.id].trim() === ""
                        }
                        style={{
                          background:
                            !commentInput[post.id] ||
                            commentInput[post.id].trim() === ""
                              ? "#bfe4ce"
                              : "#27ae60",
                          color: "#fff",
                          border: "none",
                          borderRadius: "8px",
                          padding: "0.5rem 1.2rem",
                          fontWeight: "bold",
                          fontSize: "1rem",
                          cursor:
                            !commentInput[post.id] ||
                            commentInput[post.id].trim() === ""
                              ? "not-allowed"
                              : "pointer",
                          opacity:
                            !commentInput[post.id] ||
                            commentInput[post.id].trim() === ""
                              ? 0.7
                              : 1,
                          transition: "background 0.2s, opacity 0.2s",
                        }}
                        onMouseEnter={(e) => {
                          if (
                            commentInput[post.id] &&
                            commentInput[post.id].trim() !== ""
                          ) {
                            e.target.style.background = "#219150";
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (
                            commentInput[post.id] &&
                            commentInput[post.id].trim() !== ""
                          ) {
                            e.target.style.background = "#27ae60";
                          }
                        }}
                      >
                        Kirim
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
          {/* Sidebar kanan */}
          <div style={{ flex: 2, minWidth: 280 }}>
            {/* Search */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                background: "#fff",
                border: "2px solid #d1d5db",
                borderRadius: "8px",
                padding: "0 16px",
                height: "48px",
                marginBottom: "1.5rem",
                transition: "border-color 0.2s, box-shadow 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "#27ae60";
                e.currentTarget.style.boxShadow = "0 0 0 2px #bfe4ce";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "#d1d5db";
                e.currentTarget.style.boxShadow = "none";
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = "#27ae60";
                e.currentTarget.style.boxShadow = "0 0 0 2px #bfe4ce";
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = "#d1d5db";
                e.currentTarget.style.boxShadow = "none";
              }}
              tabIndex={-1}
            >
              <SearchOutlined
                style={{
                  fontSize: 22,
                  color: "#b0b7c3",
                  marginRight: 10,
                  transition: "color 0.2s",
                }}
              />
              <input
                type="text"
                placeholder="Search..."
                style={{
                  width: "100%",
                  height: "100%",
                  padding: 0,
                  fontSize: "16px",
                  border: "none",
                  outline: "none",
                  background: "transparent",
                  margin: 0,
                  display: "flex",
                  alignItems: "center",
                  lineHeight: 1,
                  boxShadow: "none",
                }}
                onFocus={(e) => {
                  e.target.parentNode.style.borderColor = "#27ae60";
                  e.target.parentNode.style.boxShadow = "0 0 0 2px #bfe4ce";
                }}
                onBlur={(e) => {
                  e.target.parentNode.style.borderColor = "#d1d5db";
                  e.target.parentNode.style.boxShadow = "none";
                }}
              />
            </div>
            {/* Gambar ilustrasi */}
            <div
              style={{
                background: "#fff",
                border: "1.5px solid #e5e7eb",
                borderRadius: "12px",
                marginBottom: "1.5rem",
                padding: "1.5rem",
                minHeight: 160,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <img
                src={illustration}
                alt="Ilustrasi"
                style={{ width: "100%", maxWidth: 180, objectFit: "contain" }}
              />
            </div>
            {/* Daftar user */}
            <div
              style={{
                background: "#fff",
                border: "1.5px solid #e5e7eb",
                borderRadius: "12px",
                padding: "1.5rem",
                marginBottom: "1.5rem",
              }}
            >
              {users.map((user) => (
                <div
                  key={user.id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: 16,
                  }}
                >
                  <div
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: "50%",
                      background: "#e0e0e0",
                      marginRight: 12,
                    }}
                  />
                  <div>
                    <div style={{ fontWeight: "bold", fontSize: 15 }}>
                      {user.name}
                    </div>
                    <div style={{ fontSize: 13, color: "#888" }}>
                      {user.username}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {/* Floating button */}
            <div style={{ position: "fixed", bottom: 32, right: 32 }}>
              <button
                style={{
                  background: "#4CAF50",
                  border: "none",
                  color: "#fff",
                  borderRadius: "50%",
                  width: 56,
                  height: 56,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 32,
                  boxShadow: "0 2px 8px rgba(76,175,80,0.15)",
                  cursor: "pointer",
                  padding: 0,
                  outline: "none",
                }}
                onClick={() => setAddDrawerOpen(true)}
              >
                <PlusOutlined />
              </button>
            </div>
          </div>
        </div>
        {/* Drawer Add Post */}
        <Drawer
          open={addDrawerOpen}
          onClose={() => setAddDrawerOpen(false)}
          width={480}
          closable={false}
          bodyStyle={{ paddingTop: 0, paddingBottom: 24 }}
          headerStyle={{ display: "none" }}
        >
          {/* Custom Header */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              borderBottom: "1px solid #f0f0f0",
              padding: "16px 0 16px 0",
              marginBottom: 16,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <Button
                type="text"
                icon={
                  <CloseOutlined
                    style={{
                      fontSize: 18,
                      color: "#888",
                      transition: "color 0.18s",
                    }}
                  />
                }
                onClick={() => setAddDrawerOpen(false)}
                style={{
                  background: "none",
                  border: "none",
                  boxShadow: "none",
                  outline: "none",
                  padding: 0,
                  width: 28,
                  height: 28,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                }}
                tabIndex={0}
                onFocus={(e) => (e.target.style.boxShadow = "none")}
                onMouseDown={(e) => (e.target.style.boxShadow = "none")}
                onMouseEnter={(e) => {
                  const icon = e.currentTarget.querySelector("svg");
                  if (icon) icon.style.color = "#111";
                }}
                onMouseLeave={(e) => {
                  const icon = e.currentTarget.querySelector("svg");
                  if (icon) icon.style.color = "#888";
                }}
              />
              <span style={{ fontWeight: 500, fontSize: 15 }}>
                Add Community
              </span>
            </div>
            <Button
              type="primary"
              htmlType="submit"
              form="addPostForm"
              style={{
                minWidth: 90,
                background: "#27ae60",
                border: "none",
                color: "#fff",
                fontWeight: 600,
                fontSize: 15,
                borderRadius: 8,
                boxShadow: "none",
                transition: "background 0.2s",
              }}
              onMouseEnter={(e) => (e.target.style.background = "#219150")}
              onMouseLeave={(e) => (e.target.style.background = "#27ae60")}
            >
              Submit
            </Button>
          </div>
          <Form
            id="addPostForm"
            form={addForm}
            layout="vertical"
            onFinish={() => setAddDrawerOpen(false)}
            style={{ fontFamily: "Poppins, sans-serif" }}
          >
            <Form.Item
              label={
                <span
                  style={{
                    color: "#111",
                    fontWeight: 500,
                    fontFamily: "Poppins, sans-serif",
                  }}
                >
                  Content
                </span>
              }
              name="content"
              rules={[{ required: true, message: "Content wajib diisi" }]}
            >
              <Input.TextArea
                rows={4}
                placeholder="Tulis konten dan deskripsi di sini..."
                style={{ fontFamily: "Poppins, sans-serif" }}
              />
            </Form.Item>
            <Form.Item
              label={
                <span
                  style={{
                    color: "#111",
                    fontWeight: 500,
                    fontFamily: "Poppins, sans-serif",
                  }}
                >
                  Image URL
                </span>
              }
              name="imageUrl"
              style={{ maxWidth: 220 }}
            >
              <Input
                placeholder="https://..."
                style={{ width: 430, fontFamily: "Poppins, sans-serif" }}
              />
            </Form.Item>
          </Form>
        </Drawer>
      </div>
    </div>
  );
}
