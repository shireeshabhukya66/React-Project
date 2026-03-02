import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { postsApi } from "../utils/api";
import { AuthContext } from "../context/AuthContext";

export default function PostDetails() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  // FETCH POST
  useEffect(() => {
    postsApi.get(`/posts/${id}`).then((res) => setPost(res.data));
  }, [id]);

  // DELETE POST
  const handleDelete = async () => {
    if (window.confirm("Delete this post?")) {
      await postsApi.delete(`/posts/${id}`);
      navigate("/");
    }
  };

  // CHECK LIKE
  const hasLiked = user && post?.likedBy?.includes(user.email);

  // LIKE / UNLIKE
  const handleLike = async () => {
    if (!user) {
      alert("Login to like posts");
      return;
    }

    let updatedPost;

    if (hasLiked) {
      updatedPost = {
        ...post,
        likes: post.likes - 1,
        likedBy: (post.likedBy || []).filter((email) => email !== user.email),
      };
    } else {
      updatedPost = {
        ...post,
        likes: (post.likes || 0) + 1,
        likedBy: [...(post.likedBy || []), user.email],
      };
    }

    const res = await postsApi.put(`/posts/${id}`, updatedPost);
    setPost(res.data);
  };

  if (!post) return <p>Loading...</p>;

  const isAuthor = user && user.name === post.author;

  return (
    <div className="container">
      <div className="card post-details">
        <h2>{post.title}</h2>

        <p>{post.content}</p>

        <p>
          <b>Author:</b> {post.author}
        </p>

        <div className="like-section">
          <button onClick={handleLike}>
            {hasLiked ? "💔 Unlike" : "❤️ Like"}
          </button>
          <p>{post.likes || 0} likes</p>
        </div>

        {isAuthor && (
          <div className="actions">
            <Link to={`/edit/${post.id}`}>Edit</Link>
            <button onClick={handleDelete}>Delete</button>
          </div>
        )}
      </div>
    </div>
  );
}
