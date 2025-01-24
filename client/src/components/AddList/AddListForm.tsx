import { FC, memo, useState, useCallback } from 'react';
import { selectUserIsLoading } from 'store/selectors/userSelectors';
import { activeListActions } from 'store/slices/activeListSlice';
import { addList } from 'store/actions/userActions';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { AppColorPicker } from 'components/AppColorPicker/AppColorPicker';
import { IconPicker } from 'components/IconPicker/IconPicker';
import { IList, ListsIconType } from 'types/list';
import { listRules } from 'constants/rules';
import {
	Input,
	Flex,
	Form,
	RadioChangeEvent,
	Button,
	Row,
	Col,
	Divider,
} from 'antd';
import { colorMap } from 'constants/colorList';

interface AddListFormProps {
	onSuccess?: () => void;
	onCancel?: () => void;
}

export const AddListForm: FC<AddListFormProps> = memo((props) => {
	const {
		onSuccess,
		onCancel,
	} = props;
	const [form] = Form.useForm();
	const [color, setColor] = useState<string>(colorMap.blue);
	const [icon, setIcon] = useState<ListsIconType>('UnorderedListOutlined');
	const dispatch = useAppDispatch();
	const isLoading = useAppSelector(selectUserIsLoading);

	const onChangeColor = useCallback((e: RadioChangeEvent) => {
		setColor(e.target.value);
	}, []);

	const onChangeIcon = useCallback((icon: ListsIconType) => {
		setIcon(icon);
	}, []);

	const onAddList = async () => {
		const { meta, payload } = await dispatch(addList({
			name: form.getFieldValue('name'),
			color: color,
			icon: icon,
		}));

		if (meta.requestStatus === 'fulfilled') {
			dispatch(activeListActions.setActiveList(payload as IList));

			if (onSuccess) onSuccess();
			form.resetFields();
		}
	};

	return (
		<Form requiredMark={false} onFinish={onAddList} form={form}>
			<Form.Item label='Name:' name='name' rules={listRules}>
				<Input />
			</Form.Item>
			<Row gutter={[2, 4]}>
				<Col span={12}>
					<Form.Item label='Color:'>
						<AppColorPicker color={color} onChange={onChangeColor}/>
					</Form.Item>
				</Col>

				<Divider type='vertical' style={{height: '65px'}}/>

				<Col span={10}>
					<Form.Item label='Icon:'>
						<IconPicker
							color={color}
							icon={icon}
							onChange={onChangeIcon}
						/>
					</Form.Item>
				</Col>
			</Row>
			<Form.Item>
				<Flex justify='flex-end' gap='10px'>
					<Button
						type='default'
						htmlType='button'
						loading={isLoading}
						onClick={onCancel}
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