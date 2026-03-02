import { useState } from "react";

export default function BlogForm({ onSubmit, initialData = {} }) {
    const [title, setTitle] = useState(initialData.title || "");
    const [content, setContent] = useState(initialData.content || "");
    
    const submit = e => {
        e.preventDefault();
        onSubmit({ title, content });
    };

    return (
        <form className="form" onSubmit={submit}>
            <input
              placeholder="Title"
              value={title}
              onChange={e => setTitle(e.target.value)}
              required
            />
            <textarea
              placeholder="Content"
              value={content}
              onChange={e => setContent(e.target.value)}
              required
            />
            <button>Save</button>
        </form>
    );
}