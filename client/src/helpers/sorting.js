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

        // Fields that are strings need to be compared as strings
        if (sort_field === 'name' || sort_field === 'mint_date') {

            // Ensure fields are not null to avoid localeCompare crashing
            a[sort_field] = a[sort_field] ? a[sort_field] : '';
            b[sort_field] = b[sort_field] ? b[sort_field] : '';

            console.log(a[sort_field], b[sort_field]);

            if (sort_direction === 'ASC') {
                return a[sort_field].localeCompare(b[sort_field]);
            } else {
                return - a[sort_field].localeCompare(b[sort_field]);
            }

        } else {

            if (sort_direction === 'ASC') {
                return a[sort_field] - b[sort_field];
            } else {
                return - (a[sort_field] - b[sort_field]);
            };

        }



    })
};

/*
    Get label based on sorting field
    @param sorting_field - the field of the project object that the projects are sorted by
    @return label - label corresponding to the sorting field
*/
export const getLabel = sorting_field => {

    switch (sorting_field) {
        case 'name':
            return 'Project name';
        case 'created_at':
            return 'Standard';
        case 'member_count':
            return 'Total users';
        case 'online_count':
            return 'Online users';
        case 'twitter_followers_count':
            return 'Twitter followers';
        case 'fakemeter':
            return 'Fakemeter';
        case 'mint_date':
            return 'Mint date';
        case 'mint_amount':
            return 'Mint price';
    }

}