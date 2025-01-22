import { FC, memo } from 'react';
import { Modal } from 'antd';
import { RegisterForm } from '../AuthForms/RegisterForm';

interface RegisterModalProps {
	isOpen: boolean;
	onClose: () => void;
}

export const RegisterModal: FC<RegisterModalProps> = memo((props) => {
	const {
		isOpen,
		onClose,
	} = props;

	return (
		<Modal
			title='Register'
			open={isOpen}
			onCancel={onClose}
			footer={null}
		>
			<RegisterForm onSuccess={onClose} />
		</Modal>
	);
});
