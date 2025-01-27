import { AppState } from '../config/AppState';

export const selectActiveList = (state: AppState) => state.activeList.list;
export const selectActiveListType = (state: AppState) => state.activeList.listType;
