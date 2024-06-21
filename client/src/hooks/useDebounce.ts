import { useState, useEffect, useRef } from 'react';

export const useDebounce = <T>(value: T, delay = 450): T => {
	const [debouncedValue, setDebouncedValue] = useState<T>(value);
	const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

	useEffect(() => {
		timer.current = setTimeout(() => {
			setDebouncedValue(value);
		}, delay);

		return () => {
			if (timer.current) clearTimeout(timer.current);
		};
	}, [value, delay]);
	
	return debouncedValue;
};