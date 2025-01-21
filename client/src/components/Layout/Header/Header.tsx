import { FC, memo, useState, useCallback, useMemo } from 'react';
import { Button, Dropdown, Flex, Space } from 'antd';
import { LoginModal, RegisterModal } from 'components/Auth';
import { selectUserAuthData } from 'store/selectors/userSelectors';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { userActions } from 'store/slices/userSlice';
import { ACTIVE_LIST_LOCALSTORAGE_KEY, USER_LOCALSTORAGE_KEY } from 'constants/localStorage';
import { UserOutlined } from '@ant-design/icons';
import { StyledAvatar } from 'styled/Avatar.styles';
import { StyledHeader, StyledPlusOutlined } from './Header.styles';

import type { MenuProps } from 'antd';

interface HeaderProps {
	onToggleShowForm: () => void;
}

export const Header: FC<HeaderProps> = memo(({ onToggleShowForm }) => {
	const authData = useAppSelector(selectUserAuthData);
	const [isLoginModal, setIsLoginModal] = useState<boolean>(false);
	const [isRegisterModal, setIsRegisterModal] = useState<boolean>(false);
	const dispatch = useAppDispatch();

	const onOpenLogin = () => {
		setIsLoginModal(true);
	};

	const onOpenRegister = () => {
		setIsRegisterModal(true);
	};

	const onCloseRegister = useCallback(() => {
		setIsRegisterModal(false);
	}, []);

	const onCloseLogin = useCallback(() => {
		setIsLoginModal(false);
	}, []);

	const onLogout = useCallback(() => {
		dispatch(userActions.logout());
		localStorage.removeItem(USER_LOCALSTORAGE_KEY);
		localStorage.removeItem(ACTIVE_LIST_LOCALSTORAGE_KEY);
	}, [dispatch]);

	const items: MenuProps['items'] = useMemo(() => [
		{ key: '1', label: <div onClick={onLogout} role='button'>Logout</div> },
	], []);

	return (
		<StyledHeader data-testid='header'>
			<Flex justify='end' align='center' style={{ height: '100%' }}>
				{authData ? (
					<Flex gap='15px'>
						<Button
							type='text'
							icon={<StyledPlusOutlined/>}
							onClick={onToggleShowForm}
						/>
						<Dropdown menu={{ items }} placement='bottom'>
							<StyledAvatar 
								icon={<UserOutlined />}
								alt='user avatar'
								data-testid='user-avatar'
								$bgColor='#fff'
								$color='#282B2B'
							/>
						</Dropdown>
					</Flex>
				) : (
					<Space>
						<Button onClick={onOpenLogin}>Login</Button>
						<Button onClick={onOpenRegister}>Register</Button>
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