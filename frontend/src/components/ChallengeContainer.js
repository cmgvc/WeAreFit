import React, { useState, useEffect } from 'react';
import { formattedDate } from '../util/date.js';
import { fetchRandomWorkout, completeChallenge, getProgressByDate } from '../services/api'; 
import '../styles/ChallengeContainer.css';
import Popup from 'reactjs-popup';
import LoadingButton from '@mui/lab/LoadingButton';
import { getUsername } from '../services/auth.js';

const ChallengeContainer = () => {
    const [beginnerChallenge, setBeginnerChallenge] = useState(true); 
    const [beginner, setBeginner] = useState('');
    const [intermediateChallenge, setIntermediateChallenge] = useState(false);
    const [intermediate, setIntermediate] = useState('');
    const [advancedChallenge, setAdvancedChallenge] = useState(false);
    const [advanced, setAdvanced] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [completedChallengeDifficulty, setCompletedChallengeDifficulty] = useState(null);
    const user = getUsername();
    const auth = localStorage.getItem('authToken');

    useEffect(() => {
        const loadWorkoutChallenges = async () => {
            setLoading(true);
            const storedChallenges = sessionStorage.getItem('workoutChallenges');
            
            if (storedChallenges) {
                const data = JSON.parse(storedChallenges);
                setBeginner(data.beginner);
                setIntermediate(data.intermediate);
                setAdvanced(data.advanced);
            } else {
                try {
                    const data = await fetchRandomWorkout();
                    setBeginner(data[0].beginnerWorkout);
                    setIntermediate(data[0].intermediateWorkout);
                    setAdvanced(data[0].advancedWorkout);
                    sessionStorage.setItem('workoutChallenges', JSON.stringify({
                        beginner: data[0].beginnerWorkout,
                        intermediate: data[0].intermediateWorkout,
                        advanced: data[0].advancedWorkout,
                    }));
                } catch (error) {
                    setBeginner('No challenge available today');
                    setIntermediate('No challenge available today');
                    setAdvanced('No challenge available today');
                    console.error('Error fetching workout challenges:', error);
                }
            }
            setLoading(false);
        };
        loadWorkoutChallenges();
    }, []); 

    useEffect(() => {
        const loadProgress = async () => {
            try {
                const savedDifficulty = await getProgressByDate(user, formattedDate);
                if (savedDifficulty) {
                    setCompletedChallengeDifficulty(savedDifficulty.difficulty);
                }
            } catch (error) {
                console.error('Error loading progress:', error);
            }
        };
        loadProgress();
    }, [user]); 

    const toggleBeginner = () => {
        setBeginnerChallenge(true);
        setIntermediateChallenge(false);
        setAdvancedChallenge(false);
        sessionStorage.setItem('challengeDifficulty', 'beginner');
    };

    const toggleIntermediate = () => {
        setIntermediateChallenge(true);
        setBeginnerChallenge(false);
        setAdvancedChallenge(false);
        sessionStorage.setItem('challengeDifficulty', 'intermediate');
    };

    const toggleAdvanced = () => {
        setAdvancedChallenge(true);
        setBeginnerChallenge(false);
        setIntermediateChallenge(false);
        sessionStorage.setItem('challengeDifficulty', 'advanced');
    };

    const handleChallengeComplete = async () => {
        setLoading(true);
        const difficulty = beginnerChallenge ? 'beginner' : intermediateChallenge ? 'intermediate' : 'advanced';
        if (!auth) {
            window.location.href = '/auth';
            return;
        }
        try {
            const taskId = beginnerChallenge ? beginner : intermediateChallenge ? intermediate : advanced;
            const result = await completeChallenge(user, taskId, difficulty);

            if (result.error) {
                setErrorMessage(result.error);
                setIsPopupOpen(true);
            } else {
                setCompletedChallengeDifficulty(difficulty);
                localStorage.setItem('completedChallengeDifficulty', difficulty);
            }
        } catch (error) {
            console.error('Error completing the challenge:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
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
                    <button onClick={handleChallengeComplete} disabled={completedChallengeDifficulty === (beginnerChallenge ? 'beginner' : intermediateChallenge ? 'intermediate' : 'advanced')}>+ COMPLETE</button>
                </div>
                <Popup className="popup" open={isPopupOpen} onClose={() => setIsPopupOpen(false)} position="right center" closeOnDocumentClick={false}>
                    <div className="error-message">{errorMessage}</div>
                    <button className="popup-button" onClick={() => setIsPopupOpen(false)}>Close</button>
                </Popup>
            </div>
            )}
        </div>
    );
};

export default ChallengeContainer;
