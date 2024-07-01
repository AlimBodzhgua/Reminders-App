import { componentRender } from 'lib/tests/componentRender';
import { screen } from '@testing-library/react';
import { withUser, emptyUser } from 'constants/testsData';
import { SearchBar } from './SearchBar';

describe('SearchBar', () => {
	it('Component should render', () => {
		componentRender(<SearchBar />);
		expect(screen.getByPlaceholderText('Search')).toBeInTheDocument();
	});

	it('Should be disabled on unauthorized user', () => {
		componentRender(<SearchBar />, { user: emptyUser });
		expect(screen.getByPlaceholderText('Search')).toBeDisabled();

	});

	it('Should not be disabled on authorized user', () => {
		componentRender(<SearchBar />, { user: withUser });
		expect(screen.getByPlaceholderText('Search')).not.toBeDisabled();
	});
});