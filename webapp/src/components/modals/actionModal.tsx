import React, {useEffect, useState} from 'react';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import {OverlayTrigger, Tooltip} from 'react-bootstrap';

import './styles.scss';

type Props = {
    visibility: boolean;
    setVisibility: React.Dispatch<React.SetStateAction<boolean>>;
    config: Config[];
    configIndex: number;
}

const ActionModal = ({visibility, setVisibility, config, configIndex}: Props) => {
    const [isAttachmentMessageAvailable, setIsAttachmentMessageAvailable] = useState(false);

    const actionsLength = config[configIndex]?.actions?.length;

    const checkAttachmentMessage = () => {
        if (config[configIndex]?.attachmentMessage?.length) {
            setIsAttachmentMessageAvailable(Boolean(config[configIndex]?.attachmentMessage?.[0]));
            return;
        }

        setIsAttachmentMessageAvailable(false);
    };

    useEffect(() => {
        checkAttachmentMessage();
    }, []);

    const handleClose = () => setVisibility(false);

    return (
        <Modal
            className='action-modal'
            show={visibility}
            onHide={handleClose}
        >
            <Modal.Header closeButton={false}>
                <Modal.Title>{'Actions'}</Modal.Title>
            </Modal.Header>

            <Modal.Body className='action-modal__body'>
                {isAttachmentMessageAvailable || (config[configIndex]?.actions && actionsLength) ? (<>
                    {isAttachmentMessageAvailable ? (
                        <Form className='action-modal__attachment-body'>
                            <Form.Group>
                                <Form.Label>{'Attachment Message'}</Form.Label>
                                <Form.Control
                                    type='long-text'
                                    value={config[configIndex].attachmentMessage?.join(',') ?? ''}
                                    placeholder=''
                                    aria-label='attachment message'
                                    readOnly={true}
                                />
                            </Form.Group>
                        </Form>
                    ) : (
                        <p>{'No attachment message configured'}</p>
                    )}
                    {config[configIndex]?.actions && actionsLength ? (
                        <div className='action-modal__action-body'>
                            <Form>
                                <Form.Group>
                                    <Form.Label>{'Actions'}</Form.Label>
                                </Form.Group>
                            </Form>
                            <div>
                                <Table
                                    striped={true}
                                    bordered={true}
                                    hover={true}
                                    className='margin-bottom-0'
                                >
                                    <thead>
                                        <tr>
                                            <th>{'Type'}</th>
                                            <th>{'Display Name'}</th>
                                            <th>{'Name'}</th>
                                            <th>{'Add to Channels'}</th>
                                            <th>{'Success Message'}</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                    config[configIndex].actions?.map((val, i) =>
                                        (
                                            <tr key={i.toString()}>
                                                <td>
                                                    <OverlayTrigger
                                                        placement='top'
                                                        overlay={<Tooltip>{val.actionType}</Tooltip>}
                                                    >
                                                        <p className='action-modal__tooltip'>
                                                            {val.actionType}
                                                        </p>
                                                    </OverlayTrigger>
                                                </td>
                                                <td>
                                                    <OverlayTrigger
                                                        placement='top'
                                                        overlay={<Tooltip>{val.actionDisplayName}</Tooltip>}
                                                    >
                                                        <p className='action-modal__tooltip'>
                                                            {val.actionDisplayName}
                                                        </p>
                                                    </OverlayTrigger>
                                                </td>
                                                <td>
                                                    <OverlayTrigger
                                                        placement='top'
                                                        overlay={<Tooltip>{val.actionName}</Tooltip>}
                                                    >
                                                        <p className='action-modal__tooltip'>
                                                            {val.actionName}
                                                        </p>
                                                    </OverlayTrigger>
                                                </td>
                                                <td>
                                                    <OverlayTrigger
                                                        placement='top'
                                                        overlay={<Tooltip>{val.channelsAddedTo.join(', ')}</Tooltip>}
                                                    >
                                                        <p className='action-modal__tooltip'>
                                                            {val.channelsAddedTo.join(', ')}
                                                        </p>
                                                    </OverlayTrigger>
                                                </td>
                                                <td>
                                                    <OverlayTrigger
                                                        placement='top'
                                                        overlay={<Tooltip>{val.actionSuccessfulMessage.join(',')}</Tooltip>}
                                                    >
                                                        <p className='action-modal__tooltipt'>
                                                            {val.actionSuccessfulMessage.join(',')}
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
                    ) : (
                        <div className='action-modal__no-action'>{'No action configured'}</div>
                    )}
                </>
                ) : (
                    <>{'No attachment message or action configured'}</>
                )}
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
