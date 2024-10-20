import React from 'react';
import { logout } from '../services/auth';

function Account () {
    return (
        <div>
            <button onClick={() => logout()}>Logout</button>
        </div>
    )
}

export default Account;