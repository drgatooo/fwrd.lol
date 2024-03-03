import { Disclosure, Transition } from '@headlessui/react';
import { MdOutlineArrowDropDown } from 'react-icons/md';

interface EditorSectionProps {
	label: string | React.ReactNode;
	children: React.ReactNode;
}

export function EditorSection({ label, children }: EditorSectionProps) {
	return (
		<Disclosure>
			{({ open }) => (
				<>
					<Disclosure.Button
						className={
							'flex cursor-pointer items-center justify-between rounded-xl p-2 text-left transition hover:bg-zinc-200 dark:hover:bg-zinc-900'
						}
					>
						<h4>{label}</h4>
						<div className={`transition ${open ? 'rotate-180' : ''} h-min`}>
							<MdOutlineArrowDropDown size={'1.5em'} />
						</div>
					</Disclosure.Button>
					<Transition
						enter="transition duration-100 ease-out"
						enterFrom="transform -translate-y-2 opacity-0"
						enterTo="transform translate-y-0 opacity-100"
						leave="transition duration-75 ease-out"
						leaveFrom="transform translate-y-0 opacity-100"
						leaveTo="transform -translate-y-5 opacity-0"
					>
						<Disclosure.Panel as={'div'} className={'flex flex-col gap-3'}>
							{children}
						</Disclosure.Panel>
					</Transition>
				</>
			)}
		</Disclosure>
	);
}
