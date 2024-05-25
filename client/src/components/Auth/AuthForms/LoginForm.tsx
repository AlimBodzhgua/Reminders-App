import { FC, memo } from 'react';
import { Form, Input, Button } from 'antd';
import { emailRules, passwordRules } from 'constants/rules';

export const LoginForm: FC = memo(() => {
	const [form] = Form.useForm();

	const onSubmit = () => {
		const email = form.getFieldValue('email');
		const password = form.getFieldValue('password');
		console.log(email, password);
	};

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
				<Input />
			</Form.Item>
			<Form.Item
				label='Password'
				name='password'
				rules={passwordRules}
				tooltip='This field is required.'
			>
				<Input type='password' />
			</Form.Item>
			<Form.Item>
				<Button type='primary' htmlType='submit'>
					Login
				</Button>
			</Form.Item>
		</Form>
	);
});
