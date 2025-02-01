import { useState, useMemo } from 'react';

type HoverProps = {
	onMouseEnter: () => void;
	onMouseLeave: () => void;
}

type HoverReturnValues = {
	isHover: boolean;
	hoverProps: HoverProps;
}

export const useHover = (): HoverReturnValues => {
	const [isHover, setIsHover] = useState<boolean>(false);

	const hoverProps: HoverProps = useMemo(() => ({
		onMouseEnter: () => setIsHover(true),
		onMouseLeave: () => setIsHover(false),
	}), []);

	return { isHover, hoverProps };
};
