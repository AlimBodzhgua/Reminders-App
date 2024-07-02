import { createAsyncThunk } from '@reduxjs/toolkit';
import { selectUserAuthData } from 'store/selectors/userSelectors';
import { AppDispatch } from 'store/config/store';
import { arrayMove } from '@dnd-kit/sortable';
import { selectActiveList } from 'store/selectors/activeListSelectors';
import { sortReminders } from 'utils/utils';
import appAxios from 'api/axios';
import type { IList } from 'types/list';
import type { StateSchema } from 'store/config/StateSchema';
import { updateAllReminders } from './remindersActions';

export const addList = createAsyncThunk<
	IList,
	Pick<IList, 'name' | 'icon' | 'color'>,
	{ rejectValue: string }
>(
	'addList',
	async (list, { rejectWithValue }) => {
		const body = { name: list.name, icon: list.icon, color: list.color };
		
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

type UpdateListDataType = Pick<IList, '_id'> & Partial<Omit<IList, '_id'>>;

export const updateList = createAsyncThunk<
	UpdateListDataType,
	UpdateListDataType,
	{ rejectValue: string }
>(
	'updateList',
	async (data, { rejectWithValue }) => {
		try {
			const response = await appAxios.patch<UpdateListDataType>(`/lists/${data._id}`, data);
			return response.data;
		} catch (err) {
			return rejectWithValue(JSON.stringify(err));
		}
	}
);

type SortListDataType = Pick<IList, '_id' | 'sortField' | 'sortDirection'>;

export const changeListSort = createAsyncThunk<
	SortListDataType,
	SortListDataType,
	{
		rejectValue: string,
		dispatch: AppDispatch,
		state: StateSchema,
	}
>(
	'changeListSort',
	async (data, { rejectWithValue, dispatch, getState }) => {
		const activeList = selectActiveList(getState());
		const sortedReminders = sortReminders(
			activeList!.reminders,
			data.sortField,
			data.sortDirection,
		);

		await dispatch(updateAllReminders({ listId: activeList!._id, reminders: sortedReminders }));

		try {
			const response = await appAxios.patch<SortListDataType>(`/lists/${data._id}`, data);
			return response.data;
		} catch (err) {
			return rejectWithValue(JSON.stringify(err));
		}
	}
);

export const updateAllLists = createAsyncThunk<
	IList[],
	IList[],
	{ rejectValue: string }
>(
	'updateAllLists',
	async (lists, { rejectWithValue }) => {
		try {
			appAxios.post('/lists/all', { lists: lists });
			return lists;
		} catch (err) {
			return rejectWithValue(JSON.stringify(err));
		}
	}
);


export const moveLists = createAsyncThunk<
	IList[],
	{ activeId: string, overId: string },
	{ state: StateSchema, dispatch: AppDispatch }
>(
	'moveLists',
	({ activeId, overId }, { getState, dispatch }) => {
		const authData = selectUserAuthData(getState());

		const activeIndex = authData!.lists.findIndex((list) => list._id === activeId);
		const overIndex = authData!.lists.findIndex((list) => list._id === overId);

		const movedLists = arrayMove(authData!.lists, activeIndex, overIndex);

		dispatch(updateAllLists(movedLists));

		return movedLists;
	}
);
