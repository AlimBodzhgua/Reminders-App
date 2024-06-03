import axios from 'axios';
import { USER_LOCALSTORAGE_KEY } from 'constants/localStorage';

const appHeaders = {
	'Content-Type': 'application/json',
};

const appAxios = axios.create({
	baseURL: import.meta.env.VITE_SERVER_LINK,
	headers: appHeaders,
});

appAxios.interceptors.request.use((config) => {
	const token = localStorage.getItem(USER_LOCALSTORAGE_KEY);
	config.headers.Authorization =  token ? `Bearer ${token}` : '';
	return config;
});

export default appAxios;
