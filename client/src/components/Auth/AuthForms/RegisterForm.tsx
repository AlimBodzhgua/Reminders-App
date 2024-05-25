import { FC, memo, useCallback } from 'react';
import { Button, Flex, Form, Input } from 'antd';
import { emailRules, loginRules, passwordRules } from 'constants/rules';
import { USER_LOCALSTORAGE_KEY } from 'constants/localStorage';
import { selectUserIsLoading } from 'store/selectors/userSelectors';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { registerUser } from 'store/actions/userActions';
import { IUser } from 'types/user';

export const RegisterForm: FC = memo(() => {
	const [form] = Form.useForm();
	const dispatch = useAppDispatch();
	const isLoading = useAppSelector(selectUserIsLoading);

	const onSubmit = useCallback(async () => {
		const data = {
			email: form.getFieldValue('email'),
			password: form.getFieldValue('password'),
			login: form.getFieldValue('login'),
		};

		const { payload, meta } = await dispatch(registerUser(data));

		if (meta.requestStatus === 'fulfilled') {
			const { token } = payload as IUser;
			localStorage.setItem(USER_LOCALSTORAGE_KEY, token);
		}
	}, [dispatch]);

	const onReset = useCallback(() => {
		form.resetFields();
	}, []);

	return (
		<Form
			form={form}
			onFinish={onSubmit}
			requiredMark={false}
			layout='vertical'
		>
			<Form.Item
				label='Email'
				name='email'
				rules={emailRules}
				tooltip='This field is required'
			>
				<Input type='email' disabled={isLoading}/>
			</Form.Item>
			<Form.Item
				label='Login'
				name='login'
				rules={loginRules}
			>
				<Input type='text' disabled={isLoading}/>
			</Form.Item>
			<Form.Item
				label='Password'
				name='password'
				rules={passwordRules}
				required
				tooltip='This field is required'
			>
				<Input type='password' disabled={isLoading}/>
			</Form.Item>
			<Form.Item>
				<Flex justify='end' gap='8px'>
					<Button
						type='primary'
						htmlType='submit'
						loading={isLoading}
					>
						Register
					</Button>
					<Button
						type='primary'
						htmlType='button'
						onClick={onReset}
						loading={isLoading}
					>
						Reset
					</Button>
				</Flex>
			</Form.Item>
		</Form>
	);
});
