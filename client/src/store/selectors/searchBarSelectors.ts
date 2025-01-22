import { AppState } from '../config/AppState';

export const selectSearchBarValue = (state: AppState) => state.searchBar.value;
export const selectSearchBarIsSearching = (state: AppState) => state.searchBar.isSearching;
export const selectSearchBarSearchResult = (state: AppState) => state.searchBar.searchResult;
