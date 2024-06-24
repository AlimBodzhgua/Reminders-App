import { FC, useState, ChangeEvent, memo, useEffect } from 'react';
import { Space, Input, Flex, message } from 'antd';
import { useAppDispatch } from 'hooks/redux';
import { updateReminder } from 'store/actions/userActions';
import { priorityOptions } from 'constants/priority';
import { FlagFilled } from '@ant-design/icons';
import { StyledButton } from 'styled/Button.styles';

import type { IReminder, PriorityType } from 'types/reminder';

import {
	StyledTitle,
	StyledText,
	StyledSelect,
	StyledDivider,
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
		dispatch(updateReminder({ _id: reminder._id, title: value }));
		setTitle(value);
	}

	const onChangeNotes = (value: string) => {
		dispatch(updateReminder({ _id: reminder._id, notes: value }));
		setNotes(value);
	}

	const onChangePriority = (value: PriorityType) => {
		dispatch(updateReminder({
			_id: reminder._id,
			priority: value,
		}));
	};

	const onChangeUrl = (e: ChangeEvent<HTMLInputElement>) => {
		setUrl(e.target.value);
	};

	const onAddURL = async () => {
		const { meta } = await dispatch(updateReminder({ _id: reminder._id, url }));
		if (meta.requestStatus === 'rejected') {
			messageApi.open({ type: 'error', content: 'Incorrect URL' });
		}
	};

	const onToggleFlag = () => {
		dispatch(updateReminder({
			_id: reminder._id,
			isFlagged: !reminder.isFlagged,
		}));
	};

	return (
		<StyledReminderOverview>
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
			<StyledText editable={{
				onChange: onChangeNotes,
				triggerType: ['icon', 'text'],
			}}>
				{notes}
			</StyledText>
			<StyledDivider />
			<Space align='center'>
				<StyledTitle level={5}>
					priority
				</StyledTitle>
				<StyledSelect 
					placeholder={'None'}
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
