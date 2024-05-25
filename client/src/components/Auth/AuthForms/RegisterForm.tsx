import { FC, memo } from 'react';
import { Button, Flex, Form, Input } from 'antd';
import { emailRules, loginRules, passwordRules } from 'constants/rules';

export const RegisterForm: FC = memo(() => {
	const [form] = Form.useForm();

	const onSubmit = () => {
		const email = form.getFieldValue('email');
		const password = form.getFieldValue('password');
		const login = form.getFieldValue('login');
		console.log(email, password, login);
	}

	const onReset = () => {
		form.resetFields();
	}

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
				<Input />
			</Form.Item>
			<Form.Item
				label='Login'
				name='login'
				rules={loginRules}
			>
				<Input />
			</Form.Item>
			<Form.Item
				label='Password'
				name='password'
				rules={passwordRules}
				required
				tooltip='This field is required'
			>
				<Input type='password' />
			</Form.Item>
			<Form.Item>
				<Flex justify='end' gap='8px'>
					<Button type='primary' htmlType='submit'>
						Register
					</Button>
					<Button
						type='primary'
						htmlType='button'
						onClick={onReset}
					>
						Reset
					</Button>
				</Flex>
		    </Form.Item>
		</Form>
	)
});
