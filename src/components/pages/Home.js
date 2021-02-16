import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../App';

import * as api from '../../api';

import { FaSlidersH } from 'react-icons/fa';
import UserInfo from '../UserInfo';
import MessageModal from '../MessageModal';

function Home() {
    const { user, loggedIn } = useContext(UserContext);
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);

    const [messageValue, setMessageValue] = useState('');
    const [show, setShow] = useState(false);

    const [extensionInfo, setExtensionInfo] = useState({ present: false, id: null });

    const extensionListener = (data) => {
        console.log('Listener fired!');
        setExtensionInfo({ present: true, id: data.detail.linkooExtensionId });
    };
    document.addEventListener('extension-event', extensionListener);

    const handleClose = () => {
        setMessageValue('');
        setShow(false);
    };
    const handleShow = () => setShow(true);

    useEffect(() => {
        if (user.identifier) {
            api.getAllMessages(user.identifier).then((res) => {
                console.log('Fetched messages');
                setMessages(res.messages);
                setLoading(false);
            });
        }
    }, [user]);

    const sendMessage = async (e) => {
        e.preventDefault();
        const response = await api.createMessage(user.identifier, { content: messageValue, extensionId: extensionInfo.id });
        console.log(response, 'MESSAGE VALUE');
        if (response.success) {
            let messagesCopy = [...messages];
            messagesCopy.push(response.message);
            setMessages(messagesCopy);
            handleClose();
        } // handle error!
    };

    const modalProps = {
        messageValue,
        setMessageValue,
        show,
        setShow,
        sendMessage,
    };

    return (
        <div className="w-50 mt-5 mx-auto">
            <header className="d-flex justify-content-between align-items-center">
                <h1>Linkoo</h1>
                {user.identifier && (
                    <Link to="/account" style={{ color: 'inherit' }}>
                        <FaSlidersH size="30px" cursor="pointer" />
                    </Link>
                )}
            </header>
            <UserInfo user={user} />
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

            <MessageModal modalProps={modalProps} />
        </div>
    );
}

export default Home;
