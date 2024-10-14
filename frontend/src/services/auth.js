import { getUrl } from '../util/host.js';

export async function login(email, password) {
    try {
        const response = await fetch(`${getUrl()}/api/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error logging in:', error);
    }
}

export async function register(username, email, password) {
    try {
        const response = await fetch(`${getUrl()}/api/auth/register`, {
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