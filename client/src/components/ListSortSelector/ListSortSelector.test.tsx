import { screen } from '@testing-library/react';
import { componentRender } from 'lib/tests/componentRender';
import { todayList } from 'constants/testsData';
import userEvent from '@testing-library/user-event';
import { ListSortSelector } from './ListSortSelector';

describe('ListSortSelector', () => {
	it('Components should render', () => {
		componentRender(<ListSortSelector />);
		expect(screen.getByText('Sorting')).toBeInTheDocument();
	});

	it('Should have placeholders text', async () => {
		const user = userEvent.setup();
		componentRender(<ListSortSelector />);
		await user.click(screen.getByText('Sorting'));
		expect(screen.getByText('Sort field')).toBeInTheDocument();
		expect(screen.getByText('Sort direction')).toBeInTheDocument();
	});

	it('Should have active list initial sort values', async () => {
		const user = userEvent.setup();
		componentRender(
			<ListSortSelector />,
			{ activeList: { list: todayList, listType: 'todays'} },
		);
		await user.click(screen.getByText('Sorting'));
		expect(screen.getByText('name')).toBeInTheDocument();
		expect(screen.getByText('ascending')).toBeInTheDocument();
	});
});