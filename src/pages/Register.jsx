import { useState } from "react";
import { usersApi } from "../utils/api"
import { useNavigate } from "react-router-dom";

export default function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const submit = async e => {
        e.preventDefault();

        // validation
        if (!name || !email || !password) {
            alert("All fields are required");
            return;
        }

        if (!email.includes("@")) {
            alert("Enter a valid email");
            return;
        }

        if (password.length < 6) {
            alert("Password must be at least 6 characters");
            return;
        }


        // check if user already exists
        const existing = await usersApi.get(`/users?email=${email.toLocaleLowerCase()}`);
        if (existing.data.length) {
            alert("Email already registered");
            return;
        }

        // register user
        await usersApi.post("/users", { name, email:email.toLowerCase(), password });
        alert("Registered Successfully");
        navigate("/login");
    };

    return (
        <form className="form" onSubmit={submit}>
            <h2>Register</h2>
            <input 
              placeholder="Name"
              value={name} 
              onChange={e => setName(e.target.value)} 
            />
            <input 
              placeholder="Email"
              value={email} 
              onChange={e => setEmail(e.target.value)} 
            />
            <input 
              type="password" 
              placeholder="Password"
              value={password} 
              onChange={e => setPassword(e.target.value)} />
            <button>Register</button>
        </form>
    );
}