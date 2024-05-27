import { IList } from '../types/types';
import ListModel from '../models/List';

const today = new ListModel({
	name: 'Today',
	color: 'blue',
	icon: 'qwe',
	pinned: true,
	reminders: [],
})

const scheduled = new ListModel({
	name: 'Scheduled',
	color: 'red',
	icon: 'asd',
	pinned: true,
	reminders: [],
})

const all = new ListModel({
	name: 'All',
	color: 'grey',
	icon: 'zxc',
	pinned: true,
	reminders: [],
})

export const initialLists: IList[] = [today, scheduled, all];