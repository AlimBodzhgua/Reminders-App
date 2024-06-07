import { FC, memo } from 'react';
import { useAppSelector } from 'hooks/redux';
import { selectNotPinnedLists, selectUserAuthData, selectUserIsLoading } from 'store/selectors/userSelectors';
import { UnpinnedListItem } from '../UnpinnedListItem/UnpinnedListItem';
import { Spin, Flex } from 'antd';
import { StyledList } from './UnpinnedLists.styles';

export const UnpinnedLists: FC = memo(() => {
	const notPinnedLists = useAppSelector(selectNotPinnedLists);
	const authData = useAppSelector(selectUserAuthData);
	const isLoading = useAppSelector(selectUserIsLoading);

	const header = (
		<Flex justify='space-between' align='center'>
			<div>My lists</div> 
			<Spin spinning={isLoading} size='small'/>
		</Flex>
	)

	return (
		<StyledList
			header={header}
			size='small'
		>
			{authData && notPinnedLists.map((list) => (
				<UnpinnedListItem list={list} key={list._id}/>
			))}
		</StyledList>
	);
});