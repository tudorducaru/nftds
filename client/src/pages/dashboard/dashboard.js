import React, { useContext, useEffect, useState } from 'react';
import AuthService from '../../services/authService';
import { AuthContext } from '../../contexts/authContext';
import './dashboard.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert';
import { AiOutlinePlus } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { ProjectsContext } from '../../contexts/projectsContext';
import DataService from '../../services/dataService';
import Spinner from 'react-bootstrap/Spinner';


const Dashboard = () => {

    const authContext = useContext(AuthContext);
    const { projects, setProjects } = useContext(ProjectsContext);

    // Error message from the server
    const [serverError, setServerError] = useState();

    const [loading, setLoading] = useState(!projects);

    const navigate = useNavigate();

    useEffect(() => {

        // Get projects from the API
        DataService.getProjects()
            .then(response => {
                setLoading(false);
                setServerError('');
                setProjects(response);
            })
            .catch(errorMessage => {
                setLoading(false);
                setServerError(errorMessage);
            });

    }, []);

    const handleLogout = () => {
        AuthService.logout()
            .then(() => authContext.logoutUser());
    }

    const handlePlusClick = () => {
        navigate('/admin/newProject');
    }

    return (
        <div>
            <button onClick={handleLogout}>
                Log out
            </button>
            <Container id='admin-dashboard-container'>

                { serverError && 
                    <Row>
                        <Alert variant='danger'>{ serverError }</Alert>
                    </Row>
                }

                <Row className='admin-dashboard-header'>
                    <Col>
                        <h1>Projects</h1>
                    </Col>
                    <Col id='plus-button-container' className='col-auto'>
                        <AiOutlinePlus color='#ebebeb' size={32} onClick={handlePlusClick} />
                    </Col>
                </Row>

                { loading && <Spinner className='custom-spinner' animation='border'/> }
                
                {
                    projects.map(project => 
                        <Row className='admin-project-container' key={ project.id }
                            onClick={() => navigate(`/admin/updateProject/${ project.id }`)}
                        >
                            <Col>
                                <p>
                                    { project.name }
                                </p>
                            </Col>
                        </Row>
                    )
                }
                

            </Container>
            
        </div>
    )
};

export default Dashboard;
