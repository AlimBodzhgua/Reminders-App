import { configureStore, ReducersMapObject } from '@reduxjs/toolkit';
import { StateSchema } from './StateSchema';
import { counterReducer } from 'store/slices/counterSlice';


export const createReduxStore = (initialState?: StateSchema) => {
	const rootReducer: ReducersMapObject<StateSchema> = {
		counter: counterReducer,
	};

	const store = configureStore({
		reducer: rootReducer,
		preloadedState: initialState,
	});

	return store;
};

export type AppDispatch = ReturnType<typeof createReduxStore>['dispatch'];