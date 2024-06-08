import { FC, MouseEvent, memo, useState } from 'react';
import {
	Form,
	Space,
	Input,
	DatePickerProps,
	TimePickerProps,
	Flex,
} from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import dayjs, { Dayjs } from 'dayjs';
import {
	StyledDatePicker,
	StyledTimePicker,
	StyledCheckbox,
	StyledFlex,
} from './AddReminderForm.styles';

interface AddReminderFormProps {
	onSuccess?: () => void;
}

export const AddReminderForm: FC<AddReminderFormProps> = memo((props) => {
	const { onSuccess } = props;
	const [form] = Form.useForm();
	const [date, setDate] = useState<string | null>(null);
	const [time, setTime] = useState<Dayjs | null>(null);

	const onContentClick = (e: MouseEvent<HTMLFormElement>) => {
		e.stopPropagation();
	};

	const onChangeDate: DatePickerProps['onChange'] = (date, dateString) => {
		if (dateString.length) {
			setDate(dateString as string);
		}
	};

	const onChangeTime: TimePickerProps['onChange'] = (time) => {
		setTime(time);
	};

	const onAddReminder = () => {
		console.log('add reminder');
		if (onSuccess) onSuccess();
	};

	return (
		<Form form={form} onClick={onContentClick}>
			<Flex align='start'>
				<StyledCheckbox />
				<StyledFlex vertical>
					<Form.Item>
						<Input
							name='title'
							placeholder='Title'
							variant='borderless'
							autoFocus
						/>
					</Form.Item>
					<Form.Item>
						<Input
							name='notes'
							placeholder='Notes'
							variant='borderless'
						/>
					</Form.Item>
					<Space>
						<StyledDatePicker
							placeholder='Add Date'
							variant='filled'
							onChange={onChangeDate}
							value={date !== null ? dayjs(date) : date}
							allowClear={{
								clearIcon: <CloseOutlined />,
							}}
						/>
						{date &&
							<StyledTimePicker
								placeholder='Add Time'
								variant='filled'
								onChange={onChangeTime}
								value={time}
								allowClear={{
									clearIcon: <CloseOutlined />,
								}}
							/>
						}
					</Space>
				</StyledFlex>
			</Flex>
		</Form>
	);
});
