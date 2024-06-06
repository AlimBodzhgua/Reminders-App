import {
	FC,
	useRef,
	useMemo,
	useState,
	useEffect,
	useCallback,
	ChangeEvent,
	MouseEvent,
} from 'react';
import {
	PushpinOutlined,
	DeleteOutlined,
	EnterOutlined,
} from '@ant-design/icons';
import { Flex, Input, Dropdown } from 'antd';
import { useAppDispatch } from 'hooks/redux';
import { removeList, updateList } from 'store/actions/userActions';
import { mapListToIcon } from 'constants/iconsList';
import { IList } from 'types/list';
import { useHover } from 'hooks/useHover';
import { activeListActions } from 'store/slices/activeListSlice';
import { StyledListItem, StyledExtraItem } from './UnpinnedListItem.styles';
import { StyledAvatar } from 'Styled/Avatar.styles';
import DotesIcon from 'assets/icons/dotes.svg';

import type { InputRef, MenuProps } from 'antd';

interface MyListsItemProps {
	list: IList;
}

export const UnpinnedListItem: FC<MyListsItemProps> = ({ list }) => {
	const dispatch = useAppDispatch();
	const [value, setValue] = useState<string>(list.name);
	const [isHover, hoverProps] = useHover();
	const [isEdit, setIsEdit] = useState<boolean>(false);
	const inputRef = useRef<InputRef>(null);

	useEffect(() => {
		window.addEventListener('keydown', onEscaprePress);

		return () => window.removeEventListener('keydown', onEscaprePress);
	}, []);

	const onRemove = useCallback(() => {
		dispatch(removeList(list._id));
	}, [dispatch]);

	const onPin = useCallback(() => {
		dispatch(updateList({ _id: list._id, pinned: true }));
	}, [dispatch]);

	const onSelectList = useCallback((e: MouseEvent<HTMLDivElement>) => {
		e.stopPropagation();
		dispatch(activeListActions.setActiveList(list));
	}, [dispatch])

	const onSave = useCallback(async () => {
		const { meta } = await dispatch(updateList({_id: list._id, name: value}));

		if (meta.requestStatus === 'fulfilled') {
			setIsEdit(false);
		}
	}, [dispatch, value]);

	const onEdit = useCallback(() => {
		setIsEdit(true);
	}, []);

	const onBlurInput = useCallback(() => {
		setIsEdit(false);
		setValue(list.name);
	}, []);

	const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
		setValue(e.target.value);
	};

	const onEscaprePress = useCallback((e: KeyboardEvent) => {
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
			<DotesIcon style={{ cursor: 'pointer' }} />
		</Dropdown>
	);

	return (
		<StyledListItem
			actions={[isHover && hoverExtraContent]}
			extra={<StyledExtraItem>{list.reminders.length}</StyledExtraItem >}
			$bgColor={isHover ? '#E9E9E9' : ''}
			onDoubleClick={onEdit}
			onClick={onSelectList}
			role='button'
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
							ref={inputRef}
							onBlur={onBlurInput}
							value={value}
							onChange={onChangeInput}
							suffix={<EnterOutlined />}
							size='small'
							onPressEnter={onSave}
							autoFocus
						/>
					) : (
						<div>{list.name}</div>
					)}
				</Flex>
			</Flex>
		</StyledListItem>
	);
};
