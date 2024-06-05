import { CSSProperties, FC, MouseEvent, memo, useState } from 'react';
import {
	Form,
	Space,
	Input,
	DatePicker,
	TimePicker,
	DatePickerProps,
	TimePickerProps,
} from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import dayjs, { Dayjs } from 'dayjs';


const formStyle: CSSProperties = {
	borderBottom: '2px solid #CFCFCF',
	padding: '4px 0 8px 0',
}

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
	}

	const onChangeDate: DatePickerProps['onChange'] = (_, dateString) => {
		if (dateString.length) {
			setDate(dateString as string)
		}
	}

	const onChangeTime: TimePickerProps['onChange'] = (time, timeString) => {
		setTime(time)
	}

	const onAddReminder = () => {
		console.log('add reminder');
		if (onSuccess) onSuccess();
	}

	return (
		<Form
			style={formStyle}
			form={form}
			onClick={onContentClick}
		>
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
				<DatePicker
					placeholder='Add Date'
					variant='filled'
					style={{borderRadius: 0, width: '144px'}}
					onChange={onChangeDate}
					value={date !== null ? dayjs(date) : date}
					allowClear={{
						clearIcon: <CloseOutlined />,
					}}
				/>
				{date &&
					<TimePicker
						placeholder='Add Time'
						variant='filled'
						style={{borderRadius: 0, width: '144px'}}
						onChange={onChangeTime}
						value={time}
						allowClear={{
							clearIcon: <CloseOutlined />,
						}}
					/>
				}
			</Space>
		</Form>
	)
});
