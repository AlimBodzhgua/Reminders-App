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
		text-align: left;
	}

	.ant-list-header {
		border-block-end: none;
	}
`