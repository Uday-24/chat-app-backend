const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const dotenv = require('dotenv');
const morgan = require('morgan');
const connectDB = require('./config/db');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Connect to db
connectDB();

// Middleware to parse JSON
app.use(express.json());
// Use morgan to log requests
app.use(morgan('dev'));
// Security middlewares
app.use(helmet()); // Secure HTTP headers
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(rateLimit({
    windowMs: 15 * 60 * 1000, // 15 Minutes
    max: 100, // Limit each IP to 100 requests per windoMs
    message: 'Too many requests from this ip, please try again later'
}));

// Route to check server
app.get('/', (req, res)=>{
    res.send('Chat App Backend API is running!');
});

// Handle Socket.io connection
io.on('connection', (socket) => {
    console.log('A new user connected', socket.id);

    socket.on('send_message', (message) => {
        io.emit('receive_message', message);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log('Srever is running');
});