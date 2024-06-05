import { configureStore, ReducersMapObject } from '@reduxjs/toolkit';
import { StateSchema } from './StateSchema';
import { userReducer } from 'store/slices/userSlice';
import { activeListReducer } from 'store/slices/activeListSlice';

export const createReduxStore = (initialState?: StateSchema) => {
	const rootReducer: ReducersMapObject<StateSchema> = {
		user: userReducer,
		activeList: activeListReducer,
	};

	const store = configureStore({
		reducer: rootReducer,
		preloadedState: initialState,
	});

	return store;
};

export type AppDispatch = ReturnType<typeof createReduxStore>['dispatch'];