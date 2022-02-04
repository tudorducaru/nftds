import axios from 'axios';

class DataService {

    // Make request that returns a CSRF token
    async getCsrfToken() {
        try {
            
            const response = await axios.get(
                '/admin/csrfToken'
            );
            return;

        } catch (err) {
            
            // Failure to get CSRF token
            return err.response.data;

        }
    }

    // Check if the user is logged in
    async verifyUser() {
        try {

            const response = await axios.get(
                '/admin/verifyUser'
            );
            return response.data;

        } catch (err) {

            // Failure to verify user
            return err.response.data;

        }
    }

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
                projectInfo,
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
                `/admin/projects/${projectID}`,
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

    async updateProject(projectID, projectInfo) {

        try {

            const response = await axios.put(
                `/admin/projects/${projectID}`,
                projectInfo,
                {
                    withCredentials: true
                }
            );

            return;

        } catch (err) {

            // Failure to update project
            throw err.response.data;

        }

    }

    async deleteProject(projectID) {

        try {

            const response = await axios.delete(
                `/admin/projects/${projectID}`,
                {
                    withCredentials: true
                }
            );

            return;

        } catch (err) {

            // Failure to delete project
            throw err.response.data;

        }

    }

}

export default new DataService();