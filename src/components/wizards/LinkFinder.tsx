import { DashboardLink } from '../cards';
import type { DashboardProps } from '@/pages/dashboard';
import { Input } from '../core';
import { MdSearch } from 'react-icons/md';
import { useRouter } from 'next/router';
import { useSearchLinks } from '@/hooks';

export function LinkFinder({ user }: DashboardProps) {
	const { links, query, search } = useSearchLinks(user.links);
	const router = useRouter();

	return (
		<>
			<Input
				type={'search'}
				label={'Busca tu enlace'}
				name={'búsqueda'}
				value={query}
				onChange={e => search(e.target.value)}
				rightIcon={<MdSearch />}
			/>

			<div className={'grid w-full grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3'}>
				{links.map(link => (
					<DashboardLink router={router} key={link.id} link={link} />
				))}
			</div>
		</>
	);
}
