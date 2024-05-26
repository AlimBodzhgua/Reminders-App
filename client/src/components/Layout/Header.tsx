import { FC, CSSProperties, memo, useState, useCallback, useMemo } from 'react';
import { Button, Dropdown, Flex, Layout, Space } from 'antd';
import { LoginModal, RegisterModal } from 'components/Auth';
import { selectUserAuthData } from 'store/selectors/userSelectors';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { userActions } from 'store/slices/userSlice';
import { USER_LOCALSTORAGE_KEY } from 'constants/localStorage';
import { UserOutlined, PlusSquareOutlined } from '@ant-design/icons';

import type { MenuProps } from 'antd';

const headerStyle: CSSProperties = {
	textAlign: 'center',
	color: '#fff',
	height: 65,
	paddingInline: 48,
	backgroundColor: '#282B2B',
};

const iconStyle: CSSProperties = {
	fontSize: '26px',
	color: '#fff'
}

export const Header: FC = memo(() => {
	const authData = useAppSelector(selectUserAuthData);
	const [isLoginModal, setIsLoginModal] = useState<boolean>(false);
	const [isRegisterModal, setIsRegisterModal] = useState<boolean>(false);
	const dispatch = useAppDispatch();

	const onOpenLogin = useCallback(() => {
		setIsLoginModal(true);
	}, []);

	const onOpenRegister = useCallback(() => {
		setIsRegisterModal(true);
	}, []);

	const onCloseRegister = useCallback(() => {
		setIsRegisterModal(false);
	}, []);

	const onCloseLogin = useCallback(() => {
		setIsLoginModal(false);
	}, []);

	const onLogout = useCallback(() => {
		dispatch(userActions.logout());
		localStorage.removeItem(USER_LOCALSTORAGE_KEY);
	}, [dispatch]);


	const items: MenuProps['items'] = useMemo(() => [
		{
			key: '1',
			label: <Button>Profile</Button>
		},
		{
			key: '2',
			label: <Button onClick={onLogout}>Logout</Button>
		},
	], [])

	return (
		<Layout.Header style={headerStyle}>
			<Flex justify='end' align='center' style={{height: '100%'}}>
				{authData 
					?   <Space size='small'>
							<Dropdown menu={{ items }} placement='bottom'>
								<Button type='text'>
							    	<UserOutlined style={iconStyle}/>
								</Button>
							</Dropdown>
							<Button type='text'>
								<PlusSquareOutlined style={iconStyle}/>
							</Button>
						</Space>
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
