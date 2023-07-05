import React, {useEffect, useState} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import './styles.css';
import Form from 'react-bootstrap/Form';

import {Config} from 'types/plugin/common';

import EditActionsModal from './editActionsModal';

interface Props {
    visible: boolean;
    setVis: React.Dispatch<React.SetStateAction<boolean>>;
    config: Config
}

function ConfigModal(props: Props) {
    const [show, setShow] = useState(false);
    const [actionVisible, setActionVisible] = useState(false);

    useEffect(() => {
        setShow(props.visible);
    }, [props.visible]);

    const handleClose = () => {
        setShow(false);
        props.setVis(false);
    };
    const handleActions = () => {
        setActionVisible(true);
    };
    return (
        <>
            {actionVisible && <EditActionsModal
                visible={actionVisible}
                setVis={setActionVisible}
            />}
            <Modal
                show={show}
                onHide={handleClose}
            >
                <Modal.Header closeButton={false}>
                    <Modal.Title>{props.config ? (<p>{'Edit config'}</p>) : (<p>{'Add config'}</p>)}</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>{'Team name'}</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Enter your team name'
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>{'Delay (in sec)'}</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Enter the delay in seconds'
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>{'Message'}</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Enter the message for the new user'
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>{'Include guests'}</Form.Label>
                            <div className='dropdown'>
                                <Form.Select aria-label='Default select example'>
                                    <option>{'Send welcome message to guest?'}</option>
                                    <option value='1'>{'True'}</option>
                                    <option value='2'>{'False'}</option>
                                </Form.Select></div>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>{'Attachment message'}</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Enter the attachment message'
                            />
                        </Form.Group>
                        <Form.Group>
                            <Button
                                variant='primary'
                                onClick={handleActions}
                            >
                                {props.config ? (<p>{'Edit actions'}</p>) : (<p>{'Add actions'}</p>)}
                            </Button>
                        </Form.Group>
                    </Form>
                </Modal.Body>

                <Modal.Footer>
                    <Button
                        variant='secondary'
                        onClick={handleClose}
                    >{'Close'}</Button>
                    <Button variant='primary'>{'Save changes'}</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ConfigModal;
