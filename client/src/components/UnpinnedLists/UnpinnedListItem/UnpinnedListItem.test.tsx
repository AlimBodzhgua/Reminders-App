import { componentRender } from 'lib/tests/componentRender';
import { screen } from '@testing-library/react';
import { mutableListItem } from 'constants/testsData';
import userEvent from '@testing-library/user-event';
import { UnpinnedListItem } from './UnpinnedListItem';
 
describe('UnpinnedListItem', () => {
	it('Component should render', () => {
		componentRender(<UnpinnedListItem list={mutableListItem}/>);
		expect(screen.getByTestId('unpinned-list-item')).toBeInTheDocument();
	});

	it('Show show input field on double click', async () => {
		const user = userEvent.setup();
		componentRender(<UnpinnedListItem list={mutableListItem}/>);

		await user.dblClick(screen.getByTestId('unpinned-list-item'));
		expect(screen.getByTestId('list-item-input')).toBeInTheDocument();
	});

	it('Should show dropdown menu on hover', async () => {
		const user = userEvent.setup();
		componentRender(<UnpinnedListItem list={mutableListItem}/>);
		
		await user.hover(screen.getByTestId('unpinned-list-item'));
		expect(screen.getByTestId('dropdown-menu')).toBeInTheDocument();
	});
});