import React, { useContext, useEffect } from 'react';
import './homepage.css';
import DataService from '../../services/dataService';
import { ProjectsContext } from '../../contexts/projectsContext';


const Homepage = props => {

    useEffect(() => {
        DataService.getMemberCounts();
    }, []);

    return <h1>Homepage</h1>;
};

export default Homepage;