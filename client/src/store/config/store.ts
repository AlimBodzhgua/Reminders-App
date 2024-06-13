import { configureStore, ReducersMapObject } from '@reduxjs/toolkit';
import { StateSchema } from './StateSchema';
import { userReducer } from 'store/slices/userSlice';
import { activeListActions, activeListReducer } from 'store/slices/activeListSlice';
import { selectActiveList } from 'store/selectors/activeListSelectors';
import { selectUserAuthData } from 'store/selectors/userSelectors';
import { startAppListening, listenerMiddleware } from './listenerMiddleware';


startAppListening({
	predicate: (_, currentState) => {
		const activeList = currentState.activeList.list;
		const activeListFromUser = currentState.user.authData?.lists.find(
			(list) => list._id === activeList?._id
		);
		return JSON.stringify(activeList) !== JSON.stringify(activeListFromUser);
	},
	effect: (_, { getState, dispatch }) => {
		const activeList = selectActiveList(getState());
		const userAuth = selectUserAuthData(getState());
		const activeListFromUser = userAuth?.lists.find(
			(list) => list._id === activeList?._id
		);
		if (activeListFromUser) {
			dispatch(activeListActions.setActiveList(activeListFromUser));
		}
	}
})


export const createReduxStore = (initialState?: StateSchema) => {
	const rootReducer: ReducersMapObject<StateSchema> = {
		user: userReducer,
		activeList: activeListReducer,
	};

	const store = configureStore({
		reducer: rootReducer,
		preloadedState: initialState,
		middleware: (getDefaultMiddleware) => 
			getDefaultMiddleware().prepend(listenerMiddleware.middleware),
	});

	return store;
};

export type AppDispatch = ReturnType<typeof createReduxStore>['dispatch'];