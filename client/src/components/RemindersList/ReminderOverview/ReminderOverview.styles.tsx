import { Typography, Divider, Select, DatePicker, TimePicker } from 'antd';
import styled from 'styled-components';

import type { SelectProps, DatePickerProps } from 'antd';
import type { IStyledComponent } from 'styled-components';
import { basePicker } from 'styled/mixins';

export const StyledReminderOverview = styled.div`
	max-width: 300px;
`;

export const StyledTitle = styled(Typography.Title)`
	&&& {
		margin: 0;
		inset-inline-start: 0;		
	}

	.ant-input {
		padding: 0 0 0 4px;
		border-radius: 0;
		min-height: auto;
	}
`;

export const StyledText = styled(Typography.Text)`

	&&& {
		margin: 0;
		inset-inline-start: 0;		
	}

	.ant-input {
		padding: 0 10px 0 4px;
		border-radius: 0;
		min-height: auto;
	}
`;

export const StyledDivider = styled(Divider)`
	&&& {
		margin: 15px 0;
	}
`;

export const StyledSelect: IStyledComponent<'web', SelectProps> = styled(Select)`
	&&& {
		min-width: 84px;
	}
`;

export const StyledDatePicker: IStyledComponent<'web', DatePickerProps> = styled(DatePicker)`
	${basePicker};
	width: 100%;
`;

export const StyledTimePicker = styled(TimePicker)`
	${basePicker};
	width: 100%;
`;