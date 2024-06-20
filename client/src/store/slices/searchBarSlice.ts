import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface SearchBarStateSchema {
	value: string;
	isSearching: boolean;
}

const initialState: SearchBarStateSchema = {
	value: '',
	isSearching: false,
};

export const searchBarSlice = createSlice({
	name: 'searchBarSlice',
	initialState,
	reducers: {
		setValue: (state, action: PayloadAction<string>) => {
			state.value = action.payload;
		},
		setIsSearching: (state, action: PayloadAction<boolean>) => {
			state.isSearching = action.payload;
		},
	},
});

export const { reducer: searchBarReducer } = searchBarSlice;
export const { actions: searchBarActions } = searchBarSlice;