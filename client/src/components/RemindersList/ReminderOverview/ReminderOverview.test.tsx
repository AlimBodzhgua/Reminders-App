import { screen } from '@testing-library/react';
import { componentRender } from 'lib/tests/componentRender';
import { reminder } from 'constants/testsData';
import { ReminderOverview } from './ReminderOverview';

describe('RemindersOverview', () => {
	it('Components should render', () => {
		componentRender(<ReminderOverview reminder={reminder}/>);
		expect(screen.getByTestId('reminder-overview')).toBeInTheDocument();
	});

	it('Should have passed reminder data', () => {
		componentRender(<ReminderOverview reminder={reminder}/>);
		expect(screen.getByText('Test')).toBeInTheDocument();		
		expect(screen.getByText('test notes')).toBeInTheDocument();		
	});

	it('Should have url input info', () => {
		componentRender(<ReminderOverview reminder={reminder}/>);
		expect(screen.getByText('URL')).toBeInTheDocument();		
		expect(screen.getByPlaceholderText('None')).toBeInTheDocument();		
	});

	it('Should have priority info', async () => {
		componentRender(<ReminderOverview reminder={reminder}/>);
		expect(screen.getByText('priority')).toBeInTheDocument();		
		expect(screen.getByTestId('priority-select')).toBeInTheDocument();
	});
});