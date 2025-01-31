import { FC, memo } from 'react';
import { Button } from 'antd';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { updateList } from 'store/actions/userActions';
import { selectUserIsLoading } from 'store/selectors/userSelectors';
import type { ColorType } from 'constants/colorList';
import type { ListsIconType } from 'types/list';

interface UpdateListButtonProps {
	listId: string;
	color: ColorType;
	icon: ListsIconType;
	name: string;
	onSuccess?: () => void;
}

export const UpdateListButton: FC<UpdateListButtonProps> = memo((props) => {
	const {
		listId,
		color,
		icon,
		name,
		onSuccess,
	} = props;
	const dispatch = useAppDispatch();
	const isLoading = useAppSelector(selectUserIsLoading);

	const onUpdate = async () => {
		await dispatch(updateList({
			_id: listId,
			color: color,
			icon: icon,
			name: name,
		}));

		if (onSuccess) onSuccess();
	};

	return (
		<Button
			type='primary'
			htmlType='submit'
			loading={isLoading}
			onClick={onUpdate}
		>
			update
		</Button>
	);
});
