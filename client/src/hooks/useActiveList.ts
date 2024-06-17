import { useState, useMemo, useEffect } from 'react';
import { getRemindersListType } from 'utils/utils';
import {
    selectCompletedReminders,
	selectFlaggedReminders,
	selectTodaysReminders,
	selectAllReminders,
} from 'store/selectors/userSelectors';
import { selectActiveList } from 'store/selectors/activeListSelectors';

import type { IReminder, RemindersListType } from 'types/reminder';

import { useAppSelector } from './redux';

export const useActiveList = () => {
	const activeList = useAppSelector(selectActiveList);
	const flaggedReminders = useAppSelector(selectFlaggedReminders);
	const todaysReminders = useAppSelector(selectTodaysReminders);
	const completedReminders = useAppSelector(selectCompletedReminders);
	const allReminders = useAppSelector(selectAllReminders);
	const [listType, setListType] = useState<RemindersListType>('others');

	const mapToRemindersList: Record<RemindersListType, IReminder[]> = useMemo(() => ({
		flagged: flaggedReminders,
		todays: todaysReminders,
		completed: completedReminders,
		others: activeList?.reminders || [],
		scheduled: [],
		all: allReminders,
	}), [activeList]);

	useEffect(() => {
		if (activeList) {
			setListType(getRemindersListType(activeList));
		}
	}, [activeList]);

	return {
		currentList: mapToRemindersList[listType],
		listType,
		mapToRemindersList,
	}
};