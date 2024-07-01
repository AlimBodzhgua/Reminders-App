import { ReactNode } from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { StateSchema } from 'store/config/StateSchema';
import { createReduxStore } from '../../store/config/store';

export function componentRender(
	component: ReactNode,
	initialState: DeepPartial<StateSchema> = {},
) {
	const store = createReduxStore(initialState as StateSchema);

	return render(
		<Provider store={store}>
			{component}
		</Provider>
	);
}