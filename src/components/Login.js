import React, { useState, useContext } from 'react';
import * as api from '../api';
import { UserContext } from '../App';
import { Link, Redirect } from 'react-router-dom';

import { Button, FormControl, InputGroup } from 'react-bootstrap';

function Login() {
    const { setUser, loggedIn, setLoggedIn } = useContext(UserContext);
    const [name, setName] = useState('');
    const handleLogin = async (e) => {
        console.log('Handling login...');
        e.preventDefault();
        console.log(name, 'VALUE!');
        const response = await api.login(name);
        console.log(response);
        if (!response.success) {
            console.log('Auth error'); // Handle!
        } else {
            console.log('Valid!');
            setUser(response.user);
            setLoggedIn(true);
        }
    };
    return (
        <div className="w-75 mt-5 mx-auto">
            <h1>Login</h1>
            <form onSubmit={handleLogin}>
                <InputGroup className="mb-3">
                    <FormControl
                        placeholder="Identifier"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        aria-label="Identifier"
                        aria-describedby="basic-addon2"
                    />
                    <InputGroup.Append>
                        <Button type="submit" variant="outline-secondary">
                            Login
                        </Button>
                    </InputGroup.Append>
                </InputGroup>
            </form>
            <Link to="/">Go home</Link>
            {loggedIn && <Redirect to="/" />}
        </div>
    );
}

export default Login;
