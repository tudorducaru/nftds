import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../contexts/authContext';
import { Navigate } from 'react-router-dom';
import { Formik, Field } from 'formik';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import * as yup from 'yup';
import AuthService from '../../services/authService';
import Alert from 'react-bootstrap/Alert';
import axios from 'axios';
import './authentication.css';
import logo from '../../assets/logo_NFTDS.png';
import Spinner from 'react-bootstrap/Spinner';

const Authentication = () => {

    // Get the user from AuthContext
    const authContext = useContext(AuthContext);

    // Error message sent from the server
    const [serverError, setServerError] = useState();

    // Redirect to admin dashboard if user is logged in
    return authContext.user ? <Navigate to='/admin' replace={true} />
        : (
            <div className='auth-container'>
                <img src={logo} />
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

                            { isSubmitting && <Spinner className='custom-spinner' animation='border' /> }

                            <Form.Group className='form-group'>
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
                            <Form.Group className='form-group'>
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
                            <Button className='custom-button' variant="primary" type="submit" disabled={isSubmitting}>
                                Log In
                            </Button>
                        </Form>
                    )}
                </Formik>
            </div>
        )
};

export default Authentication;
