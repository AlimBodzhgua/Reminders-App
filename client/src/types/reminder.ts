
interface IReminderDetails {
	date?: string;
	time?: string;
	location?: string;
};

export type PriorityType = 'low' | 'medium' | 'high';

export interface IReminder {
	_id: string;
	title: string;
	isCompleted: boolean;
	isFlagged: boolean;
	url?: string;
	notes?: string;
	priority?: PriorityType;
	details?: IReminderDetails;
};

export type RemindersListType = 'todays' | 'scheduled' | 'all' | 'flagged' | 'others';
