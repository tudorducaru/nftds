import React, { useState } from 'react';
import './mintReminderModal.css';
import Modal from 'react-bootstrap/Modal';
import { Formik, Field } from 'formik';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import * as yup from 'yup';
import Spinner from 'react-bootstrap/Spinner';
import Alert from 'react-bootstrap/Alert';
import DataService from '../../services/dataService';
import bell from '../../bell.jpeg';

const MintReminderModal = props => {
    const [serverError, setServerError] = useState();

    return (
        <Modal
            className='mint-reminder-modal'
            show={props.show}
            onHide={() => {
                setServerError('');
                props.handleClose();
            }}
        >
            <Modal.Header className='flex-column'>
                <img src={bell} className='mb-2'></img>
                <Modal.Title>
                    Set a reminder for mint date
                </Modal.Title>
                <p className='subtitle mt-3'>You will get an email notification on mint day, so you don't miss your favourite projects anymore.</p>
            </Modal.Header>

            <Modal.Body className='align-self-center'>
                <Formik
                    initialValues={{
                        email: ''
                    }}
                    validationSchema={yup.object({
                        email: yup.string().email('Invalid email address').required('Please enter your email address')
                    })}
                    validateOnBlur={false}
                    validateOnChange={false}
                    onSubmit={(values, { setSubmitting }) => {

                        

                    }}
                >
                    {({
                        isSubmitting,
                        handleSubmit,
                        errors
                    }) => (
                        <Form onSubmit={handleSubmit}>

                            {serverError && <Alert variant='danger'>{serverError}</Alert>}

                            {isSubmitting && <Spinner className='custom-spinner' animation='border' />}

                            <div className='d-flex mb-3'>
                                <Form.Group className='form-group'>
                                    <Field
                                        name='email'
                                        type='text'
                                        placeholder='Your email'
                                        isInvalid={!!errors.email}
                                        as={Form.Control}
                                    />
                                    <Form.Control.Feedback type='invalid'>
                                        {errors.email}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Button className='custom-button' type="submit" disabled={isSubmitting}>
                                    SET REMINDER
                                </Button>
                            </div>

                        </Form>
                    )}

                </Formik>
            </Modal.Body>

        </Modal>
    );
};

export default MintReminderModal;