import { FC, memo, useCallback, useEffect } from 'react';
import { Layout } from 'antd';
import { Sider } from 'components/Layout/Sider';
import { Header } from 'components/Layout/Header';
import { Content } from 'components/Layout/Content';
import { useAppDispatch } from 'hooks/redux';
import { USER_LOCALSTORAGE_KEY } from 'constants/localStorage';
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
			const user = payload as IUser;
			dispatch(activeListActions.setActiveList(user.lists[0]));
		}
	}, [dispatch])

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