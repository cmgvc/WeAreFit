import React from 'react'
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';
import Logo from '../assets/WeAreFitLogo.svg';

function Navbar() {
  return (
    <div className='navbar'>
        <div className='logo'>
            <a href='/'>
                <img src={Logo} alt='Home'></img>
            </a>
        </div>
        <div className='nav'>
            <Link to="/dashboard">DASHBOARD</Link>
            <Link to="/account">ACCOUNT</Link>
            <Link to="/past">PAST CHALLENGES</Link>
        </div>
        <div className='join'>
            <button><Link to="/join">+ JOIN NOW</Link></button>
        </div>
    </div>
  )
}

export default Navbar
