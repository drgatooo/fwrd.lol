import type { GetServerSidePropsContext } from 'next';

export interface Metadata {
	title: string;
	description: string;
	favicon?: string;
	themeColor?: string;
}

export interface ReqRes {
	req: GetServerSidePropsContext['req'];
	res: GetServerSidePropsContext['res'];
}
