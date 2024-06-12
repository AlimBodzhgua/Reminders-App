import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IUser } from 'types/user';
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
} from '../actions/userActions';

import { arrayMove } from '@dnd-kit/sortable';

export interface UserStateSchema {
	authData: IUser | null;

	isLoading: boolean;
	error?: string | undefined;
}

const initialState: UserStateSchema = {
	authData: null,
	isLoading: false,
	error: undefined,
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
		moveLists: (state, { payload }: PayloadAction<{activeId: string, overId: string}>) => {
			if (state.authData) {
				const { authData } = state;
				
				const activeId = authData.lists.findIndex((list) => list._id === payload.activeId);
				const overId = authData.lists.findIndex((list) => list._id === payload.overId);

				state.authData.lists = arrayMove(authData.lists, activeId, overId);
			}
		},
		moveReminders: (state, { payload }: PayloadAction<{
			activeListId: string,
			activeId: string,
			overId: string,
		}>) => {
			if (state.authData) {
				const { authData } = state;
				const index = authData.lists.findIndex((list) => list._id === payload.activeListId);
				
				const activeId = authData.lists[index].reminders.findIndex((list) => list._id === payload.activeId);
				const overId = authData.lists[index].reminders.findIndex((list) => list._id === payload.overId);

				state.authData.lists[index].reminders = arrayMove(
					state.authData.lists[index].reminders,
					activeId,
					overId,
				);
			}
		},
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
			// removeList
			.addCase(removeList.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(removeList.fulfilled, (state, action) => {
				state.isLoading = false;
				state.error = undefined;
				if (state.authData) {
					state.authData.lists = state.authData.lists.filter((list) => (
						list._id !== action.payload
					));
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
				if (state.authData) {
					state.authData.lists = state.authData.lists.map((list) => {
						if (list._id === action.payload._id) {
							return {...list, ...action.payload};
						}
						return list;
					});
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
					const newReminders = state.authData.lists[index].reminders.concat(payload.reminder);
					state.authData.lists[index].reminders = newReminders;
				}
			})
			// removeReminder
			.addCase(removeReminder.rejected, (state, action) => {
				state.error = action.payload;
			})
			.addCase(removeReminder.fulfilled, (state, { payload }) => {
				if (state.authData) {
					const index = state.authData.lists.findIndex((list) => list._id === payload.listId);
					const filteredReminders = state.authData.lists[index].reminders.filter((reminder) => (
						reminder._id !== payload.reminderId
					));
					state.authData.lists[index].reminders = filteredReminders;
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
			});
	}
});

export const { reducer: userReducer } = userSlice;
export const { actions: userActions } = userSlice;