import Head from 'next/head';
import type { Metadata } from '@/types';

interface LayoutProps {
	children: React.ReactNode;
	metadata: Metadata;
}

export function Layout({ children, metadata }: LayoutProps) {
	return (
		<>
			<Head>
				<title>{metadata.title} - fwrd.lol</title>
				<meta name="description" content={metadata.description} />
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
				<meta name="theme-color" content={metadata.themeColor ?? '#000000'} />
				<link rel="icon" href={metadata.favicon ?? '/favicon.ico'} />
			</Head>
			<main className={'min-h-[calc(100svh-72px)] p-5 flex flex-col gap-8 max-w-screen-xl m-auto'}>
				{children}
			</main>
		</>
	);
}
