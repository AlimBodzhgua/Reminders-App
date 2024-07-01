import { screen } from '@testing-library/react';
import { vi } from 'vitest';
import { componentRender } from 'lib/tests/componentRender';
import { mapListToIcon } from 'constants/iconsList';
import userEvent from '@testing-library/user-event';
import { IconPicker } from './IconPicker';

describe('IconPicker', () => {
	it('Components should render', () => {
		componentRender(
			<IconPicker
				color={'#ff0000'}
				onChange={vi.fn()}
				icon='UnorderedListOutlined'
			/>
		);
		expect(screen.getByTestId('icon-picker')).toBeInTheDocument();
	});

	it('Should show popover icons', async () => {
		const user = userEvent.setup();
		componentRender(
			<IconPicker
				color={'#ff0000'}
				onChange={vi.fn()}
				icon='UnorderedListOutlined'
			/>
		);
		await user.click(screen.getByTestId('icon-picker'));
		expect(screen.getByTestId('icon-popover-content')).toBeInTheDocument();
	});

	it('Should have all icons', async () => {
		const user = userEvent.setup();
		componentRender(
			<IconPicker
				color={'#ff0000'}
				onChange={vi.fn()}
				icon='UnorderedListOutlined'
			/>
		);
		await user.click(screen.getByTestId('icon-picker'));
		const icons = screen.getAllByTestId('icon-item');
		expect(icons.length).toEqual(Object.keys(mapListToIcon).length);
	});
});