import { vi } from 'vitest';
import { screen } from '@testing-library/react';
import { componentRender } from 'lib/tests/componentRender';
import { colorList } from 'constants/colorList';
import { AppColorPicker } from './AppColorPicker';

describe('AppColorPciker component', () => {
	it('Component should render', () => {
		componentRender(<AppColorPicker color='red' onChange={vi.fn()}/>);
		expect(screen.getByTestId('app-color-picker')).toBeInTheDocument();
	});

	it('Should have all colors', () => {
		componentRender(<AppColorPicker color='red' onChange={vi.fn()}/>);
		const colors = screen.getAllByTestId('color-picker-item'); 
		expect(colors.length).toEqual(colorList.length);
	});
});