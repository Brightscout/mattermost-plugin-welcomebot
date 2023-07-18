/* eslint-disable import/no-unresolved */
/* eslint-disable no-console */
/* eslint-disable no-negated-condition */
import React, {useEffect, useState} from 'react';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import {OverlayTrigger, Tooltip, ToggleButton} from 'react-bootstrap';

import './styles.css';
import {Configs, Actions} from 'types/plugin/common';
import { restElement } from '@babel/types';

interface Props {
    visible: boolean;
    setVis: React.Dispatch<React.SetStateAction<boolean>>;
    configIndex: number;
    config: Configs[];
    onChange: any;
    modalHeader: string;
}

function ConfigModal(props: Props) {
    const actionElement: Actions = {
        ActionType: '',
        ActionName: '',
        ActionDisplayName: '',
        ChannelsAddedTo: [''],
        ActionSuccessfullMessage: [''],
    };
    const resetActionElement = () => {
        console.log('reset');
        actionElement.ActionType = '';
        actionElement.ActionName = '';
        actionElement.ActionDisplayName = '';
        actionElement.ChannelsAddedTo = [''];
        actionElement.ActionSuccessfullMessage = [''];
    };
    const newAction: Actions[] = [
    ];
    const newConfig: Configs = {
        ConfigValues: false,
        TeamName: '',
        DelayInSeconds: '',
        Message: [''],
        IncludeGuests: '',
        AttachmentMessage: [''],
        Actions: newAction,
    };
    const [show, setShow] = useState(true);
    const [actionVisible, setActionVisible] = useState(false);
    const [configVisible, setConfigVisible] = useState(true);
    const [deleteVisible, setDeleteVisible] = useState(false);

    const [existingConfig, setExistingConfig] = useState(props.configIndex >= 0 ? props.config[props.configIndex] : newConfig);

    const [teamName, setTeamName] = useState(existingConfig.TeamName);
    const [delay, setDelay] = useState(existingConfig.DelayInSeconds);
    const [message, setMessage] = useState(existingConfig.Message);
    const [attachmentMessage, setAttachmentMessage] = useState(existingConfig.AttachmentMessage ?? ['']);
    const [guestValue, setGuestValue] = useState(existingConfig.IncludeGuests);

    const [actionTypesValue, setActionTypesValue] = useState('');
    const [actionDisplayName, setActionDisplayName] = useState('');
    const [actionChannelsAddedTo, setChannelsAddedTo] = useState(['']);
    const [actionSuccessfullMessage, setActionSuccessfullMessage] = useState(['']);
    const [actionIndex, setActionIndex] = useState(-2);
    const [actionName, setActionName] = useState('');

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
        setShow(props.visible);
        setConfigVisible(props.visible);
    }, [props.visible]);

    useEffect(() => {
        preFillActions();
    }, [actionIndex]);

    useEffect(() => {
        if (props.configIndex >= 0) {
            setTeamName(existingConfig.TeamName);
            setDelay(existingConfig.DelayInSeconds);
            setMessage(existingConfig.Message);
            setGuestValue(existingConfig?.IncludeGuests ?? '');
            setAttachmentMessage(existingConfig?.AttachmentMessage ?? []);
        }
    }, []);

    useEffect(() => {
        setExistingConfig(props.configIndex >= 0 ? props.config[props.configIndex] : newConfig);
    }, [props.config]);

    const preFillActions = () => {
        if (existingConfig?.Actions) {
            const action = existingConfig?.Actions?.[actionIndex] ?? actionElement;
            setActionTypesValue(action.ActionType);
            setActionDisplayName(action.ActionDisplayName);
            setChannelsAddedTo(action.ChannelsAddedTo);
            setActionSuccessfullMessage(action.ActionSuccessfullMessage);
            setActionName(action.ActionName);
        }
    };

    const handleClose = () => {
        if (actionVisible) {
            setActionVisible(false);
            setConfigVisible(true);
        } else if (deleteVisible) {
            setDeleteVisible(false);
            setConfigVisible(true);
        } else {
            setShow(false);
            props.setVis(false);
        }
    };
    const handleEditAction = (i: number) => {
        setActionIndex(i);
        setActionVisible(true);
        setConfigVisible(false);
    };

    const handleAddActions = () => {
        resetActionElement();
        setActionIndex(-1);
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
        props.config[props.configIndex].Message = message;
        props.config[props.configIndex].ConfigValues = true;
        props.config[props.configIndex].DelayInSeconds = delay;
        props.config[props.configIndex].IncludeGuests = guestValue;
        props.config[props.configIndex].AttachmentMessage = attachmentMessage;
        props.config[props.configIndex].TeamName = teamName;
    };
    const structureNewConfig = () => {
        existingConfig.Message = message;
        existingConfig.ConfigValues = true;
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
        if (actions && actionIndex < actions.length) {
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
            if (props.configIndex >= 0) {
                if (actionIndex < 0) {
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
            } else if (props.configIndex < 0) {
                if (actionIndex < 0) {
                    structureNewActions();
                } else {
                    structureActions();
                }
            }
            setActionVisible(false);
            setConfigVisible(true);
            props.onChange(props.config);
        }
        if (configVisible) {
            if (props.configIndex >= 0) { //for edit config modal
                structureConfig();
            } else {
                structureNewConfig();
                props.config.push(existingConfig);
            }
            props.onChange(props.config);
            handleClose();
        }
        if (deleteVisible) {
            const l = existingConfig.Actions?.splice(actionIndex, 1);
            if (props.configIndex >= 0) {
                props.config[props.configIndex] = existingConfig;
                props.onChange(props.config);
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
                        {'Edit Config'}
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
                            {props.configIndex >= 0 &&
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
                            props.configIndex >= 0 && <p>{'No Action configured'}</p>
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
                            className={props.configIndex >= 0 && actionLength > 0 ? 'add-actions' : ''}
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
