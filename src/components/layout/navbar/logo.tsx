import Link from 'next/link';

export function NavLogo() {
	return (
		<Link
			className={'text-2xl font-black transition hover:text-rose-400 hover:no-underline '}
			href={'/'}
		>
			fwrd.
		</Link>
	);
}
