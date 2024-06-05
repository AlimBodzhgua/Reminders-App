import { createSelector } from '@reduxjs/toolkit';
import { StateSchema } from '../config/StateSchema';

export const selectUserAuthData = (state: StateSchema) => state.user.authData;
export const selectUserIsLoading = (state: StateSchema) => state.user.isLoading;
export const selectUserError = (state: StateSchema) => state.user.error;
export const selectUserLists = (state: StateSchema) => state.user.authData?.lists || [];

export const selectPinnedLists = createSelector(
	selectUserAuthData,
	(authData) => authData?.lists.filter(list => list.pinned === true) || []
);

export const selectNotPinnedLists = createSelector(
	selectUserAuthData,
	(authData) => authData?.lists.filter(list => list.pinned === false) || []
);