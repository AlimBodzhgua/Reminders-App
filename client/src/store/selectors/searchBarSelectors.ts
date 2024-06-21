import { StateSchema } from '../config/StateSchema';

export const selectSearchBarValue = (state: StateSchema) => state.searchBar.value;
export const selectSearchBarIsSearching = (state: StateSchema) => state.searchBar.isSearching;
export const selectSearchBarSearchResult = (state: StateSchema) => state.searchBar.searchResult;
