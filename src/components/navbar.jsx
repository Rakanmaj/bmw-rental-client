import { Link, useLocation, useNavigate } from "react-router-dom";
import "../styles/navbar.css";
import logo from "/assets/image.png";

function Navbar() {
  const { pathname } = useLocation();
  const navigate = useNavigate();  // Initialize the navigate hook

  // Check if user is logged in and if they are an admin
  const user = JSON.parse(localStorage.getItem("user"));  // Get user data from localStorage
  const isAdmin = user?.role === "admin";  // Check if the user has an 'admin' role

  const handleLogout = () => {
    // Clear user data from localStorage
    localStorage.removeItem("user");
    // Redirect to the homepage after logout
    navigate("/"); 
  };

  return (
    <nav className="navbar">
      <div className="brand">
        <div className="logo">
          <img src={logo} alt="BMW Rental Logo" />
        </div>
        <div className="brand-text">
          <h2>BMW Rental</h2>
          <small className="subtitle">PREMIUM EXPERIENCE</small>
        </div>
      </div>

      {/* SIGN IN or LOGOUT (LEFT SIDE) */}
      <div className="nav-left">
        {!user ? (  // If the user is not logged in, show the Sign In link
          <Link
            to="/auth"
            className={pathname === "/auth" ? "nav-link active" : "nav-link"}
          >
            Sign In
          </Link>
        ) : (
          <button
            className="nav-link" // Use the same CSS class as Sign In button for consistency
            onClick={handleLogout}  
          >
            Logout
          </button>
        )}
      </div>

      {/* CENTER LINKS */}
      <div className="links">
        <Link
          to="/"
          className={pathname === "/" ? "nav-link active" : "nav-link"}
        >
          Home
        </Link>

        <Link
          to="/cars"
          className={pathname === "/cars" ? "nav-link active" : "nav-link"}
        >
          Our Fleet
        </Link>

        <Link
          to="/about"
          className={pathname === "/about" ? "nav-link active" : "nav-link"}
        >
          About
        </Link>

        <Link
          to="/reservations"
          className={pathname === "/reservations" ? "nav-link active" : "nav-link"}
        >
          Reservations
        </Link>

        {/* If the user is an admin, show the Admin link */}
        {isAdmin && (
          <Link
            to="/admin"
            className={pathname === "/admin" ? "nav-link active admin-link" : "nav-link admin-link"}
          >
            Admin
          </Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
