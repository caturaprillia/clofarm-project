import { Routes, Route } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import OnBoarding from "./pages/OnBoarding";
import Tutorial from "./pages/Tutorial";
import Artikel from "./pages/Article";
import Article from "./pages/Article";

function App() {
  return (
    <Routes>
      <Route path="/" element={<OnBoarding />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      {/* Semua fitur dibungkus MainLayout */}
      <Route element={<MainLayout />}>
        <Route path="/tutorial" element={<Tutorial />} />
        <Route path="/article" element={<Article />} />
        {/* Tambahkan fitur lain di sini */}
      </Route>
    </Routes>
  );
}

export default App;
