import { FC, memo, useCallback } from 'react';
import { selectActiveList } from 'store/selectors/activeListSelectors';
import { clearReminders } from 'store/actions/userActions';
import { useAppSelector, useAppDispatch } from 'hooks/redux';
import { countCompletedReminders } from 'utils/utils';
import { useActiveList } from 'hooks/useActiveList';
import { ListHeader } from './ListHeader';

export const RemindersListHeader: FC = memo(() => {
	const activeList = useAppSelector(selectActiveList);
	const { currentList } = useActiveList();
	const dispatch = useAppDispatch();

	const onClear = useCallback(() => {
		dispatch(clearReminders());
	}, [dispatch]);

	return (
		<ListHeader
			completedNumber={countCompletedReminders(currentList)}
			title={activeList?.name || ''}
			amount={currentList.length}
			color={activeList?.color}
			onClear={onClear}
		/>
	);
});
