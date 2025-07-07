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
  MoreOutlined,
} from "@ant-design/icons";
import {
  Modal,
  Button,
  Form,
  Input,
  Drawer,
  message,
  Dropdown,
  Menu,
  Popconfirm,
  notification,
} from "antd";
import { useUser } from "../../components/UserContext";

if (typeof window !== "undefined") {
  const style = document.createElement("style");
  style.innerHTML = `
    input[type="text"]:focus,
    input[type="text"]:active,
    input[type="text"]:hover {
      outline: none !important;
      border: none !important;
      box-shadow: none !important;
    }
  `;
  document.head.appendChild(style);
}

// Helper untuk fetch user profile by id
async function fetchUserProfile(id_user) {
  const token = localStorage.getItem("token");
  const res = await fetch(
    `http://localhost:5000/auth/profile?id_user=${id_user}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  if (!res.ok) return null;
  return await res.json();
}

// Helper to fetch likes for a post
async function fetchLikes(postId) {
  const token = localStorage.getItem("token");
  const res = await fetch(
    `http://localhost:5000/community_likes/post/${postId}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  if (!res.ok) return [];
  return await res.json();
}

// Helper to fetch comments for a post
async function fetchComments(postId) {
  const token = localStorage.getItem("token");
  const res = await fetch(
    `http://localhost:5000/community_comments/post/${postId}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  if (!res.ok) return [];
  return await res.json();
}

export default function Community() {
  const { user, loading: userLoading } = useUser();
  // State untuk like per post dan jumlah like
  const [liked, setLiked] = useState({});
  const [likesCount, setLikesCount] = useState({});
  const [commentsCount, setCommentsCount] = useState({});
  const [showCommentForm, setShowCommentForm] = useState({});
  const [commentInput, setCommentInput] = useState({});
  const [comments, setComments] = useState({});
  const [openMenuPostId, setOpenMenuPostId] = useState(null);
  const menuRef = useRef();
  const [addDrawerOpen, setAddDrawerOpen] = useState(false);
  const [addForm] = Form.useForm();
  // State untuk loading submit
  const [submitting, setSubmitting] = useState(false);
  const [posts, setPosts] = useState([]);
  const [userProfiles, setUserProfiles] = useState({});
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editForm] = Form.useForm();
  const [editingPost, setEditingPost] = useState(null);

  const fetchPosts = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:5000/community_posts", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed to fetch posts");
      const data = await res.json();
      // Sort by created_at descending (newest first)
      const sorted = [...data].sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at)
      );
      setPosts(sorted);
      // Fetch likes and comments count for each post
      const likesObj = {};
      const likedObj = {};
      const commentsObj = {};
      const commentsCountObj = {};
      for (const post of sorted) {
        const likes = await fetchLikes(post.id_community_posts);
        likesObj[post.id_community_posts] = likes.length;
        likedObj[post.id_community_posts] = likes.some(
          (l) => l.id_user === user?.id_user
        );
        const comms = await fetchComments(post.id_community_posts);
        commentsObj[post.id_community_posts] = comms;
        commentsCountObj[post.id_community_posts] = comms.length;
      }
      setLikesCount(likesObj);
      setLiked(likedObj);
      setComments(commentsObj);
      setCommentsCount(commentsCountObj);
    } catch (err) {
      setPosts([]);
    }
  };

  useEffect(() => {
    if (user) fetchPosts();
  }, [user]);

  // Fetch user profiles for posts
  useEffect(() => {
    async function fetchProfiles() {
      const ids = Array.from(
        new Set(posts.map((p) => p.id_user).filter(Boolean))
      );
      const profiles = {};
      for (const id of ids) {
        if (!userProfiles[id]) {
          const profile = await fetchUserProfile(id);
          if (profile) profiles[id] = profile;
        }
      }
      setUserProfiles((prev) => ({ ...prev, ...profiles }));
    }
    if (posts.length) fetchProfiles();
    // eslint-disable-next-line
  }, [posts]);

  useEffect(() => {
    async function fetchProfilesFromComments() {
      const ids = [];
      Object.values(comments).forEach((commentArr) => {
        commentArr.forEach((k) => {
          if (k.id_user && !userProfiles[k.id_user]) ids.push(k.id_user);
        });
      });
      const profiles = {};
      for (const id of ids) {
        if (!userProfiles[id]) {
          const profile = await fetchUserProfile(id);
          if (profile) profiles[id] = profile;
        }
      }
      if (Object.keys(profiles).length > 0) {
        setUserProfiles((prev) => ({ ...prev, ...profiles }));
      }
    }
    fetchProfilesFromComments();
    // eslint-disable-next-line
  }, [comments]);

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

  // Like/unlike post
  const handleLike = async (postId) => {
    const token = localStorage.getItem("token");
    try {
      if (!liked[postId]) {
        // Like
        const formData = new FormData();
        formData.append("id_community_posts", postId);
        const res = await fetch("http://localhost:5000/community_likes", {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
          body: formData,
        });
        if (res.ok) {
          // Refresh likes
          const likes = await fetchLikes(postId);
          setLikesCount((prev) => ({ ...prev, [postId]: likes.length }));
          setLiked((prev) => ({ ...prev, [postId]: true }));
        }
      } else {
        // Unlike
        const formData = new FormData();
        formData.append("id_community_posts", postId);
        const res = await fetch("http://localhost:5000/community_likes", {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
          body: formData,
        });
        if (res.ok) {
          // Refresh likes
          const likes = await fetchLikes(postId);
          setLikesCount((prev) => ({ ...prev, [postId]: likes.length }));
          setLiked((prev) => ({ ...prev, [postId]: false }));
        }
      }
    } catch (err) {}
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

  // Submit comment
  const handleCommentSubmit = async (postId) => {
    if (!commentInput[postId] || commentInput[postId].trim() === "") return;
    const token = localStorage.getItem("token");
    const formData = new FormData();
    formData.append("id_community_posts", postId);
    formData.append("comment", commentInput[postId]);
    try {
      const res = await fetch("http://localhost:5000/community_comments", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });
      if (res.ok) {
        // Refresh comments
        const comms = await fetchComments(postId);
        setComments((prev) => ({ ...prev, [postId]: comms }));
        setCommentsCount((prev) => ({ ...prev, [postId]: comms.length }));
        setCommentInput((prev) => ({ ...prev, [postId]: "" }));
      }
    } catch (err) {}
  };

  // Handler submit form tambah post
  const handleAddPost = async (values) => {
    setSubmitting(true);
    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();
      formData.append("content", values.content);
      formData.append("images_url", values.imageUrl || "");
      const res = await fetch("http://localhost:5000/community_posts", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });
      if (res.ok) {
        setAddDrawerOpen(false);
        addForm.resetFields();
        notification.success({ message: "Post successfully added!" });
        fetchPosts();
      } else {
        const data = await res.json();
        notification.error({ message: data.msg || "Failed to post community" });
      }
    } catch (err) {
      notification.error({ message: "Failed to post community" });
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeletePost = async (postId) => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(
        `http://localhost:5000/community_posts/${postId}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (res.ok) {
        notification.success({ message: "Post deleted successfully!" });
        fetchPosts();
      } else {
        notification.error({ message: "Failed to delete post" });
      }
    } catch (err) {
      notification.error({ message: "Failed to delete post" });
    }
  };

  const handleEditPost = (post) => {
    setEditingPost(post);
    editForm.setFieldsValue({
      content: post.content,
      imageUrl: post.images_url || "",
    });
    setEditModalOpen(true);
  };

  const handleEditPostSubmit = async () => {
    try {
      const values = await editForm.validateFields();
      const token = localStorage.getItem("token");
      const formData = new FormData();
      formData.append("content", values.content);
      formData.append("images_url", values.imageUrl || "");
      const res = await fetch(
        `http://localhost:5000/community_posts/${editingPost.id_community_posts}`,
        {
          method: "PUT",
          headers: { Authorization: `Bearer ${token}` },
          body: formData,
        }
      );
      if (res.ok) {
        notification.success({ message: "Post updated successfully!" });
        setEditModalOpen(false);
        setEditingPost(null);
        fetchPosts();
      } else {
        notification.error({ message: "Failed to update post" });
      }
    } catch (err) {
      notification.error({ message: "Failed to update post" });
    }
  };

  const handleDeleteComment = async (commentId, postId) => {
    // Panggil endpoint DELETE comment, lalu refresh comments untuk postId
  };

  if (userLoading)
    return (
      <div style={{ textAlign: "center", marginTop: 40 }}>Loading user...</div>
    );

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
            {posts.map((post, index) => {
              const profile = userProfiles[post.id_user] || {};
              console.log(
                "user.id_user:",
                user?.id_user,
                "post.id_user:",
                post.id_user,
                typeof user?.id_user,
                typeof post.id_user
              );
              return (
                <div
                  key={post.id_community_posts || post.id}
                  style={{
                    background: "#fff",
                    border: "1.5px solid #e5e7eb",
                    borderRadius: "16px",
                    marginBottom: "1.5rem",
                    padding: "1.5rem",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                    marginTop: index === 0 ? "26px" : undefined,
                    position: "relative",
                  }}
                >
                  {/* Header ala Twitter */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginBottom: "0.7rem",
                      background: "none",
                      boxShadow: "none",
                    }}
                  >
                    <img
                      src={
                        profile.photo_url ||
                        "https://api.dicebear.com/7.x/adventurer-neutral/svg?seed=User"
                      }
                      alt={profile.name || "User"}
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: "50%",
                        background: "#e0e0e0",
                        marginRight: 12,
                        objectFit: "cover",
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
                        {profile.name || `User #${post.id_user}`}
                        <span
                          style={{
                            color: "#888",
                            fontWeight: 400,
                            fontSize: 14,
                            marginLeft: 8,
                          }}
                        >
                          @{profile.username || post.id_user}
                        </span>
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
                      {/* Tampilkan tanggal jika ada */}
                    </div>
                    {/* Titik tiga pojok kanan atas */}
                    {String(user?.id_user) === String(post.id_user) && (
                      <div style={{ position: "absolute", right: 18, top: 18 }}>
                        <Dropdown
                          overlay={
                            <Menu>
                              <Menu.Item key="edit">
                                <Popconfirm
                                  title="Edit Post"
                                  description="Are you sure you want to edit this post?"
                                  onConfirm={() => handleEditPost(post)}
                                  okText="Edit"
                                  cancelText="Cancel"
                                >
                                  <span>Edit</span>
                                </Popconfirm>
                              </Menu.Item>
                              <Menu.Item key="delete">
                                <Popconfirm
                                  title="Delete Post"
                                  description="Are you sure you want to delete this post?"
                                  onConfirm={() =>
                                    handleDeletePost(post.id_community_posts)
                                  }
                                  okText="Delete"
                                  cancelText="Cancel"
                                  okType="danger"
                                >
                                  <span style={{ color: "red" }}>Delete</span>
                                </Popconfirm>
                              </Menu.Item>
                            </Menu>
                          }
                          trigger={["click"]}
                          placement="bottomRight"
                        >
                          <MoreOutlined
                            style={{
                              fontSize: 22,
                              color: "#888",
                              cursor: "pointer",
                            }}
                          />
                        </Dropdown>
                      </div>
                    )}
                  </div>
                  <div
                    style={{
                      marginBottom: "1rem",
                      color: "#222",
                      fontSize: 17,
                    }}
                  >
                    {post.content}
                  </div>
                  {/* Gambar jika ada */}
                  {post.images_url && (
                    <div style={{ width: "100%", margin: "12px 0" }}>
                      <img
                        src={post.images_url}
                        alt="post"
                        style={{
                          width: "100%",
                          borderRadius: 12,
                          objectFit: "cover",
                          maxHeight: 320,
                        }}
                      />
                    </div>
                  )}
                  {/* Icon komentar & like */}
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 16 }}
                  >
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
                        onClick={() =>
                          handleCommentIconClick(post.id_community_posts)
                        }
                      />
                      {commentsCount[post.id_community_posts] > 0 && (
                        <span
                          style={{ fontSize: 15, color: "#bbb", minWidth: 18 }}
                        >
                          {commentsCount[post.id_community_posts]}
                        </span>
                      )}
                    </span>
                    <span
                      style={{ display: "flex", alignItems: "center", gap: 4 }}
                    >
                      {liked[post.id_community_posts] ? (
                        <HeartFilled
                          style={{
                            fontSize: 20,
                            color: "#27ae60",
                            cursor: "pointer",
                          }}
                          onClick={() => handleLike(post.id_community_posts)}
                        />
                      ) : (
                        <HeartOutlined
                          style={{
                            fontSize: 20,
                            color: "#bbb",
                            cursor: "pointer",
                          }}
                          onClick={() => handleLike(post.id_community_posts)}
                        />
                      )}
                      {likesCount[post.id_community_posts] > 0 && (
                        <span
                          style={{
                            fontSize: 15,
                            color: liked[post.id_community_posts]
                              ? "#bbb"
                              : "#bbb",
                            minWidth: 18,
                          }}
                        >
                          {likesCount[post.id_community_posts]}
                        </span>
                      )}
                    </span>
                  </div>
                  {/* Form komentar */}
                  {showCommentForm[post.id_community_posts] && (
                    <div style={{ marginTop: "1rem" }}>
                      {/* Daftar komentar */}
                      {comments[post.id_community_posts] &&
                        comments[post.id_community_posts].length > 0 && (
                          <div style={{ marginBottom: "0.7rem" }}>
                            {comments[post.id_community_posts].map(
                              (komentar, idx) => {
                                const cProfile =
                                  userProfiles[komentar.id_user] || {};
                                return (
                                  <div
                                    key={idx}
                                    style={{
                                      background: "#f3f3f3",
                                      borderRadius: "8px",
                                      padding: "0.5rem 1rem",
                                      marginBottom: "0.4rem",
                                      fontSize: "0.98rem",
                                      color: "#333",
                                      display: "flex",
                                      alignItems: "center",
                                      gap: 10,
                                      position: "relative",
                                    }}
                                  >
                                    <img
                                      src={
                                        cProfile.photo_url ||
                                        "https://api.dicebear.com/7.x/adventurer-neutral/svg?seed=User"
                                      }
                                      alt={cProfile.name || komentar.id_user}
                                      style={{
                                        width: 28,
                                        height: 28,
                                        borderRadius: "50%",
                                        objectFit: "cover",
                                        marginRight: 6,
                                      }}
                                    />
                                    <div>
                                      <div
                                        style={{
                                          fontWeight: "bold",
                                          color: "#4CAF50",
                                          marginBottom: 2,
                                        }}
                                      >
                                        {cProfile.name ||
                                          cProfile.username ||
                                          `User #${komentar.id_user}`}
                                        <span
                                          style={{
                                            color: "#888",
                                            fontWeight: 400,
                                            fontSize: 13,
                                            marginLeft: 6,
                                          }}
                                        >
                                          @
                                          {cProfile.username ||
                                            komentar.id_user}
                                        </span>
                                      </div>
                                      <div>{komentar.comment}</div>
                                    </div>
                                    {user?.id_user === komentar.id_user && (
                                      <div
                                        style={{
                                          position: "absolute",
                                          right: 12,
                                          top: 12,
                                        }}
                                      >
                                        <Dropdown
                                          overlay={
                                            <Menu>
                                              <Menu.Item key="delete">
                                                <Popconfirm
                                                  title="Delete Comment"
                                                  description="Are you sure you want to delete this comment?"
                                                  onConfirm={() =>
                                                    handleDeleteComment(
                                                      komentar.id_community_comments,
                                                      post.id_community_posts
                                                    )
                                                  }
                                                  okText="Delete"
                                                  cancelText="Cancel"
                                                  okType="danger"
                                                >
                                                  <span
                                                    style={{ color: "red" }}
                                                  >
                                                    Delete
                                                  </span>
                                                </Popconfirm>
                                              </Menu.Item>
                                            </Menu>
                                          }
                                          trigger={["click"]}
                                          placement="bottomRight"
                                        >
                                          <MoreOutlined
                                            style={{
                                              fontSize: 18,
                                              color: "#888",
                                              cursor: "pointer",
                                            }}
                                          />
                                        </Dropdown>
                                      </div>
                                    )}
                                  </div>
                                );
                              }
                            )}
                          </div>
                        )}
                      {/* Form komentar */}
                      <div style={{ display: "flex", gap: 8 }}>
                        <input
                          type="text"
                          placeholder="Tulis komentar..."
                          value={commentInput[post.id_community_posts] || ""}
                          onChange={(e) =>
                            handleCommentInputChange(
                              post.id_community_posts,
                              e.target.value
                            )
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
                          onClick={() =>
                            handleCommentSubmit(post.id_community_posts)
                          }
                          disabled={
                            !commentInput[post.id_community_posts] ||
                            commentInput[post.id_community_posts].trim() === ""
                          }
                          style={{
                            background:
                              !commentInput[post.id_community_posts] ||
                              commentInput[post.id_community_posts].trim() ===
                                ""
                                ? "#bfe4ce"
                                : "#27ae60",
                            color: "#fff",
                            border: "none",
                            borderRadius: "8px",
                            padding: "0.5rem 1.2rem",
                            fontWeight: "bold",
                            fontSize: "1rem",
                            cursor:
                              !commentInput[post.id_community_posts] ||
                              commentInput[post.id_community_posts].trim() ===
                                ""
                                ? "not-allowed"
                                : "pointer",
                            opacity:
                              !commentInput[post.id_community_posts] ||
                              commentInput[post.id_community_posts].trim() ===
                                ""
                                ? 0.7
                                : 1,
                            transition: "background 0.2s, opacity 0.2s",
                          }}
                          onMouseEnter={(e) => {
                            if (
                              commentInput[post.id_community_posts] &&
                              commentInput[post.id_community_posts].trim() !==
                                ""
                            ) {
                              e.target.style.background = "#219150";
                            }
                          }}
                          onMouseLeave={(e) => {
                            if (
                              commentInput[post.id_community_posts] &&
                              commentInput[post.id_community_posts].trim() !==
                                ""
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
              );
            })}
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
            {/* Daftar user dihapus karena variabel users sudah tidak ada */}
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
              loading={submitting}
              disabled={submitting}
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
            onFinish={handleAddPost}
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
        {/* Modal Edit Post */}
        <Modal
          open={editModalOpen}
          title="Edit Community Post"
          onCancel={() => {
            setEditModalOpen(false);
            setEditingPost(null);
          }}
          onOk={handleEditPostSubmit}
          okText="Save"
          cancelText="Cancel"
          confirmLoading={submitting}
        >
          <Form form={editForm} layout="vertical">
            <Form.Item
              label={
                <span style={{ color: "#111", fontWeight: 500 }}>Content</span>
              }
              name="content"
              rules={[{ required: true, message: "Content is required" }]}
            >
              <Input.TextArea rows={4} placeholder="Edit your content..." />
            </Form.Item>
            <Form.Item
              label={
                <span style={{ color: "#111", fontWeight: 500 }}>
                  Image URL
                </span>
              }
              name="imageUrl"
            >
              <Input placeholder="https://..." />
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </div>
  );
}
