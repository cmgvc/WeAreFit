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

        const task = await Progress.findOne({userId: user._id, taskId, dateCompleted});
        if (task) {
            return res.status(400).json({error: 'Task already completed'});
        }

        const progress = new Progress({userId: user._id, taskId, dateCompleted, difficulty});
        await progress.save();

        const today = new Date(dateCompleted);
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);


        // handle streak logic
        const lastCompletedDateString = user.lastCompletedDate.toDateString();
        if (lastCompletedDateString === yesterday.toDateString()) {
            user.streak += 1; 
        } else if (lastCompletedDateString === todayString) {
            // do nothing
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

    if (dateCompleted && isNaN(Date.parse(dateCompleted))) {
        return res.status(400).json({ error: 'Invalid date format' });
    }

    const dateToUse = dateCompleted ? new Date(dateCompleted) : new Date();

    try {
        const targetDate = new Date(dateToUse);
        targetDate.setUTCHours(0, 0, 0, 0); 
        const endDate = new Date(targetDate);
        endDate.setUTCHours(23, 59, 59, 999); 

        const user = await findUser(userId);
        if (!user) {
            console.log('User not found');
            return res.status(404).json({ error: 'User not found' });
        }

        const progress = await Progress.findOne({
            userId: user._id,
            dateCompleted: { $gte: targetDate, $lt: endDate }
        });


        if (!progress) {
            console.log('Progress not found for this date');
            return res.status(404).json({ error: 'Progress not found for this date' });
        }
        
        res.status(200).json(progress);
    } catch (error) {
        console.error('Server error:', error); 
        res.status(500).json({ error: 'Server error' });
    }
};

// Handle update progress difficulty
exports.updateProgress = async (req, res) => {
    const { userId, taskId, difficulty } = req.body;
    const dateCompleted = new Date();

    if (!userId || !taskId) {
        console.log('Missing userId or taskId');
        return res.status(400).json({ error: 'User ID and Task ID are required.' });
    }

    try {
        const user = await findUser(userId);

        if (!user) {
            console.log('User not found');
            return res.status(404).json({ error: 'User not found' });
        }

        const todayStart = new Date(dateCompleted);
        todayStart.setUTCHours(0, 0, 0, 0);
        const todayEnd = new Date(todayStart);
        todayEnd.setUTCHours(23, 59, 59, 999);

        const existingProgress = await Progress.findOne({
            userId: user,
            dateCompleted: { $gte: todayStart, $lt: todayEnd }
        });
        console.log('Existing progress:', existingProgress);

        if (existingProgress) {
            // attempt to delete the existing progress
            const deleteResult = await Progress.deleteOne({
                userId: user,
                dateCompleted: { $gte: todayStart, $lt: todayEnd }
            });
            console.log('Delete result:', deleteResult);

            // check if a document was deleted
            if (deleteResult.deletedCount === 0) {
                console.log('No progress found to delete');
            } else {
                console.log('Progress deleted successfully');
            }
        } else {
            console.log('No progress found to delete');
        }

        // save new progress with updated difficulty
        const newProgress = new Progress({ userId: user._id, taskId, dateCompleted: todayStart, difficulty });
        await newProgress.save();
        console.log('New progress saved:', newProgress);

        // handle streak logic
        const yesterday = new Date(todayStart);
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayString = yesterday.toDateString();
        const lastCompletedDateString = user.lastCompletedDate ? user.lastCompletedDate.toDateString() : null;

        if (lastCompletedDateString === yesterdayString) {
            user.streak += 1;
            console.log('Streak incremented:', user.streak);
        } else if (lastCompletedDateString === todayStart.toDateString()) {
            console.log('Progress already completed for today');
        } else {
            user.streak = 1;
            console.log('Streak reset to 1');
        }

        user.lastCompletedDate = todayStart;
        await user.save();
        console.log('User streak and last completed date updated:', user.streak, user.lastCompletedDate);

        res.status(200).json({ message: 'Progress updated successfully', difficulty });
    } catch (error) {
        console.error('Server error:', error);
        res.status(500).json({ error: 'Server error' });
    }
};


// Handle delete progress
exports.deleteProgress = async (req, res) => {
    const userId = req.params.id;
    const { dateCompleted } = req.body;
    try {
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
            return res.status(404).json({ error: 'User not found' });
        }

        const today = new Date();
        today.setUTCHours(0, 0, 0, 0); 
        const yesterday = new Date(today);
        yesterday.setUTCDate(today.getUTCDate() - 1); 
        const todayString = today.toUTCString(); 
        const yesterdayString = yesterday.toUTCString();

        const lastCompletedDateString = user.lastCompletedDate ? new Date(user.lastCompletedDate).toUTCString() : null;

        let streak = 0; 
        if (lastCompletedDateString === todayString) {
            streak = user.streak; 
        } else if (lastCompletedDateString === yesterdayString) {
            streak = user.streak; 
        }

        res.status(200).json({ streak });

    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};
