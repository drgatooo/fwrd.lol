import { NavNotLoggedButton } from './notLogged';
import { NavUserLogged } from './isLogged';
import { Spinner } from '@/components/core';
import { useSession } from 'next-auth/react';

export function NavProfile() {
	const session = useSession();

	return session.status == 'loading' ? (
		<Spinner />
	) : session.status == 'unauthenticated' ? (
		<NavNotLoggedButton />
	) : (
		<NavUserLogged session={session} />
	);
}
