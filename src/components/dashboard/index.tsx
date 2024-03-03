import { DashboardLink } from './Link';
import { DashboardSkeleton } from './Skeleton';
import { Input } from '../core';
import { MdSearch } from 'react-icons/md';
import { useRouter } from 'next/router';
import { useSearchLinks } from '@/hooks';

export function Dashboard() {
	const { links, query, search, isLoading } = useSearchLinks();
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
				{isLoading && (
					<>
						<DashboardSkeleton />
						<DashboardSkeleton />
						<DashboardSkeleton />
					</>
				)}
				{!!links && links.map(link => <DashboardLink router={router} key={link.id} link={link} />)}
			</div>
		</>
	);
}
