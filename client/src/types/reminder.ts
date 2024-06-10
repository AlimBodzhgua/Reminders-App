
interface IReminderDetails {
	date: string;
	time: string;
	location: string;
};

export interface IReminder {
	_id: string;
	title: string;
	notes?: string;
	isCompleted: boolean;
	details?: IReminderDetails;
};
