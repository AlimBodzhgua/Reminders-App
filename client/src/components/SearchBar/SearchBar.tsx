import { FC, useEffect, memo, useRef, useCallback } from 'react';
import { Input, Typography } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { useDebounce } from 'hooks/useDebounce';
import { useAppSelector, useAppDispatch } from 'hooks/redux';
import { searchBarActions } from 'store/slices/searchBarSlice';
import { activeListActions } from 'store/slices/activeListSlice';
import { selectSearchBarValue } from 'store/selectors/searchBarSelectors';
import { selectAllReminders } from 'store/selectors/userSelectors';
import { ACTIVE_LIST_LOCALSTORAGE_KEY } from 'constants/localStorage';
import type { InputRef } from 'antd';

export const SearchBar: FC = memo(() => {
	const dispatch = useAppDispatch();
	const searchValue = useAppSelector(selectSearchBarValue);
	const debouncedSearchValue = useDebounce(searchValue);
	const allReminders = useAppSelector(selectAllReminders);
	const inputRef = useRef<InputRef | null>(null);

	const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		dispatch(searchBarActions.setValue(e.target.value));
	};

	const onHotkeyPress = useCallback((e: KeyboardEvent) => {
		const isActive = inputRef.current?.input === document.activeElement;

		if (e.altKey && (e.key === 'k' || e.key === 'л')) {
			isActive ? inputRef.current?.blur() : inputRef.current?.focus();
		} else if (e.key === 'Escape' && isActive) {
			inputRef.current?.blur();
		}
	}, []);

	useEffect(() => {
		window.addEventListener('keydown', onHotkeyPress);

		return () => window.removeEventListener('keydown', onHotkeyPress);
	}, [onHotkeyPress]);

	useEffect(() => {
		if (debouncedSearchValue.length) {
			const searchResult = allReminders.filter(
				(reminder) => reminder.title.includes(debouncedSearchValue)
			);
			dispatch(activeListActions.setActiveList(undefined));
			dispatch(searchBarActions.setSearchResult(searchResult));
		} else {
			dispatch(searchBarActions.setIsSearching(false));
			const list = localStorage.getItem(ACTIVE_LIST_LOCALSTORAGE_KEY);
			list && dispatch(activeListActions.setActiveList(JSON.parse(list))); 
		}
	}, [debouncedSearchValue]);

	return (
		<Input
			addonBefore={<SearchOutlined />}
			suffix={<Typography.Text keyboard>alt + k</Typography.Text>}
			value={searchValue}
			onChange={onSearch}
			ref={inputRef}
			placeholder='Search'
		/>
	);
});