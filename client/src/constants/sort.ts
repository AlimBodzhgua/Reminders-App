
export const sortField = {
	name: 'name',
	deadline: 'deadline',
	creation: 'creation',
	priority: 'priority',
} as const;

export const sortDirection = {
	asc: 'asc',
	desc: 'desc',
} as const;

export const sortDirectionOptions = [
	{ value: sortDirection.asc, label: 'ascending' },
	{ value: sortDirection.desc, label: 'descending' },
];

export const sortFieldOptions = [
	{ value: sortField.creation },
	{ value: sortField.name },
	{ value: sortField.deadline },
	{ value: sortField.priority },
];
