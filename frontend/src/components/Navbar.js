import React from 'react'
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';

function Navbar() {
  return (
    <div className='navbar'>
        <div className='logo'>
            <Link to="/">Home</Link>
            {/* <img src={}></img> */}
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
