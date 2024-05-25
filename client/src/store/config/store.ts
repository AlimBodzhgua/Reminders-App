import { configureStore, ReducersMapObject } from '@reduxjs/toolkit';
import { StateSchema } from './StateSchema';
import { userReducer } from 'store/slices/userSlice';


export const createReduxStore = (initialState?: StateSchema) => {
	const rootReducer: ReducersMapObject<StateSchema> = {
		user: userReducer,
	};

	const store = configureStore({
		reducer: rootReducer,
		preloadedState: initialState,
	});

	return store;
};

export type AppDispatch = ReturnType<typeof createReduxStore>['dispatch'];