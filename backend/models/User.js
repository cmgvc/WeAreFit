const mongoose = require('mongoose');
const { completeTask } = require('../controllers/progressController');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    streak: { type: Number, default: 0 },
    lastCompletedDate: {type: Date}
});

module.exports = mongoose.model('User', userSchema);