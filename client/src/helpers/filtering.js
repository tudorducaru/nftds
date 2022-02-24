/*
    Filter projects based on a search input  term
    @param projects - array of project objects to be filtered
    @param search_term - the term that must appear in the project title
    @return filtered_array - filtered array of projects
*/
export const searchProjects = (projects, search_term) => {

    return projects.filter(project => project.name.toLowerCase().includes(search_term.toLowerCase()));

};