import { MdAnalytics, MdCalendarToday, MdEdit, MdLink } from 'react-icons/md';
import { Button } from '../core';
import Image from 'next/image';
import type { Link } from '@prisma/client';
import type { NextRouter } from 'next/router';
import { favicon } from '@/utils';

export function DashboardLink({ link, router }: { link: Link; router: NextRouter }) {
	return (
		<div className={'flex flex-col gap-4 rounded-xl bg-black/5 p-5 dark:bg-white/5'}>
			<div className={'flex h-full items-center gap-4'}>
				<Image src={favicon(link.url)} alt={link.alias} width={28} height={28} />
				<h4 className={'truncate'}>/{link.alias}</h4>
			</div>

			<div className="flex w-full flex-col gap-2 text-sm">
				<p className={'truncate'}>{link.url}</p>
				<p className={'line-clamp-2 italic'}>{link.description || 'Sin descripción'}</p>
			</div>

			<div className={'flex items-center justify-between gap-5'}>
				<span className={'inline-flex items-center gap-2 text-sm'}>
					<MdAnalytics /> {link.visits || 0} vista{link.visits === 1 ? '' : 's'}
				</span>
				<span className={'inline-flex items-center gap-2 text-sm'}>
					<MdCalendarToday />{' '}
					{new Date(link.createdAt).toLocaleDateString('es-PE', {
						year: '2-digit',
						month: 'numeric',
						day: 'numeric'
					})}
				</span>
			</div>

			<div className={'grid grid-cols-2 items-center gap-3'}>
				<Button
					className={'!max-w-full'}
					onClick={() => {
						const win = window.open(link.url, '_blank');
						if (win) win.focus();
					}}
					leftIcon={<MdLink />}
				>
					Abrir
				</Button>
				<Button
					className={'!max-w-full'}
					onClick={() => router.push(`/edit/${link.id}`)}
					leftIcon={<MdEdit />}
				>
					Editar
				</Button>
			</div>
		</div>
	);
}
