import { FormFields } from 'components/AddReminderForm/AddReminderForm';
import { sortDirection } from 'constants/sort';
import dayjs from 'dayjs';

import type { Dayjs } from 'dayjs';
import type { IList, SortDirectionType, SortFieldType } from 'types/list';
import type {
	IReminder,
	PriorityType,
	RemindersListType,
} from 'types/reminder';

export const toDateString = (date: Dayjs) => {
	return dayjs(date).format('YYYY.MM.DD').toString();
};

export const toTimeString = (time: Dayjs) => {
	return dayjs(time).format('HH:mm').toString();
};

export const createReminder = (values: FormFields) => {
	return {
		title: values.title,
		notes: values.notes,
		isCompleted: values.isCompleted || false,
		isFlagged: values.isFlagged,
		details: {
			...(values.date && { date: toDateString(values.date) }),
			...(values.time && { time: toTimeString(values.time) }),
		},
	};
};

export const isDateBefore = (date: string | undefined, time: string | undefined) => {
	const dateString = `${dayjs(date).format('YYYY-MM-DD')} ${time}`;
	return dayjs(dateString).isBefore(dayjs());
};

export const getPriorityValue = (priority: PriorityType) => {
	switch (priority) {
	case 'low':
		return '!';
	case 'medium':
		return '!!';
	case 'high':
		return '!!!';
	}
};

export const isFlaggedList = (list: IList) => {
	return (list.name === 'Flagged' && !list._isMutable);
};

export const isTodaysList = (list: IList) => {
	return (list.name === 'Today' && !list._isMutable);
};

export const isAllList = (list: IList) => {
	return (list.name === 'All' && !list._isMutable);
};

export const isScheduledList = (list: IList) => {
	return (list.name === 'Scheduled' && !list._isMutable);
};

export const isCompletedList = (list: IList) => {
	return (list.name === 'Completed' && !list._isMutable);
};

export const getRemindersListType = (list: IList): RemindersListType => {
	if (isFlaggedList(list)) {
		return 'flagged';
	} else if (isTodaysList(list)) {
		return 'todays';
	} else if (isScheduledList(list)) {
		return 'scheduled';
	} else if (isAllList(list)) {
		return 'all';
	} else if (isCompletedList(list)) {
		return 'completed';
	} else return 'others';
};

export const countCompletedReminders = (reminders: IReminder[]) => {
	const completed = reminders.filter(reminder => reminder.isCompleted);
	return completed.length;
};

export const toPriorityLevel = (priority: PriorityType) => {
	switch (priority) {
	case 'low':
		return 1;
	case 'medium':
		return 2;
	case 'high':
		return 3;
	}
};

export const sortByName = (
	reminders: IReminder[],
	direction: SortDirectionType = sortDirection.asc,
) => {
	if (direction === 'asc') {
		return [...reminders].sort((a, b) => a.title.localeCompare(b.title));
	} else {
		return [...reminders].sort((a, b) => b.title.localeCompare(a.title));
	}
};

export const sortByPriority = (
	reminders: IReminder[],
	direction: SortDirectionType = sortDirection.asc
) => {
	const withPriorities = reminders.filter(reminder => reminder.priority);
	const withoutPriorities = reminders.filter(reminder => !reminder.priority);

	if (direction === 'asc') {
		return [...withPriorities]
			.sort((a, b) => toPriorityLevel(a.priority!) > toPriorityLevel(b.priority!) ? -1 : 1)
			.concat(withoutPriorities);
	} else {
		return [...withPriorities]
			.sort((a, b) => toPriorityLevel(a.priority!) < toPriorityLevel(b.priority!) ? -1 : 1)
			.concat(withoutPriorities);
	}
};

export const sortByDeadline = (
	reminders: IReminder[],
	direction: SortDirectionType = sortDirection.asc
) => {
	const withDate = reminders.filter(reminder => reminder.details?.date);
	const withoutDate = reminders.filter(reminder => !reminder.details);

	if (direction === 'asc') {
		return [...withDate]
			.sort((a, b) => dayjs(a.details!.date).isAfter(b.details!.date) ? -1 : 1)
			.concat(withoutDate);
	} else {
		return [...withDate]
			.sort((a, b) => dayjs(a.details!.date).isBefore(b.details!.date) ? -1 : 1)
			.concat(withoutDate);
	}
};

export const sortByCreationDate = (
	reminders: IReminder[],
	direction: SortDirectionType = sortDirection.asc
) => {
	if (direction === 'asc') {
		return [...reminders].sort((a, b) => dayjs(a.createdAt).isAfter(b.createdAt) ? -1 : 1);
	} else {
		return [...reminders].sort((a, b) => dayjs(a.createdAt).isBefore(b.createdAt) ? -1 : 1);
	}
};


export const sortReminders = (
	reminders: IReminder[],
	sortField: SortFieldType,
	sortDirection: SortDirectionType,
) => {
	switch (sortField) {
	case 'name':
		return sortByName(reminders, sortDirection);
	case 'priority':
		return sortByPriority(reminders, sortDirection);
	case 'creation':
		return sortByCreationDate(reminders, sortDirection);
	case 'deadline':
		return sortByDeadline(reminders, sortDirection);		
	}
};