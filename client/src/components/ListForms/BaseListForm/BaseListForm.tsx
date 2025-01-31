import { FC, memo, useState, useCallback, ReactNode } from 'react';
import { selectUserIsLoading } from 'store/selectors/userSelectors';
import { useAppSelector } from 'hooks/redux';
import { AppColorPicker } from 'components/AppColorPicker/AppColorPicker';
import { IconPicker } from 'components/IconPicker/IconPicker';
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
import { colorMap, type ColorType } from 'constants/colorList';
import type { ListsIconType } from 'types/list';

type ActionButtonParams = {
	color: ColorType;
	icon: ListsIconType;
	name: string;
	onSuccess?: () => void;
}

interface BaseListFormProps {
	renderActionButton: (params: ActionButtonParams) => ReactNode;
	initialIcon?: ListsIconType;
	initialColor?: ColorType;
	initialName?: string;
	onCancel?: () => void;
	onSuccess?: () => void;
}

export const BaseListForm: FC<BaseListFormProps> = memo((props) => {
	const {
		initialName = '',
		initialIcon = 'UnorderedListOutlined',
		initialColor = colorMap.blue,
		renderActionButton,
		onCancel,
		onSuccess,
	} = props;
	const [form] = Form.useForm();
	const [color, setColor] = useState<ColorType>(initialColor);
	const [icon, setIcon] = useState<ListsIconType>(initialIcon);
	const [name, setName] = useState<string>(initialName);
	const isLoading = useAppSelector(selectUserIsLoading);

	const onChangeColor = useCallback((e: RadioChangeEvent) => {
		setColor(e.target.value);
	}, []);

	const onChangeIcon = useCallback((icon: ListsIconType) => {
		setIcon(icon);
	}, []);

	const handleSuccess = () => {
		if (onSuccess) onSuccess();
		form.resetFields();
	};

	return (
		<Form requiredMark={false} form={form}>
			<Form.Item label='Name:' name='name' initialValue={initialName} rules={listRules}>
				<Input
					disabled={isLoading}
					value={name}
					onChange={(e) => setName(e.target.value)}
				/>
			</Form.Item>
			<Row gutter={[2, 4]}>
				<Col span={12}>
					<Form.Item label='Color:'>
						<AppColorPicker color={color} onChange={onChangeColor} />
					</Form.Item>
				</Col>

				<Divider type='vertical' style={{ height: '65px' }} />

				<Col span={10}>
					<Form.Item label='Icon:'>
						<IconPicker color={color} icon={icon} onChange={onChangeIcon} />
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
					{renderActionButton({
						color: color,
						icon: icon,
						name: name,
						onSuccess: handleSuccess,
					})}
				</Flex>
			</Form.Item>
		</Form>
	);
});