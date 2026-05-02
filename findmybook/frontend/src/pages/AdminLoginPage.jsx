import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { adminLogin } from "../api/adminApi";

function AdminLoginPage() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("admin123");
  const [error, setError] = useState("");

  async function handleLogin(e) {
    e.preventDefault();
    setError("");

    try {
      const data = await adminLogin(username, password);

      localStorage.setItem("adminToken", data.token);
      localStorage.setItem("adminRole", data.role);

      navigate("/admin");
    } catch (err) {
      setError("Invalid admin username or password");
    }
  }

  return (
    <div className="admin-login-page">
      <div className="admin-login-card">
        <h1>Admin Login</h1>
        <p>Login to manage books, shelves, nodes, and edges.</p>

        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Admin username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <input
            type="password"
            placeholder="Admin password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && <p className="admin-error">{error}</p>}

          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}

export default AdminLoginPage;