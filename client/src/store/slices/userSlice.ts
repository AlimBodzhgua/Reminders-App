import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import type { IUser } from 'types/user';

import {
	initUserAuth,
	loginUser,
	registerUser,
	addList,
	removeList,
	updateList,
	addReminder,
	removeReminder,
	clearReminders,
	updateAllLists,
	updateAllReminders,
	updateReminder,
	changeListSort,
} from '../actions/userActions';

export interface UserState {
	authData: IUser | null;

	isLoading: boolean;
	error?: string | undefined;
	_mounted: boolean;
}

const initialState: UserState = {
	authData: null,
	isLoading: false,
	error: undefined,
	_mounted: false,
};

const userSlice = createSlice({
	name: 'userSlice',
	initialState,
	reducers: {
		initAuthData: (state, action: PayloadAction<string>) => {
			state.authData = JSON.parse(action.payload);
		},
		logout: (state) => {
			state.authData = null;
		},
		resetListSort: (state, action: PayloadAction<string>) => {
			if (state.authData) {
				const index = state.authData.lists.findIndex(list => list._id === action.payload);
				state.authData.lists[index].sortField = 'manually';
				state.authData.lists[index].sortDirection = 'asc';
			}
		},
		setMounted: (state) => {
			state._mounted = true;
		}
	},
	extraReducers: (builder) => {
		builder
			.addCase(loginUser.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(loginUser.fulfilled, (state, action) => {
				state.isLoading = false;
				state.error = undefined;
				state.authData = action.payload;
			})
			.addCase(loginUser.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload;
			})
			// registerUser
			.addCase(registerUser.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(registerUser.fulfilled, (state, action) => {
				state.isLoading = false;
				state.error = undefined;
				state.authData = action.payload;
			})
			.addCase(registerUser.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload;
			})
			// registerUser
			.addCase(initUserAuth.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(initUserAuth.fulfilled, (state, action) => {
				state.isLoading = false;
				state.error = undefined;
				state.authData = action.payload;
			})
			.addCase(initUserAuth.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload;
			})
			// addList
			.addCase(addList.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(addList.fulfilled, (state, action) => {
				state.isLoading = false;
				state.error = undefined;
				if (state.authData) {
					state.authData.lists = [...state.authData.lists, action.payload];
				}
			})
			.addCase(addList.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload;
			})
			// changeListSort
			.addCase(changeListSort.fulfilled, (state, action) => {
				state.isLoading = false;
				state.error = undefined;
				if (state.authData) {
					const listIndex = state.authData.lists.findIndex(
						(list) => list._id === action.payload._id,
					);

					state.authData.lists[listIndex] = {
						...state.authData.lists[listIndex],
						sortField: action.payload.sortField,
						sortDirection: action.payload.sortDirection,
					};
				}
			})
			// removeList
			.addCase(removeList.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(removeList.fulfilled, (state, action) => {
				state.isLoading = false;
				state.error = undefined;
				
				const listIndex = state.authData?.lists.findIndex((list) => list._id === action.payload);

				if (listIndex) {
					state.authData!.lists.splice(listIndex, 1);
				}
			})
			.addCase(removeList.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload;
			})
			// updateList
			.addCase(updateList.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(updateList.fulfilled, (state, action) => {
				state.isLoading = false;
				state.error = undefined;

				const listIndex = state.authData?.lists.findIndex((list) => list._id === action.payload._id);

				if (listIndex) {
					state.authData!.lists[listIndex] = {
						...state.authData!.lists[listIndex],
						...action.payload,
					};
				}
			})
			.addCase(updateList.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload;
			})
			// addReminder
			.addCase(addReminder.rejected, (state, action) => {
				state.error = action.payload;
			})
			.addCase(addReminder.fulfilled, (state, { payload }) => {
				if (state.authData) {
					const index = state.authData.lists.findIndex((list) => list._id === payload.listId);
					const newReminders = state.authData.lists[index].reminders.concat(payload);
					state.authData.lists[index].reminders = newReminders;
				}
			})
			// removeReminder
			.addCase(removeReminder.rejected, (state, action) => {
				state.error = action.payload;
			})
			.addCase(removeReminder.fulfilled, (state, { payload }) => {
				if (state.authData) {
					const listIndex = state.authData.lists.findIndex((list) => list._id === payload.listId);
					const reminderIndex = state.authData.lists[listIndex].reminders.findIndex(
						(reminder) => reminder._id === payload.reminderId,
					);

					state.authData.lists[listIndex].reminders.splice(reminderIndex, 1);
				}
			})
			// updateReminder
			.addCase(updateReminder.rejected, (state, action) => {
				state.error = action.payload;
			})
			.addCase(updateReminder.fulfilled, (state, { payload }) => {
				if (state.authData) {
					const linstIndex = state.authData.lists.findIndex((list) => list._id === payload.listId);
					const reminderIndex = state.authData.lists[linstIndex].reminders.findIndex(
						(reminder) => reminder._id === payload._id,
					);
					state.authData.lists[linstIndex].reminders[reminderIndex] = payload;
				}
			})
			// clearReminders
			.addCase(clearReminders.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload;
			})
			.addCase(clearReminders.fulfilled, (state, { payload }) => {
				state.isLoading = false;
				if (state.authData) {
					const index = state.authData.lists.findIndex((list) => list._id === payload);
					state.authData.lists[index].reminders = [];
				}
			})
			// updateAll Lists/Reminders
			.addCase(updateAllLists.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload;
			})
			.addCase(updateAllLists.fulfilled, (state, action) => {
				state.isLoading = false;
				state.authData!.lists = action.payload;
			})
			.addCase(updateAllReminders.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload;
			})
			.addCase(updateAllReminders.fulfilled, (state, action) => {
				state.isLoading = false;
				if (state.authData) {
					const listIndex = state.authData.lists.findIndex(
						(list) => list._id === action.payload.listId
					);
					state.authData.lists[listIndex].reminders = action.payload.reminders;
				}
			});
	}
});

export const { reducer: userReducer } = userSlice;
export const { actions: userActions } = userSlice;