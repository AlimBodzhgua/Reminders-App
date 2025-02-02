import { FC, memo, useMemo, useState, ChangeEvent } from 'react';
import { Flex, Dropdown } from 'antd';
import { useAppSelector } from 'hooks/redux';
import { useHover } from 'hooks/useHover';
import { selectActiveList } from 'store/selectors/activeListSelectors';
import { useListActions } from 'hooks/useListActions';
import { SortableItem } from 'lib/components/SortableItem';
import { StyledButton } from 'styled/Button.styles';
import {
	PushpinOutlined,
	DeleteOutlined,
	EnterOutlined,
} from '@ant-design/icons';
import { ListAvatar } from 'components/ListAvatar/ListAvatar';
import { ListDropdownMenu } from 'components/ListDropdownMenu/ListDropdownMenu';
import DotesIcon from 'assets/icons/dotes.svg';

import type { IList } from 'types/list';
import type { MenuProps } from 'antd';

import {
	StyledListItem,
	StyledExtraItem,
	StyledName,
	StyledInput,
} from './UnpinnedListItem.styles';

interface MyListsItemProps {
	list: IList;
}

export const UnpinnedListItem: FC<MyListsItemProps> = memo(({ list }) => {
	const {
		onRemove,
		onUpdate,
		onTogglePin,
		onSelectList,
	} = useListActions({ list, onEscape: onBlurInput });
	const [value, setValue] = useState<string>(list.name);
	const { isHover, hoverProps} = useHover();
	const [isEdit, setIsEdit] = useState<boolean>(false);
	const [isDeleting, setisDeleting] = useState<boolean>(false);
	const activeList = useAppSelector(selectActiveList);
	const isActive = activeList?._id === list._id;

	const onToggleEdit = () => {
		setIsEdit(prev => !prev);
	};
	
	const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
		setValue(e.target.value);
	};
	
	function onBlurInput() {
		setIsEdit(false);
		setValue(list.name);
	}

	const onSave = () => {
		onUpdate(value, onToggleEdit);
	};

	const handleRemove = async () => {
		setisDeleting(true);
		await onRemove();
		setisDeleting(false);
	};

	const items: MenuProps['items'] = useMemo(() => [
		{ key: '1', label: <PushpinOutlined onClick={onTogglePin} /> },
		{ key: '2', label: <DeleteOutlined onClick={handleRemove} /> },
	], []);

	const hoverExtraContent = (
		<Dropdown menu={{ items }} placement='bottom'>
			<StyledButton
				size='small'
				data-testid='dropdown-menu'
				type='text'
				icon={<DotesIcon />}
				$color='#1677ff'
			/>
		</Dropdown>
	);


	return (
		<SortableItem id={list._id}>
			<ListDropdownMenu listType='unpinned' list={list}>
				<StyledListItem
					actions={[isHover && hoverExtraContent]}
					extra={<StyledExtraItem>{list.reminders.length}</StyledExtraItem>}
					onDoubleClick={onToggleEdit}
					onClick={onSelectList}
					data-testid='unpinned-list-item'
					role='button'
					$bgColor={isActive ? '#d9d9d9' : ''}
					$opacity={isDeleting ? 0.3 : 1}
					{...hoverProps}
				>
					<Flex
						gap='10px'
						align='center'
						justify='space-between'
						style={{ width: '83%' }}
					>
						<Flex align='center' gap='10px'>
							<ListAvatar list={list}/>
							{isEdit ? (
								<StyledInput
									value={value}
									onChange={onChangeInput}
									onBlur={onBlurInput}
									onPressEnter={onSave}
									suffix={<EnterOutlined />}
									variant='borderless'
									data-testid='list-item-input'
									size='small'
									autoFocus
								/>
							) : (
								<StyledName>{list.name}</StyledName>
							)}
						</Flex>
					</Flex>
				</StyledListItem>
			</ListDropdownMenu>
		</SortableItem>
	);
});
