import { FC, memo} from 'react';
import { Layout } from 'antd';
import { Sider } from 'components/Layout/Sider';
import { Header } from 'components/Layout/Header';
import { Content } from 'components/Layout/Content';

const layoutStyle = {
	overflow: 'hidden',
	width: '100%',
	maxWidth: '100vw',
	height: '100vh',
};

const App: FC = memo(() => {
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