import { FC, memo, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { selectActiveList } from 'store/selectors/activeListSelectors';
import { restrictToParentElement } from '@dnd-kit/modifiers';
import { DndContext, DragEndEvent } from '@dnd-kit/core';
import { SortableContext } from '@dnd-kit/sortable';
import { useSensor, useSensors, PointerSensor } from '@dnd-kit/core';
import { userActions } from 'store/slices/userSlice';
import { updateAllReminders } from 'store/actions/userActions';
import { RemindersListHeader } from 'components/ListHeader/RemindersListHeader';
import { SearchListHeader } from 'components/ListHeader/SearchListHeader';
import { selectSearchBarIsSearching } from 'store/selectors/searchBarSelectors';

import type { IReminder } from 'types/reminder';

import { RemindersListItem } from '../RemindersListItem/RemindersListItem';
import { StyledList } from './RemindersList.styles';

interface RemindersListProps {
	reminders: IReminder[];
}

import { sortByPriority, sortByName, sortByDeadline, sortByCreationDate } from 'utils/utils';
import dayjs from 'dayjs';

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
			dispatch(userActions.moveReminders({
				activeListId: activeList!._id,
				overId: String(e.over!.id),
				activeId: String(e.active.id),
			}));
			dispatch(updateAllReminders());
		}
	};

	useEffect(() => {
		if (reminders) {
			//console.log(sortByName(reminders));
			//console.log(sortByPriority(reminders));
			//console.log(sortByDeadline(reminders));
			console.log(sortByCreationDate(reminders));
		}
	}, [reminders])

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