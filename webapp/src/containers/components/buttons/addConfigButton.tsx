import React, {useState} from 'react';

import {FormGroup, Col} from 'react-bootstrap';
import Button from 'react-bootstrap/Button';

import ConfigModal from '../modals/configModal';

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

const AddConfigButton = ({label, helpText}: Props) => {
    const [addVisible, setAddVisible] = useState(false);

    const handleAdd = () => {
        setAddVisible(true);
    };

    return (
        <div>
            {addVisible && <ConfigModal
                visible={addVisible}
                setVis={setAddVisible}
                config={null}
            />}

            <FormGroup>
                <Col sm={4}>
                    {label}
                </Col>
                <Col sm={8}>
                    <Button
                        variant='primary'
                        onClick={handleAdd}
                    >
                        {'Add Config'}
                    </Button>
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

export default AddConfigButton;