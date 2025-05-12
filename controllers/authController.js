const { json } = require('express');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

const register = async (req, res, next) => {
    try {
        let { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({ message: 'All fields are require' });
        }

        const existingUser = await User.findOne({ $or: [{ email, username }] });
        if (existingUser) {
            return res.status(409).json({ message: 'Email or Username already in use' });
        }

        const user = await User.create({
            username,
            email,
            password
        });

        const token = jwt.sign(
            {
                userId: user._id,
                username: user.username,
                email: user.email
            },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );

        res.status(201).json({ message: 'User register successfully', token });

    } catch (error) {
        next(error);
    }
}

const login = async (req, res, next) => {
    try {
        let { identifier, password } = req.body;

        if (!identifier || !password) {
            return res.status(400).json({ message: 'All fields are require' });
        }

        const user = await User.findOne({
            $or: [
                { email: identifier },
                { username: identifier }
            ]
        });

        if(!user || !(await user.matchPassword(password))){
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign(
            {
                userId: user._id,
                username: user.username,
                email: user.email
            },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );

        res.status(200).json({message: 'Login success', token});

    } catch (error) {
        next(error);
    }
}

module.exports = {
    register,
    login
}