import ReactDOM from 'react-dom/client';
import { createReduxStore } from 'store/config/store';
import { Provider } from 'react-redux';
import ErrorBoundary from 'components/ErrorBoundary/ErrorBoundary';
import App from './App';
import GlobalStyle from 'styled/GlobalStyle';
import 'styles/index.css';

const root = ReactDOM.createRoot(document.getElementById('root')!);
const store = createReduxStore();

root.render(
	<ErrorBoundary>
		<Provider store={store}>
			<App />
			<GlobalStyle />
		</Provider>
	</ErrorBoundary>
);