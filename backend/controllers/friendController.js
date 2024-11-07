const User = require('../models/User.js');
const { findUser } = require('../models/User.js');

// Add a friend
exports.addFriend = async (req, res) => {
    const { userId, friendId } = req.body;
    
    try {
        const user = await findUser(userId);
        if (!user) {
            console.log('User not found');
            return res.status(404).json({ error: 'User not found' });
        }

        const friend = await findUser(friendId);
        if (!friend) {
            console.log('Account not found');
            return res.status(404).json({ error: 'Account not found' });
        }

        if (user.friends.includes(friendId)) {
            console.log('Already friends');
            return res.status(400).json({ message: 'Already friends' });
        }

        user.friends.push(friendId);
        await user.save();
        res.status(201).json({ message: 'Friend added successfully' });
    } catch (error) {
        console.error('Error adding friend:', error);
        res.status(500).json({ error: 'Server error' });
    }
}

// Get all friends
exports.getFriends = async (req, res) => {
    const { userId } = req.params;

    try {
        const user = await findUser(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        friends = user.friends;
        res.status(200).json(friends);
    } catch (error) {
        console.error('Error fetching friends:', error);
        res.status(500).json({ error: 'Server error' });
    }
}

// Remove a friend
exports.deleteFriend = async (req, res) => {
    const { userId, friendId } = req.body;

    try {
        const user = await findUser(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const friendIndex = user.friends.indexOf(friendId);
        if (friendIndex === -1) {
            return res.status(404).json({ message: 'Friend not found' });
        }

        user.friends.splice(friendIndex, 1);
        await user.save();
        res.status(200).json({ message: 'Friend removed successfully' });
    } catch (error) {
        console.error('Error removing friend:', error);
        res.status(500).json({ error: 'Server error' });
    }
}
