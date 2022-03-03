import React, { useState } from 'react';
import './submitProjectModal.css';
import Modal from 'react-bootstrap/Modal';
import { Formik, Field } from 'formik';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import * as yup from 'yup';
import Spinner from 'react-bootstrap/Spinner';
import Alert from 'react-bootstrap/Alert';

const SubmitProjectModal = props => {

    const [serverError, setServerError] = useState();

    return (
        <Modal
            className='submit-project-modal'
            show={props.show}
            onHide={props.handleClose}
        >
            <Modal.Header className='flex-column'>
                <Modal.Title>
                    List your collection for free
                </Modal.Title>
                <p className='subtitle mt-3'>Send us your collection details and after a detailed verification, we will add it to the list</p>
            </Modal.Header>

            <Modal.Body className='align-self-center'>
                <Formik
                    initialValues={{
                        email: '',
                        name: '',
                        invite_url: '',
                        fakemeter: false,
                        mint_date: '',
                        mint_amount: '',
                        website_link: '',
                        twitter_link: ''
                    }}
                    validationSchema={yup.object({
                        email: yup.string().email('Invalid email address').required('Please enter your email address'),
                        name: yup.string().required('Please enter project name'),
                        invite_url: yup.string().required('Please enter invite URL'),
                        mint_date: yup.string().required('Please enter mint date'),
                        mint_amount: yup.number()
                            .required('Please enter the mint price')
                            .moreThan(0, 'Mint price must be greater than 0'),
                        website_link: yup.string().required('Please enter website link'),
                        twitter_link: yup.string().required('Please enter Twitter link')
                    })}
                    validateOnBlur={false}
                    validateOnChange={false}
                    onSubmit={(values, { setSubmitting }) => {



                    }}
                >
                    {({
                        values,
                        isSubmitting,
                        handleSubmit,
                        errors
                    }) => (
                        <Form onSubmit={handleSubmit}>

                            {serverError && <Alert variant='danger'>{serverError}</Alert>}

                            {isSubmitting && <Spinner className='custom-spinner' animation='border' />}

                            <Form.Group className='form-group'>
                                <Field
                                    name='email'
                                    type='text'
                                    placeholder='Your email'
                                    isInvalid={!!errors.name}
                                    as={Form.Control}
                                />
                                <Form.Control.Feedback type='invalid'>
                                    {errors.email}
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group className='form-group'>
                                <Field
                                    name='name'
                                    type='text'
                                    placeholder='Project name'
                                    isInvalid={!!errors.name}
                                    as={Form.Control}
                                />
                                <Form.Control.Feedback type='invalid'>
                                    {errors.name}
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group className='form-group'>
                                <Field
                                    name='invite_url'
                                    type='text'
                                    placeholder='Discord Invite URL'
                                    isInvalid={!!errors.invite_url}
                                    as={Form.Control}
                                />
                                <Form.Control.Feedback type='invalid'>
                                    {errors.invite_url}
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group className='form-group'>
                                <Field
                                    name='mint_date'
                                    onFocus={e => {
                                        e.target.type = 'date';
                                        return true;
                                    }}
                                    onBlur={e => {
                                        if (!values.mint_date) e.target.type = ''
                                    }}
                                    placeholder='Mint date'
                                    isInvalid={!!errors.mint_date}
                                    as={Form.Control}
                                />
                                <Form.Control.Feedback type='invalid'>
                                    {errors.mint_date}
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group className='form-group'>
                                <Field
                                    name='mint_amount'
                                    type='number'
                                    step='0.01'
                                    placeholder='Mint amount (ETH)'
                                    isInvalid={!!errors.mint_amount}
                                    as={Form.Control}
                                />
                                <Form.Control.Feedback type='invalid'>
                                    {errors.mint_amount}
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group className='form-group'>
                                <Field
                                    name='website_link'
                                    type='text'
                                    placeholder='Website Link'
                                    isInvalid={!!errors.website_link}
                                    as={Form.Control}
                                />
                                <Form.Control.Feedback type='invalid'>
                                    {errors.website_link}
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group className='form-group'>
                                <Field
                                    name='twitter_link'
                                    type='text'
                                    placeholder='Twitter Link'
                                    isInvalid={!!errors.twitter_link}
                                    as={Form.Control}
                                />
                                <Form.Control.Feedback type='invalid'>
                                    {errors.twitter_link}
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Button className='custom-button mb-3' type="submit" disabled={isSubmitting}>
                                LIST YOUR COLLECTION
                            </Button>
                        </Form>
                    )}

                </Formik>
            </Modal.Body>

        </Modal>
    )
};

export default SubmitProjectModal;