import React, { useState, useEffect } from 'react';
import { getUsername } from '../services/auth';
import { formattedDate } from '../util/date.js';
import { fetchRandomWorkout } from '../services/api'; // Assuming you have this API call centralized
import LoadingButton from '@mui/lab/LoadingButton'; // Import LoadingButton
import '../styles/Dashboard.css';

function Dashboard() {
    const [beginnerChallenge, setBeginnerChallenge] = useState(true); // Start with beginner challenge active
    const [beginner, setBeginner] = useState('');
    const [intermediateChallenge, setIntermediateChallenge] = useState(false);
    const [intermediate, setIntermediate] = useState('');
    const [advancedChallenge, setAdvancedChallenge] = useState(false);
    const [advanced, setAdvanced] = useState('');
    const [loading, setLoading] = useState(false); // Loading state

    const user = getUsername();

    useEffect(() => {
        // Fetch the workout challenges when the component mounts
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

    // Functions to toggle challenge levels
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

    return (
        <div>
            <h1>Hi there, {user}!</h1>
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
                            <button>+ COMPLETE</button>
                        </div>
                    </div>
                )}
        </div>
    );
}

export default Dashboard;
