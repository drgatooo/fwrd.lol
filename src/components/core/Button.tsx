import { Spinner } from '.';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	children?: React.ReactNode;
	variant?: 'solid' | 'outline' | 'ghost' | 'link';
	color?: ButtonColor;
	loading?: boolean;
	loadingMessage?: string;
	leftIcon?: React.ReactNode;
	rightIcon?: React.ReactNode;
}

export function Button({
	children,
	variant = 'solid',
	color = 'default',
	loading,
	loadingMessage,
	leftIcon,
	rightIcon,
	...props
}: ButtonProps) {
	return (
		<button
			role={'button'}
			data-c
			data-v={variant}
			data-color={color}
			disabled={loading}
			{...props}
		>
			{loading ? <Spinner /> : null}
			{leftIcon && !loading ? leftIcon : <></>}
			{loading && loadingMessage ? loadingMessage : children}
			{rightIcon ?? <></>}
		</button>
	);
}

type ButtonColor = 'default' | 'emerald' | 'rose' | 'indigo' | 'yellow';
