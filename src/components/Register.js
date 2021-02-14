import React, { useState, useContext } from 'react';
import * as api from '../api';
import { UserContext } from '../App';
import { Link, Redirect } from 'react-router-dom';

import { Button, FormControl, InputGroup } from 'react-bootstrap';

function Register() {
    const { setUser, loggedIn, setLoggedIn } = useContext(UserContext);
    const [name, setName] = useState('');
    const handleRegister = async (e) => {
        e.preventDefault();
        console.log(name, 'VALUE!');
        const response = await api.register(name);
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
                    <FormControl
                        placeholder="Username"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        aria-label="Username"
                        aria-describedby="basic-addon2"
                    />
                    <InputGroup.Append>
                        <Button type="submit" variant="outline-secondary">
                            Register
                        </Button>
                    </InputGroup.Append>
                </InputGroup>
            </form>
            <Link to="/">Go home</Link>
            {loggedIn && <Redirect to="/" />}
        </div>
    );
}

export default Register;
