import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import type { IReminder } from 'types/reminder';

export interface SearchBarState {
	value: string;
	isSearching: boolean;
	searchResult: IReminder[];
}

const initialState: SearchBarState = {
	value: '',
	isSearching: false,
	searchResult: [],
};

export const searchBarSlice = createSlice({
	name: 'searchBarSlice',
	initialState,
	reducers: {
		setValue: (state, action: PayloadAction<string>) => {
			state.value = action.payload;
			if (action.payload.length) {
				state.isSearching = true;
			}
		},
		setIsSearching: (state, action: PayloadAction<boolean>) => {
			state.isSearching = action.payload;
		},
		setSearchResult: (state, action: PayloadAction<IReminder[]>) => {
			state.searchResult = action.payload;
		},
		clearSearchResult: (state) => {
			state.searchResult = [];
		},
	},
});

export const { reducer: searchBarReducer } = searchBarSlice;
export const { actions: searchBarActions } = searchBarSlice;