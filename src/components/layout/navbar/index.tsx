import { NavLogo } from './logo';
import { NavProfile } from './profile';

export function Navbar() {
	return (
		<nav className={'sticky top-0 h-[80px] w-full bg-white dark:bg-zinc-950'}>
			<div className={'m-auto flex max-w-screen-xl items-center justify-between px-9 py-5'}>
				<NavLogo />
				<NavProfile />
			</div>
		</nav>
	);
}
