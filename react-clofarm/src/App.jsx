import { Routes, Route } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import OnBoarding from "./pages/OnBoarding";
import Tutorial from "./pages/Tutorial";
import Artikel from "./pages/Article";
import Article from "./pages/Article";
import Home from "./pages/Home";
import Agrotourism from "./pages/Agrotourism";
import Community from "./pages/Community";
import Mentorship from "./pages/Mentorship";

function App() {
  return (
    <Routes>
      <Route path="/" element={<OnBoarding />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      {/* Semua fitur dibungkus MainLayout */}
      <Route element={<MainLayout />}>
        <Route path="/home" element={<Home />} />
        <Route path="/tutorial" element={<Tutorial />} />
        <Route path="/article" element={<Article />} />
        <Route path="/agrotourism" element={<Agrotourism />} />
        <Route path="/community" element={<Community />} />
        <Route path="/mentorship" element={<Mentorship />} />
        {/* Tambahkan fitur lain di sini */}
      </Route>
    </Routes>
  );
}

export default App;
