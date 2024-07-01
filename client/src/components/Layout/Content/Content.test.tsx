import { componentRender } from 'lib/tests/componentRender';
import { screen } from '@testing-library/react'
import { vi } from 'vitest';
import { Content } from './Content';
import { emptyUser, todayList, userLoading } from 'constants/testsData';

describe('Content', () => {
	it('Component should render', () => {
		componentRender(
			<Content showForm={false} onToggleShowForm={vi.fn()}/>,
			{ user: emptyUser },
		);
		expect(screen.getByTestId('content')).toBeInTheDocument();
	});

	it('No auth message', () => {
		componentRender(
			<Content showForm={false} onToggleShowForm={vi.fn()}/>,
			{ user: emptyUser },
		);
		const authMessage = screen.getByText('Login or register to have access');
		expect(authMessage).toBeInTheDocument();
	});

	it('Loading content', () => {
		componentRender(
			<Content showForm={false} onToggleShowForm={vi.fn()}/>,
			{ user: userLoading },
		);
		const spinner = screen.getByTestId('spinner');
		expect(spinner).toBeInTheDocument();
	});

	it('Should have selected acitve list', () => {
		componentRender(
			<Content showForm={false} onToggleShowForm={vi.fn()}/>,
			{ user: { authData: {}, isLoading: false }, activeList: { list: todayList, listType: 'todays'} },
		);
		const title = screen.getByText('Today');
		const emptyReminders = screen.getByText('No reminders');
		expect(title).toBeInTheDocument();
		expect(emptyReminders).toBeInTheDocument();
	});

	it('Should show addReminderForm on click', async () => {
		componentRender(
			<Content showForm={true} onToggleShowForm={vi.fn()}/>,
			{ user: { authData: {}, isLoading: false }, activeList: { list: todayList, listType: 'todays'} },
		);
		expect(screen.getByPlaceholderText('Title')).toBeInTheDocument();
	});
})