import { useEffect, useState } from "react";
import { postsApi } from "../utils/api";
import BlogCard from "../components/BlogCard";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const POSTS_PER_PAGE = 3;

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await postsApi.get("/posts");
        setPosts(res.data);
      } catch (err) {
        setError("Failed to fetch posts");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  // search filter by title
  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(search.toLowerCase()),
  );

  // pagination logic
  const start = (page - 1) * POSTS_PER_PAGE;
  const paginatedPosts = filteredPosts.slice(start, start + POSTS_PER_PAGE);

  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);

  return (
    <div className="container">
      <h2>All Posts</h2>
      <input
        className="search-input"
        placeholder="Search blogs..."
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setPage(1); //reset to first page when searching
        }}
      />

      {/* Loading */}
      {loading && <p className="status">Loading posts...</p>}

      {/* Error */}
      {error && <p className="status error">{error}</p>}

      {/* Empty state */}
      {!loading && !error && paginatedPosts.length === 0 && (
        <p>No blogs found.</p>
      )}

      {/* Data */}
      {!loading &&
        !error &&
        paginatedPosts.map((post) => <BlogCard key={post.id} post={post} />)}

      {/* Pagination */}
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
  );
}