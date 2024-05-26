import { FC, memo, useCallback } from 'react';
import { Flex, Radio } from 'antd';
import {
	UnorderedListOutlined,
	CarOutlined,
	GiftOutlined,
	HomeOutlined,
	MobileOutlined,
	ShoppingCartOutlined,
	MoonOutlined,
	StarOutlined,
	CreditCardOutlined,
	BankOutlined,
	BookOutlined,
	HeartOutlined,
	FundProjectionScreenOutlined,
	DatabaseOutlined,
	MessageOutlined,
} from '@ant-design/icons';

const iconsList = [
	<UnorderedListOutlined/>,
	<GiftOutlined/>,
	<CarOutlined/>,
	<HomeOutlined/>,
	<MobileOutlined />,
	<ShoppingCartOutlined />,
	<MoonOutlined />,
	<StarOutlined />,
	<CreditCardOutlined />,
	<BankOutlined />,
	<BookOutlined />,
	<HeartOutlined />,
	<FundProjectionScreenOutlined />,
	<DatabaseOutlined />,
	<MessageOutlined />

];

interface IconPickerColor {
	color: string;
}

export const IconPicker: FC<IconPickerColor> = memo(({color}) => {

	const onChange = () => {
		console.log('change');
	};

	const renderIconslist = useCallback(() => (
		iconsList.map((icon, index) => (
			<Radio.Button
				key={index}
				value={icon}
				style={{color: color}}
			>
				{icon}
			</Radio.Button>
		))
	), [iconsList, color]);

	return (
		<Radio.Group
			size='small'
			onChange={onChange}
		>
			<Flex wrap gap='small' style={{width: '50%'}}>
				{renderIconslist()}
			</Flex>
		</Radio.Group>   
	);
});