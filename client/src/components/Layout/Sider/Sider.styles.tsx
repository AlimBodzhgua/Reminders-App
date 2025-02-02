import { Layout } from 'antd';
import styled from 'styled-components';

export const StyledSider = styled(Layout.Sider)`
	& {
		text-align: center;
		color: #E9E9E9;
		background-color: #F5F6F7!important;
		padding: 35px 12px;
		position: relative;
	}

	.ant-layout-sider-zero-width-trigger {
		top: 12px;
		background-color: #F5F6F7;
		color: #000;
	}
`;