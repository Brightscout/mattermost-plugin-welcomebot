import React, {useEffect, useState} from 'react';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import './styles.css';

type Props = {
    visibility: boolean;
    setVisibility: React.Dispatch<React.SetStateAction<boolean>>;
    config: Configs[];
    configIndex: number;
    onChange: any;
}

const DeleteModal = ({visibility, setVisibility, config, configIndex, onChange}: Props) => {
    const [show, setShow] = useState(false);

    useEffect(() => {
        setShow(visibility);
    }, [visibility]);

    const handleClose = () => {
        setShow(false);
        setVisibility(false);
    };
    const handleDelete = () => {
        config.splice(configIndex, 1);
        onChange(config);
        handleClose();
    };

    return (

        <>
            <Modal
                className='deleteModal'
                show={show}
                onHide={handleClose}
            >
                <Modal.Header closeButton={false}>
                    <Modal.Title>{'Delete Config'}</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <p>{`Are you sure you would like to delete the configs for ${config[configIndex].teamName}?`}</p>
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

export default DeleteModal;
