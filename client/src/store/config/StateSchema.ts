import { UserStateSchema } from 'store/slices/userSlice';
import { ActiveListStateSchema } from 'store/slices/activeListSlice';

export interface StateSchema {
	user: UserStateSchema;
	activeList: ActiveListStateSchema;
}