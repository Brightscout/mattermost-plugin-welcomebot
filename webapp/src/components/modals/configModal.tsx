import React, {useEffect, useState} from 'react';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import {OverlayTrigger, Tooltip, ToggleButton} from 'react-bootstrap';

import Select, {MultiValue, SingleValue} from 'react-select';

import './styles.css';

import {Configs, Actions, OptionTypes, Teams, Channels, GroupTypes} from 'types/plugin/common';

import {fetchChannelsAndTeams} from 'api/api_wrapper';

import {DeleteSvg, EditSvg} from '../svgIcons/svg';

type Props = {
    visible: boolean;
    setVisible: React.Dispatch<React.SetStateAction<boolean>>;
    configIndex: number | null;
    config: Configs[];
    onChange: any;
    modalHeader: string;
}

function ConfigModal({visible, setVisible, configIndex, config, onChange, modalHeader}: Props) {
    const guest = [
        {name: 'true', value: 'true'},
        {name: 'false', value: 'false'},
    ];
    const actionTypes = [
        {name: 'button', value: 'button'},
        {name: 'automatic', value: 'automatic'},
    ];

    const actionElement: Actions = {
        actionType: '',
        actionName: '',
        actionDisplayName: '',
        channelsAddedTo: [''],
        actionSuccessfullMessage: [''],
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
    const [isConfigVisible, setIsConfigVisible] = useState(true);
    const [isActionVisible, setIsActionVisible] = useState(false);
    const [isDeleteVisible, setIsDeleteVisible] = useState(false);

    const [existingConfig, setExistingConfig] = useState(configIndex === null ? newConfig : config[configIndex]);

    const [teamName, setTeamName] = useState(existingConfig.teamName);
    const [delay, setDelay] = useState(existingConfig.delayInSeconds);
    const [message, setMessage] = useState(existingConfig.message);
    const [attachmentMessage, setAttachmentMessage] = useState(existingConfig.attachmentMessage ?? ['']);
    const [guestValue, setGuestValue] = useState(existingConfig.includeGuests);

    const [actionTypesValue, setActionTypesValue] = useState('');
    const [actionDisplayName, setActionDisplayName] = useState('');
    const [actionChannelsAddedTo, setActionChannelsAddedTo] = useState(['']);
    const [actionSuccessfullMessage, setActionSuccessfullMessage] = useState(['']);
    const [actionName, setActionName] = useState('');
    const [actionIndex, setActionIndex] = useState<number | null>(0);

    const [teamNameValid, setTeamNameValid] = useState(false);
    const [messageValid, setMessageValid] = useState(false);
    const [delayValid, setDelayValid] = useState(false);

    const [actionTypesValueValid, setActionTypesValueValid] = useState(false);
    const [actionDisplayNameValid, setActionDisplayNameValid] = useState(false);
    const [actionChannelsAddedToValid, setActionChannelsAddedToValid] = useState(false);
    const [actionSuccessfullMessageValid, setActionSuccessfullMessageValid] = useState(false);
    const [actionNameValid, setActionNameValid] = useState(false);

    const [validated, setValidated] = useState(false);

    const [deleteAction, setDeleteAction] = useState('');

    const [selectedTeam, setSelectedTeam] = useState('');

    const [teamSelectionWarning, setTeamSelectionWarning] = useState(false);

    const [actionClicked, setActionClicked] = useState(false);

    const [teamOptionList, setTeamOptionList] = useState<GroupTypes[]>([]);
    const [channelOptionList, setChannelOptionList] = useState<OptionTypes[]>([]);

    const actionLength = existingConfig?.actions?.length ?? 0;

    useEffect(() => {
        setShow(visible);
        setIsConfigVisible(visible);
    }, [visible]);

    useEffect(() => {
        setExistingConfig(configIndex === null ? newConfig : config[configIndex]);
    }, [config]);

    useEffect(() => {
        getTeamAndChannel();
        if (configIndex !== null) {
            setSelectedTeam(existingConfig.teamName);
            setTeamName(existingConfig.teamName);
            setDelay(existingConfig.delayInSeconds);
            setMessage(existingConfig.message);
            setGuestValue(existingConfig?.includeGuests ?? '');
            setAttachmentMessage(existingConfig?.attachmentMessage ?? []);
        }
    }, []);

    useEffect(() => {
        preFillActions();
    }, [actionIndex]);

    useEffect(() => {
        setTeamNameValid(teamName.trim() !== '');
        setTeamSelectionWarning(teamName.trim() !== '');
        if (!message.length) {
            setMessageValid(false);
        } else if (message.length === 1) {
            setMessageValid(message[0] !== '');
        } else {
            setMessageValid(true);
        }
        setDelayValid(delay >= 0);
        setActionTypesValueValid(actionTypesValue !== '');
        setActionDisplayNameValid(actionDisplayName !== '');
        setActionNameValid(actionName !== '');
        if (!actionChannelsAddedTo.length) {
            setActionChannelsAddedToValid(false);
        } else if (actionChannelsAddedTo.length === 1) {
            setActionChannelsAddedToValid(actionChannelsAddedTo[0] !== '');
        } else {
            setActionChannelsAddedToValid(true);
        }
        if (!actionSuccessfullMessage.length) {
            setActionSuccessfullMessageValid(false);
        } else if (actionSuccessfullMessage.length === 1) {
            setActionSuccessfullMessageValid(actionSuccessfullMessage[0] !== '');
        } else {
            setActionSuccessfullMessageValid(true);
        }
    }, [teamName, delay, message, attachmentMessage, actionTypesValue, actionDisplayName, actionChannelsAddedTo, actionSuccessfullMessage, actionName]);

    const handlePrimary = () => {
        if (isActionVisible) {
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
                setIsActionVisible(false);
                setIsConfigVisible(true);
                setValidated(false);
                onChange(config);
                setActionClicked(false);
            } else {
                setValidated(true);
            }
        }
        if (isConfigVisible) {
            if (teamNameValid && messageValid) {
                if (configIndex === null) {
                    structureNewConfig();
                    config.push(existingConfig);
                } else {
                    structureConfig();
                }
                onChange(config);
                setValidated(false);
                handleSecondary();
            } else {
                setValidated(true);
            }
        }
        if (isDeleteVisible && actionIndex !== null) {
            const l = existingConfig.actions?.splice(actionIndex, 1);
            if (configIndex !== null) {
                config[configIndex] = existingConfig;
                onChange(config);
            }
            handleSecondary();
        }
    };

    const handleSecondary = () => {
        if (isActionVisible) {
            setValidated(false);
            setIsActionVisible(false);
            setIsConfigVisible(true);
            setActionClicked(false);
        } else if (isDeleteVisible) {
            setValidated(false);
            setIsDeleteVisible(false);
            setIsConfigVisible(true);
        } else {
            setValidated(false);
            setShow(false);
            setVisible(false);
        }
    };

    const handleEditAction = (i: number) => {
        setActionIndex(i);
        setIsActionVisible(true);
        setIsConfigVisible(false);
    };

    const handleChannelSelect = (channels: MultiValue<OptionTypes>) => {
        const selectedChannels = channels.map((option: OptionTypes) => option.value);
        setActionChannelsAddedTo(selectedChannels);
    };

    const handleTeamSelect = (teams: SingleValue<GroupTypes>) => {
        if (teams === null) {
            setTeamName('');
        } else {
            setTeamName(teams.value);
            setSelectedTeam(teams.value);
        }
    };

    const handleAddActions = () => {
        setActionClicked(true);
        if (selectedTeam === '') {
            setTeamSelectionWarning(false);
        } else {
            setTeamSelectionWarning(true);
            setValidated(false);
            resetActionElement();
            setActionIndex(null);
            preFillActions();
            setIsActionVisible(true);
            setIsConfigVisible(false);
        }
    };

    const handleActionDelete = (index: number, action: string) => {
        setDeleteAction(action);
        setActionIndex(index);
        setIsDeleteVisible(true);
        setIsConfigVisible(false);
    };

    const getTeamAndChannel = async () => {
        const apiResponse = await fetchChannelsAndTeams();
        const teamData = apiResponse.teams;
        const channelData = apiResponse.channels;
        const TeamOptions = teamData.map((team: Teams) => ({
            value: team.display_name,
            label: team.display_name,
        }));
        setTeamOptionList(TeamOptions);
        const channelOptions = channelData.map((channel: Channels) => ({
            value: channel.display_name,
            label: channel.display_name,
            data: channel.team_name,
        }));
        setChannelOptionList(channelOptions);
    };

    const resetActionElement = () => {
        actionElement.actionType = '';
        actionElement.actionName = '';
        actionElement.actionDisplayName = '';
        actionElement.channelsAddedTo = [''];
        actionElement.actionSuccessfullMessage = [''];
    };

    const preFillActions = () => {
        if (existingConfig?.actions && actionIndex !== null) {
            const action = existingConfig?.actions?.[actionIndex] ?? actionElement;
            setActionTypesValue(action.actionType);
            setActionDisplayName(action.actionDisplayName);
            setActionChannelsAddedTo(action.channelsAddedTo);
            setActionSuccessfullMessage(action.actionSuccessfullMessage);
            setActionName(action.actionName);
        } else {
            setActionTypesValue(actionElement.actionType);
            setActionDisplayName(actionElement.actionDisplayName);
            setActionChannelsAddedTo(actionElement.channelsAddedTo);
            setActionSuccessfullMessage(actionElement.actionSuccessfullMessage);
            setActionName(actionElement.actionName);
        }
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
    const structureNewActions = () => {
        actionElement.actionDisplayName = actionDisplayName;
        actionElement.actionName = actionName;
        actionElement.actionSuccessfullMessage = actionSuccessfullMessage;
        actionElement.actionType = actionTypesValue;
        actionElement.channelsAddedTo = actionChannelsAddedTo;
        const l = existingConfig.actions?.push(actionElement);
    };

    return (
        <div>
            <Modal
                className='customModal'
                show={show}
                onHide={handleSecondary}
            >
                <Modal.Header closeButton={false}>
                    <Modal.Title>
                        {modalHeader}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className='customModalBody'>
                    {isConfigVisible && <div className={isConfigVisible ? 'fade-enter' : 'fade-exit'}>
                        <Form
                            className='config-form'
                            noValidate={true}
                            validated={validated}
                        >
                            <div className={((validated && !teamNameValid) || (actionClicked && !teamSelectionWarning)) ? '' : 'warning'}>
                                <Form.Group
                                    className='form-group teamName-dropdown'
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
                                    {((validated && !teamNameValid) || (actionClicked && !teamSelectionWarning)) &&
                                    <Form.Control.Feedback
                                        type='invalid'
                                        className='validation-warning'
                                    >
                                        {'Please provide a team name.'}
                                    </Form.Control.Feedback>}
                                </Form.Group>
                            </div>
                            <div className={validated && !delayValid ? '' : 'warning'}>
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
                                        {'Please provide a positive number'}
                                    </Form.Control.Feedback>}
                                </Form.Group>
                            </div>
                            <div className={validated && !messageValid ? '' : 'warning'}>
                                <Form.Group className='form-group'>
                                    <Form.Label>{'Message*'}</Form.Label>
                                    <Form.Control
                                        type='text'
                                        placeholder=' Enter a message to post to a new user'
                                        value={message}
                                        onChange={(e) => {
                                            setMessage([e.target.value]);
                                        }
                                        }
                                    />
                                    {validated && !messageValid &&
                                    <Form.Control.Feedback
                                        type='invalid'
                                        className='validation-warning'
                                    >
                                        {'Please provide a message'}
                                    </Form.Control.Feedback>}
                                </Form.Group>
                            </div>
                            <div className='gapping'>
                                <Form.Group>
                                    <Form.Label className='radio-form'>{'Include Guests'}</Form.Label>
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
                            </div>
                            <div className='gapping'>
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
                            </div>
                            {(existingConfig?.actions && actionLength > 0) &&
                            <Form.Group className='action-table'>
                                <Form.Label>{'Actions'}</Form.Label>
                            </Form.Group>}
                        </Form>
                        {existingConfig?.actions && actionLength > 0 ? (
                            <div className='listTable gapping'>
                                <Table
                                    striped={true}
                                >
                                    <thead className='tableHead'>
                                        <tr>
                                            <th className='type'>{'Type'}</th>
                                            <th className='display-name'>{'Display Name'}</th>
                                            <th className='action-name'>{'Name'}</th>
                                            <th className='channels-added'>{'Add to Channels'}</th>
                                            <th className='successfull-message'>{'Success Message'}</th>
                                            <th className='option-buttons'>{'Options'}</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                    existingConfig?.actions?.map((val, i) =>
                                        (
                                            <tr key={i.toString()}>

                                                <td className='type'>
                                                    <OverlayTrigger
                                                        placement='top'
                                                        overlay={<Tooltip>{val.actionType}</Tooltip>}
                                                    >
                                                        <p>
                                                            {val.actionType}
                                                        </p>
                                                    </OverlayTrigger>
                                                </td>
                                                <td className='display-name'>
                                                    <OverlayTrigger
                                                        placement='top'
                                                        overlay={<Tooltip>{val.actionDisplayName}</Tooltip>}
                                                    >
                                                        <p className='display-name-content'>
                                                            {val.actionDisplayName}
                                                        </p>
                                                    </OverlayTrigger>
                                                </td>
                                                <td className='action-name'>
                                                    <OverlayTrigger
                                                        placement='top'
                                                        overlay={<Tooltip>{val.actionName}</Tooltip>}
                                                    >
                                                        <p className='action-name-content'>
                                                            {val.actionName}
                                                        </p>
                                                    </OverlayTrigger>
                                                </td>
                                                <td className='channels-added'>
                                                    <OverlayTrigger
                                                        placement='top'
                                                        overlay={<Tooltip>{val.channelsAddedTo.join(', ')}</Tooltip>}
                                                    >
                                                        <p className='channels-added-content'>
                                                            {val.channelsAddedTo.join(', ')}
                                                        </p>
                                                    </OverlayTrigger>
                                                </td>
                                                <td className='successfull-message'>
                                                    <OverlayTrigger
                                                        placement='top'
                                                        overlay={<Tooltip>{val.actionSuccessfullMessage}</Tooltip>}
                                                    >
                                                        <p className='successfull-message-content'>
                                                            {val.actionSuccessfullMessage}
                                                        </p>
                                                    </OverlayTrigger>
                                                </td>
                                                <td className='option-buttons'>
                                                    <ButtonGroup
                                                        aria-label='Basic example'
                                                        className='options'
                                                    >
                                                        <OverlayTrigger
                                                            placement='top'
                                                            overlay={<Tooltip>{'Edit action'}</Tooltip>}
                                                        >
                                                            <Button onClick={() => handleEditAction(i)}>
                                                                <EditSvg/>
                                                            </Button>
                                                        </OverlayTrigger>
                                                        <OverlayTrigger
                                                            placement='top'
                                                            overlay={<Tooltip>{'Delete action'}</Tooltip>}
                                                        >
                                                            <Button onClick={() => handleActionDelete(i, val.actionName)}>
                                                                <DeleteSvg/>
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
                            </div>
                        ) : (
                            configIndex !== null && <p className='gapping'>{'No action configured'}</p>
                        )
                        }
                    </div>}

                    {isActionVisible && <div className={isActionVisible ? 'fade-enter' : 'fade-exit'}>
                        <Form>
                            <div className={validated && !actionChannelsAddedToValid ? '' : 'warnings'}>
                                <Form.Group className='form-group'>
                                    <Form.Label>{'Add to Channels*'}</Form.Label>
                                    <Select
                                        closeMenuOnSelect={false}
                                        onChange={handleChannelSelect}
                                        isMulti={true}
                                        placeholder='Select the channels in which you want to add the new user'
                                        isSearchable={true}
                                        options={channelOptionList.filter(
                                            (channel) => channel.data === selectedTeam,
                                        )}
                                        value={channelOptionList.filter((option) => actionChannelsAddedTo.includes(option.value))}
                                    />
                                    {validated && !actionChannelsAddedToValid &&
                                    <Form.Control.Feedback
                                        type='invalid'
                                        className='validation-warning'
                                    >
                                        {'Please provide at least one channel name'}
                                    </Form.Control.Feedback>}
                                </Form.Group>
                            </div>
                            <div className={validated && !actionTypesValueValid ? '' : 'warnings'}>
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
                            </div>
                            <div className={validated && !actionDisplayNameValid ? '' : 'warnings'}>
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
                            </div>
                            <div className={validated && !actionNameValid ? '' : 'warnings'}>
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
                                        {'Please provide a name for your action'}
                                    </Form.Control.Feedback>}
                                </Form.Group>
                            </div>
                            <div className={validated && !actionSuccessfullMessageValid ? '' : 'warnings'}>
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
                            </div>
                        </Form>
                    </div>}
                    {!isDeleteVisible && !isActionVisible && <div className='add-action-button'>
                        <Button
                            className={actionLength > 0 ? 'add-actions' : ''}
                            onClick={handleAddActions}
                        >{'Add actions'}</Button>
                    </div>}

                    {isDeleteVisible && <div className={isDeleteVisible ? 'fade-enter' : 'fade-exit'}>
                        <p>{`Are you sure you would like to delete the action ${deleteAction}?`}</p>
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
        </div>

    );
}

export default ConfigModal;
