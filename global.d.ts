import type { PrismaClient } from '@prisma/client';

declare global {
	// eslint-disable-next-line no-var
	var prisma: PrismaClient | undefined;

	namespace NodeJS {
		interface ProcessEnv {
			readonly DATABASE_URL: string;
			readonly GOOGLE_CLIENT_ID: string;
			readonly GOOGLE_CLIENT_SECRET: string;
			readonly IMGBB_KEY: string;
		}
	}
}

export {};
