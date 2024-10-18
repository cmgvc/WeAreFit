import React, { useState, useEffect } from 'react';
import { getUsername } from '../services/auth';
import '../styles/Dashboard.css';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { getStreak } from '../services/api';
import ChallengeContainer from '../components/ChallengeContainer.js';

function Dashboard() {
    const [auth, setAuth] = useState(false);
    const user = getUsername();
    const [streak, setStreak] = useState(0);

    useEffect(() => { 
        const token = localStorage.getItem('authToken') !== null;
        if (token) {
            setAuth(true);
        }
    }, []);

    useEffect(() => {
        const fetchStreak = async () => {
            try {
                const streakValue = await getStreak(user);
                setStreak(streakValue);
            } catch (error) {
                console.error('Error fetching streak:', error);
            }
        };
        fetchStreak();
    }, [auth, user]);

    return (
        <div>
            {auth ? <h1>Hi there, {user}!</h1> : 
                <div className="heading">
                    <h1>Welcome</h1>
                    <h3>Please sign in</h3>
                    <button onClick={() => window.location.href = '/auth'}>SIGN IN</button>
                </div>}
                <ChallengeContainer />
            { auth ? 
                <div className="progress-dates"> 
                    <h2>{streak} DAY STREAK</h2>
                    <Calendar
                        // onChange={handleDateChange}
                        // value={date}
                        tileContent={({ date, view }) => {
                        
                        }}
                    />
                </div> : null }
        </div>
    );
}

export default Dashboard;
