import React, {useState} from 'react';

import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import {OverlayTrigger, Tooltip} from 'react-bootstrap';

import './styles.css';

import ActionModal from '../modals/actionModal';
import ConfigModal from '../modals/configModal';

type HelpText = {
    key: string | null;
    props: {
        isMarkdown: boolean;
        isTranslated: boolean;
        text: string;
    }
}

type Props = {
    onChange: any
    value: Configs[]
}

const ExistingConfigTable = ({value, onChange}: Props) => {
    const [isViewVisible, setIsViewVisible] = useState(false);
    const [isEditVisible, setIsEditVisible] = useState(false);
    const [isAddVisible, setIsAddVisible] = useState(false);
    const [configIndex, setConfigIndex] = useState(0);

    const handleView = (index: number) => {
        setConfigIndex(index);
        setIsViewVisible(true);
    };
    const handleDelete = (index: number) => {
        setConfigIndex(index);
    };
    const handleEdit = (index: number) => {
        setConfigIndex(index);
        setIsEditVisible(true);
    };

    const handleAdd = () => {
        setIsAddVisible(true);
    };

    return (
        <div className='config'>
            {isAddVisible &&
                <ActionModal
                    visibility={isViewVisible}
                    setVisibility={setIsViewVisible}
                    config={value}
                    configIndex={configIndex}
                />
            }
            {isAddVisible &&
                <ConfigModal
                    visible={isAddVisible}
                    setVisible={setIsAddVisible}
                    configIndex={null}
                    config={value}
                    onChange={onChange}
                    modalHeader='Add Config'
                />
            }
            <div className='name'>
                {'Existing Configs'}
            </div>
            <div>
                {value.length > 0 &&
                    <Table
                        striped={true}
                        className='existing-config-table'
                    >
                        <thead>
                            <tr>
                                <th className='team-name'>{'Team Name'}</th>
                                <th className='delay'>{'Delay (in sec)'}</th>
                                <th className='message'>{'Message'}</th>
                                <th className='includeGuests'>{'Include Guests'}</th>
                                <th className='option'>{'Options'}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                value.map((val, i) =>
                                    (
                                        <tr key={i.toString()}>
                                            <td>{val.teamName}</td>
                                            <td>{val.delayInSeconds}</td>
                                            <td>{val.message}</td>
                                            <td>{val.includeGuests ? val.includeGuests : '-'}</td>
                                            <td className='option'>
                                                <div>
                                                    <ButtonGroup aria-label='Basic example'>
                                                        <OverlayTrigger
                                                            placement='top'
                                                            overlay={<Tooltip>{'View actions'}</Tooltip>}
                                                        >
                                                            <Button
                                                                onClick={() => handleView(i)}
                                                            >
                                                                <svg
                                                                    xmlns='http://www.w3.org/2000/svg'
                                                                    width='16'
                                                                    height='16'
                                                                    viewBox='0 0 24 24'
                                                                    fill='none'
                                                                    stroke='#333'
                                                                    strokeWidth='1.65'
                                                                    strokeLinecap='round'
                                                                    strokeLinejoin='round'
                                                                ><path d='M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z'/>
                                                                    <circle
                                                                        cx='12'
                                                                        cy='12'
                                                                        r='3'
                                                                    />
                                                                </svg>
                                                            </Button>
                                                        </OverlayTrigger>
                                                        <OverlayTrigger
                                                            placement='top'
                                                            overlay={<Tooltip>{'Edit config'}</Tooltip>}
                                                        >
                                                            <Button onClick={() => handleEdit(i)}>
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
                                                            overlay={<Tooltip>{'Delete Config'}</Tooltip>}
                                                        >
                                                            <Button
                                                                variant='light'
                                                                onClick={() => handleDelete(i)}
                                                            >
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
                                                                >
                                                                    <polyline points='3 6 5 6 21 6'/><path d='M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2'/>
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
                                                </div>
                                            </td>
                                        </tr>
                                    ),
                                )
                            }
                        </tbody>
                    </Table>}
                <Button
                    className='add-config-btn'
                    variant='primary'
                    onClick={handleAdd}
                >
                    {'Add Config'}
                </Button>
                <div className='name'>
                    {'label'}
                </div>
            </div>
        </div>
    );
};

export default ExistingConfigTable;
