import logo from './logo.svg';
import './App.css';
import { Routes, Route } from 'react-router-dom';

// Import pages
import Homepage from './pages/homepage/homepage';
import Dashboard from './pages/dashboard/dashboard';
import Authentication from './pages/authentication/authentication';
import NewProject from './pages/newProject/newProject';
import UpdateProject from './pages/updateProject/updateProject';

import RequireAuth from './components/requireAuth';

function App() {
  return (

    // Set up routes
    <Routes>
      <Route path='/' element={<Homepage />} />
      <Route path='/admin/authentication' element={<Authentication />} />
      <Route path='/admin' element={<RequireAuth><Dashboard /></RequireAuth>} />
      <Route path='/admin/newProject' element={<NewProject />} />
      <Route path='/admin/updateProject/:projectID' element={<UpdateProject />} />
    </Routes>
  );
}

export default App;
