import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import { Toaster } from 'react-hot-toast';
import dynamic from 'next/dynamic';
import { satoshi } from '@/lib/fonts';

const TopProgressBar = dynamic(() => import('@/components/core/ProgressBar'), { ssr: false });

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
	return (
		<SessionProvider session={session}>
			<TopProgressBar />
			<Component {...pageProps} />
			<Toaster position={'bottom-center'} containerClassName={satoshi.className} />
		</SessionProvider>
	);
}
