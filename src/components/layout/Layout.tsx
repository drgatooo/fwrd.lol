import { Footer } from './footer';
import Head from 'next/head';
import type { Metadata } from '@/types';
import { Navbar } from './navbar';
import { satoshi } from '@/lib/fonts';

interface LayoutProps {
	children: React.ReactNode;
	metadata: Metadata;
}

export function Layout({ children, metadata }: LayoutProps) {
	return (
		<div className={satoshi.className} id={'_font_wrapper'}>
			<Head>
				<title>{`${metadata.title} - fwrd.lol`}</title>
				<meta name="description" content={metadata.description} />
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
				<meta name="theme-color" content={metadata.themeColor ?? '#000000'} />
				<link rel="icon" href={metadata.favicon ?? '/favicon.ico'} />
			</Head>
			<Navbar />
			<main className={satoshi.className}>{children}</main>
			<Footer />
		</div>
	);
}
