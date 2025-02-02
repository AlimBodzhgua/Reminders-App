import { FC, useState, ChangeEvent, memo } from 'react';
import { Space, Input, Flex, message } from 'antd';
import { useAppDispatch } from 'hooks/redux';
import { updateReminder } from 'store/actions/userActions';
import { priorityOptions } from 'constants/priority';
import { FlagFilled, CloseOutlined } from '@ant-design/icons';
import { StyledButton } from 'styled/Button.styles';
import { AppMap } from 'components/AppMap/AppMap';
import dayjs from 'dayjs';

import type { DatePickerProps, TimePickerProps } from 'antd';
import type { IReminder, PriorityType } from 'types/reminder';

import {
	StyledTitle,
	StyledText,
	StyledSelect,
	StyledDivider,
	StyledDatePicker,
	StyledTimePicker,
	StyledReminderOverview,
} from './ReminderOverview.styles';

interface ReminderOverviewProps {
	reminder: IReminder;
}

export const ReminderOverview: FC<ReminderOverviewProps> = memo(({reminder}) => {
	const dispatch = useAppDispatch();
	const [url, setUrl] = useState<string>(reminder.url!);
	const [messageApi, contextHolder] = message.useMessage();
	const [title, setTitle] = useState<string>(reminder.title);
	const [notes, setNotes] = useState<string | undefined>(reminder.notes);

	const onChangeTitle = (value: string) => {
		const newReminder = { _id: reminder._id, listId: reminder.listId, title: value };

		dispatch(updateReminder(newReminder));
		setTitle(value);
	};

	const onChangeNotes = (value: string) => {
		const newReminder = { _id: reminder._id, listId: reminder.listId, notes: value };

		dispatch(updateReminder(newReminder));
		setNotes(value);
	};

	const onChangeDate: DatePickerProps['onChange'] = (date, dateString) => {
		const newDetailsData = { ...reminder.details, date: dateString as string };
		const newReminder = { _id: reminder._id, listId: reminder.listId, details: newDetailsData };

		dispatch(updateReminder(newReminder));
	};

	const onChangeTime: TimePickerProps['onChange'] = (time, timeString) => {
		const newDetailsData = { ...reminder.details, time: timeString as string };
		const newReminder = { _id: reminder._id, listId: reminder.listId, details: newDetailsData };

		dispatch(updateReminder(newReminder));
	};

	const onChangePriority = (value: PriorityType) => {
		const newReminder = { _id: reminder._id, listId: reminder.listId, priority: value };

		dispatch(updateReminder(newReminder));
	};

	const onChangeUrl = (e: ChangeEvent<HTMLInputElement>) => {
		setUrl(e.target.value);
	};

	const onAddURL = async () => {
		const newReminder = { _id: reminder._id, listId: reminder.listId, url };

		const { meta } = await dispatch(updateReminder(newReminder));
		if (meta.requestStatus === 'rejected') {
			messageApi.open({ type: 'error', content: 'Incorrect URL' });
		}
	};

	const onToggleFlag = () => {
		const newReminder = { _id: reminder._id, listId: reminder.listId, isFlagged: !reminder.isFlagged };
		
		dispatch(updateReminder(newReminder));
	};

	return (
		<StyledReminderOverview data-testid='reminder-overview'>
			{contextHolder}
			<Flex justify='space-between' align='center' gap={8}>
				<StyledTitle
					level={4}
					editable={{
						onChange: onChangeTitle,
						triggerType: ['icon', 'text'],
					}}
				>
					{title}
				</StyledTitle>
				<StyledButton
					size='small'
					$color={reminder.isFlagged ? '#ff6600' : '#000'}
					$borderColor={reminder.isFlagged ? '#ff6600' : '#000'}
					onClick={onToggleFlag}
				>
					<FlagFilled />
				</StyledButton>
			</Flex>
			{notes &&
				<StyledText editable={{
					onChange: onChangeNotes,
					triggerType: ['icon', 'text'],
				}}>
					{notes}
				</StyledText>
			}
			<StyledDivider />
			<Flex justify='space-between'>
				<StyledTitle level={5}>
					remind
				</StyledTitle>
				<Space direction='vertical'>
					<StyledDatePicker
						variant='borderless'
						value={reminder?.details?.date 
							? dayjs(reminder.details.date)
							: undefined
						}
						allowClear={{clearIcon: <CloseOutlined />}}
						onChange={onChangeDate}
						format='YYYY.MM.DD'
					/>
					{reminder?.details?.date &&
						<StyledTimePicker
							variant='borderless'
							value={reminder?.details?.time 
								? dayjs(`${reminder.details.date} ${reminder.details.time}`)
								: undefined
							}
							format='HH:mm'
							onChange={onChangeTime}
							allowClear={{clearIcon: <CloseOutlined />}}
						/>
					}
				</Space>
			</Flex>
			<StyledDivider />
			{reminder?.details?.location &&
				<>
					<StyledTitle level={5}>
						Location: {reminder.details.location}
					</StyledTitle>
					<AppMap
						initialLocation={reminder.details.location}
						mapWidth={'100%'}
						mapHeight={'155px'}
						mapControls={['zoomControl', 'fullscreenControl']}
					/>
				</>
			}
			<StyledDivider />
			<Space align='center'>
				<StyledTitle level={5}>
					priority
				</StyledTitle>
				<StyledSelect 
					placeholder={'None'}
					data-testid='priority-select'
					onChange={onChangePriority}
					options={priorityOptions}
					value={reminder.priority}
				/>
			</Space>
			<StyledDivider />
			<Space>
				<StyledTitle level={5}>URL</StyledTitle>
				<Input
					size='small'
					variant='borderless'
					placeholder='None'
					value={url}
					onChange={onChangeUrl}
					onBlur={onAddURL}
					onPressEnter={onAddURL}
				/>
			</Space>
		</StyledReminderOverview>
	);
});
