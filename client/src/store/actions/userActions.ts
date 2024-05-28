import { createAsyncThunk } from '@reduxjs/toolkit';
import { IUser } from 'types/user';
import { IList } from 'types/list';
import { IAuthUser } from 'types/auth';
import { StateSchema } from 'store/config/StateSchema';
import { selectUserAuthData } from 'store/selectors/userSelectors';
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
	string,
	{ rejectValue: string }
>(
	'initUserAuth',
	async (token, { rejectWithValue }) => {
		const headers = { 'Authorization': `Bearer ${token}`};
		try {
			//appAxios.defaults.headers.common['Authorization'] = `Bearer ${token}` 
			const response = await appAxios.get('users/auth/me', {headers: headers});
			return response.data;
		} catch (err) {
			return rejectWithValue(JSON.stringify(err));
		}
	}
);


export const addList = createAsyncThunk<
	IList,
	Pick<IList, 'name' | 'icon' | 'color'>,
	{
		rejectValue: string,
		state: StateSchema,
	}
>(
	'addList',
	async (list, { rejectWithValue, getState }) => {
		const authData = selectUserAuthData(getState());

		const body = {
			name: list.name,
			icon: list.icon,
			color: list.color,
		};
		const headers = { 'Authorization': `Bearer ${authData?.token}` };
		
		try {
			const response = await appAxios.post('/lists', body, {headers: headers});
			console.log(response);
			return response.data;
		} catch (err) {
			return rejectWithValue(JSON.stringify(err));
		}
	}
);
