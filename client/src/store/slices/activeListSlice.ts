import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IList } from 'types/list';

export interface ActiveListStateSchema {
	list?: IList | undefined;
}

const initialState: ActiveListStateSchema = {
	list: undefined,
};

export const activeListSlice = createSlice({
	name: 'activeListSlice',
	initialState,
	reducers: {
		setActiveList: (state, action: PayloadAction<IList>) => {
			state.list = action.payload;
		}
	}

});

export const { reducer: activeListReducer } = activeListSlice;
export const { actions: activeListActions } = activeListSlice;
