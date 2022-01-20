import React, { useContext } from 'react';
import { AuthContext } from '../contexts/authContext';
import { Navigate } from 'react-router-dom';

const RequireAuth = props => {

    // Get the user from AuthContext
    const user = useContext(AuthContext);

    // Navigate to the authentication page if the user is not logged in
    if (!user) return <Navigate to='/admin/authentication' replace={true}/>
    else return props.children;
};

export default RequireAuth;
