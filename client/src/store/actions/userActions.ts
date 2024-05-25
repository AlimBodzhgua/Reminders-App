import { createAsyncThunk } from '@reduxjs/toolkit';
import { IUser } from 'types/user';
import appAxios from 'api/axios';

export const registerUser = createAsyncThunk<
	IUser,
	Omit<IUser, 'list' | 'id'>,
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
			const response = await appAxios.post('/users/auth/register', body);
			return response.data;
		} catch (err) {
			return rejectWithValue(JSON.stringify(err));
		}
	}
);


export const loginUser = createAsyncThunk<
	void,
	Omit<IUser, 'list' | 'login'>,
	{ rejectValue: string }
>(
	'login',
	async (user, { rejectWithValue }) => {
		try {
			console.log(user);
		} catch (err) {
			return rejectWithValue(JSON.stringify(err));
		}
	}
);
