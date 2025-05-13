const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const { sendMessage, getAllMessages } = require('../controllers/messageController');

router.post('/', authMiddleware, sendMessage); // Send a message
router.get('/:chatId', authMiddleware, getAllMessages); // Get all messages for a chat

module.exports = router;