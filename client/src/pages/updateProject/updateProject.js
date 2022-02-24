import React, { useEffect, useState } from 'react';
import './updateProject.css';
import { Formik, Field } from 'formik';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import * as yup from 'yup';
import Spinner from 'react-bootstrap/Spinner';
import DataService from '../../services/dataService';
import { useNavigate } from 'react-router-dom';
import Alert from 'react-bootstrap/Alert';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal';
import { MdDeleteOutline } from 'react-icons/md';

import { useParams } from 'react-router-dom';

const UpdateProject = () => {

    // Keep track of any possible server errors
    const [serverError, setServerError] = useState();
    
    // Get the project id from the query parameters
    const { projectID } = useParams();

    // Keep current project in local state
    const [project, setProject] = useState();

    // Whether or not to show delete alert modal
    const [showModal, setShowModal] = useState(false);

    // Spin modal spinner
    const [modalSpinner, setModalSpinner] = useState(false);

    let navigate = useNavigate();

    useEffect(() => {

        DataService.getProject(projectID)
            .then(data => {
                setProject(data);
            })
            .catch(errorMessage => {
                setServerError(errorMessage);
            })

    }, []);

    const handleDeleteClick = () => setShowModal(true);
    const handleModalClose = () => setShowModal(false);

    const handleDeleteProject = () => {
        setModalSpinner(true);

        DataService.deleteProject(projectID)
            .then(() => {

                // Go back to admin dashboard
                navigate('/admin', { replace: true });
            })
            .catch(errorMessage => {
                setShowModal(false);
                setModalSpinner(false);

                // Display the error message
                setServerError(errorMessage);
            });
    };

    return (
        <Container className='project-form-container'>

            <Modal show={showModal} onHide={handleModalClose}>
                <Modal.Header closeButton closeVariant='white'/>
                <Modal.Body>
                    { modalSpinner && <Spinner className='custom-spinner' animation='border' /> }
                    <p>Are you sure you want to delete this project?</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button className='custom-button custom-close-button' onClick={handleModalClose}>
                        Close
                    </Button>
                    <Button className='custom-button custom-confirm-button' variant='primary' onClick={handleDeleteProject}>
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>

            <Row>
                <Col>
                    <h1>Update Project</h1>
                </Col>
                <Col className='col-auto d-flex align-items-center delete-icon' onClick={handleDeleteClick}>
                    <MdDeleteOutline size={32} color='#ebebeb' />
                </Col>
            </Row>


            <Formik
                initialValues={{
                    name: project ? project.name : '',
                    invite_url: project ? project.invite_url : '',
                    fakemeter: project ? (project.fakemeter ? true : false) : false,
                    mint_date: project ? project.mint_date : '',
                    mint_amount: project ? project.mint_amount : 0,
                    website_link: project ? project.website_link : '',
                    twitter_link: project ? project.twitter_link : ''
                }}
                validationSchema={yup.object({
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
                enableReinitialize
                onSubmit={(values, { setSubmitting }) => {
                    
                    DataService.updateProject(projectID, values)
                        .then(() => {

                            // Go back to admin dashboard
                            navigate('/admin', { replace: true });
                        })
                        .catch(errorMessage => {
                            setSubmitting(false);

                            // Display the error message
                            setServerError(errorMessage);
                        });

                }}
            >
                {({
                    isSubmitting,
                    handleSubmit,
                    errors
                }) => (
                    <Form onSubmit={handleSubmit}>

                        { serverError && <Alert variant='danger'>{serverError}</Alert> }

                        { isSubmitting && <Spinner className='custom-spinner' animation='border' /> }

                        <Form.Group className='form-group'>
                            <Form.Label>Project Name</Form.Label>
                            <Field
                                name='name'
                                type='text'
                                placeholder='Enter project name...'
                                isInvalid={!!errors.name}
                                as={Form.Control}
                            />
                            <Form.Control.Feedback type='invalid'>
                                {errors.name}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className='form-group'>
                            <Form.Label>Invite URL</Form.Label>
                            <Field
                                name='invite_url'
                                type='text'
                                placeholder='Enter invite URL...'
                                isInvalid={!!errors.invite_url}
                                as={Form.Control}
                            />
                            <Form.Control.Feedback type='invalid'>
                                {errors.invite_url}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className='form-group'>
                            <Field
                                name='fakemeter'
                                type='checkbox'
                                label='Fakemeter'
                                as={Form.Check}
                            />
                        </Form.Group>

                        <Form.Group className='form-group'>
                            <Form.Label>Mint Date</Form.Label>
                            <Field
                                name='mint_date'
                                type='text'
                                placeholder='Enter mint date...'
                                isInvalid={!!errors.mint_date}
                                as={Form.Control}
                            />
                            <Form.Control.Feedback type='invalid'>
                                {errors.mint_date}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className='form-group'>
                            <Form.Label>Mint Amount</Form.Label>
                            <Field
                                name='mint_amount'
                                type='number'
                                step='0.01'
                                placeholder='Enter mint amount...'
                                isInvalid={!!errors.mint_amount}
                                as={Form.Control}
                            />
                            <Form.Control.Feedback type='invalid'>
                                {errors.mint_amount}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className='form-group'>
                            <Form.Label>Website Link</Form.Label>
                            <Field
                                name='website_link'
                                type='text'
                                placeholder='Enter website link...'
                                isInvalid={!!errors.website_link}
                                as={Form.Control}
                            />
                            <Form.Control.Feedback type='invalid'>
                                {errors.website_link}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className='form-group'>
                            <Form.Label>Twitter Link</Form.Label>
                            <Field
                                name='twitter_link'
                                type='text'
                                placeholder='Enter Twitter link...'
                                isInvalid={!!errors.twitter_link}
                                as={Form.Control}
                            />
                            <Form.Control.Feedback type='invalid'>
                                {errors.twitter_link}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Button className='custom-button' type="submit" disabled={isSubmitting}>
                            Finish
                        </Button>
                    </Form>
                )}

            </Formik>
        </Container>
    );
};

export default UpdateProject;
