import { useState } from "react";

export default function BlogForm({ onSubmit, initialData = {} }) {
  const [title, setTitle] = useState(initialData.title || "");
  const [content, setContent] = useState(initialData.content || "");
  const [image, setImage] = useState(initialData.image || "");
  const [category, setCategory] = useState(initialData.category || "");

  const submit = (e) => {
    e.preventDefault();
    onSubmit({ title, content, image, category });
  };

  return (
    <form className="form" onSubmit={submit}>
      <input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <input
        placeholder="Image URL"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />

      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
      />

      <input
        placeholder="Category (tech / life)"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />

      <button>Save</button>
    </form>
  );
}
