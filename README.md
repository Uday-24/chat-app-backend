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
├── controllers/ # Route logic
├── models/ # Mongoose schemas
├── routes/ # Express routes
├── sockets/ # Socket.io setup
├── middleware/ # Auth middleware
├── config/ # DB and other config
├── .env # Environment variables
├── server.js # Entry point
└── README.md


## 📦 Installation

git clone https://github.com/your-username/chat-app-backend.git
cd chat-app-backend
npm install
