import { createSelector } from '@reduxjs/toolkit';
import { StateSchema } from '../config/StateSchema';
import { selectActiveList } from './activeListSelectors';

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