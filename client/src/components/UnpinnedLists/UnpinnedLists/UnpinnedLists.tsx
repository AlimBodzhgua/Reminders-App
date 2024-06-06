import { FC, memo } from 'react';
import { useAppSelector } from 'hooks/redux';
import { selectNotPinnedLists, selectUserAuthData, selectUserIsLoading } from 'store/selectors/userSelectors';
import { UnpinnedListItem } from '../UnpinnedListItem/UnpinnedListItem';
import { StyledList } from './UnpinnedLists.styles';

export const UnpinnedLists: FC = memo(() => {
	const notPinnedLists = useAppSelector(selectNotPinnedLists);
	const authData = useAppSelector(selectUserAuthData);
	const isLoading = useAppSelector(selectUserIsLoading);

	return (
		<StyledList
			loading={isLoading}
			header='My lists'
			size='small'
		>
			{authData && notPinnedLists.map((list) => (
				<UnpinnedListItem list={list} key={list._id}/>
			))}
		</StyledList>
	);
});