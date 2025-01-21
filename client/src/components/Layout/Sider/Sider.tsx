import { FC, memo, useState, useCallback, useEffect } from 'react';
import { PlusCircleOutlined } from '@ant-design/icons';
import { Button, Flex } from 'antd';
import { PinnedLists } from 'components/PinnedLists/PinnedLists';
import { UnpinnedLists } from 'components/UnpinnedLists';
import { AddListModal } from 'components/AddList/AddListModal';
import { selectUserAuthData, selectUserMounted } from 'store/selectors/userSelectors';
import { useAppSelector } from 'hooks/redux';
import { SearchBar } from 'components/SearchBar/SearchBar';
import { StyledSider } from './Sider.styles';

export const Sider: FC = memo(() => {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const authData = useAppSelector(selectUserAuthData);
	const [isCollapsed, setIsCollapsed] = useState<boolean>(false);
	const mounted = useAppSelector(selectUserMounted);

	useEffect(() => {
		if (mounted) {
			setIsCollapsed(authData ? false : true);
		}
	}, [authData, mounted])

	const onOpenModal = () => {
		setIsOpen(true);
	};

	const onCloseModal = useCallback(() => {
		setIsOpen(false);
	}, []);

	const onToggleCollapse = () => {
		setIsCollapsed((prev) => !prev);
	};

	return (
		<StyledSider
			width={315}
			collapsible={!!authData}
			collapsed={isCollapsed}
			onCollapse={onToggleCollapse}
			collapsedWidth={0}
			data-testid='sider'
		>
			<Flex justify='space-between' vertical style={{ height: '100%' }}>
				<Flex vertical gap='5px'>
					<SearchBar />
					<PinnedLists />
					<UnpinnedLists />
				</Flex>
				<Button
					type='text'
					icon={<PlusCircleOutlined />}
					onClick={onOpenModal}
				>
					Add List
				</Button>
				<AddListModal isOpen={isOpen} onClose={onCloseModal} />
			</Flex>
		</StyledSider>
	);
});
