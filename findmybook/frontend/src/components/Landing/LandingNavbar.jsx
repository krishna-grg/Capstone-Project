import { useNavigate } from "react-router-dom";

function LandingNavbar() {
  const navigate = useNavigate();

  return (
    <nav className="landing-navbar">
      <span className="navbar-brand" onClick={() => navigate("/")}>
        📚 UNK Library
      </span>

      <div className="navbar-links">
        <a href="#">Home</a>
        <a href="#">About</a>
        <a href="#">Help</a>

        <button
          className="admin-nav-btn"
          onClick={() => navigate("/admin/login")}
        >
          Admin
        </button>
      </div>
    </nav>
  );
}

export default LandingNavbar;