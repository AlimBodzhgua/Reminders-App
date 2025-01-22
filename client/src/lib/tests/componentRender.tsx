import { ReactNode } from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { AppState } from 'store/config/AppState';
import { createReduxStore } from '../../store/config/store';

export function componentRender(
	component: ReactNode,
	initialState: DeepPartial<AppState> = {},
) {
	const store = createReduxStore(initialState as AppState);

	return render(
		<Provider store={store}>
			{component}
		</Provider>
	);
}