import { createAsyncThunk } from '@reduxjs/toolkit';
import { selectUserLists } from 'store/selectors/userSelectors';
import type { IList } from 'types/list';
import type { StateSchema } from 'store/config/StateSchema';
import appAxios from 'api/axios';


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

type SortListDataType = Pick<IList, '_id' | 'sortField' | 'sortDirection'>;

export const changeListSort = createAsyncThunk<
	SortListDataType,
	SortListDataType,
	{ rejectValue: string }
>(
	'changeListSort',
	async (data, { rejectWithValue }) => {
		try {
			const response = await appAxios.patch<SortListDataType>(`/lists/${data._id}`, data);
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
		const body = { lists: lists };
		try {
			appAxios.post('/lists/all', body);
		} catch (err) {
			return rejectWithValue(JSON.stringify(err));
		}
	}
);
