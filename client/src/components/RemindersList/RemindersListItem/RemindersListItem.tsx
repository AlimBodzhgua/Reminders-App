import { FC, MouseEvent, useState, memo } from 'react';
import { Flex, Button, Space, Popover } from 'antd';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { removeReminder, updateReminder } from 'store/actions/userActions';
import { selectActiveList } from 'store/selectors/activeListSelectors';
import { isDateBefore, toPriorityLevel } from 'utils/utils';
import { DeleteOutlined, LinkOutlined } from '@ant-design/icons';
import { useHover } from 'hooks/useHover';
import { SortableItem } from 'lib/components/SortableItem';
import dayjs from 'dayjs';

import type { IReminder } from 'types/reminder';
import type { CheckboxProps } from 'antd';

import { ReminderOverview } from '../ReminderOverview/ReminderOverview';

import {
	StyledTitle,
	StyledText,
	StyledLink,
	StyledCheckbox,
	StyledListItem,
	StyledFlagFilled,
	StyledInfoCircleOutlined,
} from './RemindersListItem.styles';

interface RemindersListItemProps {
	reminder: IReminder;
}

export const RemindersListItem: FC<RemindersListItemProps> = memo(({reminder}) => {
	const dispatch = useAppDispatch();
	const activeList = useAppSelector(selectActiveList);
	const isDatePassed = isDateBefore(reminder.details?.date, reminder.details?.time);
	const [isDeleting, setIsDeleting] = useState<boolean>(false);
	const [isChecking, setIsChecking] = useState<boolean>(false);
	const { isHover, hoverProps } = useHover();

	const onRemove = async () => {
		setIsDeleting(true);
		const { meta } = await dispatch(removeReminder(reminder));

		if (meta.requestStatus === 'fulfilled' || meta.requestStatus === 'rejected') {
			setIsDeleting(false);
		}
	};

	const onContentClick = (e: MouseEvent<HTMLDivElement>) => {
		e.stopPropagation();
	};

	const onChangeCompleted: CheckboxProps['onChange'] = async (e) => {
		setIsChecking(true);
		const newReminder = { _id: reminder._id, listId: reminder.listId, isCompleted: e.target.checked };

		const { meta } = await dispatch(updateReminder(newReminder));

		if (meta.requestStatus === 'fulfilled' || meta.requestStatus === 'rejected') {
			setIsChecking(false);
		}
	};

	return (
		<SortableItem id={reminder._id}>
			<StyledListItem
				onClick={onContentClick}
				$isLoading={isDeleting}
				data-testid='reminder-item'
				{...hoverProps}
			>
				<Flex gap={15} align='start' style={{width: '100%'}}>
					<StyledCheckbox
						$color={activeList?.color}
						$opacity={isChecking ? 0.4 : 1}
						checked={reminder.isCompleted}
						onChange={onChangeCompleted}
						disabled={isChecking}
					/>
					<Flex vertical gap={0} style={{width: '100%'}}>
						<Flex
							gap={8}
							align='center'
							justify='space-between'
						>
							<Space>
								{reminder.priority && 
									<StyledTitle level={4} $color={activeList?.color}>
										{'!'.repeat(toPriorityLevel(reminder.priority))}
									</StyledTitle>
								}
								<StyledTitle level={4}>
									{reminder.title}
								</StyledTitle>
								{isHover && 
									<Button
										size='small'
										onClick={onRemove}
										disabled={isDeleting}
										data-testid='delete-btn'
									>
										<DeleteOutlined />
									</Button>
								}
							</Space>
							<Space size='middle'>
								{isHover && 
									<Popover
										content={<ReminderOverview reminder={reminder}/>}
										placement='left'
									>
										<StyledInfoCircleOutlined
											$color={activeList?.color}
											data-testid='overview-popover'
										/>
									</Popover>
								}
								{reminder.isFlagged &&
									<StyledFlagFilled />
								}
							</Space>
						</Flex>
						<StyledText>
							{reminder.notes}
						</StyledText>
						{reminder.url && 
							<StyledLink href={reminder.url} target='_blank'>
								<LinkOutlined />
								{reminder.url}
							</StyledLink>
						}
						<Flex gap={10}>
							{reminder.details?.date && (
								<StyledText $color={isDatePassed ? '#F74F4F' : '#949090'}>
									{dayjs(reminder.details?.date).format('DD/MM/YYYY')}
								</StyledText>
							)}
							{reminder.details?.time && (
								<StyledText $color={isDatePassed ? '#F74F4F' : '#949090'}>
									{reminder.details?.time}
								</StyledText>
							)}
						</Flex>
					</Flex>
				</Flex>
			</StyledListItem>
		</SortableItem>
	);
});