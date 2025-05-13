const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const { accessChat, fetchChat } = require('../controllers/chatController');

router.post('/', authMiddleware, accessChat);     // Create or get 1-1 chat
router.get('/', authMiddleware, fetchChat);      // Get all chats of user

module.exports = router;
