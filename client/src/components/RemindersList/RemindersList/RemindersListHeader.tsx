import { FC, memo, MouseEvent, useState } from 'react';
import { Flex, Space, Button } from 'antd';
import { selectActiveList, selectNumberCompletedReminders } from 'store/selectors/activeListSelectors';
import { clearReminders } from 'store/actions/userActions';
import { useAppSelector, useAppDispatch } from 'hooks/redux';
import { StyledButton } from 'styled/Button.styles';

import type { IReminder } from 'types/reminder';

import {
	DoteDivider,
	StyledTitle,
	StyledPlusOutlined,
} from './RemindersList.styles';


interface ReminderListHeaderProps {
	reminders: IReminder[];
	withActions?: boolean;
}

export const RemindersListHeader: FC<ReminderListHeaderProps> = memo((props) => {
	const {
		reminders,
		withActions = true,
	} = props;
	const activeList = useAppSelector(selectActiveList);
	const dispatch = useAppDispatch();
	const completedNumber = useAppSelector(selectNumberCompletedReminders);
	const [showForm, setShowForm] = useState<boolean>(false);

	const onShowForm = () => {
		setShowForm(true);
	};

	const onContentClick = (e: MouseEvent) => {
		e.stopPropagation();
	};

	const onShow = () => {
		console.log('show');
	};

	const onClear = () => {
		dispatch(clearReminders());
	};

	return (
		<Flex vertical gap={10}>
			<Flex justify='space-between' align='center'>
				<Space>
					<StyledTitle
						$color={activeList?.color}
						editable={{
							triggerType: ['text'],
							enterIcon: '',
						}}
					>
						{activeList?.name}
					</StyledTitle>
					<Button
						type='text'
						icon={<StyledPlusOutlined />}
						onClick={onShowForm}
					/>
				</Space>
				<StyledTitle $color={activeList?.color} $weight={500}>
					{reminders.length}
				</StyledTitle>
			</Flex>
			{withActions && 
				<Flex
					justify='space-between'
					align='center'
					onClick={onContentClick}
				>
					<Space>
						<StyledTitle level={5}>
							{completedNumber} Completed
						</StyledTitle>
						<DoteDivider />
						<StyledButton
							onClick={onClear}
							type='text'
							size='small'
							$color={activeList?.color}
							$weight={800}
						>
							Clear
						</StyledButton>
					</Space>
					<StyledButton
						onClick={onShow}
						type='text'
						size='small'
						$color={activeList?.color}
						$weight={800}
					>
						Show
					</StyledButton>
				</Flex>
			}
		</Flex>
	);
});
