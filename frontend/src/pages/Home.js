import React, { useState } from 'react'
import '../styles/Home.css';
import '../assets/about.txt';

function Home() {
    const [openChallenge, setOpenChallenge] = useState(false);
    const [beginnerChallenge, setBeginnerChallenge] = useState(false);
    const [intermediateChallenge, setIntermediateChallenge] = useState(false);
    const [advancedChallenge, setAdvancedChallenge] = useState(false);
    const toggleChallenge = () => {
        setOpenChallenge(true);
        setBeginnerChallenge(true);
    }
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
        <div className="description">
            <div className="slogan">
                CHALLENGE YOURSELF TODAY.
            </div>
            <div className="about">
                Turn fitness into a fun, social experience with daily challenges designed to keep you active and motivated. Each day, you’ll receive a new fitness prompt—whether it’s “Do 20 push-ups” or “Take a 15-minute walk”. Complete the challenge solo or invite friends to join the fun. Track your progress, share workout results with photos, and see your fitness scores rise as you stay engaged. Fitness is better together—start your journey with WeAreFit today!
            </div>
        </div>
        <div className="today">
            <div className="startTitle">
                START TODAY. START NOW.
            </div>
            <div className="challengeButton">
                <button onClick={toggleChallenge}>+ VIEW TODAY'S CHALLENGE</button>
            </div>
            <div className="hiddenChallenge" id={openChallenge ? "open" : "close"}>
                <div className="tabs">
                    <span className="beginner" onClick={toggleBeginner}>Beginner</span>
                    <span className="intermediate" onClick={toggleIntermediate}>Intermediate</span>
                    <span className="advanced" onClick={toggleAdvanced}>Advanced</span>
                </div>
                <div className="beginnerChallenge" id={beginnerChallenge ? "open" : "close"}>
                    <div> 
                        <b>5 Km Outdoor Run</b> Do 20 push-ups
                    </div>
                </div>
                <div className="intermediateChallenge" id={intermediateChallenge ? "open" : "close"}>
                    <div>
                        <b>10 Km Outdoor Run</b> Do 30 push-ups
                    </div>
                </div>
                <div className="advancedChallenge" id={advancedChallenge ? "open" : "close"}>
                    <div>
                        <b>15 Km Outdoor Run</b> Do 40 push-ups
                    </div>
                </div>
            </div>
        </div>
        <div className="connect">
        </div>
    </div>
    
  )
}

export default Home
