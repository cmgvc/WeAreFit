import React from 'react'
import '../styles/Footer.css';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

function Footer() {
  return (
    <div className="footer">
        <div className="footer-links">
            <div className="footer-account">
                <h4>MY ACCOUNT</h4>
                <a href="/auth">Sign in</a>
                <a href="/auth">Register</a>
                <a href="/account">Account</a>
            </div>
            <div className="footer-about">
                <h4>ABOUT</h4>
                <a href="https://chloe-gvc.vercel.app/">About us</a>
            </div>
        </div>
        <div className="socials">
            <h4>DISCOVER MORE</h4>
            <div className="socials-icons">
                <a href="https://github.com/cmgvc"><GitHubIcon /></a>
                <a href="https://www.linkedin.com/in/chloe-gavrilovic-b911551b4/"><LinkedInIcon /></a>
            </div>
        </div>
    </div>
  )
}

export default Footer
