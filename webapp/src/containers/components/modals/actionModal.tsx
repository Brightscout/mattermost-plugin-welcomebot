import React, {useEffect} from 'react';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';

import './styles.css';

type Props = {
    visibility: boolean;
    setVisibility: React.Dispatch<React.SetStateAction<boolean>>;
    config: Configs[];
    configIndex: number;
}

function ActionModal({visibility, setVisibility, config, configIndex}: Props) {
    const actionsLength = config[configIndex]?.actions?.length ?? 0;
    const attachmentMessageLength = config[configIndex]?.attachmentMessage?.length ?? 0;

    useEffect(() => {
        setVisibility(visibility);
    }, [visibility]);

    const handleClose = () => {
        setVisibility(false);
    };
    return (
        <Modal>
            <Modal.Header>
                <Modal.Title>{'Actions'}</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                {(config[configIndex].attachmentMessage && attachmentMessageLength) || (config[configIndex]?.actions && actionsLength) ? (<>
                    {config[configIndex].attachmentMessage && attachmentMessageLength ? (
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
                    {config[configIndex]?.actions && actionsLength ? (
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
                                    {config[configIndex].actions?.map((val, i) =>
                                        (
                                            <tr key={i.toString()}>
                                                <td>{val.actionType}</td>
                                                <td>{val.actionName}</td>
                                                <td>{val.actionDisplayName}</td>
                                                <td>{val.channelsAddedTo}</td>
                                                <td>{val.actionSuccessfullMessage}</td>
                                            </tr>
                                        ),
                                    )}
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
    );
}

export default ActionModal;
