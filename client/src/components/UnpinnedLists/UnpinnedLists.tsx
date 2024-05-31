import { FC, memo } from 'react';
import { List } from 'antd';
import { useAppSelector } from 'hooks/redux';
import { selectNotPinnedLists, selectUserAuthData, selectUserIsLoading } from 'store/selectors/userSelectors';
import { UnpinnedListItem } from './UnpinnedListItem/UnpinnedListItem';

export const UnpinnedLists: FC = memo(() => {
	const notPinnedLists = useAppSelector(selectNotPinnedLists);
	const authData = useAppSelector(selectUserAuthData);
	const isLoading = useAppSelector(selectUserIsLoading);


	return (
		<List
			loading={isLoading}
			header='My lists'
			size='small'
		>
			{authData && notPinnedLists.map((list) => (
				<UnpinnedListItem list={list} key={list._id}/>
			))}
		</List>
	)
})