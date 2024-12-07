const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

// Import các route
const authRoutes = require('./routes/auth');
const serviceRoutes = require('./routes/services');
const reservationRoutes = require('./routes/reservations');

const app = express();
const PORT = process.env.PORT || 3000;

// Chuỗi kết nối MongoDB
const MONGODB_URI = 'mongodb+srv://dohoanglong903:NEOnYLemGBkXOOnr@nodejs.atrat.mongodb.net/'; // Thay thế bằng chuỗi kết nối của bạn

// Kết nối đến MongoDB
mongoose.connect(MONGODB_URI)
    .then(() => {
        console.log('Kết nối đến MongoDB thành công!');
    })
    .catch(err => {
        console.error('Kết nối đến MongoDB thất bại:', err);
    });

// Thiết lập middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Định nghĩa các route
app.use('/auth', authRoutes);
app.use('/services', serviceRoutes);
app.use('/reservations', reservationRoutes);

// Trang chủ
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html')); // Sử dụng path.join để đảm bảo tính tương thích
});

// Khởi động server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});