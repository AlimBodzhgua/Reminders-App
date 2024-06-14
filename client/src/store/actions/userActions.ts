import { createAsyncThunk } from '@reduxjs/toolkit';
import { selectActiveList } from 'store/selectors/activeListSelectors';
import { selectUserLists } from 'store/selectors/userSelectors';
import appAxios from 'api/axios';

import type { IUser } from 'types/user';
import type { IList } from 'types/list';
import type { IAuthUser } from 'types/auth';
import type { IReminder } from 'types/reminder';
import type { StateSchema } from 'store/config/StateSchema';

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
			const response = await appAxios.post<IList>('/lists', body);
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
			const response = await appAxios.patch<UpdateListData>(`/lists/${data._id}`, data);
			return response.data;
		} catch (err) {
			return rejectWithValue(JSON.stringify(err));
		}
	}
);

export const updateAllLists = createAsyncThunk<
	void,
	void,
	{
		rejectValue: string,
		state: StateSchema,
	}
>(
	'updateAllList',
	async (_, { rejectWithValue, getState }) => {
		const lists = selectUserLists(getState());
		const body = { lists: lists }
		try {
			appAxios.post('/lists/all', body);
		} catch (err) {
			return rejectWithValue(JSON.stringify(err));
		}
	}
);


export const addReminder = createAsyncThunk<
	{ listId: string, reminder: IReminder },
	Omit<IReminder, '_id'>,
	{
		rejectValue: string,
		state: StateSchema,
	}
>(
	'addReminder',
	async (data, { rejectWithValue, getState }) => {
		const activeList = selectActiveList(getState());
		try {
			const response = await appAxios.post<IReminder>(
				`/lists/${activeList!._id}/reminders`,
				data
			);
			return {
				listId: activeList!._id,
				reminder: response.data,
			};
		} catch (err) {
			return (rejectWithValue(JSON.stringify(err)));
		}
	}
);

export const removeReminder = createAsyncThunk<
	{ listId: string, reminderId: string },
	string,
	{
		rejectValue: string,
		state: StateSchema,
	}
	>(
		'removeReminder',
		async (reminderId, { rejectWithValue, getState }) => {
			const activeList = selectActiveList(getState());
			try {
				await appAxios.delete(`/lists/${activeList!._id}/reminders/${reminderId}`);
				return {
					listId: activeList!._id,
					reminderId,
				};
			} catch (err) {
				return (rejectWithValue(JSON.stringify(err)));
			}
		}
	);

export const clearReminders = createAsyncThunk<
	string,
	void,
	{
		rejectValue: string,
		state: StateSchema,
	}
>(
	'clearReminders',
	async (_, { rejectWithValue, getState }) => {
		const activeList = selectActiveList(getState());
		try {
			appAxios.delete(`/lists/${activeList!._id}/reminders`);
			return activeList!._id;
		} catch (err) {
			return (rejectWithValue(JSON.stringify(err)));
		}
	}
);

export const updateAllReminders = createAsyncThunk<
	void,
	void,
	{
		rejectValue: string,
		state: StateSchema,
	}
>(
	'updateAllReminders',
	async (_, { rejectWithValue, getState }) => {
		const lists = selectUserLists(getState());
		const activeList = selectActiveList(getState());
		const activeListIndex = lists.findIndex(list => list._id === activeList?._id);
		const body = { reminders: lists[activeListIndex].reminders };
		try {
			appAxios.post(`/lists/${activeList!._id}/reminders/all`, body);
		} catch (err) {
			return rejectWithValue(JSON.stringify(err));
		}
	}
);


type UpdateReminderData = Pick<IReminder, '_id'> & Partial<Omit<IReminder, '_id'>>;

export const updateReminder = createAsyncThunk<
	{ reminder: IReminder, listId: string },
	UpdateReminderData,
	{ rejectValue: string, state: StateSchema }
>(
	'updateReminder',
	async (data, { rejectWithValue, getState }) => {
		const activeList = selectActiveList(getState());
		try {
			const response = await appAxios.patch<IReminder>(
				`/lists/${activeList?._id}/reminders/${data._id}`,
				data
			);
			return {
				reminder: response.data,
				listId: activeList!._id,
			};
		} catch (err) {
			return rejectWithValue(JSON.stringify(err));
		}
	}
);