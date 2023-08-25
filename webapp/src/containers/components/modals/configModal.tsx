import React, {useEffect, useState} from 'react';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import {OverlayTrigger, Tooltip, ToggleButton} from 'react-bootstrap';

import './styles.css';

type Props = {
    visibility: boolean;
    setVisibility: React.Dispatch<React.SetStateAction<boolean>>;
    configIndex: number | null;
    config: Configs[];
    onChange: any;
    modalHeader: string;
}

function ConfigModal({visibility, setVisibility, config}: Props) {
    const [show, setShow] = useState(false);
    const [isActionVisible, setIsActionVisible] = useState(false);
    const [isConfigVisible, setIsConfigVisible] = useState(false);
    const [isDeleteVisible, setIsDeleteVisible] = useState(false);
    const [radioValue, setRadioValue] = useState('');

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

    const buttonTypes = [
        {name: 'button', value: 'button'},
        {name: 'automatic', value: 'automatic'},
    ];

    useEffect(() => {
        setShow(props.visibility);
        setIsConfigVisible(props.visibility);
    }, [props.visibility]);

    const handleClose = () => {
        if (isActionVisible) {
            setIsActionVisible(false);
            setIsConfigVisible(true);
        } else if (isDeleteVisible) {
            setIsDeleteVisible(false);
            setIsConfigVisible(true);
        } else {
            setShow(false);
            props.setVisibility(false);
        }
        setShow(false);
        setVisibility(false);
    };

    const handleActions = () => {
        setIsActionVisible(true);
        setIsConfigVisible(false);
    };

    const handleDelete = () => {
        setIsDeleteVisible(true);
        setIsConfigVisible(false);
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
                        {props.config ? (<p>{isConfigVisible && <p>{'Edit config'}</p>}{isActionVisible && <p>{'Edit actions'}</p>}{isDeleteVisible && <p>{'Delete Config'}</p>}</p>) : (<p>{isConfigVisible && <p>{'Add config'}</p>}{isActionVisible && <p>{'Add action'}</p>}</p>)}
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body className='configModalBody'>
                    {isConfigVisible && <div className={isConfigVisible ? 'fade-enter' : 'fade-exit'}>
                        <Form>
                            <Form.Group className='form-group'>
                                <Form.Label>{'Team name'}</Form.Label>
                                <Form.Control
                                    type='text'
                                    placeholder='Enter your team name'
                                />
                            </Form.Group>
                            <Form.Group className='form-group'>
                                <Form.Label>{'Delay (in sec)'}</Form.Label>
                                <Form.Control
                                    type='text'
                                    placeholder='Enter the delay in seconds'
                                />
                            </Form.Group>
                            <Form.Group className='form-group'>
                                <Form.Label>{'Message'}</Form.Label>
                                <Form.Control
                                    type='text'
                                    placeholder='Enter the message for the new user'
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label className='radio-form'>{'Include guests'}</Form.Label>
                                <ButtonGroup className='radio'>
                                    {guest.map((radio, index) => (
                                        <ToggleButton
                                            key={index}
                                            type='radio'
                                            name='radio'
                                            value={radio.value}
                                            checked={radioValue === radio.value}
                                            onChange={(e) => setRadioValue(e.currentTarget.value)}
                                        >
                                            {radio.name}
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
                                    readOnly={true}
                                />
                            </Form.Group>
                            <Form.Group className='action-table'>
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
                                    <th>{'Display Name'}</th>
                                    <th>{'Channels Added to'}</th>
                                    <th>{'Success Message'}</th>
                                    <th>{'Options'}</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{'Button'}</td>
                                    <td>{'Import'}</td>
                                    <td>{'channel1, channel2, channel3'}</td>
                                    <td>{'Welcome to your new team mate !'}</td>
                                    <td>
                                        <ButtonGroup
                                            aria-label='Basic example'
                                            className='options'
                                        >
                                            <OverlayTrigger
                                                placement='top'
                                                overlay={<Tooltip>{'Edit action'}</Tooltip>}
                                            >
                                                <Button onClick={handleActions}>
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
                                                    >
                                                        <path d='M20 14.66V20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h5.34'/>
                                                        <polygon points='18 2 22 6 12 16 8 16 8 12 18 2'/>
                                                    </svg>
                                                </Button>
                                            </OverlayTrigger>
                                            <OverlayTrigger
                                                placement='top'
                                                overlay={<Tooltip>{'Delete action'}</Tooltip>}
                                            >
                                                <Button onClick={handleDelete}>
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
                                <tr>
                                    <td>{'Automatic'}</td>
                                    <td>{'Export'}</td>
                                    <td>{'channel1, channel2'}</td>
                                    <td>{'Welcome to your new team mate !'}</td>
                                    <td>
                                        <ButtonGroup
                                            aria-label='Basic example'
                                            className='options'
                                        >
                                            <OverlayTrigger
                                                placement='top'
                                                overlay={<Tooltip>{'Edit action'}</Tooltip>}
                                            >
                                                <Button onClick={handleActions}>
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
                                                    >
                                                        <path d='M20 14.66V20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h5.34'/>
                                                        <polygon points='18 2 22 6 12 16 8 16 8 12 18 2'/>
                                                    </svg>
                                                </Button>
                                            </OverlayTrigger>
                                            <OverlayTrigger
                                                placement='top'
                                                overlay={<Tooltip>{'Delete action'}</Tooltip>}
                                            >
                                                <Button onClick={handleDelete}>
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
                                <tr>
                                    <td>{'Button'}</td>
                                    <td>{'Deport'}</td>
                                    <td>{'channel1, channel3'}</td>
                                    <td>{'Welcome to your new team mate !'}</td>
                                    <td>
                                        <ButtonGroup
                                            aria-label='Basic example'
                                            className='options'
                                        >
                                            <OverlayTrigger
                                                placement='top'
                                                overlay={<Tooltip>{'Edit action'}</Tooltip>}
                                            >
                                                <Button onClick={handleActions}>
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
                                                    >
                                                        <path d='M20 14.66V20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h5.34'/>
                                                        <polygon points='18 2 22 6 12 16 8 16 8 12 18 2'/>
                                                    </svg>
                                                </Button>
                                            </OverlayTrigger>
                                            <OverlayTrigger
                                                placement='top'
                                                overlay={<Tooltip>{'Delete action'}</Tooltip>}
                                            >
                                                <Button onClick={handleDelete}>
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
                            </tbody>
                        </Table>
                    </div>}

                    {isActionVisible && <div className={isActionVisible ? 'fade-enter' : 'fade-exit'}>
                        <Form>
                            <Form.Group>
                                <Form.Label className='radio-form'>{'Action Type'}</Form.Label>
                                <ButtonGroup className='radio'>
                                    {buttonTypes.map((radio, index) => (
                                        <ToggleButton
                                            key={index}
                                            type='radio'
                                            name='radio'
                                            value={radio.value}
                                            checked={radioValue === radio.value}
                                            onChange={(e) => setRadioValue(e.currentTarget.value)}
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
                                />
                            </Form.Group>
                            <Form.Group className='form-group'>
                                <Form.Label>{'Channels Added to'}</Form.Label>
                                <Form.Control
                                    type='text'
                                    placeholder='Enter the name of channels in which you want to add the new user'
                                />
                            </Form.Group>
                            <Form.Group className='form-group'>
                                <Form.Label>{'Action Successfull message'}</Form.Label>
                                <Form.Control
                                    type='text'
                                    placeholder='Enter the success message on completion of action'
                                />
                            </Form.Group>
                        </Form>
                    </div>}
                    {!props.config && !isActionVisible && <div>
                        <Button
                            className='add-actions'
                            onClick={handleActions}
                        >{'Add actions'}</Button>
                    </div>}

                    {isDeleteVisible && <div className={isDeleteVisible ? 'fade-enter' : 'fade-exit'}>
                        <p>{'Are you sure you would like to delete the action ?'}</p>
                    </div>}
                </Modal.Body>
                <Modal.Footer>
                    {isConfigVisible && handleCloseButton('primary', 'Save changes')}
                    {isActionVisible && handleCloseButton('primary', 'Add action')}
                    {isConfigVisible && handleCloseButton('secondary', 'Close')}
                    {isActionVisible && handleCloseButton('secondary', 'Cancel')}
                    {isDeleteVisible && handleCloseButton('secondary', 'Cancel')}
                    {isDeleteVisible && handleCloseButton('danger', 'Delete action')}
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ConfigModal;
