import React, {useState} from 'react';

import FormGroup from 'react-bootstrap/FormGroup';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';

import './styles.css';

import ViewActionsModal from '../modals/viewActionsModal';

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

    const handleView = () => {
        setVisible(true);
    };

    const handleAction = () => {
        setVisible(false);
    };

    return (
        <div>
            {visible &&
                <ViewActionsModal
                    visible={visible}
                    setVisible={setVisible}
                />
            }

            <FormGroup>
                <Col sm={4}>
                    {label}
                </Col>
                <Col sm={8}>
                    <Table striped={true}>
                        <thead>
                            <tr>
                                <th className='team-name single-line'>{'Team Name'}</th>
                                <th className='delay'>{'Delay (in sec)'}</th>
                                <th className='message'>{'Message'}</th>
                                <th className='include-guests'>{'Include Guests'}</th>
                                <th className='options  single-line'>{'Options'}</th>
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
                                    {'True'}
                                </td>
                                <td>
                                    <div className='options'>
                                        <ButtonGroup aria-label='Basic example'>
                                            <Button
                                                variant='primary'
                                                onClick={handleView}
                                            >
                                                {'View'}
                                            </Button>
                                            <Button
                                                variant='primary'
                                                onClick={handleAction}
                                            >{'Edit'}</Button>
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
                                    {'True'}
                                </td>
                                <td>
                                    <div className='options'>
                                        <ButtonGroup aria-label='Basic example'>
                                            <Button
                                                variant='primary'
                                                onClick={handleView}
                                            >
                                                {'View'}
                                            </Button>
                                            <Button
                                                variant='primary'
                                                onClick={handleAction}
                                            >{'Edit'}</Button>
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
                                    {'True'}
                                </td>

                                <td>
                                    <div className='options'>
                                        <ButtonGroup aria-label='Basic example'>
                                            <Button
                                                variant='primary'
                                                onClick={handleView}
                                            >
                                                {'View'}
                                            </Button>
                                            <Button
                                                variant='primary'
                                                onClick={handleAction}
                                            >{'Edit'}</Button>
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
                                    {'True'}
                                </td>
                                <td>
                                    <div className='options'>

                                        <ButtonGroup aria-label='Basic example'>
                                            <Button
                                                variant='primary'
                                                onClick={handleView}
                                            >
                                                {'View'}
                                            </Button>
                                            <Button
                                                variant='primary'
                                                onClick={handleAction}
                                            >
                                                {'Edit'}
                                            </Button>
                                            <Button variant='danger'>
                                                {'Delete'}
                                            </Button>
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
