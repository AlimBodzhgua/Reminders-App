import { useMemo } from 'react';
import {
    selectCompletedReminders,
	selectScheduledReminders,
	selectFlaggedReminders,
	selectTodaysReminders,
	selectAllReminders,
} from 'store/selectors/userSelectors';
import { selectActiveList, selectActiveListType } from 'store/selectors/activeListSelectors';

import type { IReminder, RemindersListType } from 'types/reminder';

import { useAppSelector } from './redux';

export const useActiveList = () => {
	const activeList = useAppSelector(selectActiveList);
	const flaggedReminders = useAppSelector(selectFlaggedReminders);
	const todaysReminders = useAppSelector(selectTodaysReminders);
	const completedReminders = useAppSelector(selectCompletedReminders);
	const allReminders = useAppSelector(selectAllReminders);
	const scheduledReminders = useAppSelector(selectScheduledReminders);
	const listType = useAppSelector(selectActiveListType) || 'others';

	const mapToRemindersList: Record<RemindersListType, IReminder[]> = useMemo(() => ({
		todays: todaysReminders,
		flagged: flaggedReminders,
		completed: completedReminders,
		scheduled: scheduledReminders,
		all: allReminders,
		others: activeList?.reminders || [],
	}), [activeList]);

	return {
		currentList: mapToRemindersList[listType],
		listType,
		mapToRemindersList,
	}
};