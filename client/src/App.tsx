import { FC, memo, useCallback, useEffect } from 'react';
import { Layout } from 'antd';
import { Header, Sider, Content } from 'components/Layout';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { ACTIVE_LIST_LOCALSTORAGE_KEY, USER_LOCALSTORAGE_KEY } from 'constants/localStorage';
import { initUserAuth } from 'store/actions/userActions';
import { activeListActions } from 'store/slices/activeListSlice';
import { selectActiveListFromUser, selectUserLists } from 'store/selectors/userSelectors';
import { selectActiveList } from 'store/selectors/activeListSelectors';

const layoutStyle = {
	overflow: 'hidden',
	width: '100%',
	maxWidth: '100vw',
	height: '100vh',
};

const App: FC = memo(() => {
	const dispatch = useAppDispatch();
	const lists = useAppSelector(selectUserLists);
	const activeList = useAppSelector(selectActiveList);
	const list = useAppSelector(selectActiveListFromUser);

	const initApp = useCallback(async () => {
		const { meta } = await dispatch(initUserAuth());

		if (meta.requestStatus === 'fulfilled') {
			const activeList = localStorage.getItem(ACTIVE_LIST_LOCALSTORAGE_KEY);
			if (activeList) {
				dispatch(activeListActions.setActiveList(JSON.parse(activeList)));
			}
		}
	}, [dispatch]);

	useEffect(() => {
		const user = localStorage.getItem(USER_LOCALSTORAGE_KEY);
		if (user) {
			initApp();
		}
	}, [initApp]);

	useEffect(() => {
		if (activeList) {
			const index = lists.findIndex(list => list._id === activeList._id);
			dispatch(activeListActions.setActiveList(lists[index]));
		}
	}, [list]);

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