import { Switch as HLSwitch } from '@headlessui/react';

interface SwitchProps {
	checked: boolean;
	onChange: () => unknown;
	label: string;
	className?: string;
}

export function Switch({ checked, onChange, label, className }: SwitchProps) {
	return (
		<label className={`flex w-max cursor-pointer items-center text-sm ${className}`}>
			<HLSwitch
				checked={checked}
				onChange={onChange}
				className={`${checked ? 'bg-indigo-500' : 'bg-zinc-700'} relative inline-flex h-5 w-10 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white/75`}
			>
				<span
					aria-hidden="true"
					className={`${checked ? 'translate-x-5' : 'translate-x-0'} pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
				/>
			</HLSwitch>
			<span className={'ml-2 w-max'}>{label}</span>
		</label>
	);
}
