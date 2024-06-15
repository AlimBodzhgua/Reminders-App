import { FC, memo } from 'react';
import { List } from 'antd';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { selectActiveList } from 'store/selectors/activeListSelectors';
import { restrictToParentElement } from '@dnd-kit/modifiers';
import { DndContext, DragEndEvent } from '@dnd-kit/core';
import { SortableContext } from '@dnd-kit/sortable';
import { useSensor, useSensors, PointerSensor } from '@dnd-kit/core';
import { userActions } from 'store/slices/userSlice';
import { updateAllReminders } from 'store/actions/userActions';

import { RemindersListItem } from '../RemindersListItem/RemindersListItem';
import { RemindersListHeader } from './RemindersListHeader';

export const RemindersList: FC = memo(() => {
	const activeList = useAppSelector(selectActiveList);
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

	return (
		<DndContext
			onDragEnd={onDragEnd}
			modifiers={[restrictToParentElement]}
			sensors={sensors}
		>
			<SortableContext
				items={activeList!.reminders.map((reminder) => reminder._id)}
			>
				<List header={<RemindersListHeader />}>
					{activeList && activeList.reminders.map((reminder) => (
						<RemindersListItem
							reminder={reminder}
							key={reminder._id}
						/>
					))}			
				</List>
			</SortableContext>
		</DndContext>
	);
});