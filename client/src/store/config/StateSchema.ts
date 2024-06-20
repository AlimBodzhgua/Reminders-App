import { UserStateSchema } from 'store/slices/userSlice';
import { SearchBarStateSchema } from 'store/slices/searchBarSlice';
import { ActiveListStateSchema } from 'store/slices/activeListSlice';

export interface StateSchema {
	user: UserStateSchema;
	activeList: ActiveListStateSchema;
	searchBar: SearchBarStateSchema;
}