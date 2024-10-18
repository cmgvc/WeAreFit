import { getUrl } from '../util/host.js';

export function isAuthenticated() {
    const token = localStorage.getItem('authToken') !== null;
    return !!token;
}

export function getUsername() {
    return localStorage.getItem('user');
}

export const handleLogout = () => {
    localStorage.removeItem('authToken'); 
    localStorage.removeItem('user');
    window.location.href = '/auth'; 
};

export async function login(email, password) {
    try {
        const response = await fetch(`https://wearefit.onrender.com/api/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });
        const data = await response.json();
        if (data.token) {  
            localStorage.setItem('authToken', data.token);
            localStorage.setItem('user', data.username);
        }        
        return data;
    } catch (error) {
        console.error('Error logging in:', error);
    }
}

export async function register(username, email, password) {
    try {
        const response = await fetch(`https://wearefit.onrender.com/api/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, email, password })
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error registering:', error);
    }
}