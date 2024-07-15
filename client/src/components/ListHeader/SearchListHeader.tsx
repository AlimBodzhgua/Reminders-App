import { FC, memo, useCallback } from 'react';
import { useAppSelector, useAppDispatch } from 'hooks/redux';
import { searchBarActions } from 'store/slices/searchBarSlice';
import { selectSearchBarSearchResult, selectSearchBarValue } from 'store/selectors/searchBarSelectors';
import { ListHeader } from './ListHeader';

export const SearchListHeader: FC = memo(() => {
	const dispatch = useAppDispatch();
	const searchValue = useAppSelector(selectSearchBarValue);
	const searchResult = useAppSelector(selectSearchBarSearchResult);

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
		/>
	);
});
