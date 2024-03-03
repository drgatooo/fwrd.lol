import type { GetStaticProps } from 'next';
import { Layout } from '@/components/layout';
import Link from 'next/link';
import Markdown from 'react-markdown';
import { readFile } from 'node:fs/promises';

export default function PrivacyPage({ privacy }: { privacy: string }) {
	return (
		<Layout
			metadata={{
				title: 'Política de privacidad',
				description: 'Política de privacidad de la aplicación fwrd.lol'
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
				{privacy}
			</Markdown>
		</Layout>
	);
}

export const getStaticProps: GetStaticProps = async () => {
	const privacy = await readFile('./docs/privacy.md', 'utf-8');

	return {
		props: {
			privacy
		}
	};
};
