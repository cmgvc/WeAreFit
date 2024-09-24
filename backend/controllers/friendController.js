const User = require('../models/User.js');
const { findUser } = require('../models/User.js');

// Add a friend
exports.addFriend = async (req, res) => {
    const { userId, friendId } = req.body;
    
    try {
        const user = await findUser(userId);
        if (!user) {
            return res.status(404).json({error: 'User not found'});
        }

        const friend = await findUser(friendId);
        if (!friend) {
            return res.status(404).json({error: 'Account not found'});
        }

        if (user.friends.includes(friend._id)) {
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
        const user = await findUser(userId);
        if (!user) {
            return res.status(404).json({error: 'User not found'});
        }
        res.status(200).json(user.friends);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
}

// Remove a friend
exports.deleteFriend = async (req, res) => {
    const { userId, friendId } = req.body;

    try {
        const user = await findUser(userId);
        if (!user) {
            return res.status(404).json({error: 'User not found'});
        }     

        const friend = await findUser(friendId);
        if (!friend) {
            return res.status(404).json({error: 'Account not found'});
        }  

        if (!user.friends.includes(friend._id)) {
            return res.status(404).json({ message: 'Friend not found' });
        }

        // Check if the friend exists in the user's friends list
        const friendIndex = user.friends.indexOf(friend._id);
        if (friendIndex === -1) {
            return res.status(404).json({ message: 'Friend not found' });
        }

        user.friends.splice(friendIndex, 1);
        await user.save();
        res.status(200).json({ message: 'Friend removed successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
}