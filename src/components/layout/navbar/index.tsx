import { NavLogo } from './logo';
import { NavProfile } from './profile';

export function Navbar() {
	return (
		<nav className={'sticky top-0 z-[100] h-[80px] w-full bg-white dark:bg-zinc-950'}>
			<div className={'m-auto flex h-full max-w-screen-xl items-center justify-between px-6 py-5'}>
				<NavLogo />
				<NavProfile />
			</div>
		</nav>
	);
}
