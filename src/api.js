import axios from 'axios';

const api = axios.create({
    baseURL: 'https://localhost:3020'
});

export default api;