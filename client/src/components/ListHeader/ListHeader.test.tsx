import { componentRender } from 'lib/tests/componentRender';
import { screen } from '@testing-library/react'
import { ListHeader } from './ListHeader';

describe('List header', () => {
	it('Component should render with all prop values', () => {
		componentRender(
			<ListHeader
				title='Test title'
				amount={3}
				completedNumber={2}
			/>
		);
		expect(screen.getByText('Test title')).toBeInTheDocument();
		expect(screen.getByText('2 Completed')).toBeInTheDocument();
		expect(screen.getByText('3')).toBeInTheDocument();
	});
})