import { FC, CSSProperties, memo } from 'react';
import { Layout } from 'antd';

const contentStyle: CSSProperties = {
	textAlign: 'center',
	minHeight: 120,
	lineHeight: '120px',
	color: '#fff',
	backgroundColor: '#0958d9',
};

export const Content: FC = memo(() => {
	return (
		<Layout.Content style={contentStyle}>Content</Layout.Content>
	)
});
