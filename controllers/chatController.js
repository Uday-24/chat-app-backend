const Chat = require('../models/Chat');
const User = require('../models/User');

exports.accessChat = async (req, res) => {
    const { userId } = req.body;
    if (!userId) {
        return res.status(400).json({ message: 'User ID is required' });
    }

    const loggedInId = req.user.userId;

    try {
        let chat = await Chat.findOne({
            isGroupChat: false,
            users: { $all: [loggedInId, userId], $size: 2 }
        }).populate('users', '-password').populate('latestMessage');
        chat = await User.populate(chat, {
            path: 'latestMessage.sender',
            select: 'username email'
        });
        
        if (chat) return res.json(chat);
        
        // Create a new chat
        const newChat = await Chat.create({
            chatName: 'sender',
            isGroupChat: false,
            users: [loggedInId, userId]
        });
        
        const fullChat = await Chat.findById(newChat._id).populate('users', '-password');

        res.status(201).json(fullChat);

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

exports.fetchChat = async (req, res) => {
    try {
        const chats = await Chat.find({ users: req.user.userId })
            .populate('users', '-password')
            .populate('groupAdmin', '-password')
            .populate('latestMessage')
            .sort({ 'updatedAt': -1 });

        const result = await User.populate(chats, {
            path: 'latestMessage.sender',
            select: 'username email'
        });

        res.json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}