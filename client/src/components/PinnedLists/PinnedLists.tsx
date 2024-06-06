import { FC, memo } from 'react';
import { useAppSelector } from 'hooks/redux';
import { List, Flex } from 'antd';
import { selectPinnedLists, selectUserAuthData } from 'store/selectors/userSelectors';
import { PinnedListItem } from './PinnedListItem/PinnedListItem';

export const PinnedLists: FC = memo(() => {
	const authData = useAppSelector(selectUserAuthData);
	const pinnedLists = useAppSelector(selectPinnedLists);

	return (
		<List>
			<Flex wrap align='center' gap='5px'>
				{authData && pinnedLists.map((list) => (
					<PinnedListItem key={list._id} list={list} />
				))}
			</Flex>
		</List>
	);
});
