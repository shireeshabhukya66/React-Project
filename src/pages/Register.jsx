import { useState } from "react";
import { usersApi } from "../utils/api"              //usersApi is your Axios instance
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();      //Used later to redirect user to login page

  const submit = async (e) => {       //async because it makes API calls
    e.preventDefault();               //Prevents page reload on form submit

    // validation
    if (!name || !email || !password) {
      alert("All fields are required");
      return;             //stops function execution
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
    const existing = await usersApi.get(
      //Sends GET request to JSON Server
      `/users?email=${email.toLocaleLowerCase()}`,
    );
    if (existing.data.length) {
      alert("Email already registered");
      return;
    }

    // register user
    await usersApi.post("/users", {    //Sends POST request to backend
      name,
      email: email.toLowerCase(),
      password,
    });
    alert("Registered Successfully");
    navigate("/login");
  };

  return (
    <form className="form" onSubmit={submit}>
      <h2>Register</h2>
      <input
        placeholder="Name"
        value={name}          // connects input to state.
        onChange={(e) => setName(e.target.value)}
      />
      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"         //hides characters
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button>Register</button>
    </form>
  );
}