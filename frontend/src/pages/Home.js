import React, { useState } from 'react'
import '../styles/Home.css';
import '../assets/about.txt';

function Home() {
    const today = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = today.toLocaleDateString('en-US', options);
    const [openChallenge, setOpenChallenge] = useState(false);
    const [beginnerChallenge, setBeginnerChallenge] = useState(false);
    const [beginner, setBeginner] = useState('');
    const [intermediateChallenge, setIntermediateChallenge] = useState(false);
    const [intermediate, setIntermediate] = useState('');
    const [advancedChallenge, setAdvancedChallenge] = useState(false);
    const [advanced, setAdvanced] = useState('');

    const fetchRandomBeginner = async () => {
        try {
          const response = await fetch('/beginner.txt'); 
          const text = await response.text();
          const lines = text.split('\n');
          const randomIndex = Math.floor(Math.random() * lines.length);
          setBeginner(lines[randomIndex].trim());
        } catch (error) {
          console.error('Error fetching the text file:', error);
        }
    };
    const fetchRandomIntermediate = async () => {
        try {
          const response = await fetch('/intermediate.txt'); 
          const text = await response.text();
          const lines = text.split('\n');
          const randomIndex = Math.floor(Math.random() * lines.length);
          setIntermediate(lines[randomIndex].trim());
        } catch (error) {
          console.error('Error fetching the text file:', error);
        }
    };
    const fetchRandomAdvanced = async () => {
        try {
          const response = await fetch('/advanced.txt'); 
          const text = await response.text();
          const lines = text.split('\n');
          const randomIndex = Math.floor(Math.random() * lines.length);
          setAdvanced(lines[randomIndex].trim());
        } catch (error) {
          console.error('Error fetching the text file:', error);
        }
    };

    const toggleChallenge = () => {
        setOpenChallenge(true);
        toggleBeginner();
    }
    const toggleBeginner = () => {
        setBeginnerChallenge(true);
        setIntermediateChallenge(false);
        setAdvancedChallenge(false);
        fetchRandomBeginner();
    }
    const toggleIntermediate = () => {
        setIntermediateChallenge(true);
        setBeginnerChallenge(false);
        setAdvancedChallenge(false);
        fetchRandomIntermediate();
    }
    const toggleAdvanced = () => {
        setAdvancedChallenge(true);
        setBeginnerChallenge(false);
        setIntermediateChallenge(false);
        fetchRandomAdvanced();
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
                <button className="challengeButton" id={openChallenge ? "true" : "false"} onClick={toggleChallenge}>+ VIEW TODAY'S CHALLENGE</button>
            </div>
            <div className="hiddenChallenge" id={openChallenge ? "open" : "close"}>
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
            </div>
        </div>
        <div className="connect">
        </div>
    </div>
    
  )
}

export default Home
