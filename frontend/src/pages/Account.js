import React from 'react';
import { handleLogout } from '../services/auth';

function Account () {
    return (
        <div>
            <button onClick={() => handleLogout()}>Logout</button>
        </div>
    )
}

export default Account;