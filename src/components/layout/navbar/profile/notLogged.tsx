import { Button } from '@/components/core';
import { MdLogin } from 'react-icons/md';
import { signIn } from 'next-auth/react';

export function NavNotLoggedButton() {
	return (
		<Button onClick={() => signIn('google')}>
			<span className={'py-1'}>
				<MdLogin />
			</span>
			<span className={'hidden sm:inline-block'}>Acceder</span>
		</Button>
	);
}
