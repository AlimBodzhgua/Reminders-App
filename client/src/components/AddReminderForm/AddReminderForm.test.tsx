import { screen } from '@testing-library/react'
import { componentRender } from 'lib/tests/componentRender';
import { mutableListItem, todayList } from 'constants/testsData';
import { AddReminderForm } from './AddReminderForm';

describe('AddReminderForm', () => {
	it('Components should render', () => {
		componentRender(
			<AddReminderForm />,
			{ activeList: { listType: 'others', list: mutableListItem} }
		);
		expect(screen.getByTestId('add-reminder-form')).toBeInTheDocument();
	});

	it('Component should have title ant notes input', () => {
		componentRender(
			<AddReminderForm />,
			{ activeList: { listType: 'others', list: mutableListItem}}
		);
		expect(screen.getByPlaceholderText('Title')).toBeInTheDocument();
		expect(screen.getByPlaceholderText('Notes')).toBeInTheDocument();
	});

	it('Should be flagged and disabled on flag active list', () => {
		componentRender(
			<AddReminderForm />,
			{ activeList: { listType: 'flagged', list: {...todayList, name: 'Flagged'} } }
		);
		expect(screen.getByTestId('flag-btn')).toBeDisabled();
	});

	it('Should show time picker on today active list', () => {
		componentRender(
			<AddReminderForm />,
			{ activeList: { listType: 'todays', list: todayList } }
		);
		expect(screen.getByPlaceholderText('Add Time')).toBeInTheDocument();
	});
})