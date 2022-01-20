import axios from 'axios';

class AuthService {

    async login(username, password) {
        try {
            await axios.post(
                '/admin/login',
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

}

export default new AuthService();