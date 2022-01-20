import React, { useContext, useState } from 'react';

// Create a new context
export const AuthContext = React.createContext();

export const AuthProvider = props => {

    // Keep the user in the provider's state
    const [user, setUser] = useState(false);

    return (
        <AuthContext.Provider value={user}>
            { props.children }
        </AuthContext.Provider>
    );

}