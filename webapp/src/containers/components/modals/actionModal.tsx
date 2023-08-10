import React, {useEffect, useState} from 'react';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';

import './styles.css';

import {OverlayTrigger, Tooltip} from 'react-bootstrap';

import {Configs} from 'types/plugin/common';

type Props = {
    visible: boolean;
    setVisible: React.Dispatch<React.SetStateAction<boolean>>;
    config: Configs[];
    configIndex: number;
}

function ActionModal({visible, setVisible, config, configIndex}: Props) {
    const [show, setShow] = useState(false);

    const [attachmentMessageAvailable, setAttachmentMessageAvailable] = useState(false);

    const actionsLength = config[configIndex]?.actions?.length ?? 0;

    const checkAttachmentMessage = () => {
        if (config[configIndex]?.attachmentMessage) {
            if (config[configIndex]?.attachmentMessage?.length === 0) {
                setAttachmentMessageAvailable(false);
            } else {
                setAttachmentMessageAvailable(config[configIndex]?.attachmentMessage?.[0] !== '');
            }
        }
    };

    useEffect(() => {
        checkAttachmentMessage();
        setShow(visible);
    }, [visible]);

    const handleClose = () => {
        setShow(false);
        setVisible(false);
    };
    return (
        <div>
            <Modal
                className='customModal'
                show={show}
                onHide={handleClose}
            >
                <Modal.Header closeButton={false}>
                    <Modal.Title>{'Actions'}</Modal.Title>
                </Modal.Header>

                <Modal.Body className='customModalBody'>
                    {attachmentMessageAvailable || (config[configIndex]?.actions && actionsLength > 0) ? (<>
                        {attachmentMessageAvailable ? (
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
                        ) : (<p>{'No attachment message configured'}</p>)
                        }
                        {config[configIndex]?.actions && actionsLength > 0 ? (
                            <div>
                                <Form>
                                    <Form.Group className='action-group'>
                                        <Form.Label>{'Actions'}</Form.Label>
                                    </Form.Group>
                                </Form>
                                <div className='listTable'>
                                    <Table
                                        striped={true}
                                        className='listTable'
                                    >
                                        <thead>
                                            <tr>
                                                <th className='type-action'>{'Type'}</th>
                                                <th className='display-name-action'>{'Display Name'}</th>
                                                <th className='name-action'>{'Name'}</th>
                                                <th className='channels-added-action'>{'Add to Channels'}</th>
                                                <th className='successfull-message-action'>{'Success Message'}</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                    config[configIndex].actions?.map((val, i) =>
                                        (
                                            <tr key={i.toString()}>
                                                <td className='type-action'>
                                                    <OverlayTrigger
                                                        placement='top'
                                                        overlay={<Tooltip>{val.actionType}</Tooltip>}
                                                    >
                                                        <p>
                                                            {val.actionType}
                                                        </p>
                                                    </OverlayTrigger>
                                                </td>
                                                <td className='display-name-action'>
                                                    <OverlayTrigger
                                                        placement='top'
                                                        overlay={<Tooltip>{val.actionDisplayName}</Tooltip>}
                                                    >
                                                        <p className='display-name-content'>
                                                            {val.actionDisplayName}
                                                        </p>
                                                    </OverlayTrigger>
                                                </td>
                                                <td className='name-action'>
                                                    <OverlayTrigger
                                                        placement='top'
                                                        overlay={<Tooltip>{val.actionName}</Tooltip>}
                                                    >
                                                        <p className='action-name-content'>
                                                            {val.actionName}
                                                        </p>
                                                    </OverlayTrigger>
                                                </td>
                                                <td className='channels-added-action'>
                                                    <OverlayTrigger
                                                        placement='top'
                                                        overlay={<Tooltip>{val.channelsAddedTo.join(', ')}</Tooltip>}
                                                    >
                                                        <p className='channels-added-content'>
                                                            {val.channelsAddedTo.join(', ')}
                                                        </p>
                                                    </OverlayTrigger>
                                                </td>
                                                <td className='successfull-message-action'>
                                                    <OverlayTrigger
                                                        placement='top'
                                                        overlay={<Tooltip>{val.actionSuccessfullMessage}</Tooltip>}
                                                    >
                                                        <p className='successfull-message-content'>
                                                            {val.actionSuccessfullMessage}
                                                        </p>
                                                    </OverlayTrigger>
                                                </td>
                                            </tr>
                                        ),
                                    )
                                            }
                                        </tbody>
                                    </Table>
                                </div>
                            </div>
                        ) : (<p>{'No action configured'}</p>)
                        }
                    </>) : (<p>{'No attachment message or action configured'}</p>)}
                </Modal.Body>

                <Modal.Footer>
                    <Button
                        variant='secondary'
                        onClick={handleClose}
                    >{'Close'}</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default ActionModal;
