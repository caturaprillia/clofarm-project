import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import OnBoarding from "./pages/OnBoarding";
import Tutorial from "./pages/Tutorial";

function App() {
  return (
    <Routes>
      <Route path="/" element={<OnBoarding />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/tutorial" element={<Tutorial />} />
    </Routes>
  );
}

export default App;
