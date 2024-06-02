import { createAsyncThunk } from '@reduxjs/toolkit';
import { IUser } from 'types/user';
import { IList } from 'types/list';
import { IAuthUser } from 'types/auth';
import appAxios from 'api/axios';

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
			const response = await appAxios.post('/users/auth/register', body);
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
			const response = await appAxios.post('/users/auth/login', body);
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
			const response = await appAxios.get('users/auth/me');
			return response.data;
		} catch (err) {
			return rejectWithValue(JSON.stringify(err));
		}
	}
);


export const addList = createAsyncThunk<
	IList,
	Pick<IList, 'name' | 'icon' | 'color'>,
	{ rejectValue: string }
>(
	'addList',
	async (list, { rejectWithValue }) => {
		const body = {
			name: list.name,
			icon: list.icon,
			color: list.color,
		};
		
		try {
			const response = await appAxios.post('/lists', body);
			return response.data;
		} catch (err) {
			return rejectWithValue(JSON.stringify(err));
		}
	}
);


export const removeList = createAsyncThunk<
	string,
	string,
	{ rejectValue: string }
>(
	'removeList',
	async (id, { rejectWithValue }) => {
		try {
			await appAxios.delete(`/lists/${id}`);
			return id;
		} catch (err) {
			return rejectWithValue(JSON.stringify(err));
		}
	}
);

type UpdateListData = Pick<IList, '_id'> & Partial<Omit<IList, '_id'>>;

export const updateList = createAsyncThunk<
	UpdateListData,
	UpdateListData,
	{ rejectValue: string }
>(
	'updateList',
	async (data, { rejectWithValue }) => {
		try {
			const response = await appAxios.patch(`/lists/${data._id}`, data);
			return response.data;
		} catch (err) {
			return rejectWithValue(JSON.stringify(err));
		}
	}
);

