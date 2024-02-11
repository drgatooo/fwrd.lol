interface HighlightTextProps extends React.HTMLAttributes<HTMLSpanElement> {
	children: React.ReactNode;
	bg: string;
}

export function Highlight({ children, bg, ...props }: HighlightTextProps) {
	return (
		<span className={`${bg} px-0.5 font-bold text-black dark:text-white`} {...props}>
			{children}
		</span>
	);
}
