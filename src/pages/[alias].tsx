import type { GetServerSideProps } from 'next';
import prisma from '@/lib/prisma';

export const getServerSideProps = (async ({ params }) => {
	const alias = params?.alias?.toString();

	if (!alias?.length) {
		return {
			notFound: true
		};
	}

	const link = await prisma.link.findUnique({
		where: {
			alias
		}
	});

	if (!link) {
		return {
			redirect: {
				destination: '/',
				permanent: false
			}
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
}) satisfies GetServerSideProps<{ hello: 'world' }>;

export default function Page() {
	return (
		<main>
			<p>redirecting...</p>
		</main>
	);
}
