import React, {useState, useEffect} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import './styles.css';

const AttachmentMessageModal = () => {
    const [show, setShow] = useState(false);

    useEffect(() => {
        setShow(true);
    }, []);

    const handleClose = () => {
        setShow(false);
    };

    return (
        <div
            className='modal show'
        >
            <Modal show={show}>
                <Modal.Header>
                    <Modal.Title>{'Attachment Message'}</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <p>{'Attachment message body text goes here.'}</p>
                </Modal.Body>

                <Modal.Footer>
                    <Button
                        variant='secondary'
                        onClick={handleClose}
                    >
                        {'Close'}
                    </Button>
                    <Button variant='primary'>{'Save changes'}</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default AttachmentMessageModal;
