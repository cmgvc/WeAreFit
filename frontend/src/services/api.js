
export const fetchRandomWorkout = async () => {
    try {
        const response = await fetch(`https://wearefit.onrender.com/api/challenge`); 
        return await response.json();
    } catch (error) {
        console.error('Error fetching the text file:', error);
    }
};

export const completeChallenge = async (userId, taskId, dateCompleted, difficulty) => {
    try {
        const response = await fetch(`https://wearefit.onrender.com/api/progress/update`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ userId, taskId, dateCompleted, difficulty })
        });
        return await response.json();
    } catch (error) {
        console.error('Error completing the challenge:', error);
    }
}

export const getStreak = async (userId) => {
    try {
        const response = await fetch(`https://wearefit.onrender.com/api/progress/streak`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ userId })
        });
        const data = await response.json();
        console.log(data)
        return data.streak;
    } catch (error) {
        console.error('Error completing the challenge:', error);
    }
}