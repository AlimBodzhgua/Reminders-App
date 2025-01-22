import { UserState } from 'store/slices/userSlice';
import { SearchBarState } from 'store/slices/searchBarSlice';
import { ActiveListState } from 'store/slices/activeListSlice';

export interface AppState {
	user: UserState;
	activeList: ActiveListState;
	searchBar: SearchBarState;
}