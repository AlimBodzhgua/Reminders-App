import { FC, memo } from 'react';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { selectActiveList } from 'store/selectors/activeListSelectors';
import { restrictToParentElement } from '@dnd-kit/modifiers';
import { DndContext, DragEndEvent } from '@dnd-kit/core';
import { SortableContext } from '@dnd-kit/sortable';
import { useSensor, useSensors, PointerSensor } from '@dnd-kit/core';
import { RemindersListHeader } from 'components/ListHeader/RemindersListHeader';
import { SearchListHeader } from 'components/ListHeader/SearchListHeader';
import { selectSearchBarIsSearching } from 'store/selectors/searchBarSelectors';
import { moveReminders } from 'store/actions/userActions/remindersActions';

import type { IReminder } from 'types/reminder';

import { RemindersListItem } from '../RemindersListItem/RemindersListItem';
import { StyledList } from './RemindersList.styles';

interface RemindersListProps {
	reminders: IReminder[];
}

export const RemindersList: FC<RemindersListProps> = memo(({reminders}) => {
	const activeList = useAppSelector(selectActiveList);
	const isSearching = useAppSelector(selectSearchBarIsSearching);
	const dispatch = useAppDispatch();

	const sensors = useSensors(
		useSensor(PointerSensor, {
			activationConstraint: {
				distance: 8,
			},
		}),
	);
	
	const onDragEnd = (e: DragEndEvent) => {
		const { active, over } = e;
		if (active.id !== over!.id) {
			dispatch(moveReminders({
				listId: activeList!._id,
				overId: String(e.over!.id),
				activeId: String(e.active.id),
			}))
		}
	};

	return (
		<DndContext
			onDragEnd={onDragEnd}
			modifiers={[restrictToParentElement]}
			sensors={sensors}
		>
			<SortableContext items={reminders.map((reminder) => reminder._id)}>
				<StyledList
					header={isSearching ? <SearchListHeader /> : <RemindersListHeader />}
					dataSource={reminders.length ? reminders : []}
					renderItem={(reminder) => <RemindersListItem reminder={reminder} key={reminder._id} />}
				/>
			</SortableContext>
		</DndContext>
	);
});