import { createSelector } from '@reduxjs/toolkit';
import dayjs from 'dayjs';

import type { StateSchema } from 'store/config/StateSchema';
import type { IReminder } from 'types/reminder';

import { selectActiveList } from './activeListSelectors';
import { getRemindersListType } from 'utils/utils';

export const selectUserAuthData = (state: StateSchema) => state.user.authData;
export const selectUserIsLoading = (state: StateSchema) => state.user.isLoading;
export const selectUserError = (state: StateSchema) => state.user.error;

export const selectUserLists = createSelector(
	selectUserAuthData,
	(authData) => authData?.lists || []
);

export const selectActiveListFromUser = createSelector(
	[selectUserLists, selectActiveList],
	(lists, activeList) => lists.find(list => list._id === activeList?._id)
);

export const selectPinnedLists = createSelector(
	selectUserAuthData,
	(authData) => authData?.lists.filter(list => list.pinned === true) || []
);

export const selectUnpinnedLists = createSelector(
	selectUserAuthData,
	(authData) => authData?.lists.filter(list => list.pinned === false) || []
);

export const selectFlaggedReminders = createSelector(
	selectUserLists,
	(lists) => {
		const flagged: IReminder[] = [];
		lists.forEach((list) => {
			list.reminders.forEach((reminder) => {
				if (reminder.isFlagged) flagged.push(reminder); 
			})
		})
		return flagged;
	}
);

export const selectTodaysReminders = createSelector(
	selectUserLists,
	(lists) => {
		const today: IReminder[] = [];
		lists.forEach((list) => {
			list.reminders.forEach((reminder) => {
				if (reminder.details?.date && dayjs(reminder.details?.date).isToday()) {
					today.push(reminder);
				}
			})
		})
		return today;
	}
);

export const selectCompletedReminders = createSelector(
	selectUserLists,
	(lists) => {
		const completed: IReminder[] = [];
		lists.forEach((list) => {
			list.reminders.forEach((reminder) => {
				if (reminder.isCompleted) {
					completed.push(reminder);
				}
			})
		});
		return completed;
	}
);

export const selectAllReminders = createSelector(
	selectUserLists,
	(lists) => {
		const all: IReminder[] = [];
		lists.forEach((list) => {
			if (getRemindersListType(list) === 'others') {
				all.push(...list.reminders);
			}
		});
		return all;
	}
);