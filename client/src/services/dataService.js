import axios from 'axios';
import { getInviteCode } from '../helpers/inviteUrl';
import { sortProjects } from '../helpers/sorting';

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

    /*
        Get member counts
        @return a list of projects where each element contains member counts
    */
    async getMemberCounts() {

        // Get the projects from the server
        let projects = [];
        try {
            projects = await this.getProjects();
        } catch (err) {

            // Failure to get list of projects
            throw err.response.data;
        }

        const memberCounts = [];

        // Get member counts for each project
        await Promise.all(projects.map(async project => {

            // Get the invite code from the invite URL
            const inviteCode = getInviteCode(project.invite_url)

            try {

                // Make a request to the Discord API to get member counts
                const discordResponse = await axios.get(
                    `https://discord.com/api/v9/invites/${inviteCode}?with_counts=true`
                );

                // Create source of the project logo based on id and icon
                let logo_url;
                try {
                    logo_url = `https://cdn.discordapp.com/icons/${discordResponse.data.guild.id}/${discordResponse.data.guild.icon}.png?size=160`
                } catch {
                    console.log('Could not retrieve logo for ' + project.name)
                }

                // Add the info to the member counts array
                memberCounts.push({
                    ...project,
                    logo_url,
                    'member_count': discordResponse.data.approximate_member_count,
                    'online_count': discordResponse.data.approximate_presence_count,
                });

            } catch (err) {

                // Failure to get member counts from discord
                console.log(`Error getting discord member counts for ${project.name} with invite code ${inviteCode}`)

                // Add the project to the member counts array
                memberCounts.push({
                    ...project,
                    'member_count': 0,
                    'online_count': 0,
                });
            }

        }))


        return memberCounts;

    }

    // Submit project
    async submitProject(projectInfo) {
        try {

            const response = await axios.post(
                '/submit-project',
                projectInfo,
                {
                    withCredentials: true
                }
            );

            return response.data;

        } catch (err) {

            // Failure to submit project
            throw err.response.data;
        }
    }

    // Set mint reminder
    async setMintReminder(email, projectID) {
        try {

            const response = await axios.post(
                `/set-mint-reminder`,
                {
                    email, projectID
                },
                {
                    withCredentials: true
                }
            );

            return response.data;

        } catch (err) {

            // Failure to set reminder
            throw err.response.data;

        }
    }

}

export default new DataService();