import React, {useEffect, useState} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import './styles.css';
import Form from 'react-bootstrap/Form';

interface Props {
    visible: boolean;
    setVis: React.Dispatch<React.SetStateAction<boolean>>;
}

function EditActionsModal(props: Props) {
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
                    <Modal.Title>{'Edit Actions'}</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>{'Action Type'}</Form.Label>
                            <div className='dropdown'>
                                <Form.Select aria-label='Default select example'>
                                    <option>{'Choose the type of your action'}</option>
                                    <option value='1'>{'Button'}</option>
                                    <option value='2'>{'Automatic'}</option>
                                </Form.Select></div>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>{'Action Display Name'}</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Enter the display name of your action'
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>{'Channels Added to'}</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Enter the name of channels in which you want to add the new user'
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>{'Action Successfull message'}</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Enter the success message on completion of action'
                            />
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

export default EditActionsModal;