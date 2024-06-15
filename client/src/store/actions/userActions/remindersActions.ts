import { createAsyncThunk } from '@reduxjs/toolkit';
import { selectUserLists } from 'store/selectors/userSelectors';
import { selectActiveList } from 'store/selectors/activeListSelectors';
import appAxios from 'api/axios';

import type { IReminder } from 'types/reminder';
import type { StateSchema } from 'store/config/StateSchema';


export const addReminder = createAsyncThunk<
	{ listId: string, reminder: IReminder },
	{ listId: string, reminder: Omit<IReminder, '_id'> },
	{ rejectValue: string }
>(
	'addReminder',
	async (data, { rejectWithValue }) => {
		try {
			const response = await appAxios.post<IReminder>(
				`/lists/${data.listId}/reminders`,
				data.reminder,
			);
			return {
				listId: data.listId,
				reminder: response.data,
			};
		} catch (err) {
			return (rejectWithValue(JSON.stringify(err)));
		}
	}
);

export const removeReminder = createAsyncThunk<
	{ listId: string; reminderId: string },
	string,
	{
		rejectValue: string;
		state: StateSchema;
	}
>(
	'removeReminder',
	async (reminderId, { rejectWithValue, getState }) => {
		const activeList = selectActiveList(getState());
		try {
			await appAxios.delete(
				`/lists/${activeList!._id}/reminders/${reminderId}`,
			);
			return {
				listId: activeList!._id,
				reminderId,
			};
		} catch (err) {
			return rejectWithValue(JSON.stringify(err));
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