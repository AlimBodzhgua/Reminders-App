import { componentRender } from 'lib/tests/componentRender';
import { vi } from 'vitest';
import { screen } from '@testing-library/react'
import { withUser, emptyUser } from 'constants/testsData';
import { Header } from './Header';

describe('Header', () => {
	it('Component should render', () => {
		componentRender(<Header onToggleShowForm={vi.fn()}/>);
		expect(screen.getByTestId('header')).toBeInTheDocument();
	});

	it('Should show auth buttons with unauthorized user', () => {
		componentRender(<Header onToggleShowForm={vi.fn()}/>, { user: emptyUser });
		const loginBtn = screen.getByText('Login');
		const registerBtn = screen.getByText('Register');
		expect(loginBtn).toBeInTheDocument();
		expect(registerBtn).toBeInTheDocument();
	});

	it('Should show user avatar wtih authorized user', () => {
		componentRender(<Header onToggleShowForm={vi.fn()}/>, { user: withUser });
		const avatar = screen.getByTestId('user-avatar');
		expect(avatar).toBeInTheDocument();
	});
})