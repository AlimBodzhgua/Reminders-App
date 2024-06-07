import {
	FC,
	useState,
	useMemo,
	memo,
	useCallback,
	ChangeEvent,
	MouseEvent,
	useEffect,
} from 'react';
import { Flex, Input, Dropdown, MenuProps } from 'antd';
import { IList } from 'types/list';
import { mapListToIcon } from 'constants/iconsList';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { activeListActions } from 'store/slices/activeListSlice';
import { selectActiveList } from 'store/selectors/activeListSelectors';
import {
	StyledListItem,
	StyledCard,
	StyledTitle,
} from './PinnedListItem.styles'
import { StyledAvatar } from 'Styled/Avatar.styles';
import { useHover } from 'hooks/useHover';
import { removeList, updateList } from 'store/actions/userActions';
import { EnterOutlined, DeleteOutlined, DashOutlined, InfoOutlined } from '@ant-design/icons';
import DotesIcon from 'assets/icons/dotes.svg';
import UnpinIcon from 'assets/icons/unpin.svg';

interface PinnedListItemProps {
	list: IList;
}

export const PinnedListItem: FC<PinnedListItemProps> = memo(({list}) => {
	const [isEdit, setIsEdit] = useState<boolean>(true);
	const [value, setValue] = useState<string>(list.name);
	const [isHover, hoverProps] = useHover();
	const activeList = useAppSelector(selectActiveList);
	const dispatch = useAppDispatch()
	const isActive = activeList?._id === list._id;

	useEffect(() => {
		window.addEventListener('keydown', onEscapePress);

		return () => window.removeEventListener('keydown', onEscapePress);
	}, []);

	const onEdit = useCallback(() => {
		setIsEdit(true);
	}, []);

	const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
		setValue(e.target.value);
	}

	const onBlurInput = useCallback(() => {
		setIsEdit(false);
	}, [])

	const onSave = useCallback(async () => {
		const { meta } = await dispatch(updateList({_id: list._id, name: value}));

		if (meta.requestStatus === 'fulfilled') {
			setIsEdit(false);
		}
	}, [dispatch, value]);

	const onSelectList = () => {
		dispatch(activeListActions.setActiveList(list));
	}

	const onUnpin = (e: MouseEvent<SVGElement>) => {
		e.stopPropagation();
		dispatch(updateList({ _id: list._id, pinned: false }));
	}

	const onRemove = (e: MouseEvent<HTMLDivElement>) => {
		e.stopPropagation();
		dispatch(removeList(list._id));
	}

	const onEscapePress = useCallback((e: KeyboardEvent) => {
		if (e.code === 'Escape') {
			onBlurInput();
		}
	}, [onBlurInput]);

	const items: MenuProps['items'] = useMemo(() => [
		{ key: '1', label: <UnpinIcon onClick={onUnpin} /> },
		{ key: '2', label: <DeleteOutlined onClick={onRemove} /> },
	], []);

	const hoverExtraContent = (
		<Dropdown menu={{ items }} placement='bottom'>
			<DotesIcon style={{ cursor: 'pointer', color: isActive ? '#fff' : '#1677ff' }}/>
		</Dropdown>
	);

	return (
		<StyledListItem onClick={onSelectList} {...hoverProps}>
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
						{isHover && hoverExtraContent}
						<StyledTitle
							level={4}
							$margin='0'
							$isActive={isActive}
						>
							{list.reminders.length}
						</StyledTitle>
					</Flex>
				</Flex>
				{isEdit 
					? (
						<Input
							value={value}
							onChange={onChangeInput}
							onBlur={onBlurInput}
							size='small'
							suffix={<EnterOutlined />}
							style={{marginTop: '5px', padding: '0 2px'}}
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
	);
});
