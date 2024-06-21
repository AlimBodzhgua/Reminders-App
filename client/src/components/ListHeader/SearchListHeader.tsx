import { FC, memo, useState, useCallback } from 'react';
import { useAppSelector, useAppDispatch } from 'hooks/redux';
import { searchBarActions } from 'store/slices/searchBarSlice';
import { selectSearchBarSearchResult, selectSearchBarValue } from 'store/selectors/searchBarSelectors';
import { ListHeader } from './ListHeader';

export const SearchListHeader: FC = memo(() => {
	const dispatch = useAppDispatch();
	const searchValue = useAppSelector(selectSearchBarValue);
	const searchResult = useAppSelector(selectSearchBarSearchResult);
	const [showForm, setShowForm] = useState<boolean>(false);

	const onShowForm = useCallback(() => {
		setShowForm(true);
	}, []);

	const onShow = useCallback(() => {
		console.log('show');
	}, []);

	const onClear = useCallback(() => {
		dispatch(searchBarActions.clearSearchResult());
	}, [dispatch]);

	const title = `Results for "${searchValue}"`;

	return (
		<ListHeader
			completedNumber={0}
			title={title}
			amount={searchResult.length}
			color={'#000'}
			onClear={onClear}
			onShow={onShow}
		/>
	);
});
