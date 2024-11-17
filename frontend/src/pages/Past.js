import React, { useEffect, useState } from 'react';
import { getPastChallenges } from '../services/api';
import '../styles/Past.css';

function Past() {
    const [challenges, setChallenges] = useState([]);

    useEffect(() => {
        const fetchChallenges = async () => {
            try {
                const fetchedChallenges = await getPastChallenges();
                
                // Format the challenges and reverse the order to display from last to first
                const formattedChallenges = fetchedChallenges.map(challenge => ({
                    beginner: challenge.beginnerWorkout,
                    intermediate: challenge.intermediateWorkout,
                    advanced: challenge.advancedWorkout
                })).reverse();  // Reverse the array

                setChallenges(formattedChallenges);
            } catch (error) {
                console.error('Error fetching challenges:', error);
            }
        };

        fetchChallenges();
    }, []);

    return (
        <div className='challenges'>
            <h1>Past Challenges</h1>
            <div className='challenge-boxes'>
                {challenges.length > 0 ? (
                    challenges.map((challenge, index) => (
                        <div className='challenge-box' key={index}>
                            <p><strong>Beginner:</strong> {challenge.beginner}</p>
                            <p><strong>Intermediate:</strong> {challenge.intermediate}</p>
                            <p><strong>Advanced:</strong> {challenge.advanced}</p>
                        </div>
                    ))
                ) : (
                    <h3>No challenge history</h3>
                )}
            </div>
        </div>
    );
}

export default Past;
