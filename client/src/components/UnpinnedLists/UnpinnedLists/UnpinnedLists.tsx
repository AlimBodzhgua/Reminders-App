import { FC, memo } from 'react';
import { useAppSelector } from 'hooks/redux';
import { useSortableLists } from 'hooks/useSortableLists';
import {
	selectNotPinnedLists,
	selectUserAuthData,
	selectUserIsLoading,
} from 'store/selectors/userSelectors';
import { Spin, Flex } from 'antd';
import { restrictToParentElement } from '@dnd-kit/modifiers';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { DndContext } from '@dnd-kit/core';

import { StyledList } from './UnpinnedLists.styles';
import { UnpinnedListItem } from '../UnpinnedListItem/UnpinnedListItem';

export const UnpinnedLists: FC = memo(() => {
	const notPinnedLists = useAppSelector(selectNotPinnedLists);
	const authData = useAppSelector(selectUserAuthData);
	const isLoading = useAppSelector(selectUserIsLoading);
	const { onDragEnd, sensors } = useSortableLists();

	const header = (
		<Flex justify='space-between' align='center'>
			<div>My lists</div> 
			<Spin spinning={isLoading} size='small'/>
		</Flex>
	);

	return (
		<DndContext
			sensors={sensors}
			onDragEnd={onDragEnd}
			modifiers={[restrictToParentElement]}
		>
			<SortableContext
				items={notPinnedLists.map((list) => list._id)}
				strategy={verticalListSortingStrategy}
			>
				<StyledList header={header} size='small'>
					{authData && notPinnedLists.map((list) => (
						<UnpinnedListItem list={list} key={list._id}/>
					))}
				</StyledList>
			</SortableContext>
		</DndContext>
	);
});