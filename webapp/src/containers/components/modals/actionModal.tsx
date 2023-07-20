import React, {useEffect, useState} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import './styles.css';

// eslint-disable-next-line import/no-unresolved
import {Configs} from 'types/plugin/common';

interface Props {
    visible: boolean;
    setVis: React.Dispatch<React.SetStateAction<boolean>>;
    config: Configs[];
    configIndex: number;
}

function ActionModal({visible, setVis, config, configIndex}: Props) {
    const actionsLength = config[configIndex]?.Actions?.length ?? 0;
    const attachmentMessageLength = config[configIndex]?.AttachmentMessage?.length ?? 0;
    const [show, setShow] = useState(false);

    useEffect(() => {
        setShow(visible);
    }, [visible]);

    const handleClose = () => {
        setShow(false);
        setVis(false);
    };
    return (
        <>
            <Modal
                className='actionModal'
                show={show}
                onHide={handleClose}
            >
                <Modal.Header closeButton={false}>
                    <Modal.Title>{'Actions'}</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    {(config[configIndex].AttachmentMessage && attachmentMessageLength > 0) || (config[configIndex]?.Actions && actionsLength > 0) ? (<>
                        {config[configIndex].AttachmentMessage && attachmentMessageLength > 0 ? (
                            <Form>
                                <Form.Group className='form-group'>
                                    <Form.Label>{'Attachment Message'}</Form.Label>
                                    <Form.Control
                                        type='long-text'
                                        value={config[configIndex].AttachmentMessage ?? ''}
                                        placeholder=''
                                        aria-label='Disabled input example'
                                        readOnly={true}
                                    />
                                </Form.Group>
                            </Form>
                        ) : (<p>{'No Attachment message configured'}</p>)
                        }
                        {config[configIndex]?.Actions && actionsLength > 0 ? (
                            <div>
                                <Form>
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
                                            <th>{'Name'}</th>
                                            <th>{'Display Name'}</th>
                                            <th>{'Channels Added to'}</th>
                                            <th>{'Success Message'}</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                    config[configIndex].Actions?.map((val, i) =>
                                        (
                                            <tr key={i.toString()}>
                                                <td>{val.ActionType}</td>
                                                <td>{val.ActionName}</td>
                                                <td>{val.ActionDisplayName}</td>
                                                <td>{val.ChannelsAddedTo}</td>
                                                <td>{val.ActionSuccessfullMessage}</td>
                                            </tr>
                                        ),
                                    )
                                        }
                                    </tbody>
                                </Table>
                            </div>
                        ) : (<p>{'No Action configured'}</p>)
                        }
                    </>) : (<p>{'No Attachment message or Action configured'}</p>)}
                </Modal.Body>

                <Modal.Footer>
                    <Button
                        variant='secondary'
                        onClick={handleClose}
                    >{'Close'}</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ActionModal;
