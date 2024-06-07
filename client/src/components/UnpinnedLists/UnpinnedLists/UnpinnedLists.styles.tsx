import { List } from 'antd';
import styled from 'styled-components';

export const StyledList = styled(List)`
	& .ant-list-item .ant-list-item-action>li {
		display: flex;	
	}

	& .ant-list-item .ant-list-item-action {
		margin-inline-start: 0;
	}

	.ant-list-header {
		padding-block: 6px;
		padding: 4px 8px;
		text-align: left;
		color: #949090;
		border-block-end: none;
	}
`;