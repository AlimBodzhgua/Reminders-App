import { FormFields } from 'components/AddReminderForm/AddReminderForm';
import dayjs from 'dayjs';

import type { Dayjs } from 'dayjs';
import type { IReminder, PriorityType, RemindersListType } from 'types/reminder';
import type { IList } from 'types/list';

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
	return (list.name === 'Flagged' && !list.isMutable);
};

export const isTodaysList = (list: IList) => {
	return (list.name === 'Today' && !list.isMutable);
};

export const isAllList = (list: IList) => {
	return (list.name === 'All' && !list.isMutable);
};

export const isScheduledList = (list: IList) => {
	return (list.name === 'Scheduled' && !list.isMutable);
};

export const isCompletedList = (list: IList) => {
	return (list.name === 'Completed' && !list.isMutable);
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
