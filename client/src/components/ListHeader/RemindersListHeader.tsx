import { FC, memo, useState, useCallback } from 'react';
import { selectActiveList } from 'store/selectors/activeListSelectors';
import { clearReminders } from 'store/actions/userActions';
import { useAppSelector, useAppDispatch } from 'hooks/redux';
import { ListHeader } from './ListHeader';
import { useActiveList } from 'hooks/useActiveList';
import { countCompletedReminders } from 'utils/utils';

export const RemindersListHeader: FC = memo(() => {
	const activeList = useAppSelector(selectActiveList);
	const { currentList } = useActiveList();
	const dispatch = useAppDispatch();
	const [showForm, setShowForm] = useState<boolean>(false);

	const onShowForm = useCallback(() => {
		setShowForm(true);
	}, []);

	const onShow = useCallback(() => {
		console.log('show');
	}, []);

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
			onShow={onShow}
		/>
	);
});
