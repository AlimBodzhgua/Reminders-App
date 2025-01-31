import { mapListToIcon } from 'constants/iconsList';
import { sortField, sortDirection } from 'constants/sort';
import { ColorType } from 'constants/colorList';
import { IReminder } from './reminder';

export type ListsIconType = keyof typeof mapListToIcon;

export type SortFieldType = keyof typeof sortField;
export type SortDirectionType = keyof typeof sortDirection;

export interface IList {
	_id: string;
	_isMutable: boolean;
	name: string;
	icon: ListsIconType;
	color: ColorType;
	pinned: boolean;
	sortField: SortFieldType;
	sortDirection: SortDirectionType;
	reminders: Array<IReminder>;
};

export type UpdateListDataType = Pick<IList, '_id'> & Partial<Omit<IList, '_id'>>;
export type ChangeListSortDataType = Pick<IList, '_id' | 'sortField' | 'sortDirection'>;
