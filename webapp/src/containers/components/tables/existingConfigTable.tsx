import React, {useState} from 'react';

import {FormGroup, Table, ButtonGroup, Button, OverlayTrigger, Tooltip} from 'react-bootstrap';

import './styles.css';

import {Configs} from 'types/plugin/common';

import ActionModal from '../modals/actionModal';
import DeleteModal from '../modals/deleteModal';
import ConfigModal from '../modals/configModal';

import {DeleteSvg, EditSvg, ViewSvg} from '../svgIcons/svg';

type Props = {
    onChange: any
    value: Configs[]
}

const ExistingConfigTable = ({value, onChange}: Props) => {
    const [viewVisible, setViewVisible] = useState(false);
    const [deleteVisible, setDeleteVisible] = useState(false);
    const [editVisible, setEditVisible] = useState(false);
    const [addVisible, setAddVisible] = useState(false);
    const [configIndex, setConfigIndex] = useState(0);

    const handleView = (index: number) => {
        setConfigIndex(index);
        setViewVisible(true);
    };
    const handleDelete = (index: number) => {
        setConfigIndex(index);
        setDeleteVisible(true);
    };
    const handleEdit = (index: number) => {
        setConfigIndex(index);
        setEditVisible(true);
    };
    const handleAdd = async () => {
        setAddVisible(true);
    };

    return (
        <div className='config'>
            {
                viewVisible &&
                    <ActionModal
                        visible={viewVisible}
                        setVisible={setViewVisible}
                        config={value}
                        configIndex={configIndex}
                    />
            }
            {deleteVisible &&
                <DeleteModal
                    visible={deleteVisible}
                    setVisible={setDeleteVisible}
                    config={value}
                    configIndex={configIndex}
                    onChange={onChange}
                />
            }
            {editVisible &&
                <ConfigModal
                    visible={editVisible}
                    setVisible={setEditVisible}
                    configIndex={configIndex}
                    config={value}
                    onChange={onChange}
                    modalHeader='Edit Config'
                />
            }
            {addVisible &&
                <ConfigModal
                    visible={addVisible}
                    setVisible={setAddVisible}
                    configIndex={null}
                    config={value}
                    onChange={onChange}
                    modalHeader='Add Config'
                />
            }
            <FormGroup>
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
                                <th className='teamName'>{'Team Name'}</th>
                                <th className='delay'>{'Delay (in sec)'}</th>
                                <th className='message'>{'Message'}</th>
                                <th className='includeGuests'>{'Include Guests'}</th>
                                <th className='option'>{'Options'}</th>
                            </tr>
                        </thead>
                        <tbody className='table-body'>
                            {
                                value.map((val, i) =>
                                    (
                                        <tr key={i.toString()}>
                                            <td>
                                                <OverlayTrigger
                                                    placement='top'
                                                    overlay={<Tooltip>{val.teamName}</Tooltip>}
                                                >
                                                    <p>
                                                        {val.teamName}
                                                    </p>
                                                </OverlayTrigger>
                                            </td>
                                            <td>{val.delayInSeconds}</td>
                                            <td className='message'>
                                                <OverlayTrigger
                                                    placement='top'
                                                    overlay={<Tooltip>{val.message}</Tooltip>}
                                                >
                                                    <p className='message-content'>
                                                        {val.message}
                                                    </p>
                                                </OverlayTrigger>
                                            </td>
                                            <td>{val.includeGuests ? val.includeGuests : '-'}</td>
                                            <td className='option'>
                                                <div>
                                                    <ButtonGroup aria-label='Basic example'>
                                                        <OverlayTrigger
                                                            placement='top'
                                                            overlay={<Tooltip>{'View actions'}</Tooltip>}
                                                        >
                                                            <Button
                                                                className='svg-buttons'
                                                                onClick={() => handleView(i)}
                                                            >
                                                                <ViewSvg/>
                                                            </Button>
                                                        </OverlayTrigger>
                                                        <OverlayTrigger
                                                            placement='top'
                                                            overlay={<Tooltip>{'Edit config'}</Tooltip>}
                                                        >
                                                            <Button
                                                                className='svg-buttons'
                                                                onClick={() => handleEdit(i)}
                                                            >
                                                                <EditSvg/>
                                                            </Button>
                                                        </OverlayTrigger>
                                                        <OverlayTrigger
                                                            placement='top'
                                                            overlay={<Tooltip>{'Delete Config'}</Tooltip>}
                                                        >
                                                            <Button
                                                                className='svg-buttons'
                                                                onClick={() => handleDelete(i)}
                                                            >
                                                                <DeleteSvg/>
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
                </div>
            </FormGroup>
        </div>
    );
};

export default ExistingConfigTable;
