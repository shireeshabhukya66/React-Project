export default function About() {
  return (
    <div className="container about-page">
      <h1>About BlogApp</h1>

      <p className="about-intro">
        BlogApp is a simple and modern blogging platform where users can share
        their thoughts, ideas, and stories with the world.
      </p>

      <div className="about-section">
        <h3>Our Mission</h3>
        <p>
          Our mission is to provide a clean and distraction-free space where
          writers can express themselves freely and readers can discover
          meaningful content.
        </p>
      </div>

      <div className="about-section">
        <h3>Features</h3>
        <ul>
          <li>Create and manage blog posts</li>
          <li>Like and interact with posts</li>
          <li>Author profile pages</li>
          <li>Secure login and registration</li>
        </ul>
      </div>

      <div className="about-section">
        <h3>Built With</h3>
        <p>React, React Router, JSON Server and custom CSS styling.</p>
      </div>

      <p className="about-closing">Thank you for being part of BlogApp ❤️</p>
    </div>
  );
}
