import { useParams,useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { postsApi } from "../utils/api";
import BlogForm from "../components/BlogForm";

export default function EditPost() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [post, setPost] = useState(null);

    useEffect(() => {
        postsApi.get(`/posts/${id}`).then(res => setPost(res.data));
    }, [id]);

    const submit = async data => {
        await postsApi.put(`/posts/${id}`, { ...post, ...data });
        navigate("/");
    };

    return post && <BlogForm initialData={post} onSubmit={submit} />
}