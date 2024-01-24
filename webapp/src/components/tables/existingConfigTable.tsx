import React, {useState} from 'react';

import {Table, ButtonGroup, Button, OverlayTrigger, Tooltip} from 'react-bootstrap';

import ActionModal from '../modals/actionModal';
import DeleteModal from '../modals/deleteModal';
import ConfigModal from '../modals/configModal';

import {DeleteIcon, EditIcon, ViewIcon} from '../svgIcons/svg';

import './styles.scss';

type Props = {
    onChange: (config: Config[]) => void;
    value: Config[];
}

const ExistingConfigTable = ({value, onChange}: Props) => {
    const [isViewVisible, setIsViewVisible] = useState(false);
    const [isDeleteVisible, setIsDeleteVisible] = useState(false);
    const [isEditVisible, setIsEditVisible] = useState(false);
    const [isAddVisible, setIsAddVisible] = useState(false);

    const [configIndex, setConfigIndex] = useState(0);

    const handleView = (index: number) => {
        setConfigIndex(index);
        setIsViewVisible(true);
    };

    const handleDelete = (index: number) => {
        setConfigIndex(index);
        setIsDeleteVisible(true);
    };

    const handleEdit = (index: number) => {
        setConfigIndex(index);
        setIsEditVisible(true);
    };

    const handleAdd = () => setIsAddVisible(true);

    return (
        <>
            {isViewVisible &&
                <ActionModal
                    visibility={isViewVisible}
                    setVisibility={setIsViewVisible}
                    config={value}
                    configIndex={configIndex}
                />
            }
            {isDeleteVisible &&
                <DeleteModal
                    visibility={isDeleteVisible}
                    setVisibility={setIsDeleteVisible}
                    config={value}
                    configIndex={configIndex}
                    onChange={onChange}
                />
            }
            {isEditVisible &&
                <ConfigModal
                    visibility={isEditVisible}
                    setVisibility={setIsEditVisible}
                    configIndex={configIndex}
                    config={value}
                    onChange={onChange}
                    modalHeader='Edit Config'
                />
            }
            {isAddVisible &&
                <ConfigModal
                    visibility={isAddVisible}
                    setVisibility={setIsAddVisible}
                    configIndex={null}
                    config={value}
                    onChange={onChange}
                    modalHeader='Add Config'
                />
            }
            <div className='custom-config'>
                {'Existing Configs:'}
            </div>
            {value.length && (
                <Table
                    striped={true}
                    bordered={true}
                    hover={true}
                >
                    <thead>
                        <tr>
                            <th>{'Team Name'}</th>
                            <th>{'Delay (in sec)'}</th>
                            <th>{'Message'}</th>
                            <th>{'Include Guests'}</th>
                            <th>{'Options'}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {value.map((val, i) => (
                            <tr key={i.toString()}>
                                <td>
                                    <OverlayTrigger
                                        placement='top'
                                        overlay={<Tooltip>{val.teamName}</Tooltip>}
                                    >
                                        <div className='custom-config__tooltip'>
                                            {val.teamName}
                                        </div>
                                    </OverlayTrigger>
                                </td>
                                <td>
                                    <OverlayTrigger
                                        placement='top'
                                        overlay={<Tooltip>{val.delayInSeconds}</Tooltip>}
                                    >
                                        <div className='custom-config__tooltip'>
                                            {val.delayInSeconds}
                                        </div>
                                    </OverlayTrigger>
                                </td>
                                <td>
                                    <OverlayTrigger
                                        placement='top'
                                        overlay={<Tooltip>{val.message.join(',')}</Tooltip>}
                                    >
                                        <div className='custom-config__tooltip'>
                                            {val.message.join(',')}
                                        </div>
                                    </OverlayTrigger>
                                </td>
                                <td>
                                    <OverlayTrigger
                                        placement='top'
                                        overlay={<Tooltip>{val.includeGuests ? val.includeGuests : '-'}</Tooltip>}
                                    >
                                        <div className='custom-config__tooltip'>
                                            {val.includeGuests ? val.includeGuests : '-'}
                                        </div>
                                    </OverlayTrigger>
                                </td>
                                <td>
                                    <ButtonGroup
                                        aria-label='action update buttons'
                                        className='custom-config__buttons'
                                    >
                                        <OverlayTrigger
                                            placement='top'
                                            overlay={<Tooltip>{'View actions'}</Tooltip>}
                                        >
                                            <Button
                                                onClick={() => handleView(i)}
                                            >
                                                <ViewIcon/>
                                            </Button>
                                        </OverlayTrigger>
                                        <OverlayTrigger
                                            placement='top'
                                            overlay={<Tooltip>{'Edit config'}</Tooltip>}
                                        >
                                            <Button
                                                onClick={() => handleEdit(i)}
                                            >
                                                <EditIcon/>
                                            </Button>
                                        </OverlayTrigger>
                                        <OverlayTrigger
                                            placement='top'
                                            overlay={<Tooltip>{'Delete Config'}</Tooltip>}
                                        >
                                            <Button
                                                onClick={() => handleDelete(i)}
                                            >
                                                <DeleteIcon/>
                                            </Button>
                                        </OverlayTrigger>
                                    </ButtonGroup>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
            <Button
                className='custom-config__add-button'
                variant='primary'
                onClick={handleAdd}
            >
                {'Add Config'}
            </Button>
        </>
    );
};

export default ExistingConfigTable;
