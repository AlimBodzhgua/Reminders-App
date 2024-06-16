import { FC, memo, useCallback, useEffect } from 'react';
import { Layout } from 'antd';
import { Header, Sider, Content } from 'components/Layout';
import { useAppDispatch } from 'hooks/redux';
import { ACTIVE_LIST_LOCALSTORAGE_KEY, USER_LOCALSTORAGE_KEY } from 'constants/localStorage';
import { initUserAuth } from 'store/actions/userActions';
import { activeListActions } from 'store/slices/activeListSlice';
import { IUser } from 'types/user';

const layoutStyle = {
	overflow: 'hidden',
	width: '100%',
	maxWidth: '100vw',
	height: '100vh',
};

const App: FC = memo(() => {
	const dispatch = useAppDispatch();

	const initApp = useCallback(async () => {
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
		const user = localStorage.getItem(USER_LOCALSTORAGE_KEY);
		if (user) {
			initApp();
		}
	}, [initApp]);

	return (
		<Layout style={layoutStyle}>
			<Sider />
			<Layout>
				<Header />
				<Content />
			</Layout>
		</Layout>
	);
});

export default App;