import React, { useContext } from 'react';
import * as api from '../api';
import { UserContext } from '../App';
import { Link, Redirect } from 'react-router-dom';

import { Button, InputGroup } from 'react-bootstrap';

function Register() {
    const { setUser, loggedIn, setLoggedIn } = useContext(UserContext);
    const handleRegister = async (e) => {
        e.preventDefault();
        const response = await api.register();
        console.log(response);
        if (!response.success) {
            console.log('Auth error'); // Handle!
        } else {
            setUser(response.user);
            setLoggedIn(true);
        }
    };
    return (
        <div className="w-75 mt-5 mx-auto">
            <h1>Register</h1>
            <form onSubmit={handleRegister}>
                <InputGroup className="mb-3">
                    <Button type="submit" className="w-25 mt-3" style={{ minWidth: '6rem' }} variant="outline-secondary">
                        Register
                    </Button>
                </InputGroup>
            </form>
            <Link to="/">Go home</Link>
            {loggedIn && <Redirect to="/" />}
        </div>
    );
}

export default Register;
