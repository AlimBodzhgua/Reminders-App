import { FC, memo } from 'react';
import { Form, Input } from 'antd';

export const RegisterForm: FC = memo(() => {
	return (
		<Form layout='vertical'>
			<Form.Item label='Login'>
				<Input />
			</Form.Item>
			<Form.Item label='Email'>
				<Input />
			</Form.Item>
			<Form.Item label='Password'>
				<Input type='password' />
			</Form.Item>
		</Form>
	)
});
