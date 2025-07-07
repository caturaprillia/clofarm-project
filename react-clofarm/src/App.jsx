import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import OnBoarding from "./pages/OnBoarding";
import Tutorial from "./pages/Tutorial";
import TutorialDetail from "./pages/Tutorial/TutorialDetail";
import Article from "./pages/Article";
import Home from "./pages/Home";
import Agrotourism from "./pages/Agrotourism";
import Community from "./pages/Community";
import Mentorship from "./pages/Mentorship";
import MentorshipDetail from "./pages/Mentorship/mentorshipdetail";
import Profile from "./pages/Profile";
import ForgotPassword from "./pages/ForgotPassword";

// Komponen PrivateRoute
function PrivateRoute() {
  const token = localStorage.getItem("token");
  return token ? <Outlet /> : <Navigate to="/login" replace />;
}

// Komponen PublicRoute (untuk landing page, login, register)
function PublicRoute({ children }) {
  const token = localStorage.getItem("token");
  return token ? <Navigate to="/home" replace /> : children;
}

function App() {
  return (
    <Routes>
      {/* Public routes */}
      <Route
        path="/"
        element={
          <PublicRoute>
            <OnBoarding />
          </PublicRoute>
        }
      />
      <Route
        path="/login"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />
      <Route
        path="/register"
        element={
          <PublicRoute>
            <Register />
          </PublicRoute>
        }
      />
      <Route
        path="/forgot-password"
        element={
          <PublicRoute>
            <ForgotPassword />
          </PublicRoute>
        }
      />

      {/* {/* Private routes */}
      <Route element={<PrivateRoute />}>
        <Route element={<MainLayout />}>
          <Route path="/home" element={<Home />} />
          <Route path="/tutorial" element={<Tutorial />} />
          <Route path="/tutorial/:id" element={<TutorialDetail />} />
          <Route path="/article" element={<Article />} />
          <Route path="/agrotourism/:id" element={<Agrotourism />} />
          <Route path="/agrotourism" element={<Agrotourism />} />
          <Route path="/community" element={<Community />} />
          <Route path="/mentorship" element={<Mentorship />} />
          <Route path="/mentorship/:id" element={<MentorshipDetail />} />
          <Route path="/profile" element={<Profile />} />

          {/* Tambahkan fitur lain di sini */}
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
