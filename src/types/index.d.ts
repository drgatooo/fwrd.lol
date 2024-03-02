import type { GetServerSidePropsContext, NextApiRequest, NextApiResponse } from 'next';

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

export interface APIReqRes {
	req: NextApiRequest;
	res: NextApiResponse;
}

export interface PartialLink {
	url: string;
	asSocial: boolean;
	libLabel: string | null;
	alias: string;
}
