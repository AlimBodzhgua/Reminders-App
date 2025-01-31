import { FC, memo } from 'react';
import { BaseListForm } from '../BaseListForm/BaseListForm';
import { AddListButton } from './AddListButton';

interface AddListFormProps {
	onSuccess?: () => void;
	onCancel?: () => void;
}

export const AddListForm: FC<AddListFormProps> = memo((props) => {
	const { onSuccess, onCancel } = props;

	return (
		<BaseListForm
			onSuccess={onSuccess}
			onCancel={onCancel}
			renderActionButton={(params) => <AddListButton {...params}/>}
		/>
	)
})