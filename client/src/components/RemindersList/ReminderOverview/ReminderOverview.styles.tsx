import { Typography, Divider, Select } from 'antd';
import styled from 'styled-components';

import type { SelectProps } from 'antd';
import type { IStyledComponent } from 'styled-components';

export const StyledReminderOverview = styled.div`
	max-width: 300px;
`

export const StyledTitle = styled(Typography.Title)`
	&&& {
		margin: 0;
	}
`

export const StyledDivider = styled(Divider)`
	&&& {
		margin: 15px 0;
	}
`

export const StyledSelect: IStyledComponent<'web', SelectProps> = styled(Select)`
	&&& {
		min-width: 84px;
	}
`