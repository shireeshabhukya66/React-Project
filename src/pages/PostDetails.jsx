import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState, useContext, useRef } from "react";
import { postsApi } from "../utils/api";
import { AuthContext } from "../context/AuthContext";
import { FiShare } from 'react-icons/fi';
import { PostContext } from "../context/PostContext";
import { FaBookmark } from "react-icons/fa";


export default function PostDetails() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [showShare, setShowShare] = useState(false);
  const shareRef = useRef(null);
  const [commentText, setCommentText] = useState("");
  const { bookmarks, toggleBookmark } = useContext(PostContext);

  const isBookmarked = post && bookmarks.find((p) => p.id === post.id);


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

  // SHARE OPTION
  const handleShare = () => {
    setShowShare(!showShare);
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (shareRef.current && !shareRef.current.contains(event.target)) {
        setShowShare(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);


  // COMMENTS SECTION
  const handleAddComment = async () => {
    if (!user) {
      alert("Login to comment");
      return;
    }

    if (!commentText.trim()) return;

    const newComment = {
      id: Date.now(),
      user: user.name,
      text: commentText,
    };

    const updatedPost = {
      ...post,
      comments: [...(post.comments || []), newComment],
    };

    const res = await postsApi.put(`/posts/${id}`, updatedPost);
    setPost(res.data);
    setCommentText("");
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
      <div className="post-body">
        <h1 className="post-title">{post.title}</h1>

        <div className="post-meta">
          <span>👤 {post.author}</span>
        </div>

        <p className="post-content">{post.content}</p>

        <div className="like-section">
          <button className="like-btn" onClick={handleLike}>
            {hasLiked ? "🖤 Unlike" : "🤍 Like"}
          </button>

          <span className="like-count">{post.likes || 0} likes</span>
        </div>

        <div className="share-section" ref={shareRef}>
          <button className="share-btn" onClick={handleShare}>
            <FiShare />
          </button>

          {showShare && (
            <input
              type="text"
              value={`${window.location.origin}/post/${post.id}`}
              readOnly
              className="share-link"
              onClick={(e) => e.target.select()}
            />
          )}
        </div>

        <div className="comment-section">
          <h3>Comments</h3>

          {/* Add Comment */}
          <div className="comment-input">
            <input
              type="text"
              placeholder="Write a comment..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
            />

            <button onClick={handleAddComment}>Post</button>
          </div>

          {/* Comment List */}
          <div className="comment-list">
            {(post.comments || []).map((c) => (
              <div key={c.id} className="comment-item">
                <strong> 👤 {c.user}</strong>
                <p>{c.text}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="actions">
          {isAuthor && (
            <>
              <Link to={`/edit/${post.id}`} className="edit-btn">
                Edit
              </Link>

              <button className="delete-btn" onClick={handleDelete}>
                Delete
              </button>
            </>
          )}

          <button
            className={`bookmark-btn ${isBookmarked ? "saved" : ""}`}
            onClick={() => toggleBookmark(post)}
          >
            <FaBookmark className="bookmark-icon" />
          </button>
        </div>
      </div>
    </div>
  </div>
);
}