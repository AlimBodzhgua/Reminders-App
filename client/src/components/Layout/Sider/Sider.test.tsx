import { componentRender } from 'lib/tests/componentRender';
import { screen } from '@testing-library/react';
import { emptyUser, filledAuthData } from 'constants/testsData';
import { Sider } from './Sider';

describe('Sider', () => {
	it('Component should render', () => {
		componentRender(<Sider />);
		expect(screen.getByTestId('sider')).toBeInTheDocument();
	});

	it('Should show empty message on no auth user', () => {
		componentRender(<Sider />, { user: emptyUser });
		const emptyMessage = screen.getByText('No data');
		expect(emptyMessage).toBeInTheDocument();
	});

	it('Should have unpinned lists title', () => {
		componentRender(<Sider />, { user: filledAuthData });
		expect(screen.getByText('My lists')).toBeInTheDocument();
	});
});