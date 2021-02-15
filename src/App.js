import React, { useEffect, useState } from 'react';
import { BrowserRouter, Redirect, Route } from 'react-router-dom';

import Register from './components/Register';
import Home from './components/Home';
import Login from './components/Login';
import Account from './components/Account';

export const UserContext = React.createContext();

function App() {
    const [user, setUser] = useState({}); // Handle with
    const [loggedIn, setLoggedIn] = useState(false); // local storage

    useEffect(() => {
        if (!!localStorage.getItem('user')) {
            setLoggedIn(true);
            setUser(JSON.parse(localStorage.getItem('user')));
        }
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser, loggedIn, setLoggedIn }}>
            <BrowserRouter>
                <Route component={Home} exact path="/" />
                <Route component={Login} path="/login" />
                <Route component={Register} path="/register" />
                <Route component={Account} path="/account" />
                {!loggedIn && <Redirect to="/" />}
            </BrowserRouter>
        </UserContext.Provider>
    );
}

export default App;
