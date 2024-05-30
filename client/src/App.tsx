import { FC, memo, useEffect } from 'react';
import { Layout } from 'antd';
import { Sider } from 'components/Layout/Sider';
import { Header } from 'components/Layout/Header';
import { Content } from 'components/Layout/Content';
import { useAppDispatch } from 'hooks/redux';
import { USER_LOCALSTORAGE_KEY } from 'constants/localStorage';
import { initUserAuth } from 'store/actions/userActions';

const layoutStyle = {
	overflow: 'hidden',
	width: '100%',
	maxWidth: '100vw',
	height: '100vh',
};

const App: FC = memo(() => {
	const dispatch = useAppDispatch();

	useEffect(() => {
		const user = localStorage.getItem(USER_LOCALSTORAGE_KEY);
		if (user) {
			dispatch(initUserAuth());
		}
	}, [dispatch]);

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