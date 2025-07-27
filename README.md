# 🔗 URL Shortener (MERN Stack)

A sleek, modern, and mobile-friendly URL Shortener built using the MERN stack. Create short links, share them instantly, and manage them with ease.

## ✨ Features

- 🔐 User authentication (JWT-based)
- 🔗 Create short URLs from long ones
- 🆔 Custom aliases (optional)
- 📊 Click tracking (optional)
- 🧼 Modern, minimal UI built with Tailwind CSS
- 🌓 Dark mode ready
- 📱 Fully responsive on all devices
- 🌐 Built with Vite + React 19, Express 5, MongoDB, and Redux Toolkit

---

## 📁 Project Structure

```bash
📦 root/
 ┣ 📁 backend/         # Express + MongoDB API
 ┣ 📁 frontend/        # React + Vite + Tailwind UI
 ┣ 📄 README.md        # You're here!
 ┣ 📄 .env             # Environment variables
 ┣ 📄 package.json     # Root config (if monorepo)


----
```
⚙️ Tech Stack
Frontend:

  React 19 + Vite
  
  Redux Toolkit
  
  React Query
  
  Tailwind CSS
  
  Axios
  
  ESLint

Backend:

  Express 5
  
  MongoDB + Mongoose
  
  nanoid for unique short IDs
  
  JWT for authentication
  
  Bcrypt for password hashing
  
  dotenv & cookie-parser

````

----


🧑‍💻 Getting Started

Prerequisites
  Node.js >= 18
  MongoDB running locally or cloud (e.g., MongoDB Atlas)

1. Clone the repository
````
bash
git clone https://github.com/your-username/url-shortener.git
cd url-shortener

```

2. Setup Backend
```
bash
cd backend
npm install
```
----
Create a .env file inside backend/:

```
env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

```

----
Start the backend server:
```
bash
npm run dev
```

----
3. Setup Frontend
```
bash
cd ../frontend
npm install
npm run dev
```
The app will be running at: http://localhost:5173


----
🤝 Contributing
Contributions are welcome! Please fork the repo and submit a pull request.
----

