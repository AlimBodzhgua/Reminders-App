import { FC, memo } from 'react';
import { Modal } from 'antd';
import { AddListForm } from 'components/AddListForm';

interface AddListModalProps {
	isOpen: boolean;
	onClose: () => void;
}

export const AddListModal: FC<AddListModalProps> = memo((props) => {
	const { isOpen, onClose } = props;

	return (
		<Modal
			title='New list'
			open={isOpen}
			onCancel={onClose}
			footer={null}
		>
			<AddListForm
				onSuccess={onClose}
				onCancel={onClose}
			/>
		</Modal>
	)
});
