import Image from 'next/image';
import type { LIBConfig } from '@/hooks/useLIBConfig';
import type { LIBLink } from '@/types';
import Link from 'next/link';
import { socialIcon } from '@/lib/socials';

export function LIBContent({ data, links }: { data: LIBConfig; links: LIBLink[] }) {
	return (
		<>
			{data.image && (
				<Image
					src={data.image}
					width={96}
					height={96}
					className={'aspect-square rounded-full object-cover'}
					alt={data.title}
				/>
			)}
			<div className={'flex flex-col items-center gap-1 text-center'}>
				<h1 className={'text-3xl font-black'}>{data.title}</h1>
				<p>{data.description}</p>
			</div>

			<div className={'mt-3 flex w-full flex-col gap-3'}>
				{links
					.filter(link => !link.asSocial)
					.map(link => (
						<Link
							href={link.url}
							target={'_blank'}
							key={link.alias}
							data-var={data.buttonStyle}
							data-round={data.buttonRound}
							data-btn
						>
							{link.libLabel}
						</Link>
					))}
			</div>

			<div className={'flex flex-wrap items-center justify-center gap-4'}>
				{links
					.filter(link => link.asSocial)
					.map(link => {
						const icon = socialIcon({ url: link.url });

						return (
							<Link
								title={link.libLabel ?? 'Link'}
								data-social
								key={link.alias}
								href={link.url}
								target={'_blank'}
							>
								{icon}
							</Link>
						);
					})}
			</div>

			{!!data.footer.length && (
				<footer className={'absolute bottom-8 rounded-xl bg-black/20 p-2 text-sm'}>
					{data.footer}
				</footer>
			)}
		</>
	);
}
