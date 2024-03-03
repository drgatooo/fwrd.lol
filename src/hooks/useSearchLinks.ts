import { useEffect, useState } from 'react';
import Fuse from 'fuse.js';
import type { Link } from '@prisma/client';
import axios from 'axios';
import useSWR from 'swr';

export function useSearchLinks() {
	const { data: initialLinks, isLoading } = useSWR<Link[]>('mylinks', fetcher);

	const [query, setQuery] = useState('');
	const [links, setLinks] = useState(initialLinks);

	const fuse = new Fuse(initialLinks ?? [], {
		keys: ['alias', 'url', 'description']
	});

	useEffect(() => {
		const result = query.length ? fuse.search(query).map(link => link.item) : initialLinks;
		setLinks(result);
		console.log(links);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [query, initialLinks]);

	return {
		query,
		search: setQuery,
		links,
		isLoading
	};
}

function fetcher() {
	return axios.get('/api/links/all').then(res => res.data.links);
}
