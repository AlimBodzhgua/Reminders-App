import { Layout } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import styled from 'styled-components';


export const StyledHeader = styled(Layout.Header)`
	text-align: center;
	color: #fff;
	height: 65px;
	padding-inline: 48;
	background-color: #d9d9d9;
`;

export const StyledPlusOutlined = styled(PlusOutlined)`
	color: #282B2B;
	font-size: 24px!important;
`;