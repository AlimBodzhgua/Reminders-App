import { FC, memo } from 'react';
import type { ListsIconType } from 'types/list';
import type { ColorType } from 'constants/colorList';
import { BaseListForm } from '../BaseListForm/BaseListForm';
import { UpdateListButton } from './UpdateListButton';

interface UpdateListFormProps {
	listId: string;
	initialIcon: ListsIconType;
	initialColor: ColorType;
	initialName: string;
	onSuccess?: () => void;
	onCancel?: () => void;
}

export const UpdateListForm: FC<UpdateListFormProps> = memo((props) => {
	const {
		listId,
		onSuccess,
		onCancel,
		initialName,
		initialColor,
		initialIcon,
	} = props;

	return (
		<BaseListForm
			onSuccess={onSuccess}
			onCancel={onCancel}
			initialName={initialName}
			initialColor={initialColor}
			initialIcon={initialIcon}
			renderActionButton={(params) => <UpdateListButton listId={listId} {...params}/>}
		/>
	);
});