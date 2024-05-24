import { FC, memo } from 'react';
import { Form, Input } from 'antd';

export const LoginForm: FC = memo(() => {
	return (
		<Form layout='vertical'>
			<Form.Item label='email'>
				<Input />
			</Form.Item>
			<Form.Item label='password'>
				<Input type='password' />
			</Form.Item>
		</Form>
	)
});
