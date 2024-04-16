import logo from './logo.svg';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import ReactGA from 'react-ga';

// Import pages
import Homepage from './pages/homepage/homepage';
import Dashboard from './pages/dashboard/dashboard';
import Authentication from './pages/authentication/authentication';
import NewProject from './pages/newProject/newProject';
import UpdateProject from './pages/updateProject/updateProject';

import RequireAuth from './components/requireAuth';
import { useContext, useEffect, useState } from 'react';

import DataService from './services/dataService';
import { AuthContext } from './contexts/authContext';

function App() {

  const { loginUser, logoutUser } = useContext(AuthContext);

  // Specifies whether or not user status has been received from the server
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    // Check if the user is logged in
    DataService.verifyUser()
      .then(loggedIn => {

        // Set the value of the user in the context according to the login status
        if (loggedIn) loginUser();
        else logoutUser();

      })
      .catch(errorMessage => {

        console.log(errorMessage);
        logoutUser();

      })
      .finally(() => setLoading(false));

    // Try to get CSRF token from the server
    DataService.getCsrfToken()
      .catch(errorMessage => console.log(errorMessage));

  }, []);

  return loading ? <div>tudor</div> : (

    // Set up routes
    <Routes>
      <Route path='/' element={<Homepage />} />
      <Route path='/admin/authentication' element={<Authentication />} />
      <Route path='/admin' element={<RequireAuth><Dashboard /></RequireAuth>} />
      <Route path='/admin/newProject' element={<RequireAuth><NewProject /></RequireAuth>} />
      <Route path='/admin/updateProject/:projectID' element={<RequireAuth><UpdateProject /></RequireAuth>} />
    </Routes>
  );
}

export default App;
