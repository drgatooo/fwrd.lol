import Link from 'next/link';
import { MdArrowRight } from 'react-icons/md';
import related from '@/constants/relatedLinks.json';
import { useRouter } from 'next/router';

export function RelatedLinks() {
	const router = useRouter();

	return (
		<div className={'flex flex-col gap-2 italic md:flex-row md:items-center'}>
			<h4>Vínculos relacionados:</h4>
			<ul className={'flex flex-wrap items-center gap-1 opacity-70 md:flex-row'}>
				{related[router.asPath as keyof typeof related]
					.map<React.ReactNode>((link, index) => (
						<li key={index}>
							<Link href={link.href}>{link.name}</Link>
						</li>
					))
					.reduce((acc, curr) => [acc, <MdArrowRight key={`sep-${Math.random()}`} />, curr])}
			</ul>
		</div>
	);
}
