import { FC, ReactNode } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface SortableItemProps {
	id: string | number;
	children: ReactNode;
	wrapperWidth?: string;
	wrapperHeight?: string;
}

export const SortableItem: FC<SortableItemProps> = (props) => {
	const {
		id,
		children,
		wrapperWidth,
		wrapperHeight,
	} = props;
	const {
		attributes,
		listeners,
		setNodeRef,
		transform,
		transition,
	} = useSortable({id});

	const style = {
		transform: CSS.Transform.toString(transform),
		transition,
		width: wrapperWidth,
		height: wrapperHeight,
	};

	return (
		<div ref={setNodeRef} style={style} {...attributes} {...listeners}>
			{children}
		</div>
	)
}