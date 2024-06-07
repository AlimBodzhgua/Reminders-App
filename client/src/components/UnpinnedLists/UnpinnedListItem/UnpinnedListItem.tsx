import {
	FC,
	useMemo,
	useState,
	useEffect,
	useCallback,
	ChangeEvent,
} from 'react';
import {
	PushpinOutlined,
	DeleteOutlined,
	EnterOutlined,
} from '@ant-design/icons';
import { Flex, Input, Dropdown } from 'antd';
import { useAppSelector } from 'hooks/redux';
import { mapListToIcon } from 'constants/iconsList';
import { useHover } from 'hooks/useHover';
import { StyledAvatar } from 'styled/Avatar.styles';
import { selectActiveList } from 'store/selectors/activeListSelectors';
import { useListActions } from 'hooks/useListActions';
import type { IList } from 'types/list';
import type { MenuProps } from 'antd';

import { StyledListItem, StyledExtraItem, StyledName } from './UnpinnedListItem.styles';
import { StyledDotesIcon } from 'styled/DotesIcon.styles';

interface MyListsItemProps {
	list: IList;
}

export const UnpinnedListItem: FC<MyListsItemProps> = ({ list }) => {
	const { onRemove, onUpdate, onPin, onSelectList} = useListActions(list)
	const [value, setValue] = useState<string>(list.name);
	const [isHover, hoverProps] = useHover();
	const [isEdit, setIsEdit] = useState<boolean>(false);
	const activeList = useAppSelector(selectActiveList);
	const isActive = activeList?._id === list._id;

	useEffect(() => {
		window.addEventListener('keydown', onEscapePress);

		return () => window.removeEventListener('keydown', onEscapePress);
	}, []);


	const onEdit = useCallback(() => {
		setIsEdit(prev => !prev);
	}, []);

	const onBlurInput = useCallback(() => {
		setIsEdit(false);
		setValue(list.name);
	}, []);

	const onChangeInput = useCallback((e: ChangeEvent<HTMLInputElement>) => {
		setValue(e.target.value);
	}, []);

	const onSave = () => {
		onUpdate(value, onEdit);
	}

	const onEscapePress = useCallback((e: KeyboardEvent) => {
		if (e.code === 'Escape') {
			onBlurInput();
		}
	}, [onBlurInput]);


	const items: MenuProps['items'] = useMemo(() => [
		{ key: '1', label: <PushpinOutlined onClick={onPin} /> },
		{ key: '2', label: <DeleteOutlined onClick={onRemove} /> },
	], []);

	const hoverExtraContent = (
		<Dropdown menu={{ items }} placement='bottom'>
			<StyledDotesIcon />
		</Dropdown>
	);

	return (
		<StyledListItem
			actions={[isHover && hoverExtraContent]}
			extra={<StyledExtraItem>{list.reminders.length}</StyledExtraItem >}
			onDoubleClick={onEdit}
			onClick={onSelectList}
			role='button'
			$bgColor={isActive ? '#d9d9d9' : ''}
			{...hoverProps}
		>
			<Flex
				gap='10px'
				align='center'
				justify='space-between'
				style={{ width: '85%' }}
			>
				<Flex align='center' gap='10px'>
					<StyledAvatar
						icon={mapListToIcon[list.icon]}
						$bgColor={list.color}
					/>
					{isEdit ? (
						<Input
							style={{ width: '78%' }}
							onBlur={onBlurInput}
							value={value}
							onChange={onChangeInput}
							suffix={<EnterOutlined />}
							size='small'
							onPressEnter={onSave}
							autoFocus
						/>
					) : (
						<StyledName>{list.name}</StyledName>
					)}
				</Flex>
			</Flex>
		</StyledListItem>
	);
};
