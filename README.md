# 📝 Blog App (React + JSON Server)

A modern full-stack style Blog Application built using **React, Context API, Axios, React Router and JSON Server**.  
This app allows users to register, login, create, edit, delete and like blog posts with authentication and protected routes.

---

## Live Features

✅ User Authentication (Register & Login)  
✅ Protected Routes (Only logged-in users can create/edit posts)  
✅ Create, Edit & Delete Blog Posts  
✅ Like / Unlike functionality ❤️  
✅ Author-based access control  
✅ Search blogs by title  
✅ Pagination for better performance  
✅ Persistent login using LocalStorage  
✅ Responsive & clean UI  

---

## Tech Stack

### Frontend
- React (Vite)
- React Router DOM
- Context API
- CSS3

### ⚙️ Backend (Mock API)
- JSON Server
- Axios

---

## Folder Structure
src
│── components
│ ├── BlogCard.jsx
│ ├── BlogForm.jsx
│ ├── Navbar.jsx
│ └── ProtectedRoute.jsx
│
│── context
│ └── AuthContext.jsx
│
│── pages
│ ├── Home.jsx
│ ├── CreatePost.jsx
│ ├── EditPost.jsx
│ ├── PostDetails.jsx
│ ├── Login.jsx
│ └── Register.jsx
│
│── utils
│ └── api.js


---

## Installation & Setup

### Clone the repository

```bash
git clone https://github.com/shireeshabhukya66/React-Project.git
cd React-Project

npm install

npx json-server --watch db.json --port 5000
npx json-server --watch db1.json --port 5001

npm run dev

API Endpoints
Posts → http://localhost:5000/posts
Users → http://localhost:5001/users

Author
Shireesha Bhukya
shireeshabhukya66@gmail.com
GitHub: https://github.com/shireeshabhukya66
