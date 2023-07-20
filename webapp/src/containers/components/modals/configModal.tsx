/* eslint-disable max-lines */
import React, {useEffect, useState} from 'react';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import {OverlayTrigger, Tooltip, ToggleButton} from 'react-bootstrap';

import './styles.css';
// eslint-disable-next-line import/no-unresolved
import {Configs, Actions} from 'types/plugin/common';

interface Props {
    visible: boolean;
    setVis: React.Dispatch<React.SetStateAction<boolean>>;
    configIndex: number | null;
    config: Configs[];
    onChange: any;
    modalHeader: string;
}

function ConfigModal({visible, setVis, configIndex, config, onChange, modalHeader}: Props) {
    const actionElement: Actions = {
        ActionType: '',
        ActionName: '',
        ActionDisplayName: '',
        ChannelsAddedTo: [''],
        ActionSuccessfullMessage: [''],
    };
    const resetActionElement = () => {
        actionElement.ActionType = '';
        actionElement.ActionName = '';
        actionElement.ActionDisplayName = '';
        actionElement.ChannelsAddedTo = [''];
        actionElement.ActionSuccessfullMessage = [''];
    };
    const newAction: Actions[] = [
    ];
    const newConfig: Configs = {
        TeamName: '',
        DelayInSeconds: 0,
        Message: [''],
        IncludeGuests: '',
        AttachmentMessage: [''],
        Actions: newAction,
    };
    const [show, setShow] = useState(true);
    const [actionVisible, setActionVisible] = useState(false);
    const [configVisible, setConfigVisible] = useState(true);
    const [deleteVisible, setDeleteVisible] = useState(false);

    const [existingConfig, setExistingConfig] = useState(configIndex === null ? newConfig : config[configIndex]);

    const [teamName, setTeamName] = useState(existingConfig.TeamName);
    const [delay, setDelay] = useState(existingConfig.DelayInSeconds);
    const [message, setMessage] = useState(existingConfig.Message);
    const [attachmentMessage, setAttachmentMessage] = useState(existingConfig.AttachmentMessage ?? ['']);
    const [guestValue, setGuestValue] = useState(existingConfig.IncludeGuests);

    const [teamNameValid, setTeamNameValid] = useState(false);
    const [messageValid, setMessageValid] = useState(false);
    const [delayValid, setDelayValid] = useState(false);
    const [actionTypesValue, setActionTypesValue] = useState('');
    const [actionDisplayName, setActionDisplayName] = useState('');
    const [actionChannelsAddedTo, setActionChannelsAddedTo] = useState(['']);
    const [actionSuccessfullMessage, setActionSuccessfullMessage] = useState(['']);
    const [actionName, setActionName] = useState('');

    const [actionIndex, setActionIndex] = useState<number | null>(0);

    const [actionTypesValueValid, setActionTypesValueValid] = useState(false);
    const [actionDisplayNameValid, setActionDisplayNameValid] = useState(false);
    const [actionChannelsAddedToValid, setActionChannelsAddedToValid] = useState(false);
    const [actionSuccessfullMessageValid, setActionSuccessfullMessageValid] = useState(false);
    const [actionNameValid, setActionNameValid] = useState(false);

    const [validated, setValidated] = useState(false);

    const actionLength = existingConfig?.Actions?.length ?? 0;

    const guest = [
        {name: 'true', value: 'true'},
        {name: 'false', value: 'false'},
    ];
    const actionTypes = [
        {name: 'button', value: 'button'},
        {name: 'automatic', value: 'automatic'},
    ];

    useEffect(() => {
        setShow(visible);
        setConfigVisible(visible);
    }, [visible]);

    useEffect(() => {
        preFillActions();
    }, [actionIndex]);

    useEffect(() => {
        setTeamNameValid(teamName.trim() !== '');
        if (message.length === 0) {
            setMessageValid(false);
        } else if (message.length === 1) {
            setMessageValid(message[0] !== '');
        } else {
            setMessageValid(true);
        }
        setDelayValid(delay >= 0);
        setActionTypesValueValid(actionTypesValue !== '');
        setActionDisplayNameValid(actionDisplayName !== '');
        if (actionChannelsAddedTo.length === 0) {
            setActionChannelsAddedToValid(false);
        } else if (actionChannelsAddedTo.length === 1) {
            setActionChannelsAddedToValid(actionChannelsAddedTo[0] !== '');
        } else {
            setActionChannelsAddedToValid(true);
        }

        if (actionSuccessfullMessage.length === 0) {
            setActionSuccessfullMessageValid(false);
        } else if (actionSuccessfullMessage.length === 1) {
            setActionSuccessfullMessageValid(actionSuccessfullMessage[0] !== '');
        } else {
            setActionSuccessfullMessageValid(true);
        }

        setActionNameValid(actionName !== '');
    }, [teamName, delay, message, actionTypesValue, actionDisplayName, actionChannelsAddedTo, actionSuccessfullMessage, actionName]);

    useEffect(() => {
        if (configIndex !== null) {
            setTeamName(existingConfig.TeamName);
            setDelay(existingConfig.DelayInSeconds);
            setMessage(existingConfig.Message);
            setGuestValue(existingConfig?.IncludeGuests ?? '');
            setAttachmentMessage(existingConfig?.AttachmentMessage ?? []);
        }
    }, []);

    useEffect(() => {
        setExistingConfig(configIndex === null ? newConfig : config[configIndex]);
    }, [config]);

    const preFillActions = () => {
        if (existingConfig?.Actions && actionIndex !== null) {
            // if (actionIndex !== null) {
            const action = existingConfig?.Actions?.[actionIndex] ?? actionElement;
            setActionTypesValue(action.ActionType);
            setActionDisplayName(action.ActionDisplayName);
            setActionChannelsAddedTo(action.ChannelsAddedTo);
            setActionSuccessfullMessage(action.ActionSuccessfullMessage);
            setActionName(action.ActionName);
        } else {
            const action = actionElement;
            setActionTypesValue(action.ActionType);
            setActionDisplayName(action.ActionDisplayName);
            setActionChannelsAddedTo(action.ChannelsAddedTo);
            setActionSuccessfullMessage(action.ActionSuccessfullMessage);
            setActionName(action.ActionName);
        }
    };

    const handleClose = () => {
        if (actionVisible) {
            setValidated(false);
            setActionVisible(false);
            setConfigVisible(true);
        } else if (deleteVisible) {
            setValidated(false);
            setDeleteVisible(false);
            setConfigVisible(true);
        } else {
            setValidated(false);
            setShow(false);
            setVis(false);
        }
    };
    const handleEditAction = (i: number) => {
        setActionIndex(i);
        setActionVisible(true);
        setConfigVisible(false);
    };

    const handleAddActions = () => {
        setValidated(false);
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
            config[configIndex].Message = message;
            config[configIndex].DelayInSeconds = delay;
            config[configIndex].IncludeGuests = guestValue;
            config[configIndex].AttachmentMessage = attachmentMessage;
            config[configIndex].TeamName = teamName;
        }
    };
    const structureNewConfig = () => {
        existingConfig.Message = message;
        existingConfig.DelayInSeconds = delay;
        existingConfig.IncludeGuests = guestValue;
        existingConfig.AttachmentMessage = attachmentMessage;
        existingConfig.TeamName = teamName;
    };
    const structureNewActions = () => {
        actionElement.ActionDisplayName = actionDisplayName;
        actionElement.ActionName = actionName;
        actionElement.ActionSuccessfullMessage = actionSuccessfullMessage;
        actionElement.ActionType = actionTypesValue;
        actionElement.ChannelsAddedTo = actionChannelsAddedTo;
        const l = existingConfig.Actions?.push(actionElement);
    };
    const structureActions = () => {
        const actions = existingConfig?.Actions;
        if (actions && actionIndex !== null) {
            const action = actions[actionIndex];
            action.ActionDisplayName = actionDisplayName;
            action.ActionName = actionName;
            action.ActionSuccessfullMessage = actionSuccessfullMessage;
            action.ActionType = actionTypesValue;
            action.ChannelsAddedTo = actionChannelsAddedTo;
            existingConfig!.Actions = [...actions];
        }
    };

    const handlePrimary = () => {
        if (actionVisible) {
            if (actionChannelsAddedToValid && actionDisplayNameValid && actionSuccessfullMessageValid && actionTypesValueValid && actionNameValid) {
                if (configIndex !== null) {
                    if (actionIndex === null) {
                        actionElement.ActionDisplayName = actionDisplayName;
                        actionElement.ActionName = actionName;
                        actionElement.ActionSuccessfullMessage = actionSuccessfullMessage;
                        actionElement.ActionType = actionTypesValue;
                        actionElement.ChannelsAddedTo = actionChannelsAddedTo;
                        const actions = existingConfig?.Actions;
                        if (actions) {
                            actions.push(actionElement);
                            existingConfig!.Actions = actions;
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
                setValidated(false);
                onChange(config);
            } else {
                setValidated(true);
            }
        }
        if (configVisible) {
            if (teamNameValid && messageValid) {
                if (configIndex === null) {
                    structureNewConfig();
                    config.push(existingConfig);
                } else {
                    structureConfig();
                }
                onChange(config);
                setValidated(false);
                handleClose();
            } else {
                setValidated(true);
            }
        }
        if (deleteVisible && actionIndex !== null) {
            const l = existingConfig.Actions?.splice(actionIndex, 1);
            if (configIndex !== null) {
                config[configIndex] = existingConfig;
                onChange(config);
            }
            handleClose();
        }
    };

    const handleSecondary = () => {
        handleClose();
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
                        <Form
                            noValidate={true}
                            validated={validated}
                        >
                            <Form.Group
                                className='form-group'
                                controlId='validationCustom02'
                            >
                                <Form.Label>{'TeamName*'}</Form.Label>
                                <Form.Control
                                    type='text'
                                    placeholder='Enter your team name'
                                    value={teamName}
                                    onChange={(e) => setTeamName(e.target.value)}
                                    required={true}
                                />
                                {validated && !teamNameValid &&
                                <Form.Control.Feedback
                                    type='invalid'
                                    className='validation-warning'
                                >
                                    {'Please provide a team name.'}
                                </Form.Control.Feedback>}
                            </Form.Group>
                            <Form.Group className='form-group'>
                                <Form.Label>{'Delay (in sec)*'}</Form.Label>
                                <Form.Control
                                    type='number'
                                    placeholder='Enter the delay in seconds'
                                    value={delay}
                                    onChange={(e) => setDelay(parseInt(e.target.value, 10))}
                                    required={true}
                                />
                                {validated && !delayValid &&
                                <Form.Control.Feedback
                                    type='invalid'
                                    className='validation-warning'
                                >
                                    {'Delay must be a positive number'}
                                </Form.Control.Feedback>}
                            </Form.Group>
                            <Form.Group className='form-group'>
                                <Form.Label>{'Message*'}</Form.Label>
                                <Form.Control
                                    type='text'
                                    placeholder='Enter the message for the new user'
                                    value={message}
                                    onChange={(e) => setMessage([e.target.value])}
                                />
                                {validated && !messageValid &&
                                <Form.Control.Feedback
                                    type='invalid'
                                    className='validation-warning'
                                >
                                    {'Please provide some message'}
                                </Form.Control.Feedback>}
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
                        {existingConfig?.Actions && actionLength > 0 ? (
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
                                    existingConfig?.Actions?.map((val, i) =>
                                        (
                                            <tr key={i.toString()}>
                                                <td>{val.ActionType}</td>
                                                <td>{val.ActionDisplayName}</td>
                                                <td>{val.ActionName}</td>
                                                <td>{val.ChannelsAddedTo}</td>
                                                <td>{val.ActionSuccessfullMessage}</td>
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
                                <Form.Label className='radio-form'>{'Action Type*'}</Form.Label>
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
                                {validated && !actionTypesValueValid &&
                                <Form.Control.Feedback
                                    type='invalid'
                                    className='validation-warning'
                                >
                                    {'Please provide the action type'}
                                </Form.Control.Feedback>}
                            </Form.Group>
                            <Form.Group className='form-group'>
                                <Form.Label>{'Action Display Name*'}</Form.Label>
                                <Form.Control
                                    type='text'
                                    placeholder='Enter the display name of your action'
                                    value={actionDisplayName}
                                    onChange={(e) => setActionDisplayName(e.target.value)}
                                />
                                {validated && !actionDisplayNameValid &&
                                <Form.Control.Feedback
                                    type='invalid'
                                    className='validation-warning'
                                >
                                    {'Please provide the action display name'}
                                </Form.Control.Feedback>}
                            </Form.Group>
                            <Form.Group className='form-group'>
                                <Form.Label>{'Action Name*'}</Form.Label>
                                <Form.Control
                                    type='text'
                                    placeholder='Enter the name of your action'
                                    value={actionName}
                                    onChange={(e) => setActionName(e.target.value)}
                                />
                                {validated && !actionNameValid &&
                                <Form.Control.Feedback
                                    type='invalid'
                                    className='validation-warning'
                                >
                                    {'Please provide the action name'}
                                </Form.Control.Feedback>}
                            </Form.Group>
                            <Form.Group className='form-group'>
                                <Form.Label>{'Channels Added to*'}</Form.Label>
                                <Form.Control
                                    type='text'
                                    placeholder='Enter the name of channels in which you want to add the new user'
                                    value={actionChannelsAddedTo}
                                    onChange={(e) => setActionChannelsAddedTo([e.target.value])}
                                />
                                {validated && !actionChannelsAddedToValid &&
                                <Form.Control.Feedback
                                    type='invalid'
                                    className='validation-warning'
                                >
                                    {'Please provide the channels new user should be added to'}
                                </Form.Control.Feedback>}
                            </Form.Group>
                            <Form.Group className='form-group'>
                                <Form.Label>{'Action Successfull message*'}</Form.Label>
                                <Form.Control
                                    type='text'
                                    placeholder='Enter the success message on completion of action'
                                    value={actionSuccessfullMessage}
                                    onChange={(e) => setActionSuccessfullMessage([e.target.value])}
                                />
                                {validated && !actionSuccessfullMessageValid &&
                                <Form.Control.Feedback
                                    type='invalid'
                                    className='validation-warning'
                                >
                                    {'Please provide some action success message'}
                                </Form.Control.Feedback>}
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
                    <Button
                        variant='secondary'
                        onClick={handleSecondary}
                    >
                        {'Close'}
                    </Button>
                    <Button
                        variant='primary'
                        onClick={handlePrimary}
                    >
                        {'Save changes'}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>

    );
}

export default ConfigModal;
