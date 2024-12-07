const express = require('express');
const Reservation = require('../models/Reservation');
const router = express.Router();

// Tạo đặt chỗ mới
router.post('/', async (req, res) => {
    const reservation = new Reservation(req.body);
    await reservation.save();
    res.status(201).send('Reservation created');
});

// Lấy danh sách đặt chỗ của người dùng
router.get('/', async (req, res) => {
    const reservations = await Reservation.find({ user_id: req.user.id });
    res.json(reservations);
});

// Xóa đặt chỗ
router.delete('/:id', async (req, res) => {
    await Reservation.findByIdAndDelete(req.params.id);
    res.send('Reservation deleted');
});

module.exports = router;