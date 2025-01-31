import { FC, memo } from 'react';
import { Button } from 'antd';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { addList } from 'store/actions/userActions';
import { selectUserIsLoading } from 'store/selectors/userSelectors';
import { activeListActions } from 'store/slices/activeListSlice';
import type { ColorType } from 'constants/colorList';
import type { IList, ListsIconType } from 'types/list';

interface AddListButtonProps {
	color: ColorType;
	icon: ListsIconType;
	name: string;
	onSuccess?: () => void;
}

export const AddListButton: FC<AddListButtonProps> = memo((props) => {
	const {
		name,
		color,
		icon,
		onSuccess,
	} = props;
	const dispatch = useAppDispatch();
	const isLoading = useAppSelector(selectUserIsLoading);

	const onAddList = async () => {
		const { meta, payload } = await dispatch(addList({
			name: name,
			color: color,
			icon: icon,
		}));

		if (meta.requestStatus === 'fulfilled') {
			dispatch(activeListActions.setActiveList(payload as IList));

			if (onSuccess) onSuccess();
		}
	};

	return (
		<Button
			type='primary'
			htmlType='submit'
			loading={isLoading}
			onClick={onAddList}
		>
			add
		</Button>
	);
});