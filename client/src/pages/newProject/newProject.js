import React from 'react';
import './newProject.css';
import { Formik, Field } from 'formik';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const NewProject = () => {
    return (
        <div className='new-project-container'>
            <h1>Add New Project</h1>

            <Formik
                initialValues={{
                    project_name: '',
                    invite_url: '',
                    fakemeter: false,
                    mint_date: '',
                    mint_amount: 0,
                    website_link: '',
                    twitter_link: ''
                }}
                onSubmit={(values, { setSubmitting }) => {
                    console.log(values);
                }}
            >
                {({
                    isSubmitting,
                    handleSubmit,
                    errors
                }) => (
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className='form-group'>
                            <Form.Label>Project Name</Form.Label>
                            <Field 
                                name='project_name'
                                type='text'
                                as={Form.Control}
                            />
                        </Form.Group>

                        <Form.Group className='form-group'>
                            <Form.Label>Invite URL</Form.Label>
                            <Field 
                                name='invite_url'
                                type='text'
                                as={Form.Control}
                            />
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
                                as={Form.Control}
                            />
                        </Form.Group>

                        <Form.Group className='form-group'>
                            <Form.Label>Mint Amount</Form.Label>
                            <Field 
                                name='mint_amount'
                                type='number'
                                step='0.01'
                                as={Form.Control}
                            />
                        </Form.Group>

                        <Form.Group className='form-group'>
                            <Form.Label>Website Link</Form.Label>
                            <Field 
                                name='website_link'
                                type='text'
                                as={Form.Control}
                            />
                        </Form.Group>

                        <Form.Group className='form-group'>
                            <Form.Label>Twitter Link</Form.Label>
                            <Field 
                                name='twitter_link'
                                type='text'
                                as={Form.Control}
                            />
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
