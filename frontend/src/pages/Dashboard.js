import React, { useState, useEffect } from 'react';
import { getUsername } from '../services/auth';
import '../styles/Dashboard.css';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Popup from 'reactjs-popup';
import { getStreak, getFriendsList, addFriendRequest } from '../services/api';
import ChallengeContainer from '../components/ChallengeContainer.js';

function Dashboard() {
    const [auth, setAuth] = useState(true);
    const user = getUsername();
    const [streak, setStreak] = useState(0);
    const [errorMessage, setErrorMessage] = useState('');
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [friendInput, setFriendInput] = useState('');
    const [friendsList, setFriendsList] = useState([]);
    const [friendStreaks, setFriendStreaks] = useState({}); 

    const requestFriend = async () => {
        try {
            const friend = document.querySelector('.add-friend input').value;
            const response = await addFriendRequest(user, friend);
            setFriendInput('');
            if (response.status === 400) {
                setErrorMessage(response.message);
                setIsPopupOpen(true);
                return;
            }  
            setFriendsList(prevList => [...prevList, friend]);
        } catch (error) {
            console.error('Error adding friend:', error);
        }
    }

    const fetchFriendStreaks = async (friends) => {
        const streaks = {};
        for (let friend of friends) {
            try {
                const streakValue = await getStreak(friend);
                streaks[friend] = streakValue;
                streaks[user] = streak;
            } catch (error) {
                console.error('Error fetching streak for friend:', friend, error);
            }
        }
        setFriendStreaks(streaks); 
    };

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

    useEffect(() => {   
        const getFriends = async () => {
            try {
                const friends = await getFriendsList(user);
                setFriendsList(friends); 
                console.log(friends.length);
                fetchFriendStreaks(friends); 
            } catch (error) {
                console.error('Error fetching friends list:', error);
            }  
        };
        getFriends();
    }, [auth, user]);

    useEffect(() => {
        if (Object.keys(friendStreaks).length > 0) {
            const updatedFriendsList = [...friendsList];
            if (!updatedFriendsList.includes(user)) {
                updatedFriendsList.push(user);
            }
            const sortedFriends = updatedFriendsList.sort((a, b) => {
                const streakA = friendStreaks[a] || 0;
                const streakB = friendStreaks[b] || 0;
                return streakB - streakA; 
            });
            setFriendsList(sortedFriends);  
        }
    }, [friendStreaks]);  

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
            <div>
                <div className='user-info'>
                    <div className="progress-dates"> 
                        <h2>{streak} DAY STREAK</h2>
                        <Calendar
                            // onChange={handleDateChange}
                            // value={date}
                            tileContent={({ date, view }) => {
                            
                            }}
                        />
                    </div> 
                    <div className='friends-list'>
                        <h1>FRIENDS</h1>
                        <div className='friends-boxes'>
                            {friendsList.length > 0 ? (friendsList.filter(friend => friend !== user).map(friend => (
                                <div className='friends-box' key={friend}>
                                    <p>{friend}</p>
                                </div>
                            ))) : <h3>No friends yet</h3>}
                        </div>
                        <div className='add-friend'>
                            <input 
                                type='text' 
                                placeholder='Enter username' 
                                value={friendInput} 
                                onChange={e => setFriendInput(e.target.value)}
                            />
                            <button onClick={requestFriend}>ADD</button>
                        </div>
                        <Popup className="popup" open={isPopupOpen} onClose={() => setIsPopupOpen(false)} position="right center" closeOnDocumentClick={false}>
                            <div className="error-message">{errorMessage}</div>
                            <button className="popup-button" onClick={() => 
                                setIsPopupOpen(false)}>Close</button>
                        </Popup>
                    </div>
                </div>
                <div className='leaderboard'>
                    <h1>LEADERBOARD</h1>
                    <div className='leader-boxes'>
                        {friendsList.length > 0 ? (friendsList.map((friend, index) => (
                            <div className='leader-box' key={friend}>
                                <p>{index + 1}.&nbsp; {friend}</p>&nbsp;
                                <p>{friendStreaks[friend] || 'Loading...'} day streak</p>
                            </div>
                        ))) : <h3>No friends yet</h3>}
                    </div>
                </div>
            </div>: null }
        </div>
    );
}

export default Dashboard;
