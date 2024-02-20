interface ProgressBarProps extends React.HTMLAttributes<HTMLDivElement> {
	progress: number;
	color?: 'default' | 'rose' | 'emerald' | 'indigo' | 'yellow';
	fillClassName?: string;
}

export function Progress({
	progress,
	color = 'default',
	fillClassName,
	...props
}: ProgressBarProps) {
	return (
		<div data-c={'progressBar'} {...props}>
			<div
				data-c={'progressBarFill'}
				data-color={color}
				style={{ width: `${progress * 100}%` }}
				className={fillClassName}
			></div>
		</div>
	);
}
