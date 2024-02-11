interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	name: string;
	label: string;
	invalid?: boolean;
	invalidMessage?: string;
	required?: boolean;
	rightIcon?: React.ReactNode;
}

export function Input({
	label,
	invalid,
	invalidMessage,
	required,
	name,
	rightIcon,
	...props
}: InputProps) {
	return (
		<div data-c={'input'}>
			<input
				data-c
				data-invalid={invalid}
				className={'peer'}
				name={name}
				id={name}
				{...props}
				placeholder={props.placeholder ?? ' '}
			/>
			<label data-c htmlFor={name}>
				{label} {required ? <span className={'text-red-500'}>*</span> : null}
			</label>
			{rightIcon ? (
				<div className={'pointer-events-none absolute inset-y-0 right-0 flex items-center pr-5'}>
					{rightIcon}
				</div>
			) : null}
		</div>
	);
}
