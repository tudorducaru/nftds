import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './contexts/authContext'
import { ProjectsProvider } from './contexts/projectsContext'
import 'bootstrap/dist/css/bootstrap.min.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AuthProvider>
      <ProjectsProvider>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </ProjectsProvider>
    </AuthProvider>
  </BrowserRouter>,
)
