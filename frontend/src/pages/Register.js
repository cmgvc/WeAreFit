import React, {useState} from 'react'
import '../styles/Register.css';
import { register } from '../services/auth.js';
import Popup from 'reactjs-popup';
import { Tabs } from '@mui/material';

function Register() {
  const [username, setUsername] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleRegister = async () => {
    try {
      const result = await register(username, email, password); 
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

  return (
    <div>
      <h1>REGISTER</h1>
      <div className="register-container">
          <div className="tabs">
              <div className="login-tab">
                  <a href="/login">Login</a>
              </div>
              <div className="register-tab">
                  <a href="/login">Login</a>
              </div>
          </div>
          <p className="username">Username</p>
          <input className="username" type="text" id="username" name="username" onChange={(e) => setUsername(e.target.value)}/>&nbsp;

          <p className="email">Email</p>
          <input className="email" type="email" id="email" name="email" onChange={(e) => setEmail(e.target.value)}/>&nbsp;

          <p className="password">Password</p>
          <input className="password" type="password" id="password" name="password" onChange={(e) => setPassword(e.target.value)}/>

          <button onClick={handleRegister} className="registerButton" >Register</button>
      </div>
      <Popup className="popup" open={isPopupOpen} onClose={() => setIsPopupOpen(false)} position="right center" closeOnDocumentClick={false}>
          <div>{errorMessage}</div>
          <button className="popup-button" onClick={() => setIsPopupOpen(false)}>Close</button>
      </Popup>
    </div>
  )
}

export default Register
