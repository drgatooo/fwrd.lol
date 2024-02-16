import Link from 'next/link';
import { MdArrowRight } from 'react-icons/md';
import related from '@/constants/relatedLinks.json';
import { useRouter } from 'next/router';

interface RelatedLinksProps {
	replaceHref?: [string, string];
}

export function RelatedLinks({ replaceHref = ['', ''] }: RelatedLinksProps) {
	const router = useRouter();

	return (
		<div className={'flex flex-col gap-2 italic md:flex-row md:items-center'}>
			<h6>Vínculos relacionados:</h6>
			<ul className={'flex flex-wrap items-center gap-1 pt-0.5 opacity-70 md:flex-row'}>
				{related[router.pathname as keyof typeof related]
					.map<React.ReactNode>((link, index) => (
						<li key={index}>
							<Link href={link.href.replaceAll(...replaceHref)}>{link.name}</Link>
						</li>
					))
					.reduce((acc, curr) => [acc, <MdArrowRight key={`sep-${Math.random()}`} />, curr])}
			</ul>
		</div>
	);
}
