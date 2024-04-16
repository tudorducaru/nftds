import axios from 'axios';

class AuthService {

    async verifyUser() {
        try {
            await axios.get(
                '/api/admin/verifyUser',
                {
                    withCredentials: true
                }
            );

            return true;
        } catch (error) {
            return false;
        }
    }

    async login(username, password) {
        try {
            await axios.post(
                '/api/admin/login',
                {
                    username,
                    password
                },
                {
                    withCredentials: true
                }
            );

            // Successful authentication
            return;
        } catch (error) {

            // Failed authentication
            throw error.response.data;
        }
    }

    async logout() {
        try {
            await axios.post(
                '/api/admin/logout',
                {
                    withCredentials: true
                }
            );

            return;
        } catch (error) {
            throw error.response.data;
        }
    }

}

export default new AuthService();