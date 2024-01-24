import React, {useEffect, useState} from 'react';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import {OverlayTrigger, Tooltip, ToggleButton} from 'react-bootstrap';

import Select, {MultiValue, SingleValue} from 'react-select';

import {useSelector} from 'react-redux';

import {GlobalState} from 'mattermost-redux/types/store';

import {fetchChannels, fetchTeams} from 'api/api_wrapper';

import {DeleteIcon, EditIcon} from '../svgIcons/svg';

import './styles.scss';

type Props = {
    visibility: boolean;
    setVisibility: React.Dispatch<React.SetStateAction<boolean>>;
    configIndex: number | null;
    config: Config[];
    onChange: (config: Config[]) => void;
    modalHeader: string;
}

const ConfigModal = ({visibility, setVisibility, configIndex, config, onChange, modalHeader}: Props) => {
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
        actionSuccessfulMessage: [''],
    };

    const newAction: Actions[] = [];

    const newConfig: Config = {
        teamName: '',
        delayInSeconds: 0,
        message: [''],
        includeGuests: '',
        attachmentMessage: [''],
        actions: newAction,
    };

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
    const [actionSuccessfulMessage, setActionSuccessfulMessage] = useState(['']);
    const [actionName, setActionName] = useState('');
    const [actionIndex, setActionIndex] = useState<number | null>(0);

    const [isTeamNameValid, setIsTeamNameValid] = useState(false);
    const [isMessageValid, setIsMessageValid] = useState(false);
    const [isDelayValid, setIsDelayValid] = useState(false);

    const [isActionTypesValueValid, setIsActionTypesValueValid] = useState(false);
    const [isActionDisplayNameValid, setIsActionDisplayNameValid] = useState(false);
    const [isActionChannelsAddedToValid, setIsActionChannelsAddedToValid] = useState(false);
    const [isActionSuccessfulMessageValid, setIsActionSuccessfulMessageValid] = useState(false);
    const [isActionNameValid, setIsActionNameValid] = useState(false);

    const [isFormValidated, setIsFormValidated] = useState(false);

    const [deleteAction, setDeleteAction] = useState('');

    const [selectedTeam, setSelectedTeam] = useState('');

    const [isTeamSelectionWarningVisible, setIsTeamSelectionWarningVisible] = useState(false);

    const [isActionClicked, setIsActionClicked] = useState(false);

    const [teamOptionList, setTeamOptionList] = useState<GroupTypes[]>([]);
    const [channelOptionList, setChannelOptionList] = useState<OptionTypes[]>([]);

    const [isTeamDropdownDisabled, setIsTeamDropdownDisabled] = useState(false);
    const [isTeamApiCalled, setIsTeamApiCalled] = useState(true);
    const [teamApiError, setTeamApiError] = useState('');

    const [isChannelDropdownDisabled, setIsChannelDropdownDisabled] = useState(false);
    const [isChannelApiCalled, setIsChannelApiCalled] = useState(true);
    const [channelApiError, setChannelApiError] = useState('');

    const actionLength = existingConfig?.actions?.length ?? 0;

    const reduxState = useSelector((state: GlobalState) => state);
    const mmSiteUrl = reduxState?.entities?.general?.config?.SiteURL as string;

    useEffect(() => {
        setIsConfigVisible(visibility);
    }, [visibility]);

    useEffect(() => {
        setExistingConfig(configIndex === null ? newConfig : config[configIndex]);
    }, [config]);

    useEffect(() => {
        getTeam(mmSiteUrl);
        getChannel(mmSiteUrl);
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
        setIsTeamNameValid(Boolean(teamName.trim()));

        setIsTeamSelectionWarningVisible(Boolean(teamName.trim()));

        if (message.length) {
            setIsMessageValid(Boolean(message[0].trim()));
        } else {
            setIsMessageValid(false);
        }

        setIsActionTypesValueValid(Boolean(actionTypesValue));

        setIsActionDisplayNameValid(Boolean(actionDisplayName.trim()));

        setIsActionNameValid(Boolean(actionName.trim()));

        if (actionChannelsAddedTo.length) {
            setIsActionChannelsAddedToValid(Boolean(actionChannelsAddedTo[0]));
        } else {
            setIsActionChannelsAddedToValid(false);
        }

        if (actionSuccessfulMessage.length) {
            setIsActionSuccessfulMessageValid(Boolean(actionSuccessfulMessage[0].trim()));
        } else {
            setIsActionSuccessfulMessageValid(false);
        }

        if (isNaN(delay) || delay < 0) {
            setIsDelayValid(false);
        } else {
            setIsDelayValid(true);
        }
    }, [teamName, delay, message, attachmentMessage, actionTypesValue, actionDisplayName, actionChannelsAddedTo, actionSuccessfulMessage, actionName]);

    const handlePrimary = () => {
        if (isActionVisible) {
            if (isActionChannelsAddedToValid && isActionDisplayNameValid && isActionSuccessfulMessageValid && isActionTypesValueValid && isActionNameValid && !channelApiError) {
                if (configIndex !== null && actionIndex === null) {
                    actionElement.actionDisplayName = actionDisplayName;
                    actionElement.actionName = actionName;
                    actionElement.actionSuccessfulMessage = actionSuccessfulMessage;
                    actionElement.actionType = actionTypesValue;
                    actionElement.channelsAddedTo = actionChannelsAddedTo;
                    const actions = existingConfig?.actions;
                    if (actions) {
                        actions.push(actionElement);
                        existingConfig.actions = actions;
                    }
                } else if (configIndex === null && actionIndex === null) {
                    structureNewActions();
                } else {
                    structureActions();
                }
                setIsActionVisible(false);
                setIsConfigVisible(true);
                setIsFormValidated(false);
                onChange(config);
                setIsActionClicked(false);
            } else {
                setIsFormValidated(true);
            }
        }

        if (isConfigVisible) {
            if (isTeamNameValid && isMessageValid && isDelayValid && !teamApiError) {
                if (configIndex === null) {
                    structureNewConfig();
                    config.push(existingConfig);
                } else {
                    structureConfig();
                }

                onChange(config);
                setIsFormValidated(false);
                handleSecondary();
            } else {
                setIsFormValidated(true);
            }
        }

        if (isDeleteVisible && actionIndex !== null) {
            const _ = existingConfig.actions?.splice(actionIndex, 1);
            if (configIndex !== null) {
                config[configIndex] = existingConfig;
                onChange(config);
            }
            handleSecondary();
        }
    };

    const handleSecondary = () => {
        if (isActionVisible) {
            setIsFormValidated(false);
            setIsActionVisible(false);
            setIsConfigVisible(true);
            setIsActionClicked(false);
            return;
        } else if (isDeleteVisible) {
            setIsFormValidated(false);
            setIsDeleteVisible(false);
            setIsConfigVisible(true);
            return;
        }

        setIsFormValidated(false);
        setVisibility(false);
        setIsTeamApiCalled(false);
    };

    const handleEditAction = (index: number) => {
        setActionIndex(index);
        setIsActionVisible(true);
        setIsConfigVisible(false);
    };

    const handleAddActions = () => {
        setIsActionClicked(true);
        if (!selectedTeam) {
            setIsTeamSelectionWarningVisible(false);
        } else if (!teamApiError) {
            setIsTeamSelectionWarningVisible(true);
            setIsFormValidated(false);
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
    const handleChannelSelect = (channels: MultiValue<OptionTypes>) => {
        const selectedChannels = channels.map((option: OptionTypes) => option.value);
        setActionChannelsAddedTo(selectedChannels);
    };

    const handleTeamSelect = (teams: SingleValue<GroupTypes>) => {
        if (teams === null) {
            setTeamName('');
            return;
        }

        setTeamName(teams.value);
        setSelectedTeam(teams.value);
    };

    const getTeam = async (siteUrl: string) => {
        try {
            setIsTeamDropdownDisabled(true);
            setIsTeamApiCalled(true);
            const teamData = await fetchTeams(siteUrl);
            const TeamOptions = teamData.map((team: Teams) => ({
                value: team.display_name,
                label: team.display_name,
            }));
            setTeamOptionList(TeamOptions);
        } catch (error) {
            setTeamApiError('Some error occured while fetching the team list');
        } finally {
            setIsTeamDropdownDisabled(false);
        }
    };

    const getChannel = async (siteUrl: string) => {
        try {
            setIsChannelDropdownDisabled(true);
            setIsChannelApiCalled(true);
            const channelData = await fetchChannels(siteUrl);
            const channelOptions = channelData.map((channel: Channels) => ({
                value: channel.display_name,
                label: channel.display_name,
                data: channel.team_display_name,
            }));
            setChannelOptionList(channelOptions);
        } catch (error) {
            setChannelApiError('Some error occured fetching the channel list');
        } finally {
            setIsChannelDropdownDisabled(false);
        }
    };

    const resetActionElement = () => {
        actionElement.actionType = '';
        actionElement.actionName = '';
        actionElement.actionDisplayName = '';
        actionElement.channelsAddedTo = [''];
        actionElement.actionSuccessfulMessage = [''];
    };

    const preFillActions = () => {
        if (existingConfig?.actions && actionIndex !== null) {
            const action = existingConfig?.actions?.[actionIndex] ?? actionElement;
            setActionTypesValue(action.actionType);
            setActionDisplayName(action.actionDisplayName);
            setActionChannelsAddedTo(action.channelsAddedTo);
            setActionSuccessfulMessage(action.actionSuccessfulMessage);
            setActionName(action.actionName);
            return;
        }

        setActionTypesValue(actionElement.actionType);
        setActionDisplayName(actionElement.actionDisplayName);
        setActionChannelsAddedTo(actionElement.channelsAddedTo);
        setActionSuccessfulMessage(actionElement.actionSuccessfulMessage);
        setActionName(actionElement.actionName);
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
            action.actionSuccessfulMessage = actionSuccessfulMessage;
            action.actionType = actionTypesValue;
            action.channelsAddedTo = actionChannelsAddedTo;
            existingConfig.actions = [...actions];
        }
    };
    const structureNewActions = () => {
        actionElement.actionDisplayName = actionDisplayName;
        actionElement.actionName = actionName;
        actionElement.actionSuccessfulMessage = actionSuccessfulMessage;
        actionElement.actionType = actionTypesValue;
        actionElement.channelsAddedTo = actionChannelsAddedTo;
        const _ = existingConfig.actions?.push(actionElement);
    };

    return (
        <Modal
            className='config-modal'
            show={visibility}
            onHide={handleSecondary}
        >
            <Modal.Header closeButton={false}>
                <Modal.Title>
                    {modalHeader}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {isConfigVisible && <div className={isConfigVisible ? 'fade-enter' : 'fade-exit'}>
                    <Form>
                        <div className={(((isFormValidated || isActionClicked) && !isTeamNameValid) || (isTeamApiCalled && teamApiError)) ? 'config-modal__error-field-gap' : 'config-modal__field-gap'}>
                            <Form.Group>
                                <Form.Label>
                                    {'TeamName'}
                                    <span className='config-modal__required-field'>{'*'}</span>
                                </Form.Label>
                                <Select
                                    isDisabled={isTeamDropdownDisabled || Boolean(teamApiError)}
                                    closeMenuOnSelect={true}
                                    onChange={handleTeamSelect}
                                    isMulti={false}
                                    placeholder='Select your team'
                                    isSearchable={true}
                                    options={teamOptionList}
                                    value={teamOptionList.find((option) => option.value === teamName)}
                                />
                                {((isFormValidated && !isTeamNameValid) || (isActionClicked && !isTeamSelectionWarningVisible) || (isTeamApiCalled && teamApiError)) &&
                                <Form.Control.Feedback
                                    type='invalid'
                                    className='config-modal__error'
                                >
                                    {teamApiError || 'Please provide a team name'}
                                </Form.Control.Feedback>}
                            </Form.Group>
                        </div>
                        <div className={isFormValidated && !isDelayValid ? 'config-modal__error-field-gap' : 'config-modal__field-gap'}>
                            <Form.Group>
                                <Form.Label>
                                    {'Delay (in sec)'}
                                    <span className='config-modal__required-field'>{'*'}</span>
                                </Form.Label>
                                <Form.Control
                                    type='number'
                                    min={0}
                                    placeholder='Enter the delay in seconds'
                                    value={delay}
                                    onChange={(e) => setDelay(parseInt(e.target.value, 10))}
                                    required={true}
                                />
                                {isFormValidated && !isDelayValid &&
                                <Form.Control.Feedback
                                    type='invalid'
                                    className='config-modal__error'
                                >
                                    {'Please provide a positive delay value'}
                                </Form.Control.Feedback>}
                            </Form.Group>
                        </div>
                        <div className={isFormValidated && !isMessageValid ? 'config-modal__error-field-gap' : 'config-modal__field-gap'}>
                            <Form.Group>
                                <Form.Label>
                                    {'Message'}
                                    <span className='config-modal__required-field'>{'*'}</span>
                                </Form.Label>
                                <Form.Control
                                    type='text'
                                    placeholder=' Enter a message to post to a new user'
                                    value={message}
                                    onChange={(e) => setMessage([e.target.value])}
                                />
                                {isFormValidated && !isMessageValid &&
                                <Form.Control.Feedback
                                    type='invalid'
                                    className='config-modal__error'
                                >
                                    {'Please provide a message'}
                                </Form.Control.Feedback>}
                            </Form.Group>
                        </div>
                        <div className='config-modal__field-gap config-modal__radio-field'>
                            <Form.Group>
                                <Form.Label>{'Include Guests'}</Form.Label>
                                <ButtonGroup>
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
                        </div>
                        <div className='config-modal__field-gap'>
                            <Form.Group>
                                <Form.Label>{'Attachment Message'}</Form.Label>
                                <Form.Control
                                    type='long-text'
                                    placeholder='Enter the attachment messages'
                                    aria-label='attachment message'
                                    value={attachmentMessage}
                                    onChange={(e) => setAttachmentMessage([e.target.value])}
                                />
                            </Form.Group>
                        </div>
                        {(existingConfig?.actions && actionLength > 0) &&
                        <Form.Group>
                            <Form.Label>{'Actions'}</Form.Label>
                        </Form.Group>}
                    </Form>
                    {existingConfig?.actions && actionLength ? (
                        <Table
                            striped={true}
                            bordered={true}
                            hover={true}
                        >
                            <thead>
                                <tr>
                                    <th>{'Type'}</th>
                                    <th>{'Display Name'}</th>
                                    <th>{'Name'}</th>
                                    <th>{'Add to Channels'}</th>
                                    <th>{'Success Message'}</th>
                                    <th>{'Options'}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {existingConfig?.actions?.map((val, i) => (
                                    <tr key={i.toString()}>
                                        <td>
                                            <OverlayTrigger
                                                placement='top'
                                                overlay={<Tooltip>{val.actionType}</Tooltip>}
                                            >
                                                <p>
                                                    {val.actionType}
                                                </p>
                                            </OverlayTrigger>
                                        </td>
                                        <td>
                                            <OverlayTrigger
                                                placement='top'
                                                overlay={<Tooltip>{val.actionDisplayName}</Tooltip>}
                                            >
                                                <p>
                                                    {val.actionDisplayName}
                                                </p>
                                            </OverlayTrigger>
                                        </td>
                                        <td>
                                            <OverlayTrigger
                                                placement='top'
                                                overlay={<Tooltip>{val.actionName}</Tooltip>}
                                            >
                                                <p>
                                                    {val.actionName}
                                                </p>
                                            </OverlayTrigger>
                                        </td>
                                        <td>
                                            <OverlayTrigger
                                                placement='top'
                                                overlay={<Tooltip>{val.channelsAddedTo.join(', ')}</Tooltip>}
                                            >
                                                <p>
                                                    {val.channelsAddedTo.join(', ')}
                                                </p>
                                            </OverlayTrigger>
                                        </td>
                                        <td>
                                            <OverlayTrigger
                                                placement='top'
                                                overlay={<Tooltip>{val.actionSuccessfulMessage.join(',')}</Tooltip>}
                                            >
                                                <p>
                                                    {val.actionSuccessfulMessage.join(',')}
                                                </p>
                                            </OverlayTrigger>
                                        </td>
                                        <td>
                                            <ButtonGroup
                                                aria-label='action update buttons'
                                                className='config-modal__action-update-buttons'
                                            >
                                                <OverlayTrigger
                                                    placement='top'
                                                    overlay={<Tooltip>{'Edit action'}</Tooltip>}
                                                >
                                                    <Button onClick={() => handleEditAction(i)}>
                                                        <EditIcon/>
                                                    </Button>
                                                </OverlayTrigger>
                                                <OverlayTrigger
                                                    placement='top'
                                                    overlay={<Tooltip>{'Delete action'}</Tooltip>}
                                                >
                                                    <Button onClick={() => handleActionDelete(i, val.actionName)}>
                                                        <DeleteIcon/>
                                                    </Button>
                                                </OverlayTrigger>
                                            </ButtonGroup>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    ) : (
                        configIndex !== null && <div className='config-modal__no-action'>{'No action configured'}</div>
                    )}
                </div>
                }
                {isActionVisible && <div className={isActionVisible ? 'fade-enter' : 'fade-exit'}>
                    <Form>
                        <div className={((isFormValidated && !isActionChannelsAddedToValid) || (isChannelApiCalled && channelApiError)) ? 'config-modal__error-field-gap' : 'config-modal__field-gap'}>
                            <Form.Group>
                                <Form.Label>
                                    {'Add to Channels'}
                                    <span className='config-modal__required-field'>{'*'}</span>
                                </Form.Label>
                                <Select
                                    isDisabled={isChannelDropdownDisabled || channelApiError}
                                    closeMenuOnSelect={false}
                                    onChange={handleChannelSelect}
                                    isMulti={true}
                                    placeholder='Select the channels in which you want to add the new user'
                                    className='config-modal__channel-dropdown'
                                    isSearchable={true}
                                    options={channelOptionList.filter(
                                        (channel) => channel.data === selectedTeam,
                                    )}
                                    value={channelOptionList.filter((option) => actionChannelsAddedTo.includes(option.value))}
                                />
                                {((isFormValidated && !isActionChannelsAddedToValid) || (isChannelApiCalled && channelApiError)) &&
                                <Form.Control.Feedback
                                    type='invalid'
                                    className='config-modal__error'
                                >
                                    {channelApiError || 'Please provide at least one channel name'}
                                </Form.Control.Feedback>}
                            </Form.Group>
                        </div>
                        <div className={`config-modal__radio-field ${isFormValidated && !isActionTypesValueValid ? 'config-modal__error-field-gap' : 'config-modal__field-gap'}`}>
                            <Form.Group>
                                <Form.Label>
                                    {'Action Type'}
                                    <span className='config-modal__required-field'>{'*'}</span>
                                </Form.Label>
                                <ButtonGroup>
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
                                {isFormValidated && !isActionTypesValueValid &&
                                <Form.Control.Feedback
                                    type='invalid'
                                    className='config-modal__error'
                                >
                                    {'Please select an action type'}
                                </Form.Control.Feedback>}
                            </Form.Group>
                        </div>
                        <div className={isFormValidated && !isActionDisplayNameValid ? 'config-modal__error-field-gap' : 'config-modal__field-gap'}>
                            <Form.Group>
                                <Form.Label>
                                    {'Action Display Name'}
                                    <span className='config-modal__required-field'>{'*'}</span>
                                </Form.Label>
                                <Form.Control
                                    type='text'
                                    placeholder='Enter the display name of your action'
                                    value={actionDisplayName}
                                    onChange={(e) => setActionDisplayName(e.target.value)}
                                />
                                {isFormValidated && !isActionDisplayNameValid &&
                                <Form.Control.Feedback
                                    type='invalid'
                                    className='config-modal__error'
                                >
                                    {'Please provide the display name for your action'}
                                </Form.Control.Feedback>}
                            </Form.Group>
                        </div>
                        <div className={isFormValidated && !isActionNameValid ? 'config-modal__error-field-gap' : 'config-modal__field-gap'}>
                            <Form.Group>
                                <Form.Label>
                                    {'Action Name'}
                                    <span className='config-modal__required-field'>{'*'}</span>
                                </Form.Label>
                                <Form.Control
                                    type='text'
                                    placeholder='Enter the name of your action'
                                    value={actionName}
                                    onChange={(e) => setActionName(e.target.value)}
                                />
                                {isFormValidated && !isActionNameValid &&
                                <Form.Control.Feedback
                                    type='invalid'
                                    className='config-modal__error'
                                >
                                    {'Please provide a name for your action'}
                                </Form.Control.Feedback>}
                            </Form.Group>
                        </div>
                        <div className={isFormValidated && !isActionSuccessfulMessageValid ? 'config-modal__error-field-gap' : 'config-modal__field-gap'}>
                            <Form.Group>
                                <Form.Label>
                                    {'Action Successful Message'}
                                    <span className='config-modal__required-field'>{'*'}</span>
                                </Form.Label>
                                <Form.Control
                                    type='text'
                                    placeholder='Enter a message to post when a user completes an action'
                                    value={actionSuccessfulMessage}
                                    onChange={(e) => setActionSuccessfulMessage([e.target.value])}
                                />
                                {isFormValidated && !isActionSuccessfulMessageValid &&
                                <Form.Control.Feedback
                                    type='invalid'
                                    className='config-modal__error'
                                >
                                    {'Please provide a message'}
                                </Form.Control.Feedback>}
                            </Form.Group>
                        </div>
                    </Form>
                </div>}
                {!isDeleteVisible && !isActionVisible && (
                    <div>
                        <Button
                            onClick={handleAddActions}
                        >
                            {'Add actions'}
                        </Button>
                    </div>
                )}
                {isDeleteVisible && (
                    <div className={isDeleteVisible ? 'fade-enter' : 'fade-exit'}>
                        <p>{`Are you sure you would like to delete the action ${deleteAction}?`}</p>
                    </div>
                )}
            </Modal.Body>
            <Modal.Footer>
                <Button
                    variant='secondary'
                    onClick={handleSecondary}
                >
                    {isDeleteVisible ? 'Cancel' : 'Close'}
                </Button>
                <Button
                    variant={isDeleteVisible ? 'danger' : 'primary'}
                    onClick={handlePrimary}
                >
                    {isDeleteVisible ? 'Delete' : 'Save changes'}
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ConfigModal;
