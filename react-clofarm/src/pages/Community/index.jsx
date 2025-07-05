import React, { useState, useEffect, useRef } from "react";
import illustration from "../../assets/images/community.jpg"; // Ganti dengan path gambar Anda
import {
  HeartOutlined,
  HeartFilled,
  MessageOutlined,
  PlusCircleFilled
} from "@ant-design/icons";

const postsData = [
  {
    id: 1,
    user: { name: "nama", username: "username", avatar: "", date: "tanggal" },
    content: "Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet",
    image: "",
    likes: 0,
    comments: 0,
    initialComments: [
    ],
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
    postsData.reduce((acc, post) => ({
      ...acc,
      [post.id]: post.initialComments || [],
    }), {})
  );
  const [openMenuPostId, setOpenMenuPostId] = useState(null);
  const menuRef = useRef();

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
      [postId]: [...prev[postId], { username: currentUsername, text: commentInput[postId] }],
    }));
    setCommentInput((prev) => ({
      ...prev,
      [postId]: "",
    }));
  };

  return (
    <div style={{ background: "#f8f9fa", minHeight: "100vh" }}>
      <div
        style={{
          maxWidth: 1500,
          margin: "0 auto",
          padding: "2.5rem 2rem 0 2rem",
          display: "flex",
          gap: "2rem",
          boxSizing: "border-box",
        }}
      >
        {/* Bagian utama */}
        <div style={{ flex: 3, minWidth: 0 }}>
          <h1 style={{ fontWeight: "bold", fontSize: "2rem", marginBottom: "1.5rem" }}>Community</h1>
          {postsData.map((post) => (
            <div
              key={post.id}
              style={{
                background: "#fff",
                border: "1.5px solid #ccc",
                borderRadius: "16px",
                marginBottom: "1.5rem",
                padding: "1.5rem",
                boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
              }}
            >
              {/* Header post */}
              <div style={{ display: "flex", alignItems: "center", marginBottom: "0.7rem" }}>
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: "50%",
                    background: "#e0e0e0",
                    marginRight: 12,
                  }}
                />
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: "bold", fontSize: 15 }}>{post.user.name}</div>
                  <div style={{ fontSize: 13, color: "#888" }}>{post.user.username}</div>
                </div>
                <div style={{ color: "#888", fontSize: 13, marginRight: 12 }}>{post.user.date}</div>
                <div style={{ position: "relative" }}>
                  <div
                    style={{ fontSize: 20, color: "#aaa", cursor: "pointer" }}
                    onClick={() => setOpenMenuPostId(post.id === openMenuPostId ? null : post.id)}
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
                        border: "1px solid #ccc",
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
              <div style={{ marginBottom: "1rem", color: "#222" }}>{post.content}</div>
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
                <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
                  <MessageOutlined
                    style={{ fontSize: 20, color: "#bbb", cursor: "pointer" }}
                    onClick={() => handleCommentIconClick(post.id)}
                  />
                  {commentsCount[post.id] > 0 && (
                    <span style={{ fontSize: 15, color: "#bbb", minWidth: 18 }}>
                      {commentsCount[post.id]}
                    </span>
                  )}
                </span>
                <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
                  {liked[post.id] ? (
                    <HeartFilled
                      style={{ fontSize: 20, color: "#e74c3c", cursor: "pointer" }}
                      onClick={() => handleLike(post.id)}
                    />
                  ) : (
                    <HeartOutlined
                      style={{ fontSize: 20, color: "#e74c3c", cursor: "pointer" }}
                      onClick={() => handleLike(post.id)}
                    />
                  )}
                  {likesCount[post.id] > 0 && (
                    <span style={{ fontSize: 15, color: "#e74c3c", minWidth: 18 }}>
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
                      onChange={(e) => handleCommentInputChange(post.id, e.target.value)}
                      style={{
                        flex: 1,
                        padding: "0.5rem 1rem",
                        borderRadius: "8px",
                        border: "1.5px solid #ccc",
                        fontSize: "1rem",
                      }}
                    />
                    <button
                      onClick={() => handleCommentSubmit(post.id)}
                      style={{
                        background: "#4CAF50",
                        color: "#fff",
                        border: "none",
                        borderRadius: "8px",
                        padding: "0.5rem 1.2rem",
                        fontWeight: "bold",
                        fontSize: "1rem",
                        cursor: "pointer",
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
          <input
            type="text"
            placeholder="Search"
            style={{
              width: "100%",
              padding: "0.7rem 1rem",
              borderRadius: "8px",
              border: "1.5px solid #aaa",
              marginBottom: "1.5rem",
              fontSize: "1rem",
            }}
          />
          {/* Gambar ilustrasi */}
          <div
            style={{
              background: "#fff",
              border: "1.5px solid #ccc",
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
              border: "1.5px solid #ccc",
              borderRadius: "12px",
              padding: "1.5rem",
              marginBottom: "1.5rem",
            }}
          >
            {users.map((user) => (
              <div key={user.id} style={{ display: "flex", alignItems: "center", marginBottom: 16 }}>
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
                  <div style={{ fontWeight: "bold", fontSize: 15 }}>{user.name}</div>
                  <div style={{ fontSize: 13, color: "#888" }}>{user.username}</div>
                </div>
              </div>
            ))}
          </div>
          {/* Floating button */}
          <div style={{ position: "fixed", bottom: 32, right: 32 }}>
            <button
              style={{
                background: "transparent",
                border: "none",
                borderRadius: "50%",
                width: 56,
                height: 56,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 2px 8px rgba(76,175,80,0.15)",
                cursor: "pointer",
                fontSize: 36,
                color: "#4CAF50",
                padding: 0,
              }}
            >
              <PlusCircleFilled style={{ fontSize: 48, color: "#4CAF50" }} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
