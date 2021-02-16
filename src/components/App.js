import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Register from './pages/Register';
import Home from './pages/Home';
import Login from './pages/Login';
import Account from './pages/Account';

export const UserContext = React.createContext();

function App() {
    const [user, setUser] = useState({});
    const [loggedIn, setLoggedIn] = useState(true);
    useEffect(() => {
        if (!!localStorage.getItem('user')) {
            setLoggedIn(true);
            setUser(JSON.parse(localStorage.getItem('user')));
        } else {
            setLoggedIn(false);
        }
        return false;
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser, loggedIn, setLoggedIn }}>
            <BrowserRouter>
                <Route component={Home} exact path="/" />
                <Route component={Login} path="/login" />
                <Route component={Register} path="/register" />
                <Route component={Account} path="/account" />
            </BrowserRouter>
        </UserContext.Provider>
    );
}

export default App;
