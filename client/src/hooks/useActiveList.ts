import { useState, useMemo, useEffect } from 'react';
import { getRemindersListType } from 'utils/utils';
import {
    selectCompletedReminders,
	selectScheduledReminders,
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
	const scheduledReminders = useAppSelector(selectScheduledReminders);
	const [listType, setListType] = useState<RemindersListType>('others');

	const mapToRemindersList: Record<RemindersListType, IReminder[]> = useMemo(() => ({
		todays: todaysReminders,
		flagged: flaggedReminders,
		completed: completedReminders,
		scheduled: scheduledReminders,
		all: allReminders,
		others: activeList?.reminders || [],
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