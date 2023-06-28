import React from 'react';

import {FormGroup, Col, Table, ButtonGroup, Button} from 'react-bootstrap';

import './styles.css';
import {useDispatch} from 'react-redux';

import {showViewConfigModalState} from 'reducers/viewConfigModal';

type HelpText = {
    key: string | null;
    props: {
        isMarkdown: boolean;
        isTranslated: boolean;
        text: string;
        textDefault?: string;
        textValues?: string;
    }
}

type Props = {
    id: string;
    label: string;
    value: string;
    helpText: HelpText;
}

//TODO: Will remove this dummy data
const ExistingConfigTable = ({label, helpText}: Props) => {
    const dispatch = useDispatch();
    const handleView = () => {
        dispatch(showViewConfigModalState());
    };

    return (
        <div>
            <FormGroup>
                <Col sm={4}>
                    {label}
                </Col>
                <Col sm={8}>
                    <Table striped={true}>
                        <thead>
                            <tr>
                                <th className='team-name single-line'>{'Team Name'}</th>
                                <th className='delay'>{'Delay in seconds'}</th>
                                <th className='message'>{'Message'}</th>
                                <th className='attachment-message  single-line'>{'Attachment message'}</th>
                                <th className='options'>{'Options'}</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{'Standup'}</td>
                                <td>{'4'}</td>
                                <td className='ellipsis'>
                                    {'Hello to standup group sdhfvk.'}
                                </td>
                                <td>
                                    <Button
                                        variant='primary'
                                        onClick={handleView}
                                    >
                                        {'View'}
                                    </Button>
                                </td>
                                <td>
                                    <div className='options'>
                                        <ButtonGroup aria-label='Basic example'>
                                            <Button variant='primary'>{'Edit'}</Button>
                                            <Button variant='danger'>{'Delete'}</Button>
                                        </ButtonGroup>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>{'Overview'}</td>
                                <td>{'5'}</td>
                                <td>{'This group is to share overview'}</td>
                                <td>
                                    <Button
                                        variant='primary'
                                        onClick={handleView}
                                    >
                                        {'View'}
                                    </Button>
                                </td>
                                <td>
                                    <div>
                                        <ButtonGroup aria-label='Basic example'>
                                            <Button variant='primary'>{'Edit'}</Button>
                                            <Button variant='danger'>{'Delete'}</Button>
                                        </ButtonGroup>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>{'Result'}</td>
                                <td>{'2'}</td>
                                <td>{'Share all your results here'}</td>
                                <td>
                                    <Button
                                        variant='primary'
                                        onClick={handleView}
                                    >
                                        {'View'}
                                    </Button>
                                </td>
                                <td>
                                    <div>
                                        <ButtonGroup aria-label='Basic example'>
                                            <Button variant='primary'>{'Edit'}</Button>
                                            <Button variant='danger'>{'Delete'}</Button>
                                        </ButtonGroup>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>{'Deploy'}</td>
                                <td>{'6'}</td>
                                <td>{'Deployment details here'}</td>
                                <td>
                                    <Button
                                        variant='primary'
                                        onClick={handleView}
                                    >
                                        {'View'}
                                    </Button>
                                </td>
                                <td>
                                    <div>
                                        <ButtonGroup aria-label='Basic example'>
                                            <Button variant='primary'>{'Edit'}</Button>
                                            <Button variant='danger'>{'Delete'}</Button>
                                        </ButtonGroup>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </Table>
                    <div className='help-text'>
                        <span>
                            {helpText?.props?.text}
                        </span>
                    </div>
                </Col>
            </FormGroup>
        </div>
    );
};

export default ExistingConfigTable;
