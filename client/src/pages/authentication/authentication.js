import React, { useContext } from 'react';
import { AuthContext } from '../../contexts/authContext';
import { Navigate } from 'react-router-dom';

const Authentication = () => {

    // Get the user from AuthContext
    const user = useContext(AuthContext);

    // Redirect to admin dashboard if user is logged in
    return user ? <Navigate to='/admin' replace={true} /> 
    : (
        <h1>Authentication</h1>
    )
};

export default Authentication;
