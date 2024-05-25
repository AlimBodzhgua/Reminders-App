import { FC, CSSProperties, memo, useState } from 'react';
import { Button, Flex, Layout, Space } from 'antd';
import { LoginModal, RegisterModal } from 'components/Auth';

const headerStyle: CSSProperties = {
	textAlign: 'center',
	color: '#fff',
	height: 65,
	paddingInline: 48,
	backgroundColor: '#282B2B',
};

export const Header: FC = memo(() => {
	const [isAuth, setIsAuth] = useState<boolean>(true);
	const [isLoginModal, setIsLoginModal] = useState<boolean>(false);
	const [isRegisterModal, setIsRegisterModal] = useState<boolean>(false);

	const onLogout = () => {
		setIsAuth(false);
	};

	const onOpenLogin = () => {
		setIsLoginModal(true);
	};

	const onOpenRegister = () => {
		setIsRegisterModal(true);
	};

	const onCloseRegister = () => {
		setIsRegisterModal(false);
	};

	const onCloseLogin = () => {
		setIsLoginModal(false);
	};


	return (
		<Layout.Header style={headerStyle}>
			<Flex justify='end' align='center' style={{height: '100%'}}>
				{isAuth 
					?   <Button onClick={onLogout}>Logout</Button>
					:   <Space>
						<Button onClick={onOpenLogin}>Login</Button>
						<Button onClick={onOpenRegister}>Regiser</Button>
						<LoginModal
							isOpen={isLoginModal}
							onClose={onCloseLogin}
						/>
						<RegisterModal
							isOpen={isRegisterModal}
							onClose={onCloseRegister}
						/>
					</Space>
				}
			</Flex>
		</Layout.Header>
	);
});
