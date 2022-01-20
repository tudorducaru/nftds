import React, { useContext } from 'react';
import AuthService from '../../services/authService';
import { AuthContext } from '../../contexts/authContext';

const Dashboard = () => {

    const authContext = useContext(AuthContext);

    const handleLogout = () => {
        AuthService.logout()
            .then(() => authContext.logoutUser());
    }

    return (
        <div>
            <button onClick={handleLogout}>
                Log out
            </button>
            <h1>Admin Dashboard</h1>
        </div>
    )
};

export default Dashboard;
