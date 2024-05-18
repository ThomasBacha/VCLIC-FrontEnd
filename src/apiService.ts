import axios from 'axios';

const api = axios.create({
    baseURL: 'https://localhost:7252/',
    headers: {
        'Content-Type': 'application/json'
    }
});

// Handle request errors
api.interceptors.response.use(response => response, error => {
    // Log or handle errors here
    console.error('API request error: ', error);
    return Promise.reject(error);
});

// Export API functions
export const fetchValueSets = () => {
    return api.get('ValueSet');
};

