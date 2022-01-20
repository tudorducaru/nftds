import React, { useContext, useState } from 'react';
import { AuthContext } from '../../contexts/authContext';
import { Navigate } from 'react-router-dom';
import { Formik, Field } from 'formik';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import * as yup from 'yup';
import AuthService from '../../services/authService';
import Alert from 'react-bootstrap/Alert';

const Authentication = () => {

    // Get the user from AuthContext
    const authContext = useContext(AuthContext);

    // Error message sent from the server
    const [serverError, setServerError] = useState();

    // Redirect to admin dashboard if user is logged in
    return authContext.user ? <Navigate to='/admin' replace={true} />
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
                        
                        AuthService.login(values.username, values.password)
                            .then(() => authContext.loginUser())
                            .catch(errorMessage => {
                                setSubmitting(false);
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
