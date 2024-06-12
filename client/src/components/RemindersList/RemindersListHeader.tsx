import { FC, memo, MouseEvent } from 'react';
import { Flex, Space } from 'antd';
import { selectActiveList, selectNumberCompletedReminders } from 'store/selectors/activeListSelectors';
import { clearReminders } from 'store/actions/userActions';
import { useAppSelector, useAppDispatch } from 'hooks/redux';
import { StyledButton } from 'styled/Button.styles';
import { DoteDivider, StyledTitle } from './RemindersList.styles';

export const RemindersListHeader: FC = memo(() => {
	const activeList = useAppSelector(selectActiveList);
	const dispatch = useAppDispatch();
	const completedNumber = useAppSelector(selectNumberCompletedReminders);

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
	);
});
