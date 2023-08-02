import React, {useEffect, useState} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const AttachmentMsgModal = () => {
    const [show, setShow] = useState(false);
    useEffect(() => {
        setShow(true);
    }, []);
    const handleClose = () => {
        setShow(false);
    };
    return (
        <>
            <div
                className='modal show'
                style={{display: 'block', position: 'initial'}}
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
        </>
    );
};

export default AttachmentMsgModal;
