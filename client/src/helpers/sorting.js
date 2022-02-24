/*
    Sort the projects by a given field in ascending/descending order
    @param projects - array of project objects to be sorted
    @param sort_field - field to sort the objects by
    @param sort_direction - whether to sort the projects in ascending or descending order
                            possible values: ASC, DESC
    @return nothing, arrays are passed by reference
*/
export const sortProjects = (projects, sort_field, sort_direction) => {
    projects.sort((a, b) => {

        if (sort_direction === 'ASC') {
            return a[sort_field] - b[sort_field]
        } else {
            return - (a[sort_field] - b[sort_field])
        };
        
    })
};