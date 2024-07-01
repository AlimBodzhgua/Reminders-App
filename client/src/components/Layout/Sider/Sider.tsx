import { FC, memo, useState, useCallback } from 'react';
import { PlusCircleOutlined } from '@ant-design/icons';
import { Button, Flex } from 'antd';
import { PinnedLists } from 'components/PinnedLists/PinnedLists';
import { UnpinnedLists } from 'components/UnpinnedLists';
import { AddListModal } from 'components/AddList/AddListModal';
import { selectUserAuthData } from 'store/selectors/userSelectors';
import { useAppSelector } from 'hooks/redux';
import { SearchBar } from 'components/SearchBar/SearchBar';
import { StyledSider } from './Sider.styles';

export const Sider: FC = memo(() => {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const authData = useAppSelector(selectUserAuthData);

	const onOpenModal = () => {
		setIsOpen(true);
	};

	const onCloseModal = useCallback(() => {
		setIsOpen(false);
	}, []);

	return (
		<StyledSider
			width={315}
			collapsible
			collapsedWidth={0}
			data-testid='sider'
		>
			<Flex justify='space-between' vertical style={{ height: '100%' }}>
				<Flex vertical gap='5px'>
					<SearchBar />
					<PinnedLists />
					<UnpinnedLists />
				</Flex>
				{authData && 
					<>
						<Button
							type='text'
							icon={<PlusCircleOutlined />}
							onClick={onOpenModal}
						>
							Add List
						</Button>
						<AddListModal
							isOpen={isOpen}
							onClose={onCloseModal}
						/>
					</>
				}
			</Flex>
		</StyledSider>
	);
});
