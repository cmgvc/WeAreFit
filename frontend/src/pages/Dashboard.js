import React, { useState, useEffect } from 'react';
import { getUsername } from '../services/auth';
import { formattedDate } from '../util/date.js';
import { fetchRandomWorkout, completeChallenge } from '../services/api'; 
import LoadingButton from '@mui/lab/LoadingButton'; 
import Popup from 'reactjs-popup';
import '../styles/Dashboard.css';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { getStreak } from '../services/api';

function Dashboard() {
    const [beginnerChallenge, setBeginnerChallenge] = useState(true); 
    const [beginner, setBeginner] = useState('');
    const [intermediateChallenge, setIntermediateChallenge] = useState(false);
    const [intermediate, setIntermediate] = useState('');
    const [advancedChallenge, setAdvancedChallenge] = useState(false);
    const [advanced, setAdvanced] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [loading, setLoading] = useState(false); 
    const [auth, setAuth] = useState(false);
    const user = getUsername();
    const [streak, setStreak] = useState(0);

    useEffect(() => {
        const loadWorkoutChallenges = async () => {
            setLoading(true);
            try {
                const data = await fetchRandomWorkout();
                setBeginner(data.beginnerWorkout);
                setIntermediate(data.intermediateWorkout);
                setAdvanced(data.advancedWorkout);
            } catch (error) {
                console.error('Error fetching workout challenges:', error);
            } finally {
                setLoading(false);
            }
        };
        loadWorkoutChallenges();
    }, []);

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

    const toggleBeginner = () => {
        setBeginnerChallenge(true);
        setIntermediateChallenge(false);
        setAdvancedChallenge(false);
    }

    const toggleIntermediate = () => {
        setIntermediateChallenge(true);
        setBeginnerChallenge(false);
        setAdvancedChallenge(false);
    }

    const toggleAdvanced = () => {
        setAdvancedChallenge(true);
        setBeginnerChallenge(false);
        setIntermediateChallenge(false);
    }

    const handleChallengeComplete = async () => {
        setLoading(true);
        try {
            const userId = user;
            const taskId = beginnerChallenge ? beginner : intermediateChallenge ? intermediate : advanced;
            const dateCompleted = formattedDate;
            const difficulty = beginnerChallenge ? 'beginner' : intermediateChallenge ? 'intermediate' : 'advanced';
            const result = await completeChallenge(userId, taskId, dateCompleted, difficulty);
            if (result.error) {
                setErrorMessage(result.error);
                setIsPopupOpen(true);
            }
        } catch (error) {
            console.error('Error completing the challenge:', error);
        } finally {
            setLoading(false);
        }
        
    };

    return (
        <div>
            {auth ? <h1>Hi there, {user}!</h1> : 
                <div className="heading">
                    <h1>Welcome</h1>
                    <h3>Please sign in</h3>
                    <button onClick={() => window.location.href = '/auth'}>SIGN IN</button>
                </div>}
            {loading ? (
                <LoadingButton loading style={{ marginTop: '3rem', marginBottom: '3rem' }} />
            ) : (
                <div className="challenge">
                    <div className="tabs">
                        <span className="beginnerChallenge" id={beginnerChallenge ? 'active' : 'inactive'} onClick={toggleBeginner}>Beginner</span>
                        <span className="intermediateChallenge" id={intermediateChallenge ? 'active' : 'inactive'} onClick={toggleIntermediate}>Intermediate</span>
                        <span className="advancedChallenge" id={advancedChallenge ? 'active' : 'inactive'} onClick={toggleAdvanced}>Advanced</span>
                    </div>

                    <div className="beginnerChallenge" id={beginnerChallenge ? "open" : "close"}>
                        <div className="leftText"> 
                            <b>{beginner}</b>
                            <p>{formattedDate}</p>
                        </div>
                    </div>
                    <div className="intermediateChallenge" id={intermediateChallenge ? "open" : "close"}>
                        <div className="leftText">
                            <b>{intermediate}</b>
                            <p>{formattedDate}</p>
                        </div>
                    </div>
                    <div className="advancedChallenge" id={advancedChallenge ? "open" : "close"}>
                        <div className="leftText">
                            <b>{advanced}</b>
                            <p>{formattedDate}</p>
                        </div>
                    </div>

                    <div className='complete'>
                        <button onClick={handleChallengeComplete}>+ COMPLETE</button>
                    </div>
                    <Popup className="popup" open={isPopupOpen} onClose={() => setIsPopupOpen(false)} position="right center" closeOnDocumentClick={false}>
                        <div className="error-message">{errorMessage}</div>
                        <button className="popup-button" onClick={() => setIsPopupOpen(false)}>Close</button>
                    </Popup>
                </div>
            )}
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
