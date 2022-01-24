import React, { useState } from 'react';

// Create new context
export const ProjectsContext = React.createContext();

export const ProjectsProvider = props => {

    // Keep the projects in provider's state
    const [projects, setProjects] = useState([]);

    return (
        <ProjectsContext.Provider value={{ projects, setProjects }}>
            { props.children }
        </ProjectsContext.Provider>
    )

};