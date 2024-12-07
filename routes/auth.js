const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

router.post('/register', async (req, res) => {
    const { username, password } = req.body;

    try {
        // Kiểm tra xem người dùng đã tồn tại chưa
        const existingUser  = await User.findOne({ username });
        if (existingUser ) {
            return res.status(400).json({ message: 'Tên người dùng đã tồn tại!' });
        }

        // Tạo người dùng mới
        const newUser  = new User({ username, password });
        await newUser .save();

        res.status(201).json({ message: 'Đăng ký thành công!' });
    } catch (error) {
        // Xử lý lỗi khác
        if (error.code === 11000) {
            return res.status(400).json({ message: 'Tên người dùng đã tồn tại!' });
        }
        res.status(500).json({ message: 'Đã xảy ra lỗi!', error });
    }
});

// Đăng nhập
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).send('Invalid credentials');
    }
    const token = jwt.sign({ id: user._id }, 'secret', { expiresIn: '1h' });
    res.json({ token });
});



module.exports = router;