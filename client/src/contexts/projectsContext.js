import React, { useState } from 'react';

// Create new context
export const ProjectsContext = React.createContext();

export const ProjectsProvider = props => {

    // Keep the projects in provider's state
    const [projects, setProjects] = useState([]);

    // Insert a new project into the global state
    const insertProject = project => setProjects([...projects, project]);

    return (
        <ProjectsContext.Provider value={{ projects, setProjects, insertProject }}>
            { props.children }
        </ProjectsContext.Provider>
    )

};