import axios from 'axios';

class DataService {

    async getProjects() {
        try {

            const response = await axios.get(
                '/projects',
                { 
                    withCredentials: true 
                }
            );

            return response.data;
            
        } catch (err) {

            // Unsuccessful request
            throw err.response.data;
        }
    }

    async addProject(project_info) {
        try {

            const newProject = await axios.post(
                '/admin/projects',
                {
                    ...project_info
                },
                {
                    withCredentials: true
                }
            );

            return newProject;

        } catch (err) {

            // Failure to insert project
            throw err.response.data;
        }
    }

}

export default new DataService();