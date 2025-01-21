import { FC, memo, useCallback, useEffect } from 'react';
import { AppLayout } from 'components/Layout';
import { useAppDispatch } from 'hooks/redux';
import { ACTIVE_LIST_LOCALSTORAGE_KEY, USER_LOCALSTORAGE_KEY } from 'constants/localStorage';
import { initUserAuth } from 'store/actions/userActions';
import { activeListActions } from 'store/slices/activeListSlice';
import { IUser } from 'types/user';
import { userActions } from 'store/slices/userSlice';

const App: FC = memo(() => {
	const dispatch = useAppDispatch();

	const initAuth = useCallback(async () => {
		const { meta, payload } = await dispatch(initUserAuth());

		if (meta.requestStatus === 'fulfilled') {
			const activeList = localStorage.getItem(ACTIVE_LIST_LOCALSTORAGE_KEY);
			if (activeList) {
				dispatch(activeListActions.setActiveList(JSON.parse(activeList)));
			} else {
				dispatch(activeListActions.setActiveList((payload as IUser).lists[0]));
			}
		}
	}, [dispatch]);

	useEffect(() => {
		const initApp = async () => {
			const user = localStorage.getItem(USER_LOCALSTORAGE_KEY);

			if (user) await initAuth();

			dispatch(userActions.setMounted());
		};

		initApp();
	}, [initAuth]);

	return <AppLayout />;
});

export default App;