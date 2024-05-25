import axios from 'axios';

const appHeaders = {
	'Content-Type': 'application/json',
};

const appAxios = axios.create({
	baseURL: 'http://localhost:4000/',
	headers: appHeaders,
});

export default appAxios;
