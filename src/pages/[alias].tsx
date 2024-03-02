import type { GetServerSideProps } from 'next';
import Head from 'next/head';
import type { LIBConfig } from '@/hooks/useLIBConfig';
import { LIBContent } from '@/components/layout/LinkInBioContent';
import type { Link } from '@prisma/client';
import { convertToValidAlias } from '@/utils/validators';
import prisma from '@/lib/prisma';
import { satoshi } from '@/lib/fonts';
import { useEffect } from 'react';

export const getServerSideProps = (async ({ params }) => {
	const raw_alias = params?.alias?.toString();

	if (!raw_alias?.length) {
		return {
			notFound: true
		};
	}

	if (raw_alias.startsWith('@')) {
		const username = raw_alias.slice(1);
		const user = await prisma.linkInBio.findFirst({
			where: {
				username
			}
		});

		if (!user) {
			return {
				notFound: true
			};
		}

		const links = await prisma.link.findMany({
			where: { creatorId: user.userId }
		});

		return {
			props: {
				data: JSON.parse(JSON.stringify(user)),
				links: JSON.parse(
					JSON.stringify(links.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime()))
				)
			}
		};
	}

	const alias = convertToValidAlias(raw_alias);
	console.log(alias);

	const link = await prisma.link.findUnique({
		where: {
			alias
		}
	});

	if (!link) {
		return {
			notFound: true
		};
	}

	await prisma.link.update({
		where: { alias },
		data: { visits: link.visits + 1 }
	});

	return {
		redirect: {
			destination: link.url,
			permanent: false
		}
	};
}) as GetServerSideProps<{ data: LIBConfig }>;

export default function Page({ data, links }: { data: LIBConfig; links: Link[] }) {
	useEffect(() => {
		data.palette.forEach((color, i) => {
			document.documentElement.style.setProperty(`--c${i + 1}`, color);
		});

		// eslint-disable-next-line prefer-destructuring
		document.body.style.backgroundColor = data.palette[2];
		document.body.style.overflow = 'auto';
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div className={satoshi.className}>
			<div
				data-islib
				className={
					'relative flex h-screen w-full flex-col items-center gap-5 overflow-y-auto overflow-x-hidden px-8 pt-16'
				}
				style={{ backgroundColor: data.palette[2] }}
			>
				<Head>
					<title>{data.title}</title>
					<meta name="description" content={data.description} />
					<meta name="theme-color" content={data.palette[2]} />
					<meta property="og:title" content={data.title} />
					<meta property="og:description" content={data.description} />
					<meta property="og:image" content={data.image} />
					{data.image && <link rel="icon" href={data.image} />}
				</Head>
				<LIBContent data={data} links={links} />
			</div>
		</div>
	);
}
