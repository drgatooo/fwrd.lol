import { Button } from '@/components/core';
import type { GetServerSideProps } from 'next';
import { Layout } from '@/components/layout';
import type { Link } from '@prisma/client';
import { LinkEditor } from '@/components/editors';
import { MdKeyboardBackspace } from 'react-icons/md';
import { RelatedLinks } from '@/components/utils';
import { getSession } from '@/utils/auth';
import prisma from '@/lib/prisma';
import { useRouter } from 'next/router';

export default function EditLink({ link }: EditLinkProps) {
	const router = useRouter();

	return (
		<Layout
			metadata={{
				title: `Editando /${link.alias}`,
				description: link.description ?? 'Editando un enlace acortado.'
			}}
		>
			<div className={'flex items-center gap-4'}>
				<Button className={'h-8 min-w-8 !p-0'} onClick={() => router.back()}>
					<MdKeyboardBackspace />
				</Button>
				<h2 className={'line-clamp-2'}>/{link.alias}</h2>
			</div>

			<RelatedLinks replaceHref={[':url', encodeURIComponent(link.url)]} />

			<LinkEditor link={link} />
		</Layout>
	);
}

export const getServerSideProps = (async ({ req, res, query }) => {
	const session = await getSession({ req, res });

	if (!session?.user) {
		return { redirect: { destination: '/' } };
	}

	const { id } = query;

	const link = await prisma.link.findUnique({
		where: { id: id?.toString(), creator: { email: session.user.email ?? '' } }
	});

	if (!link) {
		return { notFound: true };
	}

	return {
		props: { link: JSON.parse(JSON.stringify(link)) }
	};
}) as GetServerSideProps<EditLinkProps>;

export interface EditLinkProps {
	link: Link;
}
