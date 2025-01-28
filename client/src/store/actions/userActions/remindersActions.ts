import { createAsyncThunk } from '@reduxjs/toolkit';
import { selectUserAuthData } from 'store/selectors/userSelectors';
import { selectActiveList } from 'store/selectors/activeListSelectors';
import { AppDispatch } from 'store/config/store';
import { arrayMove } from '@dnd-kit/sortable';
import $axios from 'api/axios';

import type { IReminder } from 'types/reminder';
import type { AppState } from 'store/config/AppState';


export const addReminder = createAsyncThunk<
	IReminder,
	Omit<IReminder, '_id'>,
	{ rejectValue: string }
>(
	'addReminder',
	async (reminder, { rejectWithValue }) => {
		try {
			const response = await $axios.post<IReminder>(`/lists/${reminder.listId}/reminders`, reminder);

			return response.data;
		} catch (err) {
			return (rejectWithValue(JSON.stringify(err)));
		}
	}
);

export const removeReminder = createAsyncThunk<
	{ listId: string; reminderId: string },
	IReminder,
	{ rejectValue: string }
>(
	'removeReminder',
	async (reminder, { rejectWithValue }) => {
		try {
			await $axios.delete(
				`/lists/${reminder.listId}/reminders/${reminder._id}`,
			);
			return {
				listId: reminder.listId,
				reminderId: reminder._id,
			};
		} catch (err) {
			return rejectWithValue(JSON.stringify(err));
		}
	}
);

export const clearReminders = createAsyncThunk<
	string,
	void,
	{ rejectValue: string, state: AppState }
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
	{ dispatch: AppDispatch, state: AppState }
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

type ReminderUpdateType = Partial<Omit<IReminder, '_id' | 'listId'>> & { _id: string, listId: string };

export const updateReminder = createAsyncThunk<
	IReminder,
	ReminderUpdateType,
	{ rejectValue: string }
>(
	'updateReminder',
	async (data, { rejectWithValue }) => {
		try {
			const response = await $axios.patch<IReminder>(
				`/lists/${data.listId}/reminders/${data._id}`,
				data
			);
			return response.data;
		} catch (err) {
			return rejectWithValue(JSON.stringify(err));
		}
	}
);