import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import MapPage from "./pages/MapPage";
import CheckpointPage from "./pages/CheckpointPage";
import AdminLoginPage from "./pages/AdminLoginPage";
import AdminDashboard from "./pages/AdminDashboard";

function ProtectedAdminRoute({ children }) {
  const token = localStorage.getItem("adminToken");

  if (!token) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
}


function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/map/:bookId" element={<MapPage />} />
      <Route path="/checkpoint" element={<CheckpointPage />} />

      <Route path="/admin/login" element={<AdminLoginPage />} />
      <Route
          path="/admin"
          element={
            <ProtectedAdminRoute>
              <AdminDashboard />
            </ProtectedAdminRoute>
          }
        />
    </Routes>
  );
}

export default App;