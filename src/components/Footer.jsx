import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-brand">
          <h3>BlogApp</h3>
          <p>Share your thoughts with the world.</p>
        </div>

        <div className="footer-links">
          <Link to="/">Home</Link>
          <Link to="/create">Create Post</Link>
          <Link to="/about">About</Link>
          <Link to="/login">Login</Link>
        </div>

        <div className="footer-copy">
          © {new Date().getFullYear()} BlogApp. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
