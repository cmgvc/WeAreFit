const User = require('../models/User.js');

// Add a friend
exports.addFriend = async (req, res) => {
    const { userId, friendId } = req.body;
    
    try {
        const user = await User.find({userId});
        const friend = await User.find({friendId})

        if (!friend) {
            return res.status(404).json({ message: 'Friend not found' });
        }

        if (user.friends.includes(friendId)) {
            return res.status(400).json({ message: 'Already friends' });
        }
        user.friends.push(friend);
        await user.save();
        res.status(201).json({ message: 'Friend added successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }

}

// Get all friends
exports.getFriends = async (req, res) => {
    const { userId } = req.params;

    try {
        const user = await User.findById(userId).populate('friends', 'username')
        res.status(200).json(user.friends);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
}

// Remove a friend
exports.deleteFriend = async (req, res) => {
    const { userId, friendId } = req.body;

    try {
        const user = await User.find({userId});
        
        if (!user.friends.includes(friendId)) {
            return res.status(404).json({ message: 'Friend not found' });
        }
        user.friends = user.friends.filter(friend => friend.toString() !== friendId);
        await user.save();
        res.status(200).json({ message: 'Friend removed successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
}