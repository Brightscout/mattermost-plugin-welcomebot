import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

//TODO: render this modal when view button is clicked in Config table
const AttachmentMsgModal = () => {
    return (
        <>
            <div
                className='modal show'
                style={{display: 'block', position: 'initial'}}
            >
                <Modal.Dialog>
                    <Modal.Header closeButton={true}>
                        <Modal.Title>{'Attachment Message'}</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <p>{'Attachment message body text goes here.'}</p>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant='secondary'>{'Close'}</Button>
                        <Button variant='primary'>{'Save changes'}</Button>
                    </Modal.Footer>
                </Modal.Dialog>
            </div>
        </>
    );
};

export default AttachmentMsgModal;