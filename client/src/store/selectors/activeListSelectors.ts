import { StateSchema } from '../config/StateSchema';
import { createSelector } from '@reduxjs/toolkit';

export const selectActiveList = (state: StateSchema) => state.activeList.list;
export const selectActiveListType = (state: StateSchema) => state.activeList.listType;

export const selectNumberCompletedReminders = createSelector(
	selectActiveList,
	(activeList) => {
		let amount = 0;
		activeList?.reminders?.forEach(list => list.isCompleted && amount++);
		return amount;
	}
);
