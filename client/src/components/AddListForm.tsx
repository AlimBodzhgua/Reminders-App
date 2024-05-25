import { CSSProperties, FC, memo, useState, useCallback } from 'react';
import { Input, Radio, Flex, Divider, Form, RadioChangeEvent } from 'antd';
import { colorList } from 'constants/colorList';

const dividerStyle: CSSProperties = {
	height: '45px'
};

export const AddListForm: FC = memo(() => {
	const [color, setColor] = useState<string>('');

	const onChangeColor = useCallback((e: RadioChangeEvent) => {
		setColor(e.target.value);
	}, []);

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
		<Form>
			<Form.Item label='Name:'>
				<Input />
			</Form.Item>
			<Flex align='center'>
				<Form.Item label='Color:'>
					<Radio.Group
						size='small'
						onChange={onChangeColor}
						value={color}
					>
						<Flex wrap gap='small' style={{width: '50%'}}>
							{renderColorlist()}
						</Flex>
					</Radio.Group>
				</Form.Item>

				<Divider type='vertical' style={dividerStyle}/>

				<Form.Item label='Icon:'>
					
				</Form.Item>
			</Flex>
		</Form>
	);
});
