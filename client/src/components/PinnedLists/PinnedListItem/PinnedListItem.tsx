import { FC, useState, memo, useCallback } from 'react';
import { List, Flex, Avatar, Card, Typography } from 'antd';
import { IList } from 'types/list';
import { mapListToIcon } from 'constants/iconsList';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { activeListActions } from 'store/slices/activeListSlice';
import { selectActiveList } from 'store/selectors/activeListSelectors';

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
		<List.Item
			style={{width: '49%', padding: '4px 0'}}
			onClick={onSelectList}
		>
			<Card
				type='inner'
				style={{
					width: '100%',
					backgroundColor: isActive ? activeList.color : '#D0D0D0',
				}}
				size='small'
			>
				<Flex align='center' justify='space-between'>
					<Avatar
						icon={mapListToIcon[list.icon]}
						style={{
							backgroundColor: isActive ? '#fff' : list.color,
							color: isActive ? list.color : undefined, 
						}}
						size={28}
					/>
					<Typography.Title
						level={4}
						style={{color: '#515151', margin: '0', fontWeight: '800'}}
					>
						{list.reminders.length}
					</Typography.Title>
				</Flex>
				<Typography.Title
					level={5}
					onDoubleClick={onEdit}
					style={{color: '#515151', textAlign: 'left', margin: '5px 0 0 0'}}
				>
					{list.name}
				</Typography.Title>
			</Card>
		</List.Item>
	);
});
