/* eslint-disable react/jsx-no-literals */
import React, {useEffect, useState} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import './styles.css';

interface Props {
    visible: boolean;
    setVis: React.Dispatch<React.SetStateAction<boolean>>;
}

function AttachmentMsgModal(props: Props) {
    const [show, setShow] = useState(false);

    useEffect(() => {
        setShow(props.visible);
    }, [props.visible]);

    const handleClose = () => {
        setShow(false);
        props.setVis(false);
    };
    return (
        <>
            <Modal
                show={show}
                onHide={handleClose}
            >
                <Modal.Header closeButton={true}>
                    <Modal.Title>Modal title</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <p>Modal body text goes here.</p>
                </Modal.Body>

                <Modal.Footer>
                    <Button
                        variant='secondary'
                        onClick={handleClose}
                    >Close</Button>
                    <Button variant='primary'>Save changes</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default AttachmentMsgModal;