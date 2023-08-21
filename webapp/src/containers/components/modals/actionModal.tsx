import React from 'react';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';

import './styles.css';

type Props = {
    visibility: boolean;
    setVisibility: React.Dispatch<React.SetStateAction<boolean>>;
}

const ViewActionsModal = ({visibility, setVisibility}: Props) => {
    const handleClose = () => {
        setVisibility(false);
    };

    return (
        <Modal
            show={visibility}
            onHide={handleClose}
        >
            <Modal.Header closeButton={false}>
                <Modal.Title>{'Actions'}</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form>
                    <Form.Group className='form-group'>
                        <Form.Label>{'Attachment Message'}</Form.Label>
                        <Form.Control
                            type='long-text'
                            placeholder='This is a example attachment message'
                            aria-label='Disabled input example'
                            readOnly={true}
                        />
                    </Form.Group>
                    <Form.Group className='action-group'>
                        <Form.Label>{'Actions'}</Form.Label>
                    </Form.Group>
                </Form>
                <Table
                    striped={true}
                    className='listTable'
                >
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
                            <td>{'Welcome to your new team mate!'}</td>
                        </tr>
                        <tr>
                            <td>{'Automatic'}</td>
                            <td>{'Export'}</td>
                            <td>{'channel1, channel2'}</td>
                            <td>{'Welcome to your new team mate!'}</td>
                        </tr>
                        <tr>
                            <td>{'Button'}</td>
                            <td>{'Deport'}</td>
                            <td>{'channel1, channel3'}</td>
                            <td>{'Welcome to your new team mate!'}</td>
                        </tr>
                    </tbody>
                </Table>
            </Modal.Body>

            <Modal.Footer>
                <Button
                    variant='secondary'
                    onClick={handleClose}
                >{'Close'}</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ViewActionsModal;
