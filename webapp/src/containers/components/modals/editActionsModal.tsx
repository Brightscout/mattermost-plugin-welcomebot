import React, {useEffect, useState} from 'react';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

import './styles.css';

type Props = {
    visible: boolean;
    setVis: React.Dispatch<React.SetStateAction<boolean>>;
}

const EditActionsModal = ({visible, setVis}: Props) => {
    const [show, setShow] = useState(false);

    useEffect(() => {
        setShow(visible);
    }, [visible]);

    const handleClose = () => {
        setShow(false);
        setVis(false);
    };
    return (
        <Modal
            show={show}
            onHide={handleClose}
        >
            <Modal.Header closeButton={false}>
                <Modal.Title>{'Actions'}</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form>
                    <Form.Group>
                        <Form.Label>
                            {'Attachment Message'}
                        </Form.Label>
                        <Form.Control
                            type='text'
                            placeholder='Enter the attachment message'
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>
                            {'Action Type'}
                        </Form.Label>
                        <div className='dropdown'>
                            <Form.Select aria-label='Choose the action type'>
                                <option>
                                    {'Choose the type of action'}
                                </option>
                                <option value='1'>
                                    {'Button'}
                                </option>
                                <option value='2'>
                                    {'Automatic'}
                                </option>
                            </Form.Select>
                        </div>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>
                            {'Action Display Name'}
                        </Form.Label>
                        <Form.Control
                            type='text'
                            placeholder='Enter the display name of action'
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>
                            {'Channels Added to'}
                        </Form.Label>
                        <Form.Control
                            type='text'
                            placeholder='Enter the name of channels in which you want to add the new user'
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>
                            {'Action Successfull message'}
                        </Form.Label>
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
    );
};

export default EditActionsModal;
