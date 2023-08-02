import React, {useEffect, useState} from 'react';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import './styles.css';

interface Props {
    visible: boolean;
    setVis: React.Dispatch<React.SetStateAction<boolean>>;
    teamName: string;
}

function DeleteModal(props: Props) {
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
                <Modal.Header closeButton={false}>
                    <Modal.Title>{'Delete Config'}</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <p>{`Are you sure you would like to delete the configs for the team ${props.teamName}`}</p>
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
}

export default DeleteModal;