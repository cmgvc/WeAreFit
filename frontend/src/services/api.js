import { getUrl } from '../util/host.js';
export const fetchRandomWorkout = async () => {
    try {
        const response = await fetch(`${getUrl()}/api/challenge`); 
        return await response.json();
    } catch (error) {
        console.error('Error fetching the text file:', error);
    }
};

export const completeChallenge = async (userId, taskId, dateCompleted, difficulty) => {
    try {
        const response = await fetch(`${getUrl()}/api/progress/update`, {
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
        const response = await fetch(`${getUrl()}/api/progress/streak`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ userId })
        });
        const data = await response.json();
        return data.streak;
    } catch (error) {
        console.error('Error completing the challenge:', error);
    }
}   

export const getProgress = async (userId) => {
    try {
        const response = await fetch(`${getUrl()}/api/progress`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ userId })
        });
        const data =  await response.json();
        
        return data.difficulty;
    } catch (error) {
        console.error('Error fetching the progress:', error);
    }
}

export const getProgressByDate = async (userId, date) => {
    try {
        const response = await fetch(`${getUrl()}/api/progress`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ userId, date })
        });
        const data = await response.json();
        console.log(userId);
        console.log(data);
        return data;
    } catch (error) {
        console.error('Error fetching the progress:', error);
    }
}