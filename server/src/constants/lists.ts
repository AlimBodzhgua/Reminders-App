import { IList } from '../types/types';
import ListModel from '../models/List';

const today = new ListModel({
	name: 'Today',
	color: 'blue',
	icon: 'DatabaseOutlined',
	pinned: true,
	reminders: [],
});

const scheduled = new ListModel({
	name: 'Scheduled',
	color: 'red',
	icon: 'CalendarOutlined',
	pinned: true,
	reminders: [],
});

const all = new ListModel({
	name: 'All',
	color: 'grey',
	icon: 'UnorderedListOutlined',
	pinned: true,
	reminders: [],
});

export const initialLists: IList[] = [today, scheduled, all];