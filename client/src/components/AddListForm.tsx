import { FC, memo, useState, useCallback, ChangeEvent } from 'react';
import { Input, Flex, Form, RadioChangeEvent, Button, Row, Col } from 'antd';
import { AppColorPicker } from './AppColorPicker';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { addList } from 'store/actions/userActions';
import { selectUserIsLoading } from 'store/selectors/userSelectors';
import { ListsIconType } from 'types/list';
import { IconPicker } from './IconPicker';
import { listRules } from 'constants/rules';
import EmojiPicker from 'emoji-picker-react';

export const AddListForm: FC = memo(() => {
	const [color, setColor] = useState<string>('#0033cc');
	const [name, setName] = useState<string>('');
	const [icon, setIcon] = useState<ListsIconType>('UnorderedListOutlined');
	const dispatch = useAppDispatch();
	const isLoading = useAppSelector(selectUserIsLoading);

	const onChangeColor = useCallback((e: RadioChangeEvent) => {
		setColor(e.target.value);
	}, []);

	const onChangeName = useCallback((e: ChangeEvent<HTMLInputElement>) => {
		setName(e.target.value);
	}, []);

	const onChangeIcon = useCallback((icon: ListsIconType) => {
		setIcon(icon);
	}, []);

	const onAddList = useCallback(() => {
		dispatch(addList({
			name: name,
			color: color,
			icon: icon,
		}));
	}, [dispatch, name, color]);

	return (
		<Form requiredMark={false} onFinish={onAddList}>
			<Form.Item label='Name:' rules={listRules}>
				<Input value={name} onChange={onChangeName}/>
			</Form.Item>
			<Row gutter={[2, 4]}>
				<Col span={12}>
					<Form.Item label='Color:'>
						<AppColorPicker color={color} onChange={onChangeColor}/>
					</Form.Item>
				</Col>

				{/*<Divider type='vertical' style={dividerStyle}/>*/}

				<Col span={12}>
					<Form.Item label='Icon:'>
						<IconPicker
							color={color}
							icon={icon}
							onChange={onChangeIcon}
						/>
						<EmojiPicker open={false}/>
					</Form.Item>
				</Col>
			</Row>
			<Form.Item>
				<Flex justify='flex-end' gap='10px'>
					<Button
						type='default'
						htmlType='button'
						loading={isLoading}
					>
						cancel
					</Button>
					<Button
						type='primary'
						htmlType='submit'
						loading={isLoading}
					>
						add
					</Button>
				</Flex>
			</Form.Item>
		</Form>
	);
});
