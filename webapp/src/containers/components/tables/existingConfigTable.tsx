import React, {useState} from 'react';

import FormGroup from 'react-bootstrap/FormGroup';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';

import './styles.css';

type HelpText = {
    key: string | null;
    props: {
        isMarkdown: boolean;
        isTranslated: boolean;
        text: string;
    }
}

type Props = {
    id: string;
    label: string;
    value: string;
    helpText: HelpText;
}

const ExistingConfigTable = ({label, helpText}: Props) => {
    const [visible, setVisible] = useState(false);
    const handleView = () => setVisible(true);

    return (
        <>
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
                                    {'Hello to standup group.'}
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
                                    <>
                                        <ButtonGroup aria-label='Basic example'>
                                            <Button variant='primary'>{'Edit'}</Button>
                                            <Button variant='danger'>{'Delete'}</Button>
                                        </ButtonGroup>
                                    </>
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
                                    <>
                                        <ButtonGroup aria-label='Basic example'>
                                            <Button variant='primary'>{'Edit'}</Button>
                                            <Button variant='danger'>{'Delete'}</Button>
                                        </ButtonGroup>
                                    </>
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
        </>
    );
};

export default ExistingConfigTable;
