# Chat App Backend

This is a real-time chat application backend built with **Node.js**, **Express.js**, **MongoDB**, and **Socket.io**. It supports features like user authentication, one-on-one messaging, online presence, and more.

## 🚀 Features

- User registration and login with JWT authentication
- One-to-one private messaging
- Real-time messaging using Socket.io
- MongoDB for message persistence
- REST API for user and chat management

## 🛠 Tech Stack

- Node.js
- Express.js
- MongoDB + Mongoose
- Socket.io
- JWT (for authentication)
- Bcrypt.js (for password hashing)
- Dotenv (for environment configuration)

## 📁 Project Structure

chat-app-backend/
├── config/              # MongoDB connection and environment config
│
├── controllers/         # Logic for handling requests (auth, chat, messages)
│
├── middleware/          # Middleware (e.g., JWT auth verification)
│
├── models/              # Mongoose schemas (User, Chat, Message)
│
├── routes/              # Route definitions for APIs
│   ├── auth.routes.js
│   ├── user.routes.js
│   └── message.routes.js
│
├── sockets/             # Socket.io setup and event handling
│
├── .env                 # Environment variables (not pushed to GitHub)
├── .gitignore           # Ignore node_modules, env, etc.
├── server.js            # Entry point for the app
├── package.json         # Project config and dependencies
└── README.md            # Project documentation



## 📦 Installation

git clone https://github.com/your-username/chat-app-backend.git
cd chat-app-backend
npm install
