import { NavLink } from "react-router-dom";
import { useContext, useState, useRef, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { FaBookOpenReader } from "react-icons/fa6";
import ThemeSwitcher from "../components/ThemeSwitcher";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="navbar">
      <NavLink to="/" className="logo">
        <FaBookOpenReader />
        BlogApp
      </NavLink>

      <div className="nav-links">
        <NavLink to="/" className="nav-item">
          Home
        </NavLink>

        <NavLink to="/about" className="nav-item">
          About
        </NavLink>
        <ThemeSwitcher />

        {user ? (
          <>
            <NavLink to="/create" className="nav-item">
              Create
            </NavLink>

            {/* Profile Dropdown */}
            <div className="profile-wrapper" ref={dropdownRef}>
              <div className="avatar-circle" onClick={() => setOpen(!open)}>
                {user.name.charAt(0).toUpperCase()}
              </div>

              {open && (
                <div className="profile-dropdown">
                  <div className="profile-info">
                    <div className="avatar-large">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    <h4>{user.name}</h4>
                    <p>{user.email}</p>
                  </div>

                  <button
                    className="logout-btn"
                    onClick={() => {
                      setOpen(false);
                      logout();
                    }}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </>
        ) : (
          <>
            <NavLink to="/login" className="nav-item">
              Login
            </NavLink>
            <NavLink to="/register" className="nav-item">
              Register
            </NavLink>
          </>
        )}
      </div>
    </nav>
  );
}