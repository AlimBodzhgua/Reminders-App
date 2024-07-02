import { useMemo } from 'react';
import {
	selectCompletedReminders,
	selectScheduledReminders,
	selectFlaggedReminders,
	selectTodaysReminders,
	selectAllReminders,
} from 'store/selectors/userSelectors';
import { selectActiveList, selectActiveListType } from 'store/selectors/activeListSelectors';
import { sortReminders } from 'utils/utils';
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
		todays: sortReminders(todaysReminders, activeList?.sortField, activeList?.sortDirection),
		flagged: sortReminders(flaggedReminders, activeList?.sortField, activeList?.sortDirection),
		completed: sortReminders(completedReminders, activeList?.sortField, activeList?.sortDirection),
		scheduled: sortReminders(scheduledReminders, activeList?.sortField, activeList?.sortDirection),
		all: sortReminders(allReminders, activeList?.sortField, activeList?.sortDirection),
		others: activeList?.reminders || [],
	}), [activeList]);

	return {
		currentList: mapToRemindersList[listType],
		listType,
		mapToRemindersList,
	};
};