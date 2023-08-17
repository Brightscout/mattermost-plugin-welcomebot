import React, {useEffect, useState} from 'react';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import './styles.css';

import {Configs} from 'types/plugin/common';

interface Props {
    visible: boolean;
    config: Configs[];
    configIndex: number;
    onChange: any;

function DeleteModal({visible, setVis, config, configIndex, onChange}: Props) {
    const [show, setShow] = useState(false);

    useEffect(() => {
        setShow(visible);
    }, [visible]);

    const handleClose = () => {
        setVis(false);
    const handleDelete = () => {
        config.splice(configIndex, 1);
        onChange(config);
        handleClose();
        <>
            <Modal
                show={show}
                onHide={handleClose}
            >
                <Modal.Header closeButton={false}>
                    <Modal.Title>{'Delete Config'}</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <p>{`Are you sure you would like to delete the configs for the team ${config[configIndex].teamName}?`} </p>
                </Modal.Body>

                <Modal.Footer>
                    <Button
                        variant='secondary'
                        onClick={handleClose}
                    >{'Close'}</Button>
                    <Button
                        variant='danger'
                        onClick={handleDelete}
                    >{'Delete'}</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default DeleteConfigModal;
