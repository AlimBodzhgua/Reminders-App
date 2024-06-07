import { Avatar } from 'antd';
import styled from 'styled-components';

interface StyledAvatarProps {
	$bgColor?: string;
	$color?: string;
}

export const StyledAvatar = styled(Avatar)<StyledAvatarProps>`
	&&& {
		background-color: ${props => props.$bgColor || '#6E667C'};
		color: ${props => props.$color || '#fff'};
		cursor: pointer;
		transition: background-color .3s, color .3s;
	}
`;