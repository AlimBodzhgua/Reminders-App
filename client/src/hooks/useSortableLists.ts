import { useAppDispatch } from 'hooks/redux';
import { useSensor, useSensors, PointerSensor } from '@dnd-kit/core';
import { userActions } from 'store/slices/userSlice';
import { updateAllLists } from 'store/actions/userActions';

import type { DragEndEvent } from '@dnd-kit/core';

export const useSortableLists = () => {
	const dispatch = useAppDispatch();

	const onDragEnd = (e: DragEndEvent) => {
		const { active, over } = e;
		if (active.id !== over!.id) {
			dispatch(userActions.moveLists({
				activeId: String(active.id),
				overId: String(over!.id),
			}));
			dispatch(updateAllLists());
		}
	};

	const sensors = useSensors(
		useSensor(PointerSensor, {
			activationConstraint: {
				distance: 8,
			},
		}),
	);

	return { onDragEnd, sensors };
};