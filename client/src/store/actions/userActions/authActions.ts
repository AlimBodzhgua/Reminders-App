import { createAsyncThunk } from '@reduxjs/toolkit';
import appAxios from 'api/axios';

import type { IUser } from 'types/user';
import type { IAuthUser } from 'types/auth';


export const registerUser = createAsyncThunk<
	IUser,
	IAuthUser,
	{ rejectValue: string }
>(
	'register',
	async (user, { rejectWithValue }) => {
		const body = {
			email: user.email,
			password: user.password,
			...(user.login !== undefined) && { login: user.login }
		};

		try {
			const response = await appAxios.post<IUser>('/users/auth/register', body);
			return response.data;
		} catch (err) {
			return rejectWithValue(JSON.stringify(err));
		}
	}
);


export const loginUser = createAsyncThunk<
	IUser,
	Omit<IAuthUser, 'login'>,
	{ rejectValue: string }
>(
	'login',
	async (user, { rejectWithValue }) => {
		const body = {
			email: user.email,
			password: user.password,
		};

		try {
			const response = await appAxios.post<IUser>('/users/auth/login', body);
			return response.data;
		} catch (err) {
			return rejectWithValue(JSON.stringify(err));
		}
	}
);

export const initUserAuth = createAsyncThunk<
	IUser,
	void,
	{ rejectValue: string }
>(
	'initUserAuth',
	async (_, { rejectWithValue }) => {
		try {
			const response = await appAxios.get<IUser>('users/auth/me');
			return response.data;
		} catch (err) {
			return rejectWithValue(JSON.stringify(err));
		}
	}
);
