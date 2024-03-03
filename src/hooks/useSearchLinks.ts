import { useEffect, useState } from 'react';
import Fuse from 'fuse.js';
import type { Link } from '@prisma/client';

export function useSearchLinks(initialLinks: Link[]) {
	const [query, setQuery] = useState('');
	const [links, setLinks] = useState(initialLinks);

	const fuse = new Fuse(links, {
		keys: ['alias', 'url', 'description']
	});

	useEffect(() => {
		const result = query.length ? fuse.search(query).map(link => link.item) : links;
		setLinks(result);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [query, links]);

	return {
		query,
		search: setQuery,
		links
	};
}
