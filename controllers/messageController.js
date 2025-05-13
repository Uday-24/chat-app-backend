const Message = require('../models/Message');
const User = require('../models/User');
const Chat = require('../models/Chat');

exports.sendMessage = async (req, res) => { 
    console.log('Hello');
    const { content, chatId } = req.body;
    if(!content){
        return res.status(400).json({message: 'Please type message first'});
    }
    if(!chatId){
        return res.status(404).json({message: 'Chat not found'});
    }

    try{
        const newMessage = await Message.create({
            sender: req.user.userId,
            content,
            chat: chatId
        });

        let fullMessage = await newMessage.populate('sender', 'username email');
        fullMessage = await fullMessage.populate('chat');
        fullMessage = await User.populate(fullMessage, {
            path: 'chat.users',
            select: 'username email'
        });

        await Chat.findByIdAndUpdate(chatId, {latestMessage: fullMessage});

        res.status(201).json(fullMessage);
    }catch(error){
        res.status(500).json({ message: error.message });
    }
}

exports.getAllMessages = async (req, res) => {
  const { chatId } = req.params;

  try {
    const messages = await Message.find({ chat: chatId })
      .populate('sender', 'username email')
      .populate('chat');

    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
