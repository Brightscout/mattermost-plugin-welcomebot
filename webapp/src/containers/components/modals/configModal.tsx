import React, {useEffect, useState} from 'react';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import {OverlayTrigger, Tooltip, ToggleButton} from 'react-bootstrap';

import './styles.css';

import {Configs, Actions} from 'types/plugin/common';

type Props = {
    visibility: boolean;
    setVisibility: React.Dispatch<React.SetStateAction<boolean>>;
    configIndex: number | null;
    config: Configs[];
    onChange: any;
    modalHeader: string;
}

const ConfigModal = ({visibility, setVisibility, configIndex, config, onChange, modalHeader}: Props) => {
    const actionElement: Actions = {
        actionType: '',
        actionName: '',
        actionDisplayName: '',
        channelsAddedTo: [''],
        actionSuccessfullMessage: [''],
    };

    const resetActionElement = () => {
        actionElement.actionType = '';
        actionElement.actionName = '';
        actionElement.actionDisplayName = '';
        actionElement.channelsAddedTo = [''];
        actionElement.actionSuccessfullMessage = [''];
    };

    const newAction: Actions[] = [];

    const newConfig: Configs = {
        teamName: '',
        delayInSeconds: '',
        message: [''],
        includeGuests: '',
        attachmentMessage: [''],
        actions: newAction,
    };

    const [show, setShow] = useState(true);
    const [actionVisible, setActionVisible] = useState(false);
    const [configVisible, setConfigVisible] = useState(true);
    const [deleteVisible, setDeleteVisible] = useState(false);
    const [existingConfig, setExistingConfig] = useState(configIndex === null ? newConfig : config[configIndex]);

    const [teamName, setTeamName] = useState(existingConfig.teamName);
    const [delay, setDelay] = useState(existingConfig.delayInSeconds);
    const [message, setMessage] = useState(existingConfig.message);
    const [attachmentMessage, setAttachmentMessage] = useState(existingConfig.attachmentMessage ?? ['']);
    const [guestValue, setGuestValue] = useState(existingConfig.includeGuests);

    const [actionTypesValue, setActionTypesValue] = useState('');
    const [actionDisplayName, setActionDisplayName] = useState('');
    const [actionChannelsAddedTo, setChannelsAddedTo] = useState(['']);
    const [actionSuccessfullMessage, setActionSuccessfullMessage] = useState(['']);
    const [actionIndex, setActionIndex] = useState<number | null>(0);
    const [actionName, setActionName] = useState('');

    const actionLength = existingConfig?.actions?.length ?? 0;

    const handleCloseButton = (
        variant: string,
        text: string,
    ) => (
        <Button
            variant={variant}
            onClick={handleClose}
        >
            {text}
        </Button>
    );

    const guest = [
        {name: 'true', value: 'true'},
        {name: 'false', value: 'false'},
    ];

    const actionTypes = [
        {name: 'button', value: 'button'},
        {name: 'automatic', value: 'automatic'},
    ];

    useEffect(() => {
        setShow(visibility);
        setConfigVisible(visibility);
    }, [visibility]);

    useEffect(() => {
        preFillActions();
    }, [actionIndex]);

    useEffect(() => {
        if (configIndex !== null) {
            setTeamName(existingConfig.teamName);
            setDelay(existingConfig.delayInSeconds);
            setMessage(existingConfig.message);
            setGuestValue(existingConfig?.includeGuests ?? '');
            setAttachmentMessage(existingConfig?.attachmentMessage ?? []);
        }
    }, []);

    useEffect(() => {
        setExistingConfig(configIndex === null ? newConfig : config[configIndex]);
    }, [config]);

    const preFillActions = () => {
        if (existingConfig?.actions && actionIndex !== null) {
            const action = existingConfig?.actions?.[actionIndex] ?? actionElement;
            setActionTypesValue(action.actionType);
            setActionDisplayName(action.actionDisplayName);
            setChannelsAddedTo(action.channelsAddedTo);
            setActionSuccessfullMessage(action.actionSuccessfullMessage);
            setActionName(action.actionName);
            return;
        }

        const action = actionElement;
        setActionTypesValue(action.actionType);
        setActionDisplayName(action.actionDisplayName);
        setChannelsAddedTo(action.channelsAddedTo);
        setActionSuccessfullMessage(action.actionSuccessfullMessage);
        setActionName(action.actionName);
    };

    const handleClose = () => {
        if (actionVisible) {
            setActionVisible(false);
            setConfigVisible(true);
            return;
        } else if (deleteVisible) {
            setDeleteVisible(false);
            setConfigVisible(true);
            return;
        }

        setShow(false);
        setVisibility(false);
    };
    const handleEditAction = (i: number) => {
        setActionIndex(i);
        setActionVisible(true);
        setConfigVisible(false);
    };

    const handleAddActions = () => {
        resetActionElement();
        setActionIndex(null);
        preFillActions();
        setActionVisible(true);
        setConfigVisible(false);
    };
    const handleDelete = (index: number) => {
        setActionIndex(index);
        setDeleteVisible(true);
        setConfigVisible(false);
    };

    const structureConfig = () => {
        if (configIndex !== null) {
            config[configIndex].message = message;
            config[configIndex].delayInSeconds = delay;
            config[configIndex].includeGuests = guestValue;
            config[configIndex].attachmentMessage = attachmentMessage;
            config[configIndex].teamName = teamName;
        }
    };
    const structureNewConfig = () => {
        existingConfig.message = message;
        existingConfig.delayInSeconds = delay;
        existingConfig.includeGuests = guestValue;
        existingConfig.attachmentMessage = attachmentMessage;
        existingConfig.teamName = teamName;
    };
    const structureNewActions = () => {
        actionElement.actionDisplayName = actionDisplayName;
        actionElement.actionName = actionName;
        actionElement.actionSuccessfullMessage = actionSuccessfullMessage;
        actionElement.actionType = actionTypesValue;
        actionElement.channelsAddedTo = actionChannelsAddedTo;
        const _ = existingConfig.actions?.push(actionElement);
    };
    const structureActions = () => {
        if (existingConfig?.actions && actionIndex !== null) {
            const action = existingConfig.actions[actionIndex];
            action.actionDisplayName = actionDisplayName;
            action.actionName = actionName;
            action.actionSuccessfullMessage = actionSuccessfullMessage;
            action.actionType = actionTypesValue;
            action.channelsAddedTo = actionChannelsAddedTo;
            existingConfig!.actions = [...existingConfig?.actions];
        }
    };

    const handlePrimary = () => {
        if (actionVisible) {
            if (configIndex !== null) {
                if (actionIndex === null) {
                    actionElement.actionDisplayName = actionDisplayName;
                    actionElement.actionName = actionName;
                    actionElement.actionSuccessfullMessage = actionSuccessfullMessage;
                    actionElement.actionType = actionTypesValue;
                    actionElement.channelsAddedTo = actionChannelsAddedTo;
                    const actions = existingConfig?.actions;
                    if (actions) {
                        actions.push(actionElement);
                        existingConfig!.actions = actions;
                    }
                } else {
                    structureActions();
                }
            } else if (configIndex === null) {
                if (actionIndex === null) {
                    structureNewActions();
                } else {
                    structureActions();
                }
            }
            setActionVisible(false);
            setConfigVisible(true);
            onChange(config);
        }
        if (configVisible) {
            if (configIndex === null) {
                structureNewConfig();
                config.push(existingConfig);
            } else {
                structureConfig();
            }
            onChange(config);
            handleClose();
        }
        if (deleteVisible && actionIndex !== null) {
            const _ = existingConfig.actions?.splice(actionIndex, 1);
            if (configIndex !== null) {
                config[configIndex] = existingConfig;
                onChange(config);
            }
            handleClose();
        }
    };

    return (
        <>
            <Modal
                className='configModal'
                show={show}
                onHide={handleClose}
            >
                <Modal.Header closeButton={false}>
                    <Modal.Title>
                        {modalHeader}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className='configModalBody'>
                    {configVisible && <div className={configVisible ? 'fade-enter' : 'fade-exit'}>
                        <Form>
                            <Form.Group className='form-group'>
                                <Form.Label>{'Team name'}</Form.Label>
                                <Form.Control
                                    type='text'
                                    placeholder='Enter your team name'
                                    value={teamName}
                                    onChange={(e) => setTeamName(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group className='form-group'>
                                <Form.Label>{'Delay (in sec)'}</Form.Label>
                                <Form.Control
                                    type='text'
                                    placeholder='Enter the delay in seconds'
                                    value={delay}
                                    onChange={(e) => setDelay(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group className='form-group'>
                                <Form.Label>{'Message'}</Form.Label>
                                <Form.Control
                                    type='text'
                                    placeholder='Enter the message for the new user'
                                    value={message}
                                    onChange={(e) => setMessage([e.target.value])}
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label className='radio-form'>{'Include guests'}</Form.Label>
                                <ButtonGroup className='radio'>
                                    {guest.map((guests, index) => (
                                        <ToggleButton
                                            key={index.toString()}
                                            type='radio'
                                            name='radio'
                                            value={guests.value}
                                            checked={guestValue === guests.value}
                                            onChange={(e) => setGuestValue(e.currentTarget.value)}
                                        >
                                            {guests.name}
                                        </ToggleButton>
                                    ))}
                                </ButtonGroup>
                            </Form.Group>
                            <Form.Group className='form-group'>
                                <Form.Label>{'Attachment Message'}</Form.Label>
                                <Form.Control
                                    type='long-text'
                                    placeholder='This is a example attachment message'
                                    aria-label='Disabled input example'
                                    value={attachmentMessage}
                                    onChange={(e) => setAttachmentMessage([e.target.value])}
                                />
                            </Form.Group>
                            {configIndex !== null &&
                                <Form.Group className='action-table'>
                                    <Form.Label>{'Actions'}</Form.Label>
                                </Form.Group>}
                        </Form>
                        {existingConfig?.actions && actionLength ? (
                            <Table
                                striped={true}
                                className='listTable'
                            >
                                <thead>
                                    <tr>
                                        <th>{'Type'}</th>
                                        <th>{'Display Name'}</th>
                                        <th>{'Name'}</th>
                                        <th>{'Channels Added to'}</th>
                                        <th>{'Success Message'}</th>
                                        <th>{'Options'}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        existingConfig?.actions?.map((val, i) =>
                                            (
                                                <tr key={i.toString()}>
                                                    <td>{val.actionType}</td>
                                                    <td>{val.actionDisplayName}</td>
                                                    <td>{val.actionName}</td>
                                                    <td>{val.channelsAddedTo}</td>
                                                    <td>{val.actionSuccessfullMessage}</td>
                                                    <td>
                                                        <ButtonGroup
                                                            aria-label='Basic example'
                                                            className='options'
                                                        >
                                                            <OverlayTrigger
                                                                placement='top'
                                                                overlay={<Tooltip>{'Edit action'}</Tooltip>}
                                                            >
                                                                <Button onClick={() => handleEditAction(i)}>
                                                                    <svg
                                                                        className='svg'
                                                                        xmlns='http://www.w3.org/2000/svg'
                                                                        width='20'
                                                                        height='20'
                                                                        viewBox='0 0 24 24'
                                                                        fill='none'
                                                                        stroke='#333'
                                                                        strokeWidth='1.65'
                                                                        strokeLinecap='round'
                                                                        strokeLinejoin='round'
                                                                    ><path d='M20 14.66V20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h5.34'/><polygon points='18 2 22 6 12 16 8 16 8 12 18 2'/></svg>
                                                                </Button>
                                                            </OverlayTrigger>
                                                            <OverlayTrigger
                                                                placement='top'
                                                                overlay={<Tooltip>{'Delete action'}</Tooltip>}
                                                            >
                                                                <Button onClick={() => handleDelete(i)}>
                                                                    <svg
                                                                        className='svg'
                                                                        xmlns='http://www.w3.org/2000/svg'
                                                                        width='20'
                                                                        height='20'
                                                                        viewBox='0 0 24 24'
                                                                        fill='none'
                                                                        stroke='#333'
                                                                        strokeWidth='1.65'
                                                                        strokeLinecap='round'
                                                                        strokeLinejoin='round'
                                                                    ><polyline points='3 6 5 6 21 6'/><path d='M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2'/>
                                                                        <line
                                                                            x1='10'
                                                                            y1='11'
                                                                            x2='10'
                                                                            y2='17'
                                                                        />
                                                                        <line
                                                                            x1='14'
                                                                            y1='11'
                                                                            x2='14'
                                                                            y2='17'
                                                                        />
                                                                    </svg>
                                                                </Button>
                                                            </OverlayTrigger>
                                                        </ButtonGroup>
                                                    </td>
                                                </tr>
                                            ),
                                        )
                                    }
                                </tbody>
                            </Table>
                        ) : (
                            configIndex !== null && <p>{'No Action configured'}</p>
                        )
                        }
                    </div>}

                    {actionVisible && <div className={actionVisible ? 'fade-enter' : 'fade-exit'}>
                        <Form>
                            <Form.Group>
                                <Form.Label className='radio-form'>{'Action Type'}</Form.Label>
                                <ButtonGroup className='radio'>
                                    {actionTypes.map((radio, index) => (
                                        <ToggleButton
                                            key={index.toString()}
                                            type='radio'
                                            name='radio'
                                            value={radio.value}
                                            checked={actionTypesValue === radio.value}
                                            onChange={(e) => setActionTypesValue(e.currentTarget.value)}
                                        >
                                            {radio.name}
                                        </ToggleButton>
                                    ))}
                                </ButtonGroup>
                            </Form.Group>
                            <Form.Group className='form-group'>
                                <Form.Label>{'Action Display Name'}</Form.Label>
                                <Form.Control
                                    type='text'
                                    placeholder='Enter the display name of your action'
                                    value={actionDisplayName}
                                    onChange={(e) => setActionDisplayName(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group className='form-group'>
                                <Form.Label>{'Action Name'}</Form.Label>
                                <Form.Control
                                    type='text'
                                    placeholder='Enter the name of your action'
                                    value={actionName}
                                    onChange={(e) => setActionName(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group className='form-group'>
                                <Form.Label>{'Channels Added to'}</Form.Label>
                                <Form.Control
                                    type='text'
                                    placeholder='Enter the name of channels in which you want to add the new user'
                                    value={actionChannelsAddedTo}
                                    onChange={(e) => setChannelsAddedTo([e.target.value])}
                                />
                            </Form.Group>
                            <Form.Group className='form-group'>
                                <Form.Label>{'Action Successfull message'}</Form.Label>
                                <Form.Control
                                    type='text'
                                    placeholder='Enter the success message on completion of action'
                                    value={actionSuccessfullMessage}
                                    onChange={(e) => setActionSuccessfullMessage([e.target.value])}
                                />
                            </Form.Group>
                        </Form>
                    </div>}
                    {!deleteVisible && !actionVisible && <div>
                        <Button
                            className={configIndex !== null && actionLength > 0 ? 'add-actions' : ''}
                            onClick={handleAddActions}
                        >{'Add actions'}</Button>
                    </div>}

                    {deleteVisible && <div className={deleteVisible ? 'fade-enter' : 'fade-exit'}>
                        <p>{'Are you sure you would like to delete the action ?'}</p>
                    </div>}
                </Modal.Body>
                <Modal.Footer>
                    {configVisible && handleCloseButton('primary', 'Save changes')}
                    {actionVisible && handleCloseButton('primary', 'Add action')}
                    {configVisible && handleCloseButton('secondary', 'Close')}
                    {actionVisible && handleCloseButton('secondary', 'Cancel')}
                    {deleteVisible && handleCloseButton('secondary', 'Cancel')}
                    {deleteVisible && handleCloseButton('danger', 'Delete action')}
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default ConfigModal;
