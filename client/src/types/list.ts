import { mapListToIcon } from 'constants/iconsList';
import { IReminder } from './reminder';
import { sortField, sortDirection } from 'constants/sort';

export type ListsIconType = keyof typeof mapListToIcon;

export type SortFieldType = keyof typeof sortField;
export type SortDirectionType = keyof typeof sortDirection;

export interface IList {
	_id: string;
	_isMutable: boolean;
	name: string;
	icon: ListsIconType;
	color: string;
	pinned: boolean;
	sortField: SortFieldType;
	sortDirection: SortDirectionType;
	reminders: Array<IReminder>;
};