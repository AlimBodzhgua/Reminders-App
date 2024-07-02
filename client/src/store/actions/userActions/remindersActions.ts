import { createAsyncThunk } from '@reduxjs/toolkit';
import { selectUserAuthData } from 'store/selectors/userSelectors';
import { selectActiveList } from 'store/selectors/activeListSelectors';
import { AppDispatch } from 'store/config/store';
import { arrayMove } from '@dnd-kit/sortable';
import $axios from 'api/axios';

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
			const response = await $axios.post<IReminder>(
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
			await $axios.delete(
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
			$axios.delete(`/lists/${activeList!._id}/reminders`);
			return activeList!._id;
		} catch (err) {
			return (rejectWithValue(JSON.stringify(err)));
		}
	}
);

export const updateAllReminders = createAsyncThunk<
	{ listId: string, reminders: IReminder[] },
	{ listId: string, reminders: IReminder[] },
	{ rejectValue: string }
>(
	'updateAllReminders',
	async ({ listId, reminders }, { rejectWithValue }) => {
		try {
			$axios.post(`/lists/${listId}/reminders/all`, { reminders });
			return { listId, reminders };
		} catch (err) {
			return rejectWithValue(JSON.stringify(err));
		}
	}
);

export const moveReminders = createAsyncThunk<
	{ listId: string, movedReminders: IReminder[] },
	{ listId: string, activeId: string, overId: string },
	{ dispatch: AppDispatch, state: StateSchema }
>(
	'moveReminders',
	({ listId, activeId, overId }, { getState, dispatch }) => {
		const authData = selectUserAuthData(getState());

		const index = authData!.lists.findIndex((list) => list._id === listId);

		const activeIndex = authData!.lists[index].reminders.findIndex(
			(list) => list._id === activeId,
		);

		const overIndex = authData!.lists[index].reminders.findIndex(
			(list) => list._id === overId,
		);

		const movedReminders = arrayMove(
			authData!.lists[index].reminders,
			activeIndex,
			overIndex,
		);

		dispatch(updateAllReminders({ listId, reminders: movedReminders }));

		return { listId, movedReminders };
	}
);

export const updateReminder = createAsyncThunk<
	{ reminder: IReminder, listId: string },
	Pick<IReminder, '_id'> & Partial<Omit<IReminder, '_id'>>,
	{ rejectValue: string, state: StateSchema }
>(
	'updateReminder',
	async (data, { rejectWithValue, getState }) => {
		const activeList = selectActiveList(getState());
		try {
			const response = await $axios.patch<IReminder>(
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