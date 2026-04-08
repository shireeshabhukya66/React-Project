import { useEffect, useState, useContext } from "react";
import { postsApi } from "../utils/api";
import BlogCard from "../components/BlogCard";
import { Link } from "react-router-dom";
import Skeleton from "../components/Skeleton";
import { PostContext } from "../context/PostContext";

const blogImages = [
  "https://images.unsplash.com/photo-1499750310107-5fef28a66643",
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
  "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
  "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
  "https://images.unsplash.com/photo-1522202176988-66273c2fd55f",
];

export default function Home() {
  const { posts, setPosts } = useContext(PostContext);

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [category, setCategory] = useState("all");

  const POSTS_PER_PAGE = 3;

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await postsApi.get("/posts");
        setPosts(res.data);
      } catch {
        setError("Failed to fetch posts");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [setPosts]);

  // FIXED FILTER
  const filteredPosts = posts.filter((post) => {
    const matchSearch = post.title.toLowerCase().includes(search.toLowerCase());

    const matchCategory = category === "all" || post.category === category;

    return matchSearch && matchCategory;
  });

  // pagination
  const start = (page - 1) * POSTS_PER_PAGE;
  const paginatedPosts = filteredPosts.slice(start, start + POSTS_PER_PAGE);
  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);

  return (
    <div className="container">
      <h2>All Posts</h2>

      {/* FILTER BAR */}
      <div className="filter-bar">
        <input
          className="search-input"
          placeholder="Search blogs..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
        />

        <select
          className="category-dropdown"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="all">All</option>
          <option value="tech">Tech</option>
          <option value="life">Life</option>
          <option value="education">Education</option>
          <option value="business">Business</option>
        </select>
      </div>

      <div className="home-layout">
        {/* TRENDING */}
        {!loading && posts.length > 0 && (
          <div className="trending-sidebar">
            <h3>Trending Posts</h3>

            <div className="trending-grid">
              {posts
                .slice()
                .sort(() => Math.random() - 0.5)
                .slice(0, 6)
                .map((post, index) => (
                  <Link
                    key={post.id}
                    to={`/post/${post.id}`}
                    className="trending-card"
                  >
                    <img
                      src={
                        post.image?.trim()
                          ? post.image
                          : blogImages[index % blogImages.length]
                      }
                      alt={post.title}
                    />

                    <div className="trending-content">
                      <h4>{post.title}</h4>
                      <span>❤️ {post.likes || 0}</span>
                    </div>
                  </Link>
                ))}
            </div>
          </div>
        )}

        {/* POSTS */}
        <div className="posts-section">

          {/* SKELETON */}
          {loading &&
            Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} />)}

          {/* ERROR */}
          {error && <p className="status error">{error}</p>}

          {/* EMPTY */}
          {!loading && !error && paginatedPosts.length === 0 && (
            <p>No blogs found.</p>
          )}

          {/* POSTS */}
          {!loading &&
            !error &&
            paginatedPosts.map((post, index) => (
              <BlogCard key={post.id} post={post} index={index} />
            ))}

          {/* PAGINATION */}
          {!loading && !error && totalPages > 1 && (
            <div className="pagination">
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  className={page === i + 1 ? "active" : ""}
                  onClick={() => setPage(i + 1)}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
