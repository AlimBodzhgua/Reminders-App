import { useCallback, MouseEvent, useEffect } from 'react';
import { useAppDispatch } from 'hooks/redux';
import { IList } from 'types/list';
import { removeList, updateList } from 'store/actions/userActions';
import { activeListActions } from 'store/slices/activeListSlice';

interface UseListActionsProps {
	list: IList;
	onEscape: () => void;
}

export const useListActions = ({ list, onEscape }: UseListActionsProps) => {
	const dispatch = useAppDispatch();

	useEffect(() => {
		window.addEventListener('keydown', onEscapePress);

		return () => window.removeEventListener('keydown', onEscapePress);
	}, []);

	const onEscapePress = useCallback((e: KeyboardEvent) => {
		if (e.code === 'Escape') {
			onEscape();
		}
	}, [onEscape]);

	const onRemove = useCallback((e: MouseEvent<HTMLDivElement>) => {
		e.stopPropagation();
		dispatch(removeList(list._id));
	}, [dispatch]);

	const onTogglePin = useCallback((e: MouseEvent<SVGElement | HTMLSpanElement>) => {
		e.stopPropagation();
		dispatch(updateList({ _id: list._id, pinned: !list.pinned }));
	}, [dispatch]);


	const onSelectList = useCallback((e: MouseEvent<HTMLDivElement>) => {
		e.stopPropagation();
		dispatch(activeListActions.setActiveList(list));
	}, [dispatch]);

	const onUpdate = useCallback(async (value: string, onSuccess?: () => void) => {
		const { meta } = await dispatch(updateList({_id: list._id, name: value}));

		if (meta.requestStatus === 'fulfilled' && onSuccess) {
			onSuccess();
		}
	}, [dispatch]);

	return { onRemove, onUpdate, onTogglePin, onSelectList };
};