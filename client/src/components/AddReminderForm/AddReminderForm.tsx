import { FC, MouseEvent, memo, useState } from 'react';
import {
	Form,
	Space,
	Input,
	DatePickerProps,
	Flex,
} from 'antd';
import { CloseOutlined, CheckOutlined } from '@ant-design/icons';
import { addReminder } from 'store/actions/userActions';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { createReminder } from 'utils/utils';
import { selectActiveList } from 'store/selectors/activeListSelectors';

import type { Dayjs } from 'dayjs';
import type { FormProps } from 'antd';

import {
	StyledDatePicker,
	StyledTimePicker,
	StyledCheckbox,
	StyledButton,
	StyledFlex,
	StyledForm,
} from './AddReminderForm.styles';

interface AddReminderFormProps {
	onSuccess?: () => void;
}

export interface FormFields {
	title: string;
	notes?: string;
	isCompleted: boolean;
	date?: Dayjs;
	time?: Dayjs;
}

export const AddReminderForm: FC<AddReminderFormProps> = memo((props) => {
	const { onSuccess } = props;
	const [form] = Form.useForm();
	const [showTimePicker, setShowTimePicker] = useState<boolean>(false);
	const activeList = useAppSelector(selectActiveList);
	const dispatch = useAppDispatch();

	const onContentClick = (e: MouseEvent<HTMLFormElement>) => {
		e.stopPropagation();
	};

	const onChangeDate: DatePickerProps['onChange'] = (date, dateString) => {
		if (dateString.length) {
			setShowTimePicker(true);
		} else setShowTimePicker(false);
	};

	const onAddReminder: FormProps<FormFields>['onFinish'] = async (values) => {
		const newReminder = createReminder(values);

		const { meta } = await dispatch(addReminder({
			listId: activeList!._id,
			reminder: newReminder,
		}));

		if (meta.requestStatus === 'fulfilled' && onSuccess) {
			onSuccess();
		}
	};

	return (
		<StyledForm
			form={form}
			onClick={onContentClick}
			onFinish={onAddReminder}
		>
			<Flex align='start'>
				<Form.Item<FormFields>
					name='isCompleted'
					valuePropName='checked'
				>
					<StyledCheckbox $color={activeList?.color}/>
				</Form.Item>
				<StyledFlex vertical>
					<Form.Item<FormFields> name='title'>
						<Input
							placeholder='Title'
							variant='borderless'
							autoFocus
						/>
					</Form.Item>
					<Form.Item<FormFields> name='notes'>
						<Input
							placeholder='Notes'
							variant='borderless'
						/>
					</Form.Item>
					<Space>
						<Form.Item<FormFields> name='date'>
							<StyledDatePicker
								placeholder='Add Date'
								variant='filled'
								onChange={onChangeDate}
								allowClear={{
									clearIcon: <CloseOutlined />,
								}}
							/>
						</Form.Item>
						{showTimePicker && 
							<Form.Item<FormFields> name='time'>
								<StyledTimePicker
									placeholder='Add Time'
									variant='filled'
									format='HH:mm'
									allowClear={{
										clearIcon: <CloseOutlined />,
									}}
								/>
							</Form.Item>
						}
						<StyledButton
							htmlType='submit'
							icon={<CheckOutlined />}
						>
						</StyledButton>
					</Space>
				</StyledFlex>
			</Flex>
		</StyledForm>
	);
});
