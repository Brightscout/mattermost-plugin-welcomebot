import React, {useEffect, useState} from 'react';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';

import './styles.css';

import {Configs} from 'types/plugin/common';

type Props = {
    visibility: boolean;
    setVisibility: React.Dispatch<React.SetStateAction<boolean>>;
    config: Configs[];
    configIndex: number;
}

const ActionModal = ({visibility, setVisibility, config, configIndex}: Props) => {
    const actionsLength = config[configIndex]?.actions?.length ?? 0;
    const attachmentMessageLength = config[configIndex]?.attachmentMessage?.length ?? 0;

    const [show, setShow] = useState(false);

    useEffect(() => {
        setVisibility(visibility);
    }, [visibility]);

    const handleClose = () => {
        setVisibility(false);
    };
    return (
        <Modal
            className='actionModal'
            show={show}
            onHide={handleClose}
        >
            <Modal.Header closeButton={false}>
                <Modal.Title>{'Actions'}</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                {(config[configIndex].attachmentMessage && attachmentMessageLength > 0) || (config[configIndex]?.actions && actionsLength > 0) ? (<>
                    {config[configIndex].attachmentMessage && attachmentMessageLength > 0 ? (
                        <Form>
                            <Form.Group className='form-group'>
                                <Form.Label>{'Attachment Message'}</Form.Label>
                                <Form.Control
                                    type='long-text'
                                    value={config[configIndex].attachmentMessage ?? ''}
                                    placeholder=''
                                    aria-label='Disabled input example'
                                    readOnly={true}
                                />
                            </Form.Group>
                        </Form>
                    ) : (<p>{'No Attachment message configured'}</p>)
                    }
                    {config[configIndex]?.actions && actionsLength > 0 ? (
                        <div>
                            <Form>
                                <Form.Group className='action-group'>
                                    <Form.Label>{'Actions'}</Form.Label>
                                </Form.Group>
                            </Form>
                            <Table
                                striped={true}
                                className='list-table'
                            >
                                <thead>
                                    <tr>
                                        <th>{'Type'}</th>
                                        <th>{'Name'}</th>
                                        <th>{'Display Name'}</th>
                                        <th>{'Channels Added to'}</th>
                                        <th>{'Success Message'}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                    config[configIndex].actions?.map((val, i) =>
                                        (
                                            <tr key={i.toString()}>
                                                <td>{val.actionType}</td>
                                                <td>{val.actionName}</td>
                                                <td>{val.actionDisplayName}</td>
                                                <td>{val.channelsAddedTo}</td>
                                                <td>{val.actionSuccessfullMessage}</td>
                                            </tr>
                                        ),
                                    )
                                    }
                                </tbody>
                            </Table>
                        </div>
                    ) : (<p>{'No Action configured'}</p>)
                    }
                </>) : (<p>{'No Attachment message or action configured'}</p>)}
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

export default ActionModal;
