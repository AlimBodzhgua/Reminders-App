import { FC, useState, memo, useCallback } from 'react';
import { Flex } from 'antd';
import { IList } from 'types/list';
import { mapListToIcon } from 'constants/iconsList';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { activeListActions } from 'store/slices/activeListSlice';
import { selectActiveList } from 'store/selectors/activeListSelectors';
import {
	StyledListItem,
	StyledCard,
	StyledTitle,
} from './PinnedListItem.styles'
import { StyledAvatar } from 'Styled/Avatar.styles';

interface PinnedListItemProps {
	list: IList;
}

export const PinnedListItem: FC<PinnedListItemProps> = memo(({list}) => {
	const [isEdit, setIsEdit] = useState<boolean>(false);
	const activeList = useAppSelector(selectActiveList);
	const dispatch = useAppDispatch()
	const isActive = activeList?._id === list._id;

	const onEdit = useCallback(() => {
		setIsEdit(true);
	}, []);

	const onSelectList = () => {
		dispatch(activeListActions.setActiveList(list));
	}

	return (
		<StyledListItem onClick={onSelectList}>
			<StyledCard
				type='inner'
				backgroundColor={isActive ? activeList.color : '#D0D0D0'}
				size='small'
			>
				<Flex align='center' justify='space-between'>
					<StyledAvatar
						icon={mapListToIcon[list.icon]}
						backgroundColor={isActive ? '#fff' : list.color}
						color={isActive ? list.color : '#fff'}
						size={28}
					/>
					<StyledTitle
						level={4}
						margin='0'
						isActive={isActive}
					>
						{list.reminders.length}
					</StyledTitle>
				</Flex>
				<StyledTitle
					level={5}
					margin='5px 0 0 0'
					align='left'
					isActive={isActive}
				>
					{list.name}
				</StyledTitle>
			</StyledCard>
		</StyledListItem>
	);
});
