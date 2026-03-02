import { useContext } from "react";
import { postsApi } from "../utils/api";
import { AuthContext } from "../context/AuthContext";
import BlogForm from "../components/BlogForm";
import { useNavigate } from "react-router-dom";

export default function CreatePost() {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    const submit = async data => {
        await postsApi.post("/posts", { ...data, author: user.name });
        navigate("/");
    };

    return <BlogForm onSubmit={submit} />;
}