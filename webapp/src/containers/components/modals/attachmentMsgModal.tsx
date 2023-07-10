import React, {useEffect, useState} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import usePluginApi from 'hooks/usePluginApi';

//TODO: render this modal when view button is clicked in Config table
const AttachmentMsgModal = () => {
    const [show, setShow] = useState(false);
    const usePlugin = usePluginApi();

    useEffect(() => {
        const visibility = usePlugin.state['plugins-com.mattermost.welcomebot'].viewConfigModalSlice.isVisible;
        setShow(visibility);
    }, []);

    const handleClose = () => {
        setShow(false);
    };
    return (
        <>
            <div
                className='modal show'
                style={{display: 'block', position: 'initial'}}
            >
                <Modal show={show}>
                    <Modal.Header>
                        <Modal.Title>{'Attachment Message'}</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <p>{'Attachment message body text goes here.'}</p>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button
                            variant='secondary'
                            onClick={handleClose}
                        >
                            {'Close'}
                        </Button>
                        <Button variant='primary'>{'Save changes'}</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </>
    );
};

export default AttachmentMsgModal;
