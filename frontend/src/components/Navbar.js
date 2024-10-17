import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';
import Logo from '../assets/WeAreFitLogo.svg';
import ReorderIcon from '@mui/icons-material/Reorder';
import PersonIcon from '@mui/icons-material/Person';
import Person from '@mui/icons-material/Person';
import { getUsername } from '../services/auth';

function Navbar() {
    const [openLinks, setOpenLinks] = useState(false);
    const [username, setUsername] = useState(null);

    useEffect(() => {
        const storedUsername = getUsername(); 
        if (storedUsername) {
            setUsername(storedUsername);
        }
    }, []);

    const toggleNavbar = () => {
        setOpenLinks(!openLinks);
    }
  return (
    <div className='navbar'>
        <div className='logo'>
            <a href='/'><img src={Logo} alt='Home'></img></a>
        </div>
        <div className='nav'>
            <Link to="/dashboard">DASHBOARD</Link>
            <Link to="/account">ACCOUNT</Link>
            <Link to="/past">PAST CHALLENGES</Link>
        </div>
        <div className='icon'>
            <button onClick={toggleNavbar}>
                <ReorderIcon />
            </button>
        </div>
        <div className='hiddenLinks' id={openLinks ? "open" : "close"}>
            <Link to="/dashboard">DASHBOARD</Link>
            <Link to="/account">ACCOUNT</Link>
            <Link to="/past">PAST CHALLENGES</Link>
        </div>
        <div className='join'>
                {username ? (
                    <button><PersonIcon /><Link to="/account">{username}</Link></button>
                ) : (
                    <button><PersonIcon /><Link to="/auth">SIGN IN</Link></button>
                )}
            </div>
    </div>
  )
}

export default Navbar