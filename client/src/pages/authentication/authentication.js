import React, { useContext } from 'react';
import { AuthContext } from '../../contexts/authContext';
import { Navigate } from 'react-router-dom';
import { Formik, Field } from 'formik';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import * as yup from 'yup';

const Authentication = () => {

    // Get the user from AuthContext
    const user = useContext(AuthContext);

    // Redirect to admin dashboard if user is logged in
    return user ? <Navigate to='/admin' replace={true} />
        : (
            <div>
                <h1>Authenticate</h1>
                <Formik
                    initialValues={{
                        username: '',
                        password: ''
                    }}
                    validationSchema={yup.object({
                        username: yup.string().required('Please enter a username'),
                        password: yup.string().required('Please enter a password')
                    })}
                    validateOnChange={false}
                    validateOnBlur={false}
                    onSubmit={(values, { setSubmitting }) => {
                        console.log(values);
                        setSubmitting(false);
                    }}
                >
                    {({ 
                        isSubmitting, 
                        handleSubmit, 
                        errors 
                    }) => (
                        <Form onSubmit={handleSubmit}>
                            <Form.Group>
                                <Form.Label>Username</Form.Label>
                                <Field 
                                    type='text' 
                                    name='username' 
                                    isInvalid={!!errors.username}
                                    as={Form.Control}
                                />
                                <Form.Control.Feedback type='invalid'>
                                    {errors.username}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Password</Form.Label>
                                <Field 
                                    type='password' 
                                    name='password' 
                                    isInvalid={!!errors.password}
                                    as={Form.Control} />
                                <Form.Control.Feedback type='invalid'>
                                    {errors.password}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Button variant="primary" type="submit" disabled={isSubmitting}>
                                Submit
                            </Button>
                        </Form>
                    )}
                </Formik>
            </div>
        )
};

export default Authentication;
