// apiService.js
import axios from 'axios';

const api = axios.create({
    baseURL: 'https://dev.bankrs.com',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const fetchData = async (endpoint:any, authToken:any) => {
    try {
        const response = await api.get(endpoint, {
            headers: {
                Authorization: `Bearer ${authToken}`,
            },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};
