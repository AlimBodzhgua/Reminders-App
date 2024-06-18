import { IList } from '../types/types';
import ListModel from '../models/List';

const today = new ListModel({
	name: 'Today',
	color: 'blue',
	icon: 'UnorderedListOutlined',
	pinned: true,
	isMutable: false,
	reminders: [],
});

const scheduled = new ListModel({
	name: 'Scheduled',
	color: 'red',
	icon: 'CalendarOutlined',
	pinned: true,
	isMutable: false,
	reminders: [],
});

const all = new ListModel({
	name: 'All',
	color: 'grey',
	icon: 'InboxOutlined',
	pinned: true,
	isMutable: false,
	reminders: [],
});

const flagged = new ListModel({
	name: 'Flagged',
	color: '#ff6600',
	icon: 'FlagFilled',
	pinned: true,
	isMutable: false,
	reminders: [],
})

const completed = new ListModel({
	name: 'Completed',
	color: '#000',
	icon: 'CheckOutlined',
	pinned: true,
	isMutable: false,
	reminders: [],
})

export const initialLists: IList[] = [
	today,
	scheduled,
	flagged,
	completed,
	all,
];