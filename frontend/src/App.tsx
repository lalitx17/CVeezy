import React, { useState } from 'react';
import Login from './components/Login.tsx';
import Dashboard from './components/Dashboard.tsx';

const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const setAuthenticated = () => {
        setIsLoggedIn(true);
    };

    return (
        <div>
            {isLoggedIn ? (
                <Dashboard />
            ) : (
                <Login setAuthenticated={setAuthenticated} />
            )}
        </div>
    );
};

export default App;
