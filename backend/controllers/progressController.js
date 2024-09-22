const Progress = require('../models/Progress');
const User = require('../models/User');

// Handle complete a task
exports.completeTask = async (req, res) => {
    try {
        const {userId, taskId, dateCompleted, difficulty} = req.body;
        const progress = new Progress({userId, taskId, difficulty}); 
        await progress.save();

        const today = new Date(dateCompleted);
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);
        const user = await User.find({userId});

        if (user.lastCompletedDate && user.lastCompletedDate.toDateString() === yesterday.toDateString()) {
            user.streak += 1;
        } else {
            user.streak = 1;
        }
        await user.save();
        res.status(201).json({message: 'Task completed successfully'});
    } catch (error) {
        res.status(500).json({error: 'Server error'});
    }
}

// Handle fetching progress by date
exports.getProgressByDate = async (req, res) => {
    const {userId, date} = req.body;

    try {
        const targetDate = new Date(date);
        targetDate.setHours(0, 0, 0, 0); // set to start of the day
        
        const endDate = new Date(date);
        endDate.setHours(23, 59, 59, 999); // set to end of the day

        const progress = await Progress.find({userId, dateCompleted: {$gte: targetDate, $lt: endDate}});
        res.json(progress);
    
    } catch (error) {
        res.status(500).json({error: 'Server error'});
    }
}

// Handle update progress difficulty
exports.updateProgress = async (req, res) => {
    const userId = req.params.id;
    const {difficulty} = req.body;
    
    try {
        const progress = Progress.find({userId});
        if (!progress) {
            return this.completeTask(req, res);
        }  
        progress.difficulty = difficulty;
        await progress.save();
    } catch (error ) {
        res.status(500).json({error: 'Server error'});
    }
}

// Handle delete progress
exports.deleteProgress = async (req, res) => {
    const userId = req.params.id;
    const {dateCompleted} = req.body;
    try {
        const progress = await Progress.findOneAndDelete({userId, dateCompleted});

        if (!progress) {
            return res.status(404).json({ message: 'Progress not found' });
        }
        res.status(200).json({ message: 'Progress deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
}