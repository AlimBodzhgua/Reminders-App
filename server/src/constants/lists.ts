import { IList } from '../types/types';
import ListModel from '../models/List';

const today = new ListModel({
	name: 'Today',
	color: 'blue',
	icon: 'UnorderedListOutlined',
	pinned: true,
	_isMutable: false,
	sortField: 'creation',
	sortDirection: 'asc',
	reminders: [],
});

const scheduled = new ListModel({
	name: 'Scheduled',
	color: 'red',
	icon: 'CalendarOutlined',
	pinned: true,
	_isMutable: false,
	sortField: 'creation',
	sortDirection: 'asc',
	reminders: [],
});

const all = new ListModel({
	name: 'All',
	color: 'grey',
	icon: 'InboxOutlined',
	pinned: true,
	_isMutable: false,
	sortField: 'creation',
	sortDirection: 'asc',
	reminders: [],
});

const flagged = new ListModel({
	name: 'Flagged',
	color: '#ff6600',
	icon: 'FlagFilled',
	pinned: true,
	isMutable: false,
	sortField: 'creation',
	sortDirection: 'asc',
	reminders: [],
})

const completed = new ListModel({
	name: 'Completed',
	color: '#000',
	icon: 'CheckOutlined',
	pinned: true,
	_isMutable: false,
	sortField: 'creation',
	sortDirection: 'asc',
	reminders: [],
})

export const initialLists: IList[] = [
	today,
	scheduled,
	flagged,
	completed,
	all,
];