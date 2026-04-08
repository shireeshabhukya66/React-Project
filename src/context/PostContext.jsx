import { createContext, useState } from "react";

export const PostContext = createContext();

export function PostProvider({ children }) {
  const [posts, setPosts] = useState([]);

  const [bookmarks, setBookmarks] = useState(() => {
    const saved = localStorage.getItem("bookmarks");
    return saved ? JSON.parse(saved) : [];
  });

  const toggleBookmark = (post) => {
    let updated;

    if (bookmarks.find((p) => p.id === post.id)) {
      updated = bookmarks.filter((p) => p.id !== post.id);
    } else {
      updated = [...bookmarks, post];
    }

    setBookmarks(updated);
    localStorage.setItem("bookmarks", JSON.stringify(updated));
  };

  return (
    <PostContext.Provider
      value={{ posts, setPosts, bookmarks, toggleBookmark }}
    >
      {children}
    </PostContext.Provider>
  );
}
