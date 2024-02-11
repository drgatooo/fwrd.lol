import { Menu } from '@headlessui/react';
import { useRouter } from 'next/router';

export function MenuItem({
	children,
	href,
	...props
}: { children: React.ReactNode; href?: string } & React.ComponentProps<'button'>) {
	const router = useRouter();

	return (
		<Menu.Item>
			{({ active }) => (
				<button
					className={`${active ? 'bg-zinc-500/20' : ''} group transition-none`}
					{...(href ? { onClick: () => router.push(href) } : {})}
					{...props}
				>
					{children}
				</button>
			)}
		</Menu.Item>
	);
}
