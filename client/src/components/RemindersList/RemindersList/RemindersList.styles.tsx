import { List } from 'antd';
import styled, { IStyledComponent } from 'styled-components';
import type { ListProps } from 'antd';
import type { IReminder } from 'types/reminder';

export const StyledList: IStyledComponent<'web', ListProps<IReminder>> = styled(List)`
	.ant-list-empty-text {
		display: none;
	}
`