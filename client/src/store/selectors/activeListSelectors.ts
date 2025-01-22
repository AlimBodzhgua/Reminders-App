import { AppState } from '../config/AppState';
import { createSelector } from '@reduxjs/toolkit';

export const selectActiveList = (state: AppState) => state.activeList.list;
export const selectActiveListType = (state: AppState) => state.activeList.listType;

// export const selectNumberCompletedReminders = createSelector(
// 	selectActiveList,
// 	(activeList) => activeList?.reminders?.map((list) => list.isCompleted).length
// );
