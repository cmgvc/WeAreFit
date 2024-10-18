import React, { useState } from 'react';
import '../styles/Home.css';
import '../assets/about.txt';
import PersonIcon from '@mui/icons-material/Person';
import LoadingButton from '@mui/lab/LoadingButton';
import { useNavigate } from 'react-router-dom';
import ChallengeContainer from '../components/ChallengeContainer.js';

function Home() {
    const [openChallenge, setOpenChallenge] = useState(false);
    const [loading, setLoading] = useState(false);
    const joinNowRedirect = '/auth';

    return (
        <div>
            <div className="description">
                <div className="slogan">
                    CHALLENGE YOURSELF TODAY.
                </div>
                <div className="about">
                    Turn fitness into a fun, social experience with daily challenges designed to keep you active and motivated. Each day, you’ll receive a new fitness prompt—whether it’s “Do 20 push-ups” or “Take a 15-minute walk.” Complete the challenge solo or invite friends to join the fun. Track your progress, share workout results with photos, and see your fitness scores rise as you stay engaged. Fitness is better together—start your journey with WeAreFit today!
                </div>
            </div>
            <div className="today">
                <div className="startTitle">
                    START TODAY. START NOW.
                </div>
                <div className="challengeButton">
                    {loading ? (
                        <LoadingButton loading style={{ marginTop: '3rem', marginBottom: '3rem' }} />
                    ) : (
                        <button 
                            className="challengeButton" 
                            id={openChallenge ? "true" : "false"} 
                            onClick={() => setOpenChallenge(true)}
                        >
                            + VIEW TODAY'S CHALLENGE
                        </button>
                    )}
                </div>
                {openChallenge && (
                    <ChallengeContainer />
                )}
            </div>
            <div className="connect">
                <div className="connectButton">
                    <button><PersonIcon /><a href={joinNowRedirect}>JOIN NOW</a></button>
                </div>
                <div className="connectTitle">
                    COMPETE, CONNECT... <br /> GET FIT TOGETHER!
                </div>
            </div>
            <div className="connectDescription">
                Add friends to your profile and see their recent activity to stay motivated and inspired. Track your longest completion streaks and compare them with friends to see who’s on top. Our dynamic leaderboard showcases top performers across various filters such as streak length, quickest completion times, and more. Celebrate your friends’ achievements with personalized shoutouts and send friendly reminders to keep them engaged. Whether you’re cheering each other on or setting up new challenges, WeAreFit makes it easy to stay connected and motivated in your fitness journey.
            </div>
        </div>
    );
}

export default Home;
