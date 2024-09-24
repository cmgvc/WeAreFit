const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    streak: { type: Number, default: 0 },
    lastCompletedDate: { type: Date },
    friends: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
});

const User = mongoose.model('User', userSchema);

const findUser = async (userId) => {
    const user = await User.findOne({ username: userId }); 
    if (!user) {
        return null;
    }
    return user;
}

module.exports = { User, findUser };
