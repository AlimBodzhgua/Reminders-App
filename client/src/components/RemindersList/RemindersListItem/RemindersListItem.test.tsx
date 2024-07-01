import { screen } from '@testing-library/react';
import { componentRender } from 'lib/tests/componentRender';
import { reminder } from 'constants/testsData';
import userEvent from '@testing-library/user-event';
import { RemindersListItem } from './RemindersListItem';


describe('RemindersListItem', () => {
	it('Components should render', () => {
		componentRender(<RemindersListItem reminder={reminder}/>);
		expect(screen.getByTestId('reminder-item')).toBeInTheDocument();
	});

	it('Should have delete btn on hover', async () => {
		const user = userEvent.setup();
		componentRender(<RemindersListItem reminder={reminder}/>);
		await user.hover(screen.getByTestId('reminder-item'));
		expect(screen.getByTestId('delete-btn')).toBeInTheDocument();
	});

	it('Should have overview popover on hover', async () => {
		const user = userEvent.setup();
		componentRender(<RemindersListItem reminder={reminder}/>);
		await user.hover(screen.getByTestId('reminder-item'));
		expect(screen.getByTestId('overview-popover')).toBeInTheDocument();
	});

	it('Should have selected priority', async () => {
		componentRender(<RemindersListItem reminder={{...reminder, priority: 'high'}}/>);
		expect(screen.getByText('!!!')).toBeInTheDocument();
	});
});