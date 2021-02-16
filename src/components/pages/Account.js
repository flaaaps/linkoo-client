import React, { useContext } from 'react';
import { Button } from 'react-bootstrap';
import { Link, Redirect } from 'react-router-dom';
import { UserContext } from '../App';

function Account() {
    const { user, setLoggedIn, loggedIn, setUser } = useContext(UserContext);

    const logout = () => {
        localStorage.removeItem('user');
        console.log('Logged out');
        setLoggedIn(false);
        setUser({});
    };
    return (
        <div className="w-50 mt-5 mx-auto">
            <h1>Account</h1>
            <p>
                Name: <strong>{user.name}</strong>
            </p>
            <p>
                Account created at: <strong>{new Date(user.createdAt).toLocaleDateString(window.navigator.language)}</strong>
            </p>
            <Button onClick={logout} variant="outline-secondary" className="my-2" style={{ width: '15rem' }}>
                Logout
            </Button>
            <br />
            <Link to="/">Back to home</Link>

            {!loggedIn && <Redirect to="/" />}
        </div>
    );
}

export default Account;
