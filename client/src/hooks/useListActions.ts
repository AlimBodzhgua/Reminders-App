import { useCallback, MouseEvent } from 'react';
import { useAppDispatch } from 'hooks/redux';
import { IList } from 'types/list';
import { removeList, updateList } from 'store/actions/userActions';
import { activeListActions } from 'store/slices/activeListSlice';

export const useListActions = (list: IList) => {
	const dispatch = useAppDispatch();

	const onRemove = useCallback((e: MouseEvent<HTMLDivElement>) => {
		e.stopPropagation();
		dispatch(removeList(list._id));
	}, [dispatch]);

	const onPin = useCallback((e: MouseEvent<HTMLDivElement>) => {
		e.stopPropagation();
		dispatch(updateList({ _id: list._id, pinned: true }));
	}, [dispatch]);

	const onUnpin = useCallback((e: MouseEvent<SVGElement>) => {
		e.stopPropagation();
		dispatch(updateList({ _id: list._id, pinned: false }));
	}, [dispatch]);

	const onSelectList = useCallback((e: MouseEvent<HTMLDivElement>) => {
		e.stopPropagation();
		dispatch(activeListActions.setActiveList(list));
	}, [dispatch])

	const onUpdate = useCallback(async (value: string, onSuccess?: () => void) => {
		const { meta } = await dispatch(updateList({_id: list._id, name: value}));

		if (meta.requestStatus === 'fulfilled' && onSuccess) {
			//setIsEdit(false);
			onSuccess();
		}
	}, [dispatch]);

	return { onRemove, onUpdate, onPin, onUnpin, onSelectList }
}