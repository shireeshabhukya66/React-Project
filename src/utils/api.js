import axios from "axios";

// Blog posts API
export const postsApi = axios.create({
  baseURL: "http://localhost:5000"
});

// Users authentication API
export const usersApi = axios.create({
  baseURL: "http://localhost:5001"
});
