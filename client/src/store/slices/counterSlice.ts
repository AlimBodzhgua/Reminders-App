import { createSlice } from '@reduxjs/toolkit';

export interface CounterStateSchema {
	count: number,
}

const initialState: CounterStateSchema = {
	count: 0,
};

const counterSlice = createSlice({
	name: 'counterSlice',
	initialState,
	reducers: {
		increment: (state) => {
			state.count += 1;
		},
		decrement: (state) => {
			state.count -= 1;
		}
	}
});

export const { reducer: counterReducer } = counterSlice;
export const { actions: counterActions } = counterSlice;