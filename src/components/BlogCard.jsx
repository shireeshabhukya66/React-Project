import { Link } from "react-router-dom";

export default function BlogCard({ post }) {
  return (
    <div className="card">
      <h3>{post.title}</h3>

      <p>{post.content.slice(0, 100)}...</p>

      <Link to={`/post/${post.id}`} className="read-more">
        Read More
      </Link>
    </div>
  );
}
