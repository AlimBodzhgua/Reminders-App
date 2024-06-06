import { FC, memo, useState, useCallback } from 'react';
import { SearchOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { Input, Button, Flex } from 'antd';
import { PinnedLists } from 'components/PinnedLists/PinnedLists';
import { UnpinnedLists } from 'components/UnpinnedLists/UnpinnedLists';
import { AddListModal } from 'components/AddListModal';
import { StyledSider } from './Sider.styles'


export const Sider: FC = memo(() => {
	const [searchValue, setSearchValue] = useState<string>('');
	const [isOpen, setIsOpen] = useState<boolean>(false);

	const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchValue(e.target.value);
	};

	const onOpenModal = () => {
		setIsOpen(true);
	};

	const onCloseModal = useCallback(() => {
		setIsOpen(false);
	}, []);

	return (
		<StyledSider width={315}>
			<Flex vertical gap='5px'>
				<Input
					addonBefore={<SearchOutlined />}
					placeholder='Search'
					value={searchValue}
					onChange={onSearch}
				/>
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
		</StyledSider>
	);
});