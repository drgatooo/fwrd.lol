interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	name: string;
	label: string;
	invalid?: boolean;
	message?: string;
	required?: boolean;
	rightIcon?: React.ReactNode;
	containerClassName?: string;
}

export function Input({
	label,
	invalid,
	message,
	required,
	name,
	rightIcon,
	containerClassName,
	...props
}: InputProps) {
	return (
		<>
			<div data-c={'input'} className={containerClassName}>
				<input
					data-c
					data-invalid={invalid}
					data-icon={rightIcon ? 'true' : 'false'}
					className={'peer'}
					name={name}
					id={name}
					{...props}
					placeholder={props.placeholder ?? ' '}
				/>
				<label data-c={'input'} htmlFor={name}>
					{label} {required ? <span className={'text-red-500'}>*</span> : null}
				</label>
				{rightIcon ? (
					<div className={'pointer-events-none absolute right-0 top-7 flex items-center pr-5'}>
						{rightIcon}
					</div>
				) : null}
				{!!message?.length && (
					<p className={`mt-1.5 text-sm font-medium ${invalid ? 'text-red-500' : ''}`}>{message}</p>
				)}
			</div>
		</>
	);
}
