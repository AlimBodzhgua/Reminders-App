import { FC, memo } from 'react';
import { RegisterForm } from '../AuthForms/RegisterForm';
import { Modal } from 'antd';

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
			<RegisterForm />
		</Modal>
	)
});
