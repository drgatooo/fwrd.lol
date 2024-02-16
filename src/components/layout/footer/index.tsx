import Link from 'next/link';

export function Footer() {
	return (
		<footer
			className={
				'flex flex-col items-center justify-between gap-6 border-t-[1px] border-zinc-600 p-5 text-sm sm:flex-row'
			}
		>
			<span>Hecho por drgato</span>
			<ul className={'flex flex-wrap items-center justify-center gap-5 text-center'}>
				<li>
					<Link href={'/report'}>Reportar</Link>
				</li>
				<li>
					<Link href={'/policy'}>Política de privacidad</Link>
				</li>
			</ul>
		</footer>
	);
}
