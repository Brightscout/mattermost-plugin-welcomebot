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

interface Props {
    visible: boolean;
    setVis: React.Dispatch<React.SetStateAction<boolean>>;
    configIndex: number;
    config: Configs[];
    onChange: any;
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
    const [show, setShow] = useState(false);
    const [actionVisible, setActionVisible] = useState(false);
    const [configVisible, setConfigVisible] = useState(false);
    const [deleteVisible, setDeleteVisible] = useState(false);

    const [teamName, setTeamName] = useState('');
    const [delay, setDelay] = useState('');
    const [message, setMessage] = useState(['']);
    const [attachmentMessage, setAttachmentMessage] = useState(['']);
    const [guestValue, setGuestValue] = useState('');

    const [actionTypesValue, setActionTypesValue] = useState('');
    const [actionDisplayName, setActionDisplayName] = useState('');
    const [actionChannelsAddedTo, setChannelsAddedTo] = useState(['']);
    const [actionSuccessfullMessage, setActionSuccessfullMessage] = useState(['']);
    const [actionIndex, setActionIndex] = useState(-2);
    const [actionName, setActionName] = useState('');

    // const actionLength = props.config[props.configIndex]?.Actions?.length ?? 0;
    console.log(props.config);
    // const [existingConfig, setExistingConfig] = useState(props.configIndex >= 0 ? props.config[props.configIndex] : newConfig);
    const [existingConfig, setExistingConfig] = useState(newConfig);

    const actionLength = existingConfig?.Actions?.length ?? 0;

    console.log(existingConfig);
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
        console.log('pehla useEffect()');
    }, [props.visible]);
    useEffect(() => {
        if (props.config[props.configIndex]?.Actions) {
            const action = props.config[props.configIndex]?.Actions?.[actionIndex] ?? newAction[0];
            setActionTypesValue(action.ActionType);
            setActionDisplayName(action.ActionDisplayName);
            setChannelsAddedTo(action.ChannelsAddedTo);
            setActionSuccessfullMessage(action.ActionSuccessfullMessage);
            setActionName(action.ActionName);
            console.log('doosra useEffect() inside if');
        }
        console.log('doosra useEffect()');
    }, [actionIndex]);

    useEffect(() => {
        console.log('props.configIndex => ', props.configIndex);
        if (props.configIndex >= 0) {
            setTeamName(existingConfig.TeamName);
            setDelay(existingConfig.DelayInSeconds);
            setMessage(existingConfig.Message);
            setGuestValue(existingConfig?.IncludeGuests ?? '');
            setAttachmentMessage(existingConfig?.AttachmentMessage ?? []);
            console.log('teesra useEffect() inside if');
        }
        console.log('teesra useEffect()');
    }, []);

    useEffect(() => {
        setExistingConfig(props.configIndex >= 0 ? props.config[props.configIndex] : newConfig);
        console.log('chautha useEffect()');
    }, [props.config]);

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
        console.log('inside handleClose');
    };
    const handleEditAction = (i: number) => {
        setActionIndex(i);
        setActionVisible(true);
        setConfigVisible(false);
        console.log('inside handleEditAction');
    };

    const handleAddActions = () => {
        setActionIndex(-1);
        setActionVisible(true);
        setConfigVisible(false);
        console.log('inside handleAddActions');
    };
    const handleDelete = (index: number) => {
        setActionIndex(index);
        setDeleteVisible(true);
        setConfigVisible(false);
        console.log('inside handleDelete');
    };
    const structureConfig = () => {
        props.config[props.configIndex].Message = message;
        props.config[props.configIndex].ConfigValues = true;
        props.config[props.configIndex].DelayInSeconds = delay;
        props.config[props.configIndex].IncludeGuests = guestValue;
        props.config[props.configIndex].AttachmentMessage = attachmentMessage;
        props.config[props.configIndex].TeamName = teamName;
        console.log('inside structureConfig');
    };
    const structureNewConfig = () => {
        existingConfig.Message = message;
        existingConfig.ConfigValues = true;
        existingConfig.DelayInSeconds = delay;
        existingConfig.IncludeGuests = guestValue;
        existingConfig.AttachmentMessage = attachmentMessage;
        existingConfig.TeamName = teamName;
        console.log('inside structureNewConfig');
    };
    const structureNewActions = () => {
        actionElement.ActionDisplayName = actionDisplayName;
        actionElement.ActionName = actionName;
        actionElement.ActionSuccessfullMessage = actionSuccessfullMessage;
        actionElement.ActionType = actionTypesValue;
        actionElement.ChannelsAddedTo = actionChannelsAddedTo;
        const l = existingConfig.Actions?.push(actionElement);
        console.log('inside structureNewAction');
    };
    const structureActions = () => {
        const actions = props.config[props.configIndex]?.Actions;
        if (actions && actionIndex < actions.length) {
            const action = actions[actionIndex];
            action.ActionDisplayName = actionDisplayName;
            action.ActionName = actionName;
            action.ActionSuccessfullMessage = actionSuccessfullMessage;
            action.ActionType = actionTypesValue;
            action.ChannelsAddedTo = actionChannelsAddedTo;
            props.config[props.configIndex]!.Actions = [...actions];
            console.log('inside if of structureActions');
        }
        console.log('inside structureActions');
    };

    const handlePrimary = () => {
        console.log('inside handlePrimary');
        if (actionVisible) {
            if (props.configIndex >= 0) {
                if (actionIndex < 0) {
                    newAction[0].ActionDisplayName = actionDisplayName;
                    newAction[0].ActionName = actionName;
                    newAction[0].ActionSuccessfullMessage = actionSuccessfullMessage;
                    newAction[0].ActionType = actionTypesValue;
                    newAction[0].ChannelsAddedTo = actionChannelsAddedTo;
                    const actions = props.config[props.configIndex]?.Actions;
                    if (actions) {
                        actions.push(newAction[0]);
                        props.config[props.configIndex]!.Actions = actions;
                    }
                } else {
                    structureActions();
                }
            } else {
                console.log('structureNewActions()');
                structureNewActions();
            }
            setActionVisible(false);
            setConfigVisible(true);
            props.onChange(props.config);
        }
        if (configVisible) {
            if (props.configIndex >= 0) { //for edit config modal
                structureConfig();
            } else {
                console.log('structureNewConfig()');
                structureNewConfig();
                props.config.push(existingConfig);
            }
            props.onChange(props.config);
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
                {console.log('buy', teamName, delay, message, attachmentMessage)}
                <Modal.Body className='configModalBody'>
                    {console.log('sell', configVisible)}
                    {configVisible && <div className={configVisible ? 'fade-enter' : 'fade-exit'}>
                        {console.log('die')}
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
                                    {/* {
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
                                    } */}
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
