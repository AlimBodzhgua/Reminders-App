
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

export interface ListReminder {
	id: string;
	name: string;
	icon?: string;
	reminders: Array<IReminder>;
}

export interface IUser {
	id: string;
	login?: string;
	email: string;
	password: string;
	avatarUrl?: string;
	list?: Array<ListReminder>
}