import { MdAnalytics, MdCalendarToday, MdEdit, MdLink } from 'react-icons/md';
import { Button } from '../core';
import Image from 'next/image';
import type { Link } from '@prisma/client';
import type { NextRouter } from 'next/router';
import { favicon } from '@/utils';

export function DashboardLink({ link, router }: { link: Link; router: NextRouter }) {
	return (
		<div className={'flex flex-col gap-4 rounded-xl bg-black/5 p-5 dark:bg-white/5'}>
			<LinkTitle alias={link.alias} url={link.url} />

			<LinkDetails url={link.url} description={link.description} />
			<LinkStats visits={link.visits} createdAt={link.createdAt.toString()} />

			<LinkActions router={router} url={link.url} id={link.id} />
		</div>
	);
}

function LinkTitle({ alias, url }: { alias: string; url: string }) {
	return (
		<div className={'flex h-full items-center gap-4'}>
			<Image src={favicon(url)} alt={alias} width={28} height={28} />
			<h4 className={'truncate'}>/{alias}</h4>
		</div>
	);
}

function LinkDetails({ url, description }: { url: string; description: string | null }) {
	return (
		<div className="flex w-full flex-col gap-2 text-sm">
			<p className={'truncate'}>{url}</p>
			<p className={'line-clamp-2 italic'}>{description || 'Sin descripción'}</p>
		</div>
	);
}

function LinkStats({ visits, createdAt }: { visits: number; createdAt: string }) {
	return (
		<div className={'flex items-center justify-between gap-5'}>
			<span className={'inline-flex items-center gap-2 text-sm'}>
				<MdAnalytics /> {visits || 0} vista{visits === 1 ? '' : 's'}
			</span>
			<span className={'inline-flex items-center gap-2 text-sm'}>
				<MdCalendarToday />{' '}
				{new Date(createdAt).toLocaleDateString('es-PE', {
					year: '2-digit',
					month: 'numeric',
					day: 'numeric'
				})}
			</span>
		</div>
	);
}

function LinkActions({ router, url, id }: { router: NextRouter; url: string; id: string }) {
	return (
		<div className={'grid grid-cols-2 items-center gap-3'}>
			<Button
				className={'!max-w-full'}
				onClick={() => {
					const win = window.open(url, '_blank');
					if (win) win.focus();
				}}
				leftIcon={<MdLink />}
			>
				Abrir
			</Button>
			<Button
				className={'!max-w-full'}
				onClick={() => router.push(`/edit/${id}`)}
				leftIcon={<MdEdit />}
			>
				Editar
			</Button>
		</div>
	);
}
