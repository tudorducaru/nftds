import React, { useState, useEffect } from 'react';
import './homepage.css';
import DataService from '../../services/dataService';
import ProjectListItem from '../../components/projectListItem/projectListItem';
import Container from 'react-bootstrap/Container';

const Homepage = props => {

    // Kepp the list of projects (with member counts) in local state
    const [projects, setProjects] = useState([]);

    useEffect(() => {

        // Get member counts for all projects in the database
        DataService.getMemberCounts()
            .then(data => setProjects(data))
            .catch(errorMessage => console.log(errorMessage));
    }, []);

    return (
        <div>
            <Container id='projects-table'>
                {
                    projects.map(project => {
                        return <ProjectListItem project={project} key={project.id} />
                    })
                }
            </Container>
        </div>
    );
};

export default Homepage;