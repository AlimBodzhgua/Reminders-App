import { FC, memo } from 'react';
import { Modal } from 'antd';
import { ListsIconType } from 'types/list';
import { ColorType } from 'constants/colorList';
import { UpdateListForm } from './UpdateListForm';

interface UpdateListModalProps {
	listId: string;
	isOpen: boolean;
	initialIcon: ListsIconType;
	initialColor: ColorType;
	initialName: string;
	onClose: () => void;
}

export const UpdateListModal: FC<UpdateListModalProps> = memo((props) => {
	const {
		isOpen,
		onClose,
		listId,
		initialName,
		initialColor,
		initialIcon,
	} = props;

	return (
		<Modal
			title='New list'
			open={isOpen}
			onCancel={onClose}
			footer={null}
		>
			<UpdateListForm
				initialName={initialName}
				initialColor={initialColor}
				initialIcon={initialIcon}
				listId={listId}
				onSuccess={onClose}
				onCancel={onClose}
			/>
		</Modal>
	);
});