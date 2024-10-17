import React, {useState} from 'react'
import '../styles/Auth.css';
import { register } from '../services/auth.js';
import { login } from '../services/auth.js';
import Popup from 'reactjs-popup';
import { Tabs } from '@mui/material';

function Auth() {
  const [user, setUser] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [authType, setAuthType] = useState(true);

  const handleRegister = async () => {
    try {
      const result = await register(username, email, password); 
      setEmail('');
      setPassword('');
      console.log(result); 
      if (result.error) {
        setErrorMessage(result.error);
        setIsPopupOpen(true);
      } else {
        window.location.href = '/login';
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
            window.location.href = '/dashboard';
        }
    } catch(error) {
        console.error('Error during login:', error);
    }
  }

  return (
    <div>
      <h1>{authType ? "LOGIN" : "REGISTER"}</h1>
      <div className="register-container" id={authType ? "login" : "register"}>
          <div className="tabs" id={authType ? "login" : "register"}>
              <div className="login-tab">
                <p onClick={() => setAuthType(true)}>Login</p>
              </div>
              <div className="register-tab">
                  <p onClick={() => setAuthType(false)}>Register</p>
              </div>
          </div>
          <p className="user">Email</p>
          <input className="user-field" type="text" id="user" name="user" onChange={(e) => setEmail(e.target.value)}/>&nbsp;

          <p className="username">Username</p>
          <input className="username-field" type="text" id="username" name="username" onChange={(e) => setUsername(e.target.value)}/>&nbsp;

          <p className="email">Email</p>
          <input className="email-field" type="email" id="email" name="email" onChange={(e) => setEmail(e.target.value)}/>&nbsp;

          <p className="password">Password</p>
          <input className="password" type="password" id="password" name="password" onChange={(e) => setPassword(e.target.value)}/>

          <div className="auth-button">
            {authType ? 
            <button onClick={handleLogin}>Login</button>  : 
            <button onClick={handleRegister} >Register</button> }
          </div>
          
      </div>
      <Popup className="popup" open={isPopupOpen} onClose={() => setIsPopupOpen(false)} position="right center" closeOnDocumentClick={false}>
          <div>{errorMessage}</div>
          <button className="popup-button" onClick={() => setIsPopupOpen(false)}>Close</button>
      </Popup>
    </div>
  )
}

export default Auth
