import axios from 'axios';

const api = axios.create({
	baseURL: 'https://167.99.165.125:3333',
});

export default api;
