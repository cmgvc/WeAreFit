const Progress = require('../models/Progress.js');
const User = require('../models/User.js');
const { findUser } = require('../models/User.js');

// Handle complete a task
exports.completeTask = async (req, res) => {
    const {userId, taskId, dateCompleted, difficulty} = req.body;
    try {
        const user = await findUser(userId);
        if (!user) {
            return res.status(404).json({error: 'User not found'});
        }

        // Find if task is already completed for the day
        const task = await Progress.findOne({userId: user._id, taskId, dateCompleted});
        if (task) {
            return res.status(400).json({error: 'Task already completed'});
        }

        // Save the progress
        const progress = new Progress({userId: user._id, taskId, dateCompleted, difficulty});
        await progress.save();

        // Convert dateCompleted to Date object
        const today = new Date(dateCompleted);
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);

        // Handle streak logic
        if (user.lastCompletedDate) {
            const lastCompletedDateString = user.lastCompletedDate.toDateString();
            if (lastCompletedDateString === yesterday.toDateString()) {
                user.streak += 1; 
            } else if (lastCompletedDateString === todayString) {
                // do nothing
            } else {
                user.streak = 1; 
            }
        } else {
            user.streak = 1; 
        }
        user.lastCompletedDate = today;
        await user.save();
        res.status(201).json({message: 'Task completed successfully'});

    } catch (error) {
        res.status(500).json({error: 'Server error'});
    }
};

// Handle fetching progress by date
exports.getProgressByDate = async (req, res) => {
    const { userId, dateCompleted } = req.body;

    try {
        const targetDate = new Date(dateCompleted);
        targetDate.setHours(0, 0, 0, 0); // Set to start of the day

        const endDate = new Date(targetDate);
        endDate.setHours(23, 59, 59, 999); // Set to end of the day

        const user = await findUser(userId);
        if (!user) {
            return res.status(404).json({error: 'User not found'});
        }

        // Find progress for the user on that date
        const progress = await Progress.findOne({
            userId: user._id,
            dateCompleted: { $gte: targetDate, $lte: endDate }
        });

        if (!progress) {
            return res.status(404).json({ error: 'Progress not found for this date' });
        }
        res.status(200).json(progress);

    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};


// Handle update progress difficulty
exports.updateProgress = async (req, res) => {
    const { userId, taskId, dateCompleted, difficulty } = req.body;

    try {
        const user = await findUser(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Find the existing progress for the user for that date
        const progress = await Progress.findOne({ userId: user._id, taskId, dateCompleted });

        // If progress exists, delete it
        if (progress) {
            await Progress.deleteOne({ userId: user._id, taskId, dateCompleted });
        }

        // Now, create a new progress record with the updated difficulty
        const newProgress = new Progress({ userId: user._id, taskId, dateCompleted, difficulty });
        await newProgress.save();

        res.status(200).json({ message: 'Progress updated successfully', difficulty });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
}

// Handle delete progress
exports.deleteProgress = async (req, res) => {
    const userId = req.params.id;
    const { dateCompleted } = req.body;
    try {
        // Find user
        const user = await getUser(userId);
        if (!user) {
            return res.status(404).json({error: 'User not found'});
        }

        const progress = await Progress.findOneAndDelete({userId: user._id, dateCompleted});

        if (!progress) {
            return res.status(404).json({ message: 'Progress not found' });
        }
        res.status(200).json({ message: 'Progress deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
}   

exports.getStreak = async (req, res) => {   
    const { userId } = req.body;
    try {
        const user = await findUser(userId);
        if (!user) {
            return res.status(404).json({error: 'User not found'});
        }
        res.status(200).json({ streak: user.streak });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
}