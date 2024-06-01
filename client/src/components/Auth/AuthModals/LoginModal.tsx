import { FC, memo } from 'react';
import { LoginForm } from '../AuthForms/LoginForm';
import { Modal } from 'antd';

interface LoginModalProps {
	isOpen: boolean;
	onClose: () => void;
}

export const LoginModal: FC<LoginModalProps> = memo((props) => {
	const {
		isOpen,
		onClose,
	} = props;

	return (
		<Modal
			title='Login'
			open={isOpen}
			onCancel={onClose}
			footer={null}
		>
			<LoginForm onSuccess={onClose} />
		</Modal>
	);
});
