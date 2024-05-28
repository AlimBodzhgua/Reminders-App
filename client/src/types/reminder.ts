
interface IReminderDetails {
	date: string;
	time: string;
	location: string;
};

export interface IReminder {
	title: string;
	notes: string;
	details?: IReminderDetails;
};
