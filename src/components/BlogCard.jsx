import { Link } from "react-router-dom";

const blogImages = [
  "https://images.unsplash.com/photo-1499750310107-5fef28a66643",
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
  "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
  "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
  "https://images.unsplash.com/photo-1522202176988-66273c2fd55f",
];

export default function BlogCard({ post, index }) {
  const image = post.image ? post.image : blogImages[index % blogImages.length];

  return (
    <div className="card">
      <img src={image} alt={post.title} className="card-image" />

      <div className="card-content">
        <h3>{post.title}</h3>

        <p>{post.content.substring(0, 120)}...</p>

        <div className="card-meta">
          <span>👤 {post.author}</span>
          <span>❤️ {post.likes || 0}</span>
        </div>

        <Link to={`/post/${post.id}`} className="read-more">
          Read More →
        </Link>
      </div>
    </div>
  );
}