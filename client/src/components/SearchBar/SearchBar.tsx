import { FC, useEffect, memo } from 'react';
import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { useDebounce } from 'hooks/useDebounce';
import { useAppSelector, useAppDispatch } from 'hooks/redux';
import { searchBarActions } from 'store/slices/searchBarSlice';
import { activeListActions } from 'store/slices/activeListSlice';
import { selectSearchBarValue } from 'store/selectors/searchBarSelectors';
import { selectAllReminders, selectUserAuthData } from 'store/selectors/userSelectors';
import { ACTIVE_LIST_LOCALSTORAGE_KEY } from 'constants/localStorage';

export const SearchBar: FC = memo(() => {
	const dispatch = useAppDispatch();
	const searchValue = useAppSelector(selectSearchBarValue);
	const debouncedSearchValue = useDebounce(searchValue);
	const allReminders = useAppSelector(selectAllReminders);

	const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		dispatch(searchBarActions.setValue(e.target.value));
	};

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
			placeholder='Search'
			value={searchValue}
			onChange={onSearch}
		/>
	);
});