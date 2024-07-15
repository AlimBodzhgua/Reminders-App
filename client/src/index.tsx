import ReactDOM from 'react-dom/client';
import { createReduxStore } from 'store/config/store';
import { Provider } from 'react-redux';
import { YMaps } from '@pbe/react-yandex-maps';
import ErrorBoundary from 'components/ErrorBoundary/ErrorBoundary';
import GlobalStyle from 'styled/GlobalStyle';
import dayjs from 'dayjs';
import isToday from 'dayjs/plugin/isToday';
import 'styles/index.css';
import App from './App';

dayjs.extend(isToday);

const root = ReactDOM.createRoot(document.getElementById('root')!);
const store = createReduxStore();

root.render(
	<ErrorBoundary>
		<Provider store={store}>
			<YMaps query={{
				apikey: import.meta.env.VITE_YMAPS_API_KEY,
				load: 'package.full'
			}}>
				<App />
				<GlobalStyle />
			</YMaps>
		</Provider>
	</ErrorBoundary>
);