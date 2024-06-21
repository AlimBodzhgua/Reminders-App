import { FC, memo, useState, useCallback } from 'react';
import { selectActiveList, selectNumberCompletedReminders } from 'store/selectors/activeListSelectors';
import { clearReminders } from 'store/actions/userActions';
import { useAppSelector, useAppDispatch } from 'hooks/redux';
import { ListHeader } from './ListHeader';

export const RemindersListHeader: FC = memo(() => {
	const activeList = useAppSelector(selectActiveList);
	const dispatch = useAppDispatch();
	const completedNumber = useAppSelector(selectNumberCompletedReminders);
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
			completedNumber={completedNumber}
			title={activeList?.name || ''}
			amount={activeList?.reminders.length || 0}
			color={activeList?.color}
			onClear={onClear}
			onShow={onShow}
		/>
	);
});
