import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);

  console.log("Navbar user:", user); // DEBUG

  return (
    <nav className="navbar">
      <Link to="/" className="logo">BlogApp</Link>

      <div className="nav-links">
        {user ? (
          <>
            <span className="username">{user.name}</span>
            <Link to="/create">Create</Link>
            <button onClick={logout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/register">Register</Link>
            <Link to="/login">Login</Link>
          </>
        )}
      </div>
    </nav>
  );
}