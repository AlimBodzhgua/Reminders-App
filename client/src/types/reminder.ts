
interface IReminderDetails {
	date?: string;
	time?: string;
	location?: string;
};

export type PriorityType = 'low' | 'medium' | 'high';

export interface IReminder {
	_id: string;
	title: string;
	notes?: string;
	isCompleted: boolean;
	priority?: PriorityType;
	url?: string;
	details?: IReminderDetails;
};
