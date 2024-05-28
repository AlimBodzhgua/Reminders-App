import { FC, memo } from 'react';
import { Avatar, Flex, List } from 'antd';
import { useAppSelector } from 'hooks/redux';
import { selectUserAuthData, selectUserIsLoading } from 'store/selectors/userSelectors';
import { mapListToIcon } from 'constants/iconsList';

export const MyLists: FC = memo(() => {
	const authData = useAppSelector(selectUserAuthData);
	const isLoading = useAppSelector(selectUserIsLoading);

	return (
		<List
			header={<div>My lists</div>}
			loading={isLoading}
		>
			{authData && authData.lists.map((list) => (
				<List.Item
					extra={<div>{list.reminders.length}</div>}
					key={list._id}
				>
					<Flex gap='10px'>
						<Avatar
							icon={mapListToIcon[list.icon]}
							style={{backgroundColor: list.color}}
						/>
						<div>{list.name}</div>
					</Flex>
				</List.Item>
			))}		
		</List>
	);
});
