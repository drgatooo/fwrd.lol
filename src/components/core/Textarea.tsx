interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
	name: string;
	label: string;
	invalid?: boolean;
	invalidMessage?: string;
	required?: boolean;
	rightIcon?: React.ReactNode;
	containerClassName?: string;
}

export function Textarea({
	label,
	invalid,
	invalidMessage,
	required,
	name,
	rightIcon,
	containerClassName,
	...props
}: TextareaProps) {
	return (
		<div
			data-c={'textarea'}
			onClick={() => {
				document.getElementById(name)?.focus();
			}}
			className={containerClassName}
		>
			<textarea
				data-c={'textarea'}
				data-invalid={invalid}
				className={'peer'}
				name={name}
				id={name}
				{...props}
				placeholder={props.placeholder ?? ' '}
			/>
			<label data-c={'textarea'} htmlFor={name}>
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
