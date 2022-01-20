import React from 'react';
import './updateProject.css';

import { useParams } from 'react-router-dom';

const UpdateProject = () => {

    const { projectID } = useParams();

    return <h1>Update Project {projectID}</h1>;
};

export default UpdateProject;
