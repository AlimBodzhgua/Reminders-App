import { CSSProperties, FC, memo, useState, useCallback } from 'react';
import { Input, Flex, Divider, Form, RadioChangeEvent } from 'antd';
import { IconPicker } from './IconPicker';
import { AppColorPicker } from './AppColorPicker';

const dividerStyle: CSSProperties = {
	height: '45px'
};

export const AddListForm: FC = memo(() => {
	const [color, setColor] = useState<string>('');

	const onChangeColor = useCallback((e: RadioChangeEvent) => {
		setColor(e.target.value);
	}, []);

	return (
		<Form>
			<Form.Item label='Name:'>
				<Input />
			</Form.Item>
			<Flex align='center'>
				<Form.Item label='Color:'>
					<AppColorPicker color={color} onChange={onChangeColor}/>
				</Form.Item>

				<Divider type='vertical' style={dividerStyle}/>

				<Form.Item label='Icon:'>
					<IconPicker color={color}/>
				</Form.Item>
			</Flex>
		</Form>
	);
});
