import type { GetServerSidePropsContext, NextApiRequest, NextApiResponse } from 'next';
import type { Link } from '@prisma/client';

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

export type LIBLink = Pick<Link, 'url' | 'alias' | 'libLabel' | 'asSocial'>;
