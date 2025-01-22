import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IList } from 'types/list';
import { RemindersListType } from 'types/reminder';
import { getRemindersListType } from 'utils/utils';

export interface ActiveListState {
	list?: IList | undefined;
	listType?: RemindersListType | undefined;
}

const initialState: ActiveListState = {
	list: undefined,
	listType: undefined,
};

export const activeListSlice = createSlice({
	name: 'activeListSlice',
	initialState,
	reducers: {
		setActiveList: (state, action: PayloadAction<IList | undefined>) => {
			if (action.payload) {
				state.listType = getRemindersListType(action.payload);
			}
			state.list = action.payload;
		}
	}

});

export const { reducer: activeListReducer } = activeListSlice;
export const { actions: activeListActions } = activeListSlice;
