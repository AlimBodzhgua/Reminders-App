import { FC, memo, useState, useCallback, useMemo } from 'react';
import { Button, Dropdown, Flex, Space } from 'antd';
import { LoginModal, RegisterModal } from 'components/Auth';
import { selectUserAuthData } from 'store/selectors/userSelectors';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { userActions } from 'store/slices/userSlice';
import { USER_LOCALSTORAGE_KEY } from 'constants/localStorage';
import { UserOutlined, PlusOutlined } from '@ant-design/icons';
import { StyledHeader } from './Header.styles';
import { StyledAvatar } from 'Styled/Avatar.styles';

import type { MenuProps } from 'antd';

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
		{ key: '1', label: <Button>Profile</Button> },
		{ key: '2', label: <Button onClick={onLogout}>Logout</Button> },
	], []);

	return (
		<StyledHeader>
			<Flex justify='end' align='center' style={{ height: '100%' }}>
				{authData ? (
					<Flex gap='10px'>
						<Button type='text'>
							<PlusOutlined
								style={{ fontSize: '28px', color: '#fff' }}
							/>
						</Button>
						<Dropdown menu={{ items }} placement='bottom'>
							<StyledAvatar 
								icon={<UserOutlined />}
								size='large'
								alt='user avatar'
							/>
						</Dropdown>
					</Flex>
				) : (
					<Space>
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
				)}
			</Flex>
		</StyledHeader>
	);
});