
interface IReminderDetails {
	date: string;
	time: string;
	location: string;
}

export interface IReminder {
	title: string;
	notes: string;
	details?: IReminderDetails;
}

export interface IListReminder {
	id: string;
	name: string;
	icon?: string;
	reminders: Array<IReminder>;
}

export interface IUser {
	id: string;
	login?: string;
	email: string;
	token: string;
	avatarUrl?: string;
	list?: Array<IListReminder>
}