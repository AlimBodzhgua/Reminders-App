import { Avatar } from 'antd';
import styled from 'styled-components';

interface StyledAvatarProps {
	$bgColor?: string;
	$color?: string;
	$isHover?: boolean;
	$isLoading?: boolean;
}

export const StyledAvatar = styled(Avatar)<StyledAvatarProps>`
	background-color: ${props => props.$bgColor || '#6E667C'};
	color: ${props => props.$color || '#fff'};
	cursor: pointer;
	transition: background-color .3s, color .3s;

	opacity: ${props => props.$isHover ? 0.8 : 1};
	transform: scale(${props => props.$isLoading ? .7 : 1});
	transition: 'transform .2s linear, opacity .2s linear';
`;
