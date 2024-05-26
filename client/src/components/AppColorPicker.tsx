import { FC, memo, useCallback } from 'react';
import { colorList } from 'constants/colorList';
import { Radio, Flex, RadioChangeEvent } from 'antd';

interface AppColorPickerProps {
	color: string;
	onChange: (e: RadioChangeEvent) => void;
}


export const AppColorPicker: FC<AppColorPickerProps> = memo((props) => {
	const { color, onChange } = props;


	const renderColorlist = useCallback(() => (
		colorList.map(color => (
			<Radio.Button
				key={color}
				value={color}
				style={{
					backgroundColor: color,
					fontSize: '2px',
					color: color
				}}
			>
				{color}
			</Radio.Button>
		))
	), [colorList]);


	return (
		<Radio.Group
			size='small'
			onChange={onChange}
			value={color}
		>
			<Flex wrap gap='small' style={{width: '50%'}}>
				{renderColorlist()}
			</Flex>
		</Radio.Group>
	);
});