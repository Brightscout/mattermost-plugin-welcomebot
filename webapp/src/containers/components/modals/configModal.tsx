/* eslint-disable max-lines */
import React, {useEffect, useState} from 'react';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import {OverlayTrigger, Tooltip, ToggleButton} from 'react-bootstrap';

import './styles.css';

import Select from 'react-select';

import {Configs, Actions, GroupType, OptionType} from 'types/plugin/common';

import {getChannels, getTeams} from 'api/api_wrapper';

interface Props {
    visible: boolean;
    setVisible: React.Dispatch<React.SetStateAction<boolean>>;
    configIndex: number | null;
    config: Configs[];
    onChange: any;
    modalHeader: string;
}

function ConfigModal({visible, setVisible, configIndex, config, onChange, modalHeader}: Props) {
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
    const newAction: Actions[] = [
    ];
    const newConfig: Configs = {
        teamName: '',
        delayInSeconds: 0,
        message: [''],
        includeGuests: '',
        attachmentMessage: [''],
        actions: newAction,
    };

    const [show, setShow] = useState(true);
    const [configVisible, setConfigVisible] = useState(true);
    const [actionVisible, setActionVisible] = useState(false);
    const [deleteVisible, setDeleteVisible] = useState(false);
    const [existingConfig, setExistingConfig] = useState(configIndex === null ? newConfig : config[configIndex]);

    const [teamName, setTeamName] = useState(existingConfig.teamName);
    const [delay, setDelay] = useState(existingConfig.delayInSeconds);
    const [message, setMessage] = useState(existingConfig.message);
    const [attachmentMessage, setAttachmentMessage] = useState(existingConfig.attachmentMessage ?? ['']);
    const [guestValue, setGuestValue] = useState(existingConfig.includeGuests);

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

    const [deleteAction, setDeleteAction] = useState('');

    const actionLength = existingConfig?.actions?.length ?? 0;
    const guest = [
        {name: 'true', value: 'true'},
        {name: 'false', value: 'false'},
    ];
    const actionTypes = [
        {name: 'button', value: 'button'},
        {name: 'automatic', value: 'automatic'},
    ];

    const [teamOptionList, setTeamOptionList] = useState<OptionType[]>([]);

    const [channelOptionList, setChannelOptionList] = useState<OptionType[]>([]);

    useEffect(() => {
        // getTeam();
        getTeams().
            then((teams) => {
                const optionws = teams.map((team: any) => ({
                    value: team.display_name,
                    label: team.display_name,
                }));
                setTeamOptionList(optionws);
            }).
            catch((error) => {
                console.error('Error fetching teams:', error);
            });

        getChannels().
            then((channels) => {
                const optionws = channels.map((channel: any) => ({
                    value: channel.display_name,
                    label: channel.display_name,
                }));
                setChannelOptionList(optionws);
            }).
            catch((error) => {
                console.error('Error fetching channels:', error);
            });
    }, []);
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
            if (configIndex !== null) {
                setTeamName(existingConfig.teamName);
                setDelay(existingConfig.delayInSeconds);
                setMessage(existingConfig.message);
                setGuestValue(existingConfig?.includeGuests ?? '');
                setAttachmentMessage(existingConfig?.attachmentMessage ?? []);
            }

            if (actionSuccessfullMessage.length === 0) {
                setActionSuccessfullMessageValid(false);
            } else if (actionSuccessfullMessage.length === 1) {
                setActionSuccessfullMessageValid(actionSuccessfullMessage[0] !== '');
            } else {
                setActionSuccessfullMessageValid(true);
            }

            setActionNameValid(actionName !== '');
        }
    }, [teamName, delay, message, actionTypesValue, actionDisplayName, actionChannelsAddedTo, actionSuccessfullMessage, actionName]);

    useEffect(() => {
        setExistingConfig(configIndex === null ? newConfig : config[configIndex]);
    }, [config]);

    const preFillActions = () => {
        if (existingConfig?.actions && actionIndex !== null) {
            // if (actionIndex !== null) {
            const action = existingConfig?.actions?.[actionIndex] ?? actionElement;
            setActionTypesValue(action.actionType);
            setActionDisplayName(action.actionDisplayName);
            setActionChannelsAddedTo(action.channelsAddedTo);
            setActionSuccessfullMessage(action.actionSuccessfullMessage);
            setActionName(action.actionName);
        } else {
            const action = actionElement;
            setActionTypesValue(action.actionType);
            setActionDisplayName(action.actionDisplayName);
            setActionChannelsAddedTo(action.channelsAddedTo);
            setActionSuccessfullMessage(action.actionSuccessfullMessage);
            setActionName(action.actionName);
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
            setVisible(false);
        }
    };
    const handleEditAction = (i: number) => {
        setActionIndex(i);
        setActionVisible(true);
        setConfigVisible(false);
    };

    const handleChannelSelect = (selectedOptions: OptionType[]) => {
        const selectedChannels = selectedOptions.map((option) => option.value);
        setActionChannelsAddedTo(selectedChannels);
    };

    const handleTeamSelect = (selectedOption: GroupType) => {
        if (selectedOption === null) {
            setTeamName('');
        } else {
            setTeamName(selectedOption.value);
        }
    };

    const handleAddActions = () => {
        setValidated(false);
        resetActionElement();
        setActionIndex(null);
        preFillActions();
        setActionVisible(true);
        setConfigVisible(false);
    };
    const handleDelete = (index: number, action: string) => {
        setDeleteAction(action);
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
        const l = existingConfig.actions?.push(actionElement);
    };
    const structureActions = () => {
        const actions = existingConfig?.actions;
        if (actions && actionIndex !== null) {
            const action = actions[actionIndex];
            action.actionDisplayName = actionDisplayName;
            action.actionName = actionName;
            action.actionSuccessfullMessage = actionSuccessfullMessage;
            action.actionType = actionTypesValue;
            action.channelsAddedTo = actionChannelsAddedTo;
            existingConfig!.actions = [...actions];
        }
    };

    const handlePrimary = () => {
        if (actionVisible) {
            if (actionChannelsAddedToValid && actionDisplayNameValid && actionSuccessfullMessageValid && actionTypesValueValid && actionNameValid) {
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
            const l = existingConfig.actions?.splice(actionIndex, 1);
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
                        <Form
                            noValidate={true}
                            validated={validated}
                        >
                            <Form.Group
                                className='form-group'
                                controlId='validationCustom02'
                            >
                                <Form.Label>{'TeamName*'}</Form.Label>
                                <Select
                                    closeMenuOnSelect={true}
                                    onChange={handleTeamSelect}
                                    isMulti={false}
                                    placeholder='Select your team'
                                    isSearchable={true}
                                    options={teamOptionList}
                                    value={teamOptionList.find((option) => option.value === teamName)}
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
                                <Form.Label>{'Delay (in secs)*'}</Form.Label>
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
                                    {'Please provide a positive number'}
                                </Form.Control.Feedback>}
                            </Form.Group>
                            <Form.Group className='form-group'>
                                <Form.Label>{'Message*'}</Form.Label>
                                <Form.Control
                                    type='text'
                                    placeholder=' Enter a message to post to a new user'
                                    value={message}
                                    onChange={(e) => setMessage([e.target.value])}
                                />
                                {validated && !messageValid &&
                                <Form.Control.Feedback
                                    type='invalid'
                                    className='validation-warning'
                                >
                                    {'Please provide a message'}
                                </Form.Control.Feedback>}
                            </Form.Group>
                            <Form.Group>
                                <Form.Label className='radio-form'>{'Include guests'}</Form.Label>
                                <ButtonGroup className='radio'>
                                    {guest.map((guests, index) => (
                                        <ToggleButton
                                            className='guestButton'
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
                                    placeholder='Enter the attachment messages'
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
                        {existingConfig?.actions && actionLength > 0 ? (
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
                                                                    width='16'
                                                                    height='16'
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
                                                            <Button onClick={() => handleDelete(i, val.actionName)}>
                                                                <svg
                                                                    className='svg'
                                                                    xmlns='http://www.w3.org/2000/svg'
                                                                    width='16'
                                                                    height='16'
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
                                            className='actionTypeButton'
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
                                    {'Please select an action type'}
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
                                    {'Please provide the display name for your action'}
                                </Form.Control.Feedback>}
                            </Form.Group>
                            <Form.Group className='form-group'>
                                <Form.Label>{'Action Name*'}</Form.Label>
                                <Form.Control
                                    type='text'
                                    placeholder='Enter the display name of your action'
                                    value={actionName}
                                    onChange={(e) => setActionName(e.target.value)}
                                />
                                {validated && !actionNameValid &&
                                <Form.Control.Feedback
                                    type='invalid'
                                    className='validation-warning'
                                >
                                    {'Please provide a name for your action'}
                                </Form.Control.Feedback>}
                            </Form.Group>
                            <Form.Group className='form-group'>
                                <Form.Label>{'Channels Added to*'}</Form.Label>
                                <Select
                                    closeMenuOnSelect={false}
                                    onChange={handleChannelSelect}
                                    isMulti={true}
                                    placeholder='Select the channels in which you want to add the new user'
                                    isSearchable={true}
                                    options={channelOptionList.filter(
                                        (channel) => channel.label !== 'Off-Topic' && channel.label !== 'Town Square',
                                    )
                                    }
                                    value={channelOptionList.filter((option) => actionChannelsAddedTo.includes(option.value))}
                                />
                                {validated && !actionChannelsAddedToValid &&
                                <Form.Control.Feedback
                                    type='invalid'
                                    className='validation-warning'
                                >
                                    {'Please provide at least one channel name '}
                                </Form.Control.Feedback>}
                            </Form.Group>
                            <Form.Group className='form-group'>
                                <Form.Label>{'Action Successfull Message*'}</Form.Label>
                                <Form.Control
                                    type='text'
                                    placeholder='Enter a message to post when a user completes an action'
                                    value={actionSuccessfullMessage}
                                    onChange={(e) => setActionSuccessfullMessage([e.target.value])}
                                />
                                {validated && !actionSuccessfullMessageValid &&
                                <Form.Control.Feedback
                                    type='invalid'
                                    className='validation-warning'
                                >
                                    {'Please provide a message'}
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
                        <p>{`Are you sure you would like to delete the action ${deleteAction} ?`}</p>
                    </div>}
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant='secondary'
                        onClick={handleClose}
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
