import { useEffect, useState } from 'react';
import { DashboardLink } from '../cards';
import type { DashboardProps } from '@/pages/dashboard';
import Fuse from 'fuse.js';
import { Input } from '../core';
import { MdSearch } from 'react-icons/md';
import { useRouter } from 'next/router';

export function MyLinks({ user }: DashboardProps) {
	const [query, setQuery] = useState('');
	const [links, setLinks] = useState(user.links);
	const router = useRouter();

	const fuse = new Fuse(user.links, {
		keys: ['alias', 'url', 'description']
	});

	useEffect(() => {
		const result = query.length ? fuse.search(query).map(link => link.item) : user.links;
		setLinks(result);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [query]);

	return (
		<>
			<Input
				type={'search'}
				label={'Busca tu enlace'}
				name={'búsqueda'}
				value={query}
				onChange={e => setQuery(e.target.value)}
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
