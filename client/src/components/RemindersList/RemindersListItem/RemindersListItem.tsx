import { FC, MouseEvent, useState, memo } from 'react';
import { Flex, Button } from 'antd';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { IReminder } from 'types/reminder';
import { removeReminder } from 'store/actions/userActions';
import { selectActiveList } from 'store/selectors/activeListSelectors';
import { isDateBefore } from 'utils/utils';
import { DeleteOutlined } from '@ant-design/icons';
import { useHover } from 'hooks/useHover';
import { SortableItem } from 'lib/components/SortableItem';
import dayjs from 'dayjs';

import {
	StyledTitle,
	StyledText,
	StyledCheckbox,
	StyledListItem,
} from './RemindersListItem.styles';

interface RemindersListItemProps {
	reminder: IReminder;
}

export const RemindersListItem: FC<RemindersListItemProps> = memo(({reminder}) => {
	const dispatch = useAppDispatch();
	const activeList = useAppSelector(selectActiveList);
	const isDatePassed = isDateBefore(reminder.details?.date, reminder.details?.time);
	const [isHover, hoverProps] = useHover();
	const [isDeleting, setIsDeleting] = useState<boolean>(false);

	const onRemove = async () => {
		setIsDeleting(true);
		const { meta } = await dispatch(removeReminder(reminder._id));

		if (meta.requestStatus === 'fulfilled' || meta.requestStatus === 'rejected') {
			setIsDeleting(false);
		}
	};

	const onContentClick = (e: MouseEvent<HTMLDivElement>) => {
		e.stopPropagation();
	};

	return (
		<SortableItem id={reminder._id}>
			<StyledListItem
				onClick={onContentClick}
				$isLoading={isDeleting}
				{...hoverProps}
			>
				<Flex gap={15} align='start'>
					<StyledCheckbox
						$color={activeList!.color}
						disabled={isDeleting}
					/>
					<Flex vertical gap={0}>
						<Flex gap={8} align='center'>
							<StyledTitle level={4}>
								{reminder.title}
							</StyledTitle>
							{isHover && 
								<Button
									size='small'
									onClick={onRemove}
									disabled={isDeleting}
								>
									<DeleteOutlined />
								</Button>
							}
						</Flex>
						<StyledText>
							{reminder.notes}
						</StyledText>
						<Flex gap={10}>
							{reminder.details?.date &&
								<StyledText
									$color={isDatePassed ? '#F74F4F' : undefined}
								>
									{dayjs(reminder.details?.date).format('DD/MM/YYYY')}
								</StyledText>
							}
							{reminder.details?.time && 
								<StyledText
									$color={isDatePassed ? '#F74F4F' : undefined}
								>
									{reminder.details?.time}
								</StyledText>
							}
							{reminder.details?.location && 
								<StyledText>
									{reminder.details?.location}
								</StyledText>
							}
						</Flex>
					</Flex>
				</Flex>
			</StyledListItem>
		</SortableItem>
	);
});