import {
	FC,
	useState,
	useMemo,
	memo,
	useCallback,
	ChangeEvent,
} from 'react';
import { Flex, Dropdown, notification } from 'antd';
import { mapListToIcon } from 'constants/iconsList';
import { useAppSelector } from 'hooks/redux';
import { selectActiveList } from 'store/selectors/activeListSelectors';
import { StyledAvatar } from 'styled/Avatar.styles';
import { StyledButton } from 'styled/Button.styles';
import { useHover } from 'hooks/useHover';
import { EnterOutlined, DeleteOutlined } from '@ant-design/icons';
import { useListActions } from 'hooks/useListActions';
import { SortableItem } from 'lib/components/SortableItem';
import { useActiveList } from 'hooks/useActiveList';
import { getRemindersListType } from 'utils/utils';
import UnpinIcon from 'assets/icons/unpin.svg';
import DotesIcon from 'assets/icons/dotes.svg';

import type { MenuProps } from 'antd';
import type { IList } from 'types/list';

import {
	StyledListItem,
	StyledCard,
	StyledTitle,
	StyledInput
} from './PinnedListItem.styles';

interface PinnedListItemProps {
	list: IList;
}

export const PinnedListItem: FC<PinnedListItemProps> = memo(({ list }) => {
	const [api, contextHolder] = notification.useNotification();
	const [isEdit, setIsEdit] = useState<boolean>(false);
	const [value, setValue] = useState<string>(list.name);
	const [isHover, hoverProps] = useHover();
	const activeList = useAppSelector(selectActiveList);
	const isActive = activeList?._id === list._id;
	const {
		onRemove,
		onUpdate,
		onTogglePin,
		onSelectList,
	} = useListActions({list, onEscape: onBlurInput});
	const { mapToRemindersList } = useActiveList();
	
	const amount = getRemindersListType(list) === 'others' 
		? list.reminders.length
		: mapToRemindersList[getRemindersListType(list)].length;

	function onBlurInput() {
		setIsEdit(false);
		setValue(list.name);
	}

	const openNotification = () => {
		api['info']({
			message: 'Immutable list',
			description: 'Note that Today, Scheduled, All, Flagged are immutable lists',
			placement: 'topRight'
		});
	};

	const onEdit = useCallback(() => {
		if (list._isMutable) {
			setIsEdit(prev => !prev);
		} else openNotification();
	}, []);

	const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
		setValue(e.target.value);
	};

	const onSave = () => {
		onUpdate(value, onEdit);
	};

	const items: MenuProps['items'] = useMemo(() => [
		{ key: '1', label: <UnpinIcon onClick={onTogglePin} /> },
		{ key: '2', label: <DeleteOutlined onClick={onRemove} /> },
	], []);

	const hoverExtraContent = (
		<Dropdown menu={{ items }} placement='bottom'>
			<StyledButton
				size='small'
				type='text'
				icon={<DotesIcon />}
				$color={isActive ? '#fff' : '#1677ff'}
				$hoverBgColor={'inherit'}
			/>
		</Dropdown>
	);

	return (
		<SortableItem id={list._id} wrapperWidth='49%'>
			{contextHolder}
			<StyledListItem
				onClick={onSelectList}
				{...hoverProps}
			>
				<StyledCard
					type='inner'
					$bgColor={isActive ? activeList.color : '#D0D0D0'}
					size='small'
				>
					<Flex align='center' justify='space-between'>
						<StyledAvatar
							icon={mapListToIcon[list.icon]}
							$bgColor={isActive ? '#fff' : list.color}
							$color={isActive ? list.color : '#fff'}
							size={28}
						/>
						<Flex align='center' gap='5px'>
							{(isHover && list._isMutable) && hoverExtraContent}
							<StyledTitle
								level={4}
								$margin='0'
								$isActive={isActive}
							>
								{amount}
							</StyledTitle>
						</Flex>
					</Flex>
					{isEdit 
						? (
							<StyledInput
								value={value}
								onChange={onChangeInput}
								onBlur={onBlurInput}
								size='small'
								suffix={<EnterOutlined />}
								autoFocus
								onPressEnter={onSave}
							/>
						) : (
							<StyledTitle
								level={5}
								onDoubleClick={onEdit}
								$margin='5px 0 0 0'
								$align='left'
								$isActive={isActive}
								$weight={500}
							>
								{list.name}
							</StyledTitle>
						)
					}
				</StyledCard>
			</StyledListItem>
		</SortableItem>
	);
});
