import React from 'react';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import './styles.css';

type Props = {
    visibility: boolean;
    setVisibility: React.Dispatch<React.SetStateAction<boolean>>;
}

const DeleteConfigModal = ({visibility, setVisibility}: Props) => {
    const handleClose = () => {
        setVisibility(false);
    };

    return (
        <>
            <Modal
                show={visibility}
                onHide={handleClose}
            >
                <Modal.Header closeButton={false}>
                    <Modal.Title>{'Delete Config'}</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    {/* TODO: Add team name according to the team */}
                    <p>{'Delete the configs for the team xyz'}</p>
                </Modal.Body>

                <Modal.Footer>
                    <Button
                        variant='secondary'
                        onClick={handleClose}
                    >{'Close'}</Button>
                    <Button variant='danger'>{'Delete'}</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default DeleteConfigModal;
