import React from 'react';
import { FormControl, InputGroup, Modal, Button } from 'react-bootstrap';

function MessageModal({ modalProps: { setMessageValue, show, setShow, sendMessage, messageValue } }) {
    const handleClose = () => {
        setMessageValue('');
        setShow(false);
    };

    return (
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
    );
}

export default MessageModal;
