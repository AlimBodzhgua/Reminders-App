import { FormFields } from 'components/AddReminderForm/AddReminderForm';
import dayjs from 'dayjs';

import type { Dayjs } from 'dayjs';
import type { PriorityType } from 'types/reminder';

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
		isCompleted: false,
		isFlagged: false,
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