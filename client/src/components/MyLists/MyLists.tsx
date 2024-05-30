import { FC, memo } from 'react';
import { List } from 'antd';
import { useAppSelector } from 'hooks/redux';
import { selectUserAuthData, selectUserIsLoading } from 'store/selectors/userSelectors';
import { MyListsItem } from './MyListsItem/MyListsItem';

export const MyLists: FC = memo(() => {
	const authData = useAppSelector(selectUserAuthData);
	const isLoading = useAppSelector(selectUserIsLoading);


	return (
		<List
			loading={isLoading}
			header={<div>My lists</div>}
			size='small'
		>
			{authData && authData.lists.map((list) => (
				<MyListsItem list={list} key={list._id}/>
			))}
		</List>
	)
})