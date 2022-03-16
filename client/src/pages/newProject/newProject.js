import React, { useContext, useState } from 'react';
import './newProject.css';
import { Formik, Field } from 'formik';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import * as yup from 'yup';
import Spinner from 'react-bootstrap/Spinner';
import DataService from '../../services/dataService';
import { useNavigate } from 'react-router-dom';
import Alert from 'react-bootstrap/Alert';
import { ProjectsContext } from '../../contexts/projectsContext';

const NewProject = () => {

    const { insertProject } = useContext(ProjectsContext);

    // Error message from the server
    const [serverError, setServerError] = useState();

    let navigate = useNavigate();

    return (
        <div className='project-form-container'>
            <h1>Add New Project</h1>

            <Formik
                initialValues={{
                    name: '',
                    invite_url: '',
                    fakemeter: false,
                    mint_date: '',
                    mint_amount: '',
                    website_link: '',
                    twitter_link: ''
                }}
                validationSchema={yup.object({
                    name: yup.string().required('Please enter project name'),
                    invite_url: yup.string().required('Please enter invite URL'),
                    mint_date: yup.string(),
                    mint_amount: yup.number('Mint amount is not a number'),
                    website_link: yup.string().required('Please enter website link'),
                    twitter_link: yup.string().required('Please enter Twitter link')
                })}
                validateOnBlur={false}
                validateOnChange={false}
                onSubmit={(values, { setSubmitting }) => {

                    DataService.addProject(values)
                        .then(project => {

                            // Insert the project into global state
                            insertProject(project);

                            // Go back to admin dashboard
                            navigate('/admin');
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
                                type='date'
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
        </div>
    )
};

export default NewProject;
