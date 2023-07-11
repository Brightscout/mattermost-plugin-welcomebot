import React, {useState} from 'react';

import {FormGroup, Col, Table, ButtonGroup, Button, OverlayTrigger, Tooltip} from 'react-bootstrap';

import './styles.css';

import ViewActionsModal from '../modals/viewActionsModal';
import DeleteConfigModal from '../modals/deleteConfigModal';

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

const ExistingConfigTable = ({label, helpText}: Props) => {
    const [viewVisible, setViewVisible] = useState(false);
    const [deleteVisible, setDeleteVisible] = useState(false);

    const handleView = () => {
        setViewVisible(true);
    };
    const handleDelete = () => {
        setDeleteVisible(true);
    };

    return (
        <div>
            {viewVisible &&
            (<ViewActionsModal
                visible={viewVisible}
                setVis={setViewVisible}
            />)}
            {deleteVisible &&
            (<DeleteConfigModal
                visible={deleteVisible}
                setVis={setDeleteVisible}
            />)}

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
                                    {'Hello to standup group sdhfvk.'}
                                </td>
                                <td>
                                    {'True'}
                                </td>
                                <td>
                                    <div>
                                        <ButtonGroup aria-label='Basic example'>
                                            <OverlayTrigger
                                                placement='top'
                                                overlay={<Tooltip>{'View actions'}</Tooltip>}
                                            >
                                                <Button
                                                    onClick={handleView}
                                                >
                                                    <svg
                                                        xmlns='http://www.w3.org/2000/svg'
                                                        width='20'
                                                        height='20'
                                                        viewBox='0 0 24 24'
                                                        fill='none'
                                                        stroke='#333'
                                                        strokeWidth='1.65'
                                                        strokeLinecap='round'
                                                        strokeLinejoin='round'
                                                    ><path d='M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z'/><circle
                                                            cx='12'
                                                            cy='12'
                                                            r='3'
                                                        /></svg>
                                                </Button>
                                            </OverlayTrigger>
                                            <OverlayTrigger
                                                placement='top'
                                                overlay={<Tooltip>{'Edit config'}</Tooltip>}
                                            >
                                                <Button>
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
                                                overlay={<Tooltip>{'Delete Config'}</Tooltip>}
                                            >
                                                <Button
                                                    variant='light'
                                                    onClick={handleDelete}
                                                >
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
                                                    ><polyline points='3 6 5 6 21 6'/><path d='M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2'/><line
                                                            x1='10'
                                                            y1='11'
                                                            x2='10'
                                                            y2='17'
                                                        /><line
                                                                                                                                                                                    x1='14'
                                                                                                                                                                                    y1='11'
                                                                                                                                                                                    x2='14'
                                                                                                                                                                                    y2='17'
                                                                                                                                                                                  /></svg>
                                                </Button>
                                            </OverlayTrigger>
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
                                    <div>
                                        <ButtonGroup aria-label='Basic example'>
                                            <OverlayTrigger
                                                placement='top'
                                                overlay={<Tooltip>{'View actions'}</Tooltip>}
                                            >
                                                <Button
                                                    onClick={handleView}
                                                >
                                                    <svg
                                                        xmlns='http://www.w3.org/2000/svg'
                                                        width='20'
                                                        height='20'
                                                        viewBox='0 0 24 24'
                                                        fill='none'
                                                        stroke='#333'
                                                        strokeWidth='1.65'
                                                        strokeLinecap='round'
                                                        strokeLinejoin='round'
                                                    ><path d='M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z'/><circle
                                                            cx='12'
                                                            cy='12'
                                                            r='3'
                                                        /></svg>
                                                </Button>
                                            </OverlayTrigger>
                                            <OverlayTrigger
                                                placement='top'
                                                overlay={<Tooltip>{'Edit config'}</Tooltip>}
                                            >
                                                <Button>
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
                                                overlay={<Tooltip>{'Delete Config'}</Tooltip>}
                                            >
                                                <Button
                                                    variant='light'
                                                    onClick={handleDelete}
                                                >
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
                                                    ><polyline points='3 6 5 6 21 6'/><path d='M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2'/><line
                                                            x1='10'
                                                            y1='11'
                                                            x2='10'
                                                            y2='17'
                                                        /><line
                                                                                                                                                                                    x1='14'
                                                                                                                                                                                    y1='11'
                                                                                                                                                                                    x2='14'
                                                                                                                                                                                    y2='17'
                                                                                                                                                                                  /></svg>
                                                </Button>
                                            </OverlayTrigger>
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
                                    <div>
                                        <ButtonGroup aria-label='Basic example'>
                                            <OverlayTrigger
                                                placement='top'
                                                overlay={<Tooltip>{'View actions'}</Tooltip>}
                                            >
                                                <Button>
                                                    <svg
                                                        xmlns='http://www.w3.org/2000/svg'
                                                        width='20'
                                                        height='20'
                                                        viewBox='0 0 24 24'
                                                        fill='none'
                                                        stroke='#333'
                                                        strokeWidth='1.65'
                                                        strokeLinecap='round'
                                                        strokeLinejoin='round'
                                                    ><path d='M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z'/><circle
                                                            cx='12'
                                                            cy='12'
                                                            r='3'
                                                        /></svg>
                                                </Button>
                                            </OverlayTrigger>
                                            <OverlayTrigger
                                                placement='top'
                                                overlay={<Tooltip>{'Edit config'}</Tooltip>}
                                            >
                                                <Button
                                                    onClick={handleView}
                                                >
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
                                                overlay={<Tooltip>{'Delete Config'}</Tooltip>}
                                            >
                                                <Button
                                                    variant='light'
                                                    onClick={handleDelete}
                                                >
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
                                                    ><polyline points='3 6 5 6 21 6'/><path d='M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2'/><line
                                                            x1='10'
                                                            y1='11'
                                                            x2='10'
                                                            y2='17'
                                                        /><line
                                                                                                                                                                                    x1='14'
                                                                                                                                                                                    y1='11'
                                                                                                                                                                                    x2='14'
                                                                                                                                                                                    y2='17'
                                                                                                                                                                                  /></svg>
                                                </Button>
                                            </OverlayTrigger>
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
                                    <div>
                                        <ButtonGroup aria-label='Basic example'>
                                            <OverlayTrigger
                                                placement='top'
                                                overlay={<Tooltip>{'View action'}</Tooltip>}
                                            >
                                                <Button
                                                    onClick={handleView}
                                                >
                                                    <svg
                                                        xmlns='http://www.w3.org/2000/svg'
                                                        width='20'
                                                        height='20'
                                                        viewBox='0 0 24 24'
                                                        fill='none'
                                                        stroke='#333'
                                                        strokeWidth='1.65'
                                                        strokeLinecap='round'
                                                        strokeLinejoin='round'
                                                    ><path d='M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z'/><circle
                                                            cx='12'
                                                            cy='12'
                                                            r='3'
                                                        /></svg>
                                                </Button>
                                            </OverlayTrigger>
                                            <OverlayTrigger
                                                placement='top'
                                                overlay={<Tooltip>{'Edit config'}</Tooltip>}
                                            >
                                                <Button>
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
                                                overlay={<Tooltip>{'Delete Config'}</Tooltip>}
                                            >
                                                <Button
                                                    variant='light'
                                                    onClick={handleDelete}
                                                >
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
                                                    ><polyline points='3 6 5 6 21 6'/><path d='M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2'/><line
                                                            x1='10'
                                                            y1='11'
                                                            x2='10'
                                                            y2='17'
                                                        /><line
                                                                                                                                                                                    x1='14'
                                                                                                                                                                                    y1='11'
                                                                                                                                                                                    x2='14'
                                                                                                                                                                                    y2='17'
                                                                                                                                                                                  /></svg>
                                                </Button>
                                            </OverlayTrigger>
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
