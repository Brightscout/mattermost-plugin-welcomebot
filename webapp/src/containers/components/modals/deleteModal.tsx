/* eslint-disable import/no-unresolved */
import React, {useEffect, useState} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './styles.css';
import {Configs} from 'types/plugin/common';

interface Props {
    visible: boolean;
    setVis: React.Dispatch<React.SetStateAction<boolean>>;
    config: Configs[];
    configIndex: number;
    onChange: any;
}

function DeleteModal(props: Props) {
    const [show, setShow] = useState(false);

    useEffect(() => {
        setShow(props.visible);
    }, [props.visible]);

    const handleClose = () => {
        setShow(false);
        props.setVis(false);
    };
    const handleDelete = (onChange: any, config: Configs[], configIndex: number) => {
        config.splice(configIndex, 1);
        onChange(config);
        handleClose();
    };
    return (
        <>
            <Modal
                show={show}
                onHide={handleClose}
            >
                <Modal.Header closeButton={false}>
                    <Modal.Title>{'Delete Config'}</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <p>{`Are you sure you would like to delete the configs for the team ${props.config[props.configIndex].TeamName}`}</p>
                </Modal.Body>

                <Modal.Footer>
                    <Button
                        variant='secondary'
                        onClick={handleClose}
                    >{'Close'}</Button>
                    <Button
                        variant='danger'
                        onClick={() => handleDelete(props.onChange, props.config, props.configIndex)}
                    >{'Delete'}</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default DeleteModal;
