import { Rule } from 'antd/es/form';

export const emailRules: Rule[] = [
	{ required: true, message: 'Email is required field.' },
	{ type: 'email', message: 'Please enter a valid email.' },
];


export const loginRules: Rule[] = [
	{ required: false },
	{ min: 4, message: 'Login must be at least 4 char long.' },
];

export const passwordRules: Rule[] = [
	{ required: true, message: 'Password is required field.' },
	{ min: 6, message: 'Password must be at least 6 char long.' },
];
