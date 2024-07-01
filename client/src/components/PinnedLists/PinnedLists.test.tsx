import { componentRender } from 'lib/tests/componentRender';
import { screen } from '@testing-library/react';
import { PinnedLists } from './PinnedLists';


describe('PinnedLists', () => {
	it('Component should render', () => {
		componentRender(<PinnedLists />);
		expect(screen.getByTestId('pinned-list')).toBeInTheDocument();
	});

	it('Component should have initial lists', () => {
		componentRender(<PinnedLists />);

		const today = screen.getByText('Today');
		const scheduled = screen.getByText('Scheduled');
		const flagged = screen.getByText('Flagged');
		const completed = screen.getByText('Completed');
		const all = screen.getByText('All');

		expect(today).toBeInTheDocument();
		expect(scheduled).toBeInTheDocument();
		expect(flagged).toBeInTheDocument();
		expect(completed).toBeInTheDocument();
		expect(all).toBeInTheDocument();
	});
});