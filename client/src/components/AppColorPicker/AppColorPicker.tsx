import { FC, memo, useCallback } from 'react';
import { colorList } from 'constants/colorList';
import { Radio, Flex, RadioChangeEvent } from 'antd';
import { StyledRadioButton } from './AppColorPicker.styles';

interface AppColorPickerProps {
	color: string;
	onChange: (e: RadioChangeEvent) => void;
}

export const AppColorPicker: FC<AppColorPickerProps> = memo((props) => {
	const { color, onChange } = props;

	const renderColorlist = useCallback(() => (
		colorList.map(color => (
			<StyledRadioButton
				key={color}
				value={color}
				$bgColor={color}
				$color={color}
				data-testid='color-picker-item'
			>
				{color}
			</StyledRadioButton>
		))
	), [colorList]);

	return (
		<Radio.Group
			size='small'
			onChange={onChange}
			value={color}
			data-testid='app-color-picker'
		>
			<Flex wrap gap='small' style={{width: '100%'}}>
				{renderColorlist()}
			</Flex>
		</Radio.Group>
	);
});