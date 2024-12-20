import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Navbar.css';
import Logo from '../assets/WeAreFitLogo.svg';
import ReorderIcon from '@mui/icons-material/Reorder';
import PersonIcon from '@mui/icons-material/Person';
import { getUsername, isAuthenticated } from '../services/auth';

function Navbar() {
    const [openLinks, setOpenLinks] = useState(false);
    const [username, setUsername] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const storedUsername = getUsername(); 
        if (storedUsername) {
            setUsername(storedUsername);
        }
    }, []);

    const toggleNavbar = () => {
        setOpenLinks(!openLinks);
    }

    const handleAccountClick = () => {
        if (isAuthenticated()) {
            navigate('/dashboard');
        } else {
            navigate('/auth');
        }
    }

    return (
        <div className='navbar'>
            <div className='logo'>
                <a href='/'><img src={Logo} alt='Home'></img></a>
            </div>
            <div className='nav'>
                <a onClick={handleAccountClick}>DASHBOARD</a>
                <a href="/past">PAST CHALLENGES</a>
            </div>
            <div className='icon'>
                <button onClick={toggleNavbar}>
                    <ReorderIcon />
                </button>
            </div>
            <div className='hiddenLinks' id={openLinks ? "open" : "close"}>
                <Link to="/dashboard">DASHBOARD</Link>
                <Link to="/past">PAST CHALLENGES</Link>
            </div>
            <div className='join'>
                    {username ? (
                        <button><PersonIcon /><Link to="/auth">{username}</Link></button>
                    ) : (
                        <button><PersonIcon /><Link to="/auth">SIGN IN</Link></button>
                    )}
                </div>
        </div>
    )
}

export default Navbar