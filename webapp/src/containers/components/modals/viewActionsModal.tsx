import React, {useEffect, useState} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import './styles.css';

interface Props {
    visible: boolean;
    setVis: React.Dispatch<React.SetStateAction<boolean>>;
}

function ViewActionsModal(props: Props) {
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
                    <Modal.Title>{'Actions'}</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>{'Attachment Message'}</Form.Label>
                            <Form.Control
                                type='long-text'
                                readOnly={true}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>{'Actions'}</Form.Label>
                        </Form.Group>
                    </Form>
                    <Table striped={true}>
                        <thead>
                            <tr>
                                <th>{'Type'}</th>
                                <th>{'Display Name'}</th>
                                <th>{'Channels Added to'}</th>
                                <th>{'Success Message'}</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{'Button'}</td>
                                <td>{'Import'}</td>
                                <td>{'channel1, channel2, channel3'}</td>
                                <td>{'Welcome to your new team mate !'}</td>
                            </tr>
                            <tr>
                                <td>{'Automatic'}</td>
                                <td>{'Export'}</td>
                                <td>{'channel1, channel2'}</td>
                                <td>{'Welcome to your new team mate !'}</td>
                            </tr>
                            <tr>
                                <td>{'Button'}</td>
                                <td>{'Deport'}</td>
                                <td>{'channel1, channel3'}</td>
                                <td>{'Welcome to your new team mate !'}</td>
                            </tr>
                        </tbody>
                    </Table>
                </Modal.Body>

                <Modal.Footer>
                    <Button
                        variant='secondary'
                        onClick={handleClose}
                    >{'Close'}</Button>
                    <Button
                        variant='primary'
                        disabled={true}
                    >{'Save changes'}</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ViewActionsModal;
