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

import type { IReminder } from 'types/reminder';

import { RemindersListItem } from '../RemindersListItem/RemindersListItem';
import { RemindersListHeader } from './RemindersListHeader';

interface RemindersListProps {
	reminders: IReminder[];
}

export const RemindersList: FC<RemindersListProps> = memo(({reminders}) => {
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
				items={reminders.map((reminder) => reminder._id)}
			>
				<List header={<RemindersListHeader reminders={reminders}/>}>
					{reminders.length ? (
						reminders.map((reminder) => (
							<RemindersListItem reminder={reminder} key={reminder._id} />
						))
					) : ( 
						<div /> 
					)}
				</List>;
			</SortableContext>
		</DndContext>
	);
});