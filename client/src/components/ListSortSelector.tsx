import { FC, useMemo, memo, MouseEvent, useCallback } from 'react';
import { Dropdown, Select } from 'antd';
import { StyledButton } from 'styled/Button.styles';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { updateList, changeListSort } from 'store/actions/userActions';
import { selectActiveList } from 'store/selectors/activeListSelectors';
import { SortDirectionType, SortFieldType } from 'types/list';
import { sortDirectionOptions, sortFieldOptions } from 'constants/sort';

import type { MenuProps } from 'antd';

export const ListSortSelector: FC = memo(() => {
	const dispatch = useAppDispatch()
	const activeList = useAppSelector(selectActiveList);

	const onSelectClick = (e: MouseEvent<HTMLDivElement>) => {
		e.stopPropagation();
	};

	const onChangeField = useCallback((value: SortFieldType) => {
		dispatch(changeListSort({
			_id: activeList!._id,
			sortField: value,
			sortDirection: activeList!.sortDirection,
		}));
	}, [dispatch, activeList]);

	const onChangeDirection = useCallback((value: SortDirectionType) => {
		dispatch(changeListSort({
			_id: activeList!._id,
			sortField: activeList!.sortField,
			sortDirection: value,
		}));
	}, [dispatch, activeList]);

	const items: MenuProps['items'] = useMemo(() => [
		{
			key: '1',
			label: (
				<Select
					options={sortFieldOptions}
					onClick={onSelectClick}
					onChange={onChangeField}
					value={activeList?.sortField}
					placeholder='Sort field'
					style={{ width: "100%" }}
					size='small'
					variant='borderless'
				/>
			),
		},
		{
			key: '2',
			label: (
				<Select
					options={sortDirectionOptions}
					onClick={onSelectClick}
					onChange={onChangeDirection}
					value={activeList?.sortDirection}
					placeholder='Sort direction'
					size='small'
					variant='borderless'
				/>
			),
		},
	], [activeList]);

	return (
		<Dropdown menu={{ items }} trigger={['click']}>
	        <StyledButton
				type='text'
				size='small'
				$color={activeList?.color}
				$weight={800}
			>
				Sorting
			</StyledButton>
		</Dropdown>
	);
});