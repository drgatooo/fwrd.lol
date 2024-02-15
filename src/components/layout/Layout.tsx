import { Footer } from './footer';
import Head from 'next/head';
import type { Metadata } from '@/types';
import { Navbar } from './navbar';
import { Transition } from '@headlessui/react';
import { satoshi } from '@/lib/fonts';
import { useBoolean } from '@/hooks';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

interface LayoutProps {
	children: React.ReactNode;
	metadata: Metadata;
}

export function Layout({ children, metadata }: LayoutProps) {
	const [showing, { on: show }] = useBoolean(false);
	const router = useRouter();

	useEffect(() => {
		setTimeout(() => {
			show();
		}, 50);
	}, [router.asPath, show]);

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
			<Transition
				key={router.asPath}
				show={showing}
				enter={'transition ease-out-expo duration-500'}
				enterFrom={router.asPath == '/' ? 'opacity-0 scale-105' : 'opacity-0 scale-95'}
				enterTo={'opacity-100 scale-100'}
			>
				<main className={satoshi.className}>{children}</main>
				<Footer />
			</Transition>
		</div>
	);
}
