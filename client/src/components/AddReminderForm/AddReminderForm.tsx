import { FC, MouseEvent, memo, useState } from 'react';
import {
	Form,
	Space,
	Input,
	DatePickerProps,
	Popover,
	Flex,
} from 'antd';
import { CloseOutlined, CheckOutlined } from '@ant-design/icons';
import { addReminder } from 'store/actions/userActions';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { createReminder } from 'utils/utils';
import { selectActiveList } from 'store/selectors/activeListSelectors';
import { FlagFilled, EnvironmentFilled } from '@ant-design/icons';
import { isFlaggedList, isTodaysList, isScheduledList } from 'utils/utils';
import { AppMap } from 'components/AppMap/AppMap';
import { colorMap } from 'constants/colorList';
import dayjs from 'dayjs';

import type { Dayjs } from 'dayjs';
import type { FormProps } from 'antd';

import {
	StyledDatePicker,
	StyledTimePicker,
	StyledCheckbox,
	StyledButton,
	StyledFlex,
	StyledForm,
} from './AddReminderForm.styles';

interface AddReminderFormProps {
	onSuccess?: () => void;
}

export interface FormFields {
	title: string;
	isFlagged: boolean;
	notes?: string;
	isCompleted?: boolean;
	date?: Dayjs;
	time?: Dayjs;
	location?: string;
}

export const AddReminderForm: FC<AddReminderFormProps> = memo((props) => {
	const { onSuccess } = props;
	const [form] = Form.useForm();
	const dispatch = useAppDispatch();
	const [location, setLocation] = useState<string | undefined>();
	const [showMap, setShowMap] = useState<boolean>(false);

	const activeList = useAppSelector(selectActiveList);
	const [isFlagged, setIsFlagged] = useState<boolean>(isFlaggedList(activeList!));

	const withInitialDate = isTodaysList(activeList!) || isScheduledList(activeList!);
	const [showTimePicker, setShowTimePicker] = useState<boolean>(withInitialDate);

	const onContentClick = (e: MouseEvent<HTMLFormElement>) => {
		e.stopPropagation();
	};

	const onLocationSelect = (address: string) => {
		setLocation(address);
	};

	const onChangeDate: DatePickerProps['onChange'] = (date, dateString) => {
		if (dateString.length) {
			setShowTimePicker(true);
		} else setShowTimePicker(false);
	};

	const onToggleFlag = () => {
		setIsFlagged((prev) => !prev);
	};

	const onToggleShowMap = () => {
		setShowMap((prev) => !prev);
	};
	
	const onAddReminder: FormProps<FormFields>['onFinish'] = async (values) => {
		const newReminder = createReminder({ ...values, isFlagged, location });

		const { meta } = await dispatch(addReminder({
			listId: activeList!._id,
			reminder: newReminder,
		}));

		if (meta.requestStatus === 'fulfilled' && onSuccess) {
			onSuccess();
		}
	};

	return (
		<StyledForm
			form={form}
			onClick={onContentClick}
			onFinish={onAddReminder}
			data-testid='add-reminder-form'
		>
			<Flex align='start'>
				<Form.Item<FormFields>
					name='isCompleted'
					valuePropName='checked'
				>
					<StyledCheckbox $color={activeList?.color}/>
				</Form.Item>
				<StyledFlex vertical>
					<Form.Item<FormFields> name='title'>
						<Input
							placeholder='Title'
							variant='borderless'
							autoFocus
						/>
					</Form.Item>
					<Form.Item<FormFields> name='notes'>
						<Input
							placeholder='Notes'
							variant='borderless'
						/>
					</Form.Item>
					<Space>
						<Form.Item<FormFields>
							name='date'
							initialValue={withInitialDate && dayjs()}
						>
							<StyledDatePicker
								placeholder='Add Date'
								variant='filled'
								onChange={onChangeDate}
								disabled={isTodaysList(activeList!)}
								allowClear={{ clearIcon: <CloseOutlined /> }}
							/>
						</Form.Item>
						{showTimePicker && 
							<Form.Item<FormFields> name='time'>
								<StyledTimePicker
									placeholder='Add Time'
									variant='filled'
									format='HH:mm'
									allowClear={{ clearIcon: <CloseOutlined /> }}
								/>
							</Form.Item>
						}
						<Popover
							open={showMap}
							placement='top'
							content={<AppMap onLocationSelect={onLocationSelect}/>}
						>
							<StyledButton
								size='small'
								icon={<EnvironmentFilled />}
								onClick={onToggleShowMap}
							>
								Add Location
							</StyledButton>
						</Popover>
						<StyledButton
							size='small'
							$color={isFlagged ? colorMap.orange : colorMap.black}
							onClick={onToggleFlag}
							disabled={isFlaggedList(activeList!)}
							$disableColor={isFlaggedList(activeList!) ? colorMap.orange : undefined}
							data-testid='flag-btn'
						>
							<FlagFilled />
						</StyledButton>
						<StyledButton htmlType='submit' icon={<CheckOutlined />} />
					</Space>
				</StyledFlex>
			</Flex>
		</StyledForm>
	);
});
