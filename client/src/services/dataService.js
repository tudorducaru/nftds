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

    async addProject(projectInfo) {
        try {

            const response = await axios.post(
                '/admin/projects',
                {
                    ...projectInfo
                },
                {
                    withCredentials: true
                }
            );

            return response.data;

        } catch (err) {

            // Failure to insert project
            throw err.response.data;
        }
    }

    async getProject(projectID) {

        try {

            const response = await axios.get(
                `/projects/${projectID}`,
                {
                    withCredentials: true
                }
            );

            return response.data;

        } catch (err) {

            // Failure to retrieve project
            throw err.response.data;

        }

    }

}

export default new DataService();