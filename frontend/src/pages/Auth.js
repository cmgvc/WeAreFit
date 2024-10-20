import React, {useEffect, useState} from 'react'
import '../styles/Auth.css';
import { register, login, logout } from '../services/auth.js';
import Popup from 'reactjs-popup';
import { useLocation } from 'react-router-dom';

function Auth() {
    const [user, setUser] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const location = useLocation();
    const [authType, setAuthType] = useState(true);
    const [auth, setAuth] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('authToken') !== null;
        if (token) {
            setAuth(true);
        }
    }, []);

    useEffect(() => {   
        if (location.state && location.state.setAuthType === false) {
            setAuthType(location.state.setAuthType);
        }
    }, [location.state]);        

    const handleRegister = async () => {
        try {
        const result = await register(username, email, password); 
        setEmail('');
        setUsername('');
        setPassword('');
        console.log(result); 
        if (result.error) {
            setErrorMessage(result.error);
            setIsPopupOpen(true);
        } else {
            setAuthType(true);
        }
        } catch (error) {
        console.error('Error during registration:', error);
        }
    };

    const handleLogin = async () => {
        try {
            const result = await login(email, password);
            setEmail('');
            setPassword('');
            if (result.error) {
                setErrorMessage(result.error);
                setIsPopupOpen(true);
            } else {
                setAuth(true);
                window.location.href = '/dashboard';
            }
        } catch(error) {
            console.error('Error during login:', error);
        }
    }

    const handleLogout = () => {
        logout();
        setAuth(false);
    }

    return (
        <div>
            {auth ? <div className="unauth"><button onClick={handleLogout}>Sign out</button></div> :
            <div>
                <h1>{authType ? "LOGIN" : "REGISTER"}</h1>
                <div className="register-container" id={authType ? "login" : "register"}>
                    <div className="tabs" id={authType ? "login" : "register"}>
                        <div className="login-tab">
                            <p onClick={() => {setAuthType(true); setEmail(''); setUsername(''); setPassword('')}}>Login</p>
                        </div>
                        <div className="register-tab">
                            <p onClick={() => {setAuthType(false); setEmail(''); setUsername(''); setPassword('')}}>Register</p>
                        </div>
                    </div>
                    <p className="user">Email</p>
                    <input className="user-field" 
                            type="text" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder='e.g. john_doe@gmail.com'
                        />&nbsp;

                    <p className="username">Username</p>
                    <input className="username-field" 
                            type="text" 
                            value={username} 
                            onChange={(e) => setUsername(e.target.value)} 
                            placeholder="e.g. john_doe"
                        />&nbsp;

                    <p className="email">Email</p>
                    <input className="email-field" 
                            type="text" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="e.g. john_doe@gmail.com"
                            />&nbsp;

                    <p className="password">Password</p>
                    <input className="password" 
                                type="password" 
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="e.g. password123"
                        />

                    <div className="auth-button">
                        {authType ? 
                        <button onClick={handleLogin}>Login</button>  : 
                        <button onClick={handleRegister} >Register</button> }
                    </div>
                    
                </div>
                <Popup className="popup" open={isPopupOpen} onClose={() => setIsPopupOpen(false)} position="right center" closeOnDocumentClick={false}>
                    <div className="error-message">{errorMessage}</div>
                    <button className="popup-button" onClick={() => setIsPopupOpen(false)}>Close</button>
                </Popup>
            </div>
         }
        </div>
    )
}

export default Auth
