import type { GetStaticProps } from 'next';
import { Layout } from '@/components/layout';
import Link from 'next/link';
import Markdown from 'react-markdown';
import { readFile } from 'node:fs/promises';

export default function TermsPage({ terms }: { terms: string }) {
	return (
		<Layout
			metadata={{
				title: 'Términos de servicio',
				description: 'Términos de servicio de la aplicación fwrd.lol'
			}}
		>
			<Markdown
				components={{
					a(props) {
						// @ts-expect-error q pereza
						return <Link {...props} className={'text-emerald-500'} />;
					},
					p(props) {
						return <p {...props} className={'text-pretty'} />;
					},
					li(props) {
						return <li {...props} className={'ml-5 list-disc'} />;
					}
				}}
			>
				{terms}
			</Markdown>
		</Layout>
	);
}

export const getStaticProps: GetStaticProps = async () => {
	const terms = await readFile('./docs/terms.md', 'utf-8');

	return {
		props: {
			terms
		}
	};
};
