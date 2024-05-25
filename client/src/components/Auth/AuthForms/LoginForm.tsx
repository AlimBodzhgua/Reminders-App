import { FC, memo, useCallback } from 'react';
import { Form, Input, Button } from 'antd';
import { emailRules, passwordRules } from 'constants/rules';
import { selectUserIsLoading } from 'store/selectors/userSelectors';
import { useAppSelector, useAppDispatch } from 'hooks/redux';
import { loginUser } from 'store/actions/userActions';
import { USER_LOCALSTORAGE_KEY } from 'constants/localStorage';
import { IUser } from 'types/user';

export const LoginForm: FC = memo(() => {
	const [form] = Form.useForm();
	const dispatch = useAppDispatch();
	const isLoading = useAppSelector(selectUserIsLoading);

	const onSubmit = useCallback(async () => {
		const data = {
			email: form.getFieldValue('email'),
			password: form.getFieldValue('password'),
		}
		const { meta, payload } = await dispatch(loginUser(data));

		if (meta.requestStatus === 'fulfilled') {
			const { token } = payload as IUser;
			localStorage.setItem(USER_LOCALSTORAGE_KEY, token);
		}
	}, [dispatch]);

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
				tooltip='This field is required.'
			>
				<Input type='email' disabled={isLoading}/>
			</Form.Item>
			<Form.Item
				label='Password'
				name='password'
				rules={passwordRules}
				tooltip='This field is required.'
			>
				<Input type='password' disabled={isLoading}/>
			</Form.Item>
			<Form.Item>
				<Button
					type='primary'
					htmlType='submit'
					loading={isLoading}
				>
					Login
				</Button>
			</Form.Item>
		</Form>
	);
});
