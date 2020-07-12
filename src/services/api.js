import axios from 'axios';

const api = axios.create({
	baseURL: 'https://admin.jackhair-barber.com.br',
});

export default api;
