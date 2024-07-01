import { FC, useState, memo, useCallback } from 'react';
import { useAppSelector } from 'hooks/redux';
import { selectSearchBarIsSearching } from 'store/selectors/searchBarSelectors';
import { selectActiveListType } from 'store/selectors/activeListSelectors';
import { Layout } from 'antd';

import { Content } from '../Content/Content';
import { Header } from '../Header/Header';
import { Sider } from '../Sider/Sider';
import { StyledLayout } from './AppLayout.styles';

export const AppLayout: FC = memo(() => {
	const [showForm, setShowForm] = useState<boolean>(false);
	const isSearching = useAppSelector(selectSearchBarIsSearching);
	const listType = useAppSelector(selectActiveListType);

	const onToggleShowForm = useCallback(() => {
		if (listType !== 'completed' && listType !== 'all' && !isSearching) {
			setShowForm(prev => !prev);
		}
	}, []);

	return (
		<StyledLayout>
			<Sider />
			<Layout>
				<Header onToggleShowForm={onToggleShowForm} />
				<Content showForm={showForm} onToggleShowForm={onToggleShowForm} />
			</Layout>
		</StyledLayout>
	);
});