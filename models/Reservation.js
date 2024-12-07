const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User ' },
    service_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Service' },
    date: { type: String, required: true },
    time: { type: String, required: true },
    number_of_people: { type: Number, required: true }
});

module.exports = mongoose.model('Reservation', reservationSchema);