import { useState, useContext } from "react";
import { usersApi } from "../utils/api";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const submit = async e => {
        e.preventDefault();

        if (!email || !password) {
            alert("All fields are required");
            return;
        }

        const res = await usersApi.get(
            `/users?email=${email.trim().toLowerCase()}&password=${password.trim()}`
        );

        if (res.data.length) {
            login(res.data[0]);       //stores the user in localstorage
            alert("Login successful");
            navigate("/");
        } else {
            alert("Invalid credentials");     //wrong  email/password
        }
    };
    

    return (
        <form className="form" onSubmit={submit}>
            <h2>Login</h2>
            <input 
              placeholder="Email" 
              value={email} 
              onChange={e => setEmail(e.target.value)} 
            />
            <input 
              type="password" 
              value={password} 
              placeholder="Password"
              onChange={e => setPassword(e.target.value)}
            />
            <button>Login</button>
        </form>
    );
    }