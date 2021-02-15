import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../App';

import * as api from '../api';
import { Button, FormControl, InputGroup, Modal } from 'react-bootstrap';

function Home() {
    const { user, loggedIn } = useContext(UserContext);
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);

    const [messageValue, setMessageValue] = useState('');
    const [show, setShow] = useState(false);

    const handleClose = () => {
        setMessageValue('');
        setShow(false);
    };
    const handleShow = () => setShow(true);

    useEffect(() => {
        if (user.identifier) {
            api.getAllMessages(user.identifier).then((res) => {
                console.log(res);
                setMessages(res.messages);
                setLoading(false);
            });
        }
    }, [user]);

    const sendMessage = async (e) => {
        e.preventDefault();
        const response = await api.createMessage(user.identifier, messageValue);
        console.log(response, 'MESSAGE VALUE');
        if (response.success) {
            let messagesCopy = [...messages];
            messagesCopy.push(response.message);
            setMessages(messagesCopy);
            handleClose();
        } // handle error!
    };

    return (
        <div className="w-75 mt-5 mx-auto">
            <h1>Linkooo</h1>
            {user.identifier && (
                <p>
                    Your name:
                    <br />
                    <strong>{user.name}</strong>
                </p>
            )}

            {!loading && (
                <div className="card" style={{ width: '28rem' }}>
                    <div className="card-header">Messages</div>
                    <ul className="list-group list-group-flush">
                        {messages.length === 0 ? (
                            <li className="list-group-item">You haven't sent any messages yet. </li>
                        ) : (
                            messages.map((message) => (
                                <li className="list-group-item" key={message.id}>
                                    {message.content}
                                </li>
                            ))
                        )}
                        <li className="list-group-item text-primary cursor-pointer" onClick={handleShow} style={{ cursor: 'pointer' }}>
                            + Add item
                        </li>
                    </ul>
                </div>
            )}

            {!loggedIn && (
                <div className="d-flex justify-content-between" style={{ width: '120px' }}>
                    <Link to="/register">Register</Link>
                    <Link to="/login">Login</Link>
                </div>
            )}

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Message</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={sendMessage}>
                        <InputGroup className="mb-2">
                            <FormControl
                                value={messageValue}
                                onChange={(e) => setMessageValue(e.target.value)}
                                placeholder="Message"
                                aria-label="Message"
                                aria-describedby="basic-addon2"
                            />
                            <InputGroup.Append>
                                <Button type="submit" variant="outline-secondary">
                                    Send
                                </Button>
                            </InputGroup.Append>
                        </InputGroup>
                    </form>
                </Modal.Body>
            </Modal>
        </div>
    );
}

export default Home;
