import { FC, memo } from 'react';
import { useAppSelector } from 'hooks/redux';
import { List, Flex } from 'antd';
import { selectPinnedLists, selectUserAuthData } from 'store/selectors/userSelectors';
import { PinnedListItem } from './PinnedListItem/PinnedListItem';
import { useSortableLists } from 'hooks/useSortableLists';
import { restrictToParentElement } from '@dnd-kit/modifiers';
import { DndContext } from '@dnd-kit/core';
import { SortableContext } from '@dnd-kit/sortable';

export const PinnedLists: FC = memo(() => {
	const authData = useAppSelector(selectUserAuthData);
	const pinnedLists = useAppSelector(selectPinnedLists);
	const { onDragEnd, sensors } = useSortableLists();


	return (
		<DndContext
			onDragEnd={onDragEnd}
			modifiers={[restrictToParentElement]}
			sensors={sensors}
		>
			<SortableContext
				items={pinnedLists.map((list) => list._id)}
			>
				<List data-testid='pinned-list'>
					<Flex wrap align='center' gap='5px'>
						{authData && pinnedLists.map((list) => (
							<PinnedListItem key={list._id} list={list} />
						))}
					</Flex>
				</List>
			</SortableContext>
		</DndContext>
	);
});
