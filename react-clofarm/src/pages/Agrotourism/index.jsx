import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  SearchOutlined,
  EnvironmentOutlined,
  DollarCircleOutlined,
  StarFilled,
  MoreOutlined,
} from "@ant-design/icons";
import dumpict from "../../assets/images/dumpict.jpg";
import { notification, Dropdown, Menu, Popconfirm } from "antd";
import { useUser } from '../../components/UserContext';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';



const initialDummyReviews = [
  {
    id_agrowisata_reviews: 1,
    id_agrowisata: 1,
    id_user: 101,
    username: "Username",
    profilePic: "https://i.pravatar.cc/40",
    rating: 3,
    review_text: "Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet",
    url_images: null,
  },
  {
    id_agrowisata_reviews: 2,
    id_agrowisata: 1,
    id_user: 102,
    username: "Jane Doe",
    profilePic: "https://i.pravatar.cc/41",
    rating: 5,
    review_text: "Tempatnya bagus dan edukatif!",
    url_images:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=200&q=80",
  },
];

// Objek Styles dipindahkan ke atas agar bisa diakses
const styles = {
  // Layout Utama
  pageWrapper: {
    background: "#f8f9fa",
    minHeight: "100vh",
  },
  container: {
    padding: "25px 30px",
    borderRadius: "14px",
    margin: "0 auto",
    maxWidth: "1550px",
    boxSizing: "border-box",
    background: "#fff",
    boxShadow: "0 4px 24px 0 rgba(0,0,0,0.08)",
  },
  title: {
    fontSize: "2.1rem",
    fontWeight: 700,
    marginBottom: 32,
    letterSpacing: 1,
  },
  // Search Bar
  searchWrapper: {
    marginBottom: 32,
    display: "flex",
    alignItems: "center",
    background: "#fff",
    border: `2px solid #d1d5db`,
    borderRadius: "8px",
    padding: "0 16px",
    height: "48px",
    boxShadow: "none",
    transition: "border-color 0.2s, box-shadow 0.2s",
    maxWidth: 1285,
    width: "100%",
  },
  searchWrapperHover: {
    border: `2px solid #27ae60`,
    boxShadow: "0 0 0 2px #bfe4ce",
  },
  searchIcon: {
    fontSize: 22,
    color: "#b0b7c3",
    marginRight: 10,
    transition: "color 0.2s",
  },
  searchIconHover: {
    color: "#27ae60",
  },
  searchInput: {
    width: "100%",
    height: "100%",
    padding: 0,
    fontSize: "16px",
    border: "none",
    outline: "none",
    background: "transparent",
    margin: 0,
  },
  // Grid & Card
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "25px",
    marginTop: 10,
    width: "100%",
  },
  card: {
    background: "#fff",
    border: "1px solid #e5e7eb",
    boxShadow: "0 1px 3px 0 rgba(0,0,0,0.05)",
    borderRadius: "12px",
    display: "flex",
    flexDirection: "column",
  },
  cardImage: {
    width: "100%",
    height: 160,
    objectFit: "cover",
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  cardContent: {
    padding: "15px",
  },
  cardTitle: {
    margin: "0 0 8px 0",
    fontSize: "19px",
    fontWeight: 600,
    color: "#111827",
  },
  cardInfo: {
    fontSize: "16px",
    color: "#6b7280",
    marginBottom: 4,
    display: "flex",
    alignItems: "center",
    gap: 6,
  },
  cardPrice: {
    color: "#059669",
    fontWeight: 600,
    fontSize: "17px",
  },
};

// Komponen Card
const AgrotourismCard = ({ image_url, name, city, province, ticket_price, onSeeDetails }) => (
  <div style={styles.card}>
    <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
      <img
        src={image_url || dumpict}
        alt={name}
        style={{
          width: "90%",
          height: 160,
          margin: "16px auto 0 auto",
          display: "block",
          objectFit: "cover",
          borderRadius: "8px",
          background: "#f0f0f0",
        }}
      />
    </div>
    <div style={styles.cardContent}>
      <h3 style={styles.cardTitle}>{name}</h3>
      <div style={styles.cardInfo}>
        <EnvironmentOutlined style={{ color: "#059669" }} /> {city}, {province}
      </div>
      <div style={{ ...styles.cardInfo, color: "#6b7280" }}>
        <DollarCircleOutlined style={{ color: "#059669" }} /> {ticket_price}
      </div>
    </div>
    <div style={{ padding: "0 12px 12px 12px" }}>
      <button
        onClick={onSeeDetails}
        style={{
          width: "100%",
          display: "block",
          background: "#27ae60",
          color: "#fff",
          border: "none",
          borderRadius: "6px",
          padding: "5px 0",
          fontWeight: "bold",
          textAlign: "center",
          textDecoration: "none",
          fontSize: "1.05rem",
          transition: "background 0.2s, color 0.2s",
          cursor: "pointer",
        }}
        onMouseEnter={e => {
          e.target.style.background = "#219150";
          e.target.style.color = "#fff";
        }}
        onMouseLeave={e => {
          e.target.style.background = "#27ae60";
          e.target.style.color = "#fff";
        }}
      >
        See Details
      </button>
    </div>
  </div>
);

function StarRating({ value, onChange }) {
  return (
    <div
      style={{
        fontSize: 28,
        color: "#bbb",
        marginBottom: 8,
        cursor: "pointer",
      }}
    >
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          style={{
            color: star <= value ? "#27ae60" : "#bbb",
            transition: "color 0.2s",
          }}
          onClick={() => onChange(star)}
          onMouseOver={(e) => (e.target.style.cursor = "pointer")}
        >
          ★
        </span>
      ))}
    </div>
  );
}

const MainCard = ({ children }) => (
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
    {children}
  </div>
);

// Helper untuk fetch user profile by id
async function fetchUserProfile(id_user) {
  const token = localStorage.getItem('token');
  const res = await fetch(`http://localhost:5000/auth/profile?id_user=${id_user}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  if (!res.ok) return null;
  return await res.json();
}

function ReviewCard({
  id_user,
  rating,
  comment,
  photo,
  isOwn,
  onDelete,
  onEdit,
  userProfiles
}) {
  const cProfile = userProfiles[id_user] || {};
  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-start",
        border: "1px solid #888",
        borderRadius: 8,
        padding: 20,
        marginBottom: 18,
        background: "#fff",
        gap: 24,
        minHeight: 120,
        position: "relative",
      }}
    >
      {isOwn && (
        <Dropdown
          overlay={
            <Menu>
              <Menu.Item key="edit" onClick={onEdit}>
                Edit
              </Menu.Item>
              <Menu.Item key="delete">
                <Popconfirm
                  title="Delete Review"
                  description="Are you sure you want to delete this review?"
                  onConfirm={onDelete}
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
              position: "absolute",
              top: 16,
              right: 16,
              fontSize: 22,
              color: "#888",
              cursor: "pointer",
            }}
          />
        </Dropdown>
      )}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            marginBottom: 4,
          }}
        >
          <img
            src={cProfile.photo_url || "https://api.dicebear.com/7.x/adventurer-neutral/svg?seed=User"}
            alt={cProfile.name || cProfile.username || "User"}
            style={{
              width: 32,
              height: 32,
              borderRadius: "50%",
              background: "#eee",
              objectFit: "cover"
            }}
          />
          <span style={{ fontWeight: 500 }}>{cProfile.name || `User #${id_user}`}
            <span style={{ color: '#888', fontWeight: 400, fontSize: 13, marginLeft: 6 }}>
              @{cProfile.username || id_user}
            </span>
          </span>
        </div>
        <div style={{ color: "#27ae60", fontSize: 18, marginBottom: 4 }}>
          {[1, 2, 3, 4, 5].map((i) => (
            <span key={i} style={{ color: i <= rating ? "#27ae60" : "#bbb" }}>
              ★
            </span>
          ))}
        </div>
        <div
          style={{
            fontSize: 20,
            fontWeight: 400,
            marginBottom: 0,
            color: "#222",
            lineHeight: 1.3,
          }}
        >
          {comment}
        </div>
      </div>
      <div
        style={{
          width: 140,
          height: 140,
          background: "#ddd",
          borderRadius: 4,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          marginRight: 16,
        }}
      >
        {photo ? (
          <img
            src={photo}
            alt="review"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              borderRadius: 4,
            }}
          />
        ) : (
          <span style={{ color: "#666", fontSize: 16 }}>*Photo*</span>
        )}
      </div>
    </div>
  );
}

function AgrotourismDetail() {
  const { id } = useParams();
  const { user } = useUser();
  const [data, setData] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState("");
  const [rating, setRating] = React.useState(0);
  const [review, setReview] = React.useState("");
  const [photoURL, setPhotoURL] = React.useState("");
  const [reviews, setReviews] = React.useState([]);
  const [loadingReviews, setLoadingReviews] = React.useState(true);
  const [editReviewId, setEditReviewId] = React.useState(null);
  const [userProfiles, setUserProfiles] = React.useState({});

  // Fetch agrotourism detail
  React.useEffect(() => {
    const fetchDetail = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        if (!token) throw new Error("Token not found. Please login again.");
        const response = await fetch(`http://localhost:5000/agrotourism/${id}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          const errData = await response.json();
          throw new Error(errData.msg || "Failed to fetch agrotourism detail");
        }
        const detail = await response.json();
        setData(detail);
      } catch (err) {
        setError(err.message);
        setData(null);
      } finally {
        setLoading(false);
      }
    };
    fetchDetail();
  }, [id]);

  // Fetch reviews from backend
  const fetchReviews = React.useCallback(async () => {
    try {
      setLoadingReviews(true);
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:5000/agrotourism_reviews/agrotourism/${id}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) throw new Error("Failed to fetch reviews");
      const data = await response.json();
      setReviews(data);
    } catch (err) {
      setReviews([]);
    } finally {
      setLoadingReviews(false);
    }
  }, [id]);

  React.useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  // Fetch user profiles for reviews
  React.useEffect(() => {
    async function fetchProfiles() {
      const ids = Array.from(new Set(reviews.map(r => r.id_user).filter(Boolean)));
      const profiles = {};
      for (const id of ids) {
        if (!userProfiles[id]) {
          const profile = await fetchUserProfile(id);
          if (profile) profiles[id] = profile;
        }
      }
      setUserProfiles(prev => ({ ...prev, ...profiles }));
    }
    if (reviews.length) fetchProfiles();
    // eslint-disable-next-line
  }, [reviews]);

  if (loading) {
    return (
      <MainCard>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "50vh", fontSize: 18, color: "#666" }}>
          Loading agrotourism detail...
        </div>
      </MainCard>
    );
  }
  if (error || !data) {
    return (
      <MainCard>
        <div style={{ color: "#e74c3c", fontSize: 18 }}>{error || "Agrotourism not found."}</div>
      </MainCard>
    );
  }

  const handleCancel = () => {
    setRating(0);
    setReview("");
    setPhotoURL("");
    setEditReviewId(null);
  };

  // Submit or edit review
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!rating || !review.trim() || !photoURL.trim()) {
      notification.error({ message: "Please complete all fields!" });
      return;
    }
    const token = localStorage.getItem("token");
    const formData = new FormData();
    formData.append("id_agrowisata", id);
    formData.append("rating", rating);
    formData.append("review_text", review);
    formData.append("url_images", photoURL);
    try {
      let res;
      if (editReviewId) {
        // Edit review
        res = await fetch(`http://localhost:5000/agrotourism_reviews/${editReviewId}`, {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        });
        if (!res.ok) throw new Error("Failed to update review");
        notification.success({ message: "Review updated successfully!" });
      } else {
        // Create review
        res = await fetch(`http://localhost:5000/agrotourism_reviews`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        });
        if (!res.ok) throw new Error("Failed to submit review");
        notification.success({ message: "Review submitted successfully!" });
      }
      setRating(0);
      setReview("");
      setPhotoURL("");
      setEditReviewId(null);
      fetchReviews();
    } catch (err) {
      notification.error({ message: err.message || "Failed to submit review" });
    }
  };

  // Delete review
  const handleDeleteReview = async (id_agrowisata_reviews) => {
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`http://localhost:5000/agrotourism_reviews/${id_agrowisata_reviews}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) throw new Error("Failed to delete review");
      notification.success({ message: "Review deleted!" });
      if (editReviewId === id_agrowisata_reviews) {
        setEditReviewId(null);
        setRating(0);
        setReview("");
        setPhotoURL("");
      }
      fetchReviews();
    } catch (err) {
      notification.error({ message: err.message || "Failed to delete review" });
    }
  };

  // Edit review (populate form)
  const handleEditReview = (review) => {
    setEditReviewId(review.id_agrowisata_reviews);
    setRating(review.rating);
    setReview(review.review_text);
    setPhotoURL(review.url_images || "");
  };

  return (
    <MainCard>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 32,
          alignItems: "flex-start",
        }}
      >
        <div style={{ flex: 1, minWidth: 260 }}>
          <h2 style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: 10 }}>
            {data.name}
          </h2>
          <div style={{ color: "#222", fontSize: 16, marginBottom: 18, textAlign: "justify" }}>
            <div>{data.description}</div>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 18,
              marginBottom: 8,
            }}
          >
            <span
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                fontSize: 18,
              }}
            >
              <DollarCircleOutlined
                style={{ color: "#27ae60", fontSize: 20 }}
              />
              <span style={{ fontWeight: 500, fontSize: 18, color: "#222" }}>
                {data.ticket_price}
              </span>
            </span>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              marginBottom: 8,
            }}
          >
            <EnvironmentOutlined style={{ color: "#27ae60", fontSize: 20 }} />
            <span style={{ fontWeight: 500, fontSize: 18, color: "#222" }}>
              {data.city}, {data.province}
            </span>
          </div>
          <div style={{ marginTop: 18 }}>
            <a
              href={data.maps_url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                background: "#27ae60",
                color: "#fff",
                border: "none",
                borderRadius: 8,
                padding: "8px 32px",
                fontWeight: 600,
                fontSize: 16,
                textDecoration: "none",
                transition: "background 0.2s",
                display: "inline-block",
              }}
              onMouseEnter={e => (e.target.style.background = "#219150")}
              onMouseLeave={e => (e.target.style.background = "#27ae60")}
            >
              VISIT
            </a>
          </div>
        </div>
        <div
          style={{
            height: "100%",
            maxHeight: "100%",
            display: "flex",
            alignItems: "stretch",
            justifyContent: "flex-start",
            alignSelf: "flex-start",
            minWidth: 320,
            maxWidth: 500,
            flex: 1,
            marginTop: 48,
          }}
        >
          <img
            src={data.image_url || dumpict}
            alt={data.name}
            style={{
              height: "100%",
              width: "100%",
              objectFit: "cover",
              borderRadius: 16,
              background: "#f0f0f0",
              display: "block",
            }}
          />
        </div>
      </div>
      <h2
        style={{ fontSize: "1.3rem", fontWeight: 700, margin: "38px 0 16px 0" }}
      >
        {data.name} Reviews
      </h2>
      <form
        onSubmit={handleSubmit}
        style={{
          border: "1px solid #bbb",
          borderRadius: 10,
          padding: 24,
          background: "#fafbfc",
          position: "relative",
          width: "90%",
          marginBottom: 32,
          fontFamily: "Poppins, sans-serif",
        }}
      >
        <div
          style={{
            fontWeight: 600,
            fontSize: 17,
            marginBottom: 12,
            display: "flex",
            alignItems: "center",
            gap: 8,
            fontFamily: "Poppins, sans-serif",
          }}
        >
          <img
            src="https://img.icons8.com/ios-filled/24/27ae60/feedback.png"
            alt="review"
            style={{ width: 22, height: 22 }}
          />
          Write a Review
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            marginBottom: 8,
            fontFamily: "Poppins, sans-serif",
          }}
        >
          <img
            src={user?.photo_url || "https://api.dicebear.com/7.x/adventurer-neutral/svg?seed=User"}
            alt="profile"
            style={{
              width: 38,
              height: 38,
              borderRadius: "50%",
              objectFit: "cover",
            }}
          />
          <span style={{ fontWeight: 500 }}> {user?.name || user?.username || "User"} </span>
        </div>
        <StarRating value={rating} onChange={setRating} />
        <textarea
          placeholder="Share your experience about this place"
          style={{
            width: "100%",
            minHeight: 48,
            borderRadius: 6,
            border: "1px solid #e5e7eb",
            padding: 8,
            marginBottom: 8,
            resize: "vertical",
            fontFamily: "Poppins, sans-serif",
            fontSize: 16,
            outline: "none",
            transition: "border-color 0.2s",
          }}
          value={review}
          onChange={(e) => setReview(e.target.value)}
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
        <div
          style={{
            fontSize: 14,
            marginBottom: 4,
            fontFamily: "Poppins, sans-serif",
          }}
        >
          <span style={{ color: "#e74c3c" }}>*</span> Photo URL
        </div>
        <input
          type="text"
          placeholder="https://your-photo-url.com"
          style={{
            marginBottom: 12,
            width: "100%",
            borderRadius: 6,
            border: "1px solid #e5e7eb",
            padding: 6,
            fontFamily: "Poppins, sans-serif",
            fontSize: 16,
            outline: "none",
            transition: "border-color 0.2s",
          }}
          value={photoURL}
          onChange={(e) => setPhotoURL(e.target.value)}
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
        {editReviewId && (
          <div
            style={{
              color: "#27ae60",
              fontWeight: 500,
              marginBottom: 8,
              fontFamily: "Poppins, sans-serif",
            }}
          >
            Editing your review...
          </div>
        )}
        <div style={{ display: "flex", justifyContent: "flex-end", gap: 10 }}>
          <button
            type="button"
            onClick={handleCancel}
            style={{
              background: "none",
              border: "none",
              color: "#888",
              fontWeight: 500,
              fontSize: 15,
              cursor: "pointer",
              fontFamily: "Poppins, sans-serif",
              padding: "6px 22px",
              borderRadius: 8,
            }}
          >
            Cancel
          </button>
          <button
            type="submit"
            style={{
              background:
                !rating || !review.trim() || !photoURL.trim()
                  ? "#bfe4ce"
                  : "#27ae60",
              color: "#fff",
              border: "none",
              borderRadius: 8,
              padding: "6px 22px",
              fontWeight: 600,
              fontSize: 15,
              cursor:
                !rating || !review.trim() || !photoURL.trim()
                  ? "not-allowed"
                  : "pointer",
              opacity: !rating || !review.trim() || !photoURL.trim() ? 0.7 : 1,
              fontFamily: "Poppins, sans-serif",
              transition: "background 0.2s, opacity 0.2s",
            }}
            disabled={!rating || !review.trim() || !photoURL.trim()}
            onMouseEnter={(e) => {
              if (rating && review.trim() && photoURL.trim()) {
                e.target.style.background = "#219150";
              }
            }}
            onMouseLeave={(e) => {
              if (rating && review.trim() && photoURL.trim()) {
                e.target.style.background = "#27ae60";
              }
            }}
          >
            Submit
          </button>
        </div>
      </form>
      {/* Lottie animation if no reviews */}
      {(!loadingReviews && reviews.length === 0) && (
        <div style={{ width: 320, margin: "0 auto 16px auto" }}>
          <DotLottieReact
            src="https://lottie.host/your-animation-url.lottie"
            loop
            autoplay
            style={{ width: 320, height: 320 }}
          />
        </div>
      )}
      <div style={{ width: "95%" }}>
        {loadingReviews ? (
          <div>Loading reviews...</div>
        ) : reviews.length === 0 ? (
          <div style={{ color: "#888", textAlign: "center" }}>No reviews yet.</div>
        ) : (
          reviews.map((r) => (
            <ReviewCard
              key={r.id_agrowisata_reviews}
              id_user={r.id_user}
              rating={r.rating}
              comment={r.review_text}
              photo={r.url_images}
              isOwn={user && r.id_user === user.id_user}
              onDelete={() => handleDeleteReview(r.id_agrowisata_reviews)}
              onEdit={() => handleEditReview(r)}
              userProfiles={userProfiles}
            />
          ))
        )}
      </div>
    </MainCard>
  );
}

function AgrotourismList() {
  const [search, setSearch] = useState("");
  const [searchHover, setSearchHover] = useState(false);
  const [agrowisata, setAgrowisata] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAgrowisata = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        if (!token) throw new Error("Token not found. Please login again.");
        const response = await fetch("http://localhost:5000/agrotourism", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          const errData = await response.json();
          throw new Error(errData.msg || "Failed to fetch agrotourism");
        }
        const data = await response.json();
        setAgrowisata(data);
      } catch (err) {
        setError(err.message);
        setAgrowisata([]);
      } finally {
        setLoading(false);
      }
    };
    fetchAgrowisata();
  }, []);

  const filteredData = agrowisata.filter((item) =>
    item.name?.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <MainCard>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "50vh", fontSize: 18, color: "#666" }}>
          Loading agrotourism...
        </div>
      </MainCard>
    );
  }
  if (error) {
    return (
      <MainCard>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "50vh", fontSize: 18, color: "#e74c3c" }}>
          Error: {error}
        </div>
      </MainCard>
    );
  }

  return (
    <MainCard>
      <h1 style={styles.title}>Agrotourism</h1>
      <div
        style={{
          ...styles.searchWrapper,
          ...(searchHover ? styles.searchWrapperHover : {}),
        }}
        onMouseEnter={() => setSearchHover(true)}
        onMouseLeave={() => setSearchHover(false)}
      >
        <SearchOutlined
          style={{
            ...styles.searchIcon,
            ...(searchHover ? styles.searchIconHover : {}),
          }}
        />
        <input
          type="text"
          placeholder="Search..."
          style={styles.searchInput}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div style={styles.grid}>
        {filteredData.map((item) => (
          <AgrotourismCard
            key={item.id_agrowisata}
            {...item}
            onSeeDetails={() => navigate(`/agrotourism/${item.id_agrowisata}`)}
          />
        ))}
      </div>
    </MainCard>
  );
}

export default function Agrotourism() {
  const params = useParams();
  // Jika ada id di URL, tampilkan detail, jika tidak tampilkan daftar
  if (params.id) {
    return <AgrotourismDetail />;
  }
  return <AgrotourismList />;
}
